import { useEffect, useState } from "react";
import {
  ClipboardList,
  Package,
  MessagesSquare,
  ShieldCheck,
  ScrollText,
  ChevronRight,
  PlayCircle,
  Calculator,
  ExternalLink,
  Quote,
  AlertTriangle,
  Copy,
  Check,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SopContent } from "@/data/sop";
import { competitorFoolproofing } from "@/data/sop";
import elegante from "@/assets/docs/ELEGANTE_SERIES_3MM_compressed.pdf.asset.json";

const YOUTUBE_ID = "KhWSYWcbXiU";
const MICROSITE_URL = "https://stonelam-facade-calculator2026.netlify.app/#calculator";

type Props = {
  audience: "Developers" | "Architects";
  eyebrow: string;
  intro: string;
  content: SopContent;
};

const sections = [
  { id: "persona", label: "Persona & Goal", Icon: ClipboardList },
  { id: "pre-meeting", label: "Pre-Meeting", Icon: Package },
  { id: "in-meeting", label: "In-Meeting", Icon: MessagesSquare },
  { id: "post-meeting", label: "Post-Meeting", Icon: ScrollText },
  { id: "competitor", label: "Competitor Fool-Proofing", Icon: ShieldCheck },
] as const;

export function SopView({ audience, eyebrow, intro, content }: Props) {
  const [active, setActive] = useState<string>("persona");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-14">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-6 py-10 md:px-12 md:py-14">
        <Badge
          variant="secondary"
          className="rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary"
        >
          {eyebrow}
        </Badge>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {audience} SOP
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Sticky nav */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 border-l border-border pl-4">
            {sections.map(({ id, label, Icon }) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm transition ${
                    isActive
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="space-y-20">
          {/* Persona & Goal */}
          <Section id="persona" title="Persona & Goal" Icon={ClipboardList}>
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard label="Target Persona" body={content.persona} accent />
              <InfoCard label="Goal" body={content.goal} />
            </div>
          </Section>

          {/* Pre-Meeting */}
          <Section id="pre-meeting" title="Pre-Meeting" Icon={Package}>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader kicker="Research Checklist" />
                <ol className="mt-3 space-y-2">
                  {content.research.map((r, i) => (
                    <NumberedItem key={i} n={i + 1} text={r} />
                  ))}
                </ol>
              </Card>
              <Card>
                <CardHeader kicker="Required Collaterals" />
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {content.collaterals.map((c) => (
                    <li
                      key={c.name}
                      className={
                        c.note
                          ? "rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm dark:border-amber-500/40 dark:bg-amber-500/10"
                          : "rounded-lg border border-border bg-background px-3 py-2 text-sm"
                      }
                    >
                      <span>{c.name}</span>
                      {c.note && (
                        <span className="mt-0.5 block text-xs font-medium text-amber-700 dark:text-amber-400">
                          {c.note}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                {content.secondMeetingCollaterals && (
                  <>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Second-meeting collaterals
                    </p>
                    <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {content.secondMeetingCollaterals.map((c) => (
                        <li
                          key={c.name}
                          className="rounded-lg border border-dashed border-border bg-accent/30 px-3 py-2 text-sm"
                        >
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Card>
            </div>
            <Card className="mt-6">
              <CardHeader kicker="Reminder Message Template" />
              <MessageBlock lines={content.reminderTemplate} />
            </Card>
          </Section>

          {/* In-Meeting */}
          <Section id="in-meeting" title="In-Meeting" Icon={MessagesSquare}>
            <ol className="space-y-6">
              {content.phases.map((p) => (
                <li key={p.n} className="group">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 font-display text-sm font-bold text-primary">
                      {p.n}
                    </div>
                    <div className="flex-1 rounded-2xl border border-border bg-card p-5 shadow-sm">
                      <h3 className="font-display text-lg font-bold tracking-tight">
                        {p.title}
                      </h3>
                      {p.note && (
                        <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
                      )}
                      {p.script && (
                        <div className="mt-4 space-y-3">
                          {p.script.map((s, i) => (
                            <blockquote
                              key={i}
                              className="relative rounded-xl border-l-4 border-primary/60 bg-accent/40 px-4 py-3 text-[15px] italic text-foreground/90"
                            >
                              <Quote className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-primary p-0.5 text-primary-foreground" />
                              {s}
                            </blockquote>
                          ))}
                        </div>
                      )}
                      {p.bullets && (
                        <ul className="mt-4 space-y-2 pl-1">
                          {p.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2 text-[15px]">
                              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {p.steps && (
                        <ol className="mt-4 space-y-3">
                          {p.steps.map((s, i) => (
                            <li key={i} className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-3">
                              <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                                Step {i + 1}
                              </span>
                              <span className="text-[15px] leading-relaxed">{s}</span>
                            </li>
                          ))}
                        </ol>
                      )}
                      {p.points && (
                        <div className="mt-4 grid gap-3">
                          {p.points.map((pt, i) => (
                            <details
                              key={i}
                              className="group/point rounded-xl border border-border bg-background/60 open:bg-background"
                            >
                              <summary className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 text-xs font-bold text-secondary">
                                  {i + 1}
                                </span>
                                <span className="flex-1">{pt.title}</span>
                                <ChevronRight className="h-4 w-4 text-muted-foreground transition group-open/point:rotate-90" />
                              </summary>
                              <div className="space-y-2 border-t border-border px-4 py-3">
                                {pt.quotes.map((q, j) => (
                                  <p
                                    key={j}
                                    className="text-sm italic text-foreground/85"
                                  >
                                    &ldquo;{q}&rdquo;
                                  </p>
                                ))}
                              </div>
                            </details>
                          ))}
                        </div>
                      )}
                      {p.rules && (
                        <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
                            <AlertTriangle className="h-3.5 w-3.5" /> Rules
                          </p>
                          <ul className="mt-2 space-y-1.5 text-sm">
                            {p.rules.map((r, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="text-amber-600">•</span>
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {p.embed === "video" && <VideoShowcase id={p.videoId ?? YOUTUBE_ID} />}
                      {p.embed === "microsite" && <MicrositeEmbed />}
                      {p.embed === "sampleDisplay" && <SampleDisplay />}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {/* Post-Meeting */}
          <Section id="post-meeting" title="Post-Meeting Follow-Up" Icon={ScrollText}>
            <Accordion type="single" collapsible className="space-y-3">
              {content.followUps.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`f-${i}`}
                  className="overflow-hidden rounded-2xl border border-border bg-card px-5"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    Template {i + 1} — {f.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <MessageBlock lines={f.lines} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Section>

          {/* Competitor Fool-Proofing */}
          <Section
            id="competitor"
            title="Competitor Fool-Proofing"
            Icon={ShieldCheck}
            kicker="Updated"
          >
            <p className="max-w-2xl text-sm text-muted-foreground">
              Ready-to-deliver rebuttals for the most common objections raised against
              slim porcelain façades.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] border-b border-border bg-primary/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary md:grid">
                <div>Competitor argument</div>
                <div>Our defense</div>
              </div>
              <ul className="divide-y divide-border bg-card">
                {competitorFoolproofing.map((row, i) => (
                  <li
                    key={i}
                    className="grid gap-3 px-5 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-6 md:px-6"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-xs font-bold text-destructive">
                        {i + 1}
                      </span>
                      <p className="text-sm font-semibold text-foreground/90">
                        {row.argument}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-secondary/10 px-4 py-3 md:bg-transparent md:px-0 md:py-0">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p className="text-sm leading-relaxed text-foreground/85">
                        {row.defense}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ── building blocks ─────────────────────────────────────────── */

function Section({
  id,
  title,
  Icon,
  kicker,
  children,
}: {
  id: string;
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h2>
        </div>
        {kicker && (
          <span className="rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
            {kicker}
          </span>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ kicker }: { kicker: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      {kicker}
    </p>
  );
}

function InfoCard({
  label,
  body,
  accent,
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {label}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-foreground/90">{body}</p>
    </div>
  );
}

function NumberedItem({
  n,
  text,
  tone = "primary",
}: {
  n: number;
  text: string;
  tone?: "primary" | "secondary";
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          tone === "primary"
            ? "bg-primary/10 text-primary"
            : "bg-secondary/15 text-secondary"
        }`}
      >
        {n}
      </span>
      <span className="text-[15px] leading-relaxed">{text}</span>
    </li>
  );
}

function MessageBlock({ lines }: { lines: string[] }) {
  const [copied, setCopied] = useState(false);
  const text = lines.join("\n");
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="relative mt-3 rounded-xl border border-border bg-background p-4 pr-12 font-mono text-[13.5px] leading-relaxed text-foreground/90">
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy message"}
        className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[11px] font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
      {lines.map((l, i) => (
        <p key={i} className={i === 0 ? "font-semibold" : "mt-2"}>
          {l}
        </p>
      ))}
    </div>
  );
}

function SampleDisplay() {
  return (
    <div className="mt-5 rounded-2xl border border-border bg-background p-4">
      <Tabs defaultValue="elegante" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="elegante">Elegante (3mm)</TabsTrigger>
          <TabsTrigger value="regenza">Regenza (5mm)</TabsTrigger>
        </TabsList>

        <TabsContent value="elegante" className="mt-4 space-y-4">
          <a
            href={elegante.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" /> Open 3mm catalogue
          </a>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">Classico</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Classico is built for scale — clean, versatile textures with wide-market appeal, priced for high-volume specification without compromising on Stonelam's manufacturing standard.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">Regale</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Regale sits at the balance point — richer surface detailing and a wider design vocabulary than Classico, offering distinctiveness for projects that want to stand apart without moving into ultra-premium territory.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">Prestigio</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Prestigio commands a premium by design — each texture is drawn from rare natural formations that are complex and effectively irreproducible at scale, making every slab a limited, high-value specification rather than a commodity finish.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="regenza" className="mt-4">
          <a
            href="/docs/REGENZA_SERIES_5MM_2026.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" /> Open 5mm catalogue
          </a>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function VideoShowcase({ id }: { id: string }) {
  const watchUrl = `https://youtu.be/${id}`;
  return (
    <figure className="mt-4 overflow-hidden rounded-xl border border-border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-accent/40 px-4 py-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          <PlayCircle className="h-4 w-4" /> Video Showcase
        </div>
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:opacity-80"
        >
          Watch on YouTube <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="relative aspect-video w-full bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${id}?rel=0`}
          title="Stonelam video showcase"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <figcaption className="border-t border-border bg-background px-4 py-2 text-xs text-muted-foreground">
        Direct link:{" "}
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-primary hover:underline"
        >
          {watchUrl}
        </a>
      </figcaption>
    </figure>
  );
}

function MicrositeEmbed() {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-accent/40 px-4 py-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          <Calculator className="h-4 w-4" /> Facade Calculator Microsite
        </div>
        <a
          href={MICROSITE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:opacity-80"
        >
          Open in new tab <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <iframe
        src={MICROSITE_URL}
        title="Stonelam Facade Calculator"
        loading="lazy"
        className="h-[600px] w-full bg-background"
      />
      <div className="border-t border-border bg-background px-4 py-2 text-xs text-muted-foreground">
        Direct link:{" "}
        <a
          href={MICROSITE_URL}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-primary hover:underline break-all"
        >
          {MICROSITE_URL}
        </a>
      </div>
    </div>
  );
}
