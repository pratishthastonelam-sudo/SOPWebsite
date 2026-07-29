import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, ExternalLink, Megaphone, Images } from "lucide-react";
import {
  resources,
  resourceGroups,
  externalResourceLinks,
  type ResourceGroupId,
} from "@/data/resources";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Stonelam Knowledge Hub" },
      {
        name: "description",
        content:
          "Downloadable Stonelam resources — technical certifications, project portfolios, product catalogues and the e-brochure.",
      },
      { property: "og:title", content: "Stonelam Resources" },
      {
        property: "og:description",
        content:
          "Certifications, portfolios, product catalogues and the e-brochure — all in one place.",
      },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-12 md:pt-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Resource library
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Catalogues, certifications & case studies.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Every downloadable Stonelam document, organised by category. Click any card to
          open the PDF in a new tab.
        </p>
      </div>

      {/* Quick anchor nav */}
      <nav className="mt-8 flex flex-wrap gap-2">
        {resourceGroups.map((g) => (
          <a
            key={g.id}
            href={`#${g.id}`}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
          >
            {g.title}
          </a>
        ))}
        <a
          href="#external"
          className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
        >
          Marketing & Images
        </a>
      </nav>

      {resourceGroups.map((g) => (
        <Group key={g.id} id={g.id} title={g.title} description={g.description} />
      ))}

      {/* External Drive resources */}
      <section id="external" className="mt-16 scroll-mt-24">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              External links
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Marketing IP & Image Repository
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Hosted on Google Drive — opens in a new tab.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <ExternalCard
            title="Marketing IP Decks"
            desc="Latest marketing decks and creative IP."
            href={externalResourceLinks.marketingIp}
            Icon={Megaphone}
          />
          <ExternalCard
            title="Image Repository"
            desc="High-resolution product and project imagery."
            href={externalResourceLinks.imageRepository}
            Icon={Images}
          />
        </div>
      </section>
    </main>
  );
}

function Group({
  id,
  title,
  description,
}: {
  id: ResourceGroupId;
  title: string;
  description: string;
}) {
  const items = resources.filter((r) => r.group === id);
  if (items.length === 0) return null;
  return (
    <section id={id} className="mt-16 scroll-mt-24">
      <div className="border-b border-border pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {items.length} document{items.length > 1 ? "s" : ""}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <a key={r.title} href={r.url} target="_blank" rel="noreferrer" className="group">
            <Card className="h-full border-border transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
              <CardContent className="flex h-full flex-col gap-5 p-6">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
                    <FileText className="h-5 w-5" />
                  </span>
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-accent/50 text-[10px] font-semibold uppercase tracking-wider text-primary"
                  >
                    PDF
                  </Badge>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold leading-tight">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>PDF · {r.size} MB</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary transition group-hover:gap-2">
                    Open <Download className="h-3.5 w-3.5" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}

function ExternalCard({
  title,
  desc,
  href,
  Icon,
}: {
  title: string;
  desc: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group">
      <Card className="h-full border-border transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
        <CardContent className="flex h-full flex-col gap-5 p-6">
          <div className="flex items-start justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <Badge
              variant="outline"
              className="border-primary/30 bg-accent/50 text-[10px] font-semibold uppercase tracking-wider text-primary"
            >
              Drive
            </Badge>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold leading-tight">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
            <span>Google Drive folder</span>
            <span className="inline-flex items-center gap-1 font-semibold text-primary transition group-hover:gap-2">
              Open <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
