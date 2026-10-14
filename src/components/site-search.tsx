import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import Fuse from "fuse.js";
import {
  FileText,
  Layers,
  ClipboardList,
  FileQuestion,
  HardDrive,
  Search,
  ExternalLink,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  searchIndex,
  layerLabels,
  type SearchEntry,
  type SearchLayer,
} from "@/data/search-index";

const layerIcon: Record<SearchLayer, React.ComponentType<{ className?: string }>> = {
  document: FileText,
  material: Layers,
  sop: ClipboardList,
  faq: FileQuestion,
  drive: HardDrive,
};

const layerOrder: SearchLayer[] = ["drive", "document", "material", "sop", "faq"];

// Multi-layer weighting: title & aliases matter most, then subtitle, then body text.
const fuse = new Fuse(searchIndex, {
  includeScore: true,
  threshold: 0.38, // typo tolerance ("buildngskins", "helthcare")
  ignoreLocation: true, // match anywhere in long text
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 0.45 },
    { name: "keywords", weight: 0.3 },
    { name: "subtitle", weight: 0.1 },
    { name: "body", weight: 0.15 },
  ],
});

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

function runSearch(query: string): SearchEntry[] {
  const q = normalise(query);
  if (!q) return [];
  // Layer A: whole-phrase fuzzy match
  const phrase = fuse.search(q, { limit: 40 });
  // Layer B: every word must match somewhere (handles word-order / partial phrases)
  const words = q.split(" ").filter((w) => w.length > 1);
  const perWord =
    words.length > 1
      ? words.map((w) => new Map(fuse.search(w, { limit: 200 }).map((r) => [r.item.id, r.score ?? 1])))
      : [];
  const scores = new Map<string, { item: SearchEntry; score: number }>();
  phrase.forEach((r) => scores.set(r.item.id, { item: r.item, score: r.score ?? 1 }));
  if (perWord.length) {
    searchIndex.forEach((item) => {
      if (perWord.every((m) => m.has(item.id))) {
        const avg = perWord.reduce((a, m) => a + (m.get(item.id) ?? 1), 0) / perWord.length;
        const prev = scores.get(item.id);
        if (!prev || avg < prev.score) scores.set(item.id, { item, score: avg });
      }
    });
  }
  // Exact phrase hit in title/keywords gets a strong boost
  scores.forEach((v) => {
    const hay = normalise(`${v.item.title} ${v.item.keywords.join(" ")}`);
    if (hay.includes(q)) v.score *= 0.2;
  });
  return [...scores.values()].sort((a, b) => a.score - b.score).slice(0, 30).map((v) => v.item);
}

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchLayer | "all">("all");
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const r = runSearch(query);
    return filter === "all" ? r : r.filter((x) => x.layer === filter);
  }, [query, filter]);

  const grouped = useMemo(
    () =>
      layerOrder
        .map((l) => ({ layer: l, items: results.filter((r) => r.layer === l) }))
        .filter((g) => g.items.length),
    [results],
  );

  const select = useCallback(
    (e: SearchEntry) => {
      setOpen(false);
      const a = e.action;
      if (a.kind === "external") {
        window.open(a.href, "_blank", "noopener,noreferrer");
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigate({ to: a.to as any, hash: a.hash, search: a.search as any });
      }
    },
    [navigate],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="hidden rounded border border-border px-1.5 text-[10px] font-semibold md:inline">
          Ctrl K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        {/* shouldFilter off: Fuse does the ranking */}
        <div data-search-root>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search documents, materials, SOPs, FAQs, Drive…"
          />
          <div className="flex flex-wrap gap-1.5 border-b border-border px-3 py-2">
            {(["all", ...layerOrder] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setFilter(l)}
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition ${
                  filter === l
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {l === "all" ? "All" : layerLabels[l]}
              </button>
            ))}
          </div>
          <CommandList className="max-h-[60vh]">
            {query.trim() && results.length === 0 && (
              <CommandEmpty>No results for “{query}”.</CommandEmpty>
            )}
            {!query.trim() && (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                Type to search — typos are fine (e.g. “behind buildngskins”, “helthcare”).
              </p>
            )}
            {grouped.map((g) => {
              const Icon = layerIcon[g.layer];
              return (
                <CommandGroup key={g.layer} heading={layerLabels[g.layer]}>
                  {g.items.map((it) => (
                    <CommandItem
                      key={it.id}
                      value={it.id}
                      onSelect={() => select(it)}
                      className="cursor-pointer gap-3"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold">{it.title}</div>
                        <div className="truncate text-xs text-muted-foreground">{it.subtitle}</div>
                      </div>
                      {it.action.kind === "external" && (
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}
