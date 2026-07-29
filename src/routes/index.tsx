import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  ClipboardList,
  FileQuestion,
  FileText,
  FolderOpen,
  Images,
  Layers,
  Megaphone,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { externalResourceLinks } from "@/data/resources";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stonelam Knowledge Hub — SOPs, FAQs & Resources" },
      {
        name: "description",
        content:
          "The complete Stonelam knowledge hub — SOPs, FAQs, catalogues, certifications, portfolios and marketing collateral in one workspace.",
      },
      { property: "og:title", content: "Stonelam Knowledge Hub — SOPs, FAQs & Resources" },
      {
        property: "og:description",
        content:
          "The complete Stonelam knowledge hub — SOPs, FAQs, catalogues, certifications, portfolios and marketing collateral in one workspace.",
      },
    ],
  }),
  component: Home,
});


type Tile = {
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
} & (
  | { kind: "internal"; to: "/sop" | "/faq" | "/resources"; hash?: string }
  | { kind: "external"; href: string }
);

const tiles: Tile[] = [
  {
    kind: "internal",
    to: "/sop",
    title: "SOPs",
    desc: "Developer & architect playbooks — pitch, pricing and follow-up.",
    Icon: ClipboardList,
  },
  {
    kind: "internal",
    to: "/faq",
    title: "FAQs",
    desc: "Every technical answer — material, installation, warranty, comparisons.",
    Icon: FileQuestion,
  },
  {
    kind: "internal",
    to: "/resources",
    hash: "certification",
    title: "Technical Certification",
    desc: "Test reports, fire ratings and compliance documentation.",
    Icon: ShieldCheck,
  },
  {
    kind: "internal",
    to: "/resources",
    hash: "portfolios",
    title: "Project Portfolios",
    desc: "Commercial, healthcare and residential reference projects.",
    Icon: FolderOpen,
  },
  {
    kind: "internal",
    to: "/resources",
    hash: "catalogues",
    title: "Product Catalogues",
    desc: "3mm, 5mm and 12mm collections — the full product range.",
    Icon: Layers,
  },
  {
    kind: "internal",
    to: "/resources",
    hash: "ebrochure",
    title: "E-Brochure",
    desc: "The consolidated Stonelam e-catalogue for quick sharing.",
    Icon: BookOpen,
  },
  {
    kind: "external",
    href: externalResourceLinks.marketingIp,
    title: "Marketing IP Decks",
    desc: "Latest marketing decks and creative IP — hosted on Drive.",
    Icon: Megaphone,
  },
  {
    kind: "external",
    href: externalResourceLinks.imageRepository,
    title: "Image Repository",
    desc: "High-resolution product & project imagery — hosted on Drive.",
    Icon: Images,
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-brand-gradient opacity-[0.06]" />
        <div className="mx-auto max-w-5xl px-6 pb-16 pt-16 text-center md:pt-24">
          <Badge
            variant="secondary"
            className="rounded-full border border-primary/20 bg-accent/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
          >
            Standard Operating Procedures
          </Badge>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            The complete <span className="text-brand-gradient">Stonelam</span> knowledge hub.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Technical FAQs, product catalogues, certification reports, project references
            and role-based SOPs — in one workspace for architects, developers and the
            Stonelam sales team.
          </p>
        </div>
      </section>

      {/* WHAT IS AVAILABLE */}
      <section id="available" className="scroll-mt-24 border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Start here
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              What is Available?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Eight destinations — pick the one you need and jump straight in.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((t) => (
              <TileCard key={t.title} tile={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TileCard({ tile }: { tile: Tile }) {
  const Inner = (
    <div className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
          <tile.Icon className="h-5 w-5" />
        </span>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
      </div>
      <div>
        <h3 className="font-display text-lg font-bold leading-tight">{tile.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{tile.desc}</p>
      </div>
      <div className="flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold text-primary">
        {tile.kind === "external" ? (
          <>
            <FileText className="h-3.5 w-3.5" /> Open on Drive
          </>
        ) : (
          <>Explore</>
        )}
      </div>
    </div>
  );

  if (tile.kind === "external") {
    return (
      <a href={tile.href} target="_blank" rel="noreferrer" className="block">
        {Inner}
      </a>
    );
  }
  return (
    <Link to={tile.to} hash={tile.hash} className="block">
      {Inner}
    </Link>
  );
}
