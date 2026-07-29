import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { faqSections } from "@/data/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQs — Stonelam Knowledge Hub" },
      {
        name: "description",
        content:
          "Searchable Stonelam FAQs — material composition, installation, fire performance, warranty and objection handling.",
      },
      { property: "og:title", content: "Stonelam FAQs" },
      {
        property: "og:description",
        content:
          "Every technical answer for the Stonelam sales, design and installation team — searchable in one place.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqSections;
    return faqSections
      .map((s) => ({
        ...s,
        items: s.items.filter(
          (i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q),
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [query]);

  const totalQs = faqSections.reduce((n, s) => n + s.items.length, 0);
  const shownQs = filtered.reduce((n, s) => n + s.items.length, 0);

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-12 md:pt-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Frequently asked
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Every technical answer, one click away.
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {shownQs} of {totalQs} questions across {faqSections.length} sections — from
            material composition to installation systems and client objections.
          </p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="h-11 rounded-full border-border bg-background pl-10"
          />
        </div>
      </div>

      <div className="mt-12 space-y-12">
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-background p-10 text-center text-muted-foreground">
            No FAQs match "{query}". Try a different keyword.
          </p>
        )}
        {filtered.map((section) => (
          <div key={section.title}>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="h-px flex-1 bg-border" />
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">
                {section.title}
              </h2>
              <span className="text-xs text-muted-foreground">{section.items.length}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <Accordion type="multiple" className="space-y-2">
              {section.items.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`${section.title}-${idx}`}
                  className="overflow-hidden rounded-xl border border-border bg-background px-4 shadow-xs"
                >
                  <AccordionTrigger className="py-4 text-left font-display text-base font-semibold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-0 text-[15px] leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </main>
  );
}
