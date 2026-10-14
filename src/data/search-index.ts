import { resources, externalResourceLinks } from "@/data/resources";
import { faqSections } from "@/data/faq";
import { developersSop, architectsSop, competitorFoolproofing } from "@/data/sop";
import type { SopContent } from "@/data/sop";

export type SearchLayer = "document" | "material" | "sop" | "faq" | "drive";

export type SearchEntry = {
  id: string;
  layer: SearchLayer;
  title: string;
  /** Secondary line shown under the title */
  subtitle: string;
  /** Searchable body text (lower weight than title / keywords) */
  body: string;
  /** Extra aliases / synonyms (high weight) */
  keywords: string[];
  action:
    | { kind: "external"; href: string }
    | { kind: "route"; to: string; hash?: string; search?: Record<string, string> };
};

export const layerLabels: Record<SearchLayer, string> = {
  document: "Documents",
  material: "Materials",
  sop: "SOPs",
  faq: "FAQs",
  drive: "Drive",
};

// ── Layer 1: documents (PDFs) ────────────────────────────────
const documents: SearchEntry[] = resources.map((r) => ({
  id: `doc-${r.title}`,
  layer: "document",
  title: r.title,
  subtitle: `PDF · ${r.size} MB`,
  body: r.description,
  keywords: [r.group, "pdf", "download", "portfolio", "catalogue", "brochure"],
  action: { kind: "external", href: r.url },
}));

// ── Layer 2: materials / product ranges ──────────────────────
const materials: SearchEntry[] = [
  {
    id: "mat-3mm",
    layer: "material",
    title: "Elegante Series — 3mm",
    subtitle: "Lightweight slab · façades, walls, interiors",
    body: "3mm+ porcelain slab 1m x 3m, 8.2 kg/m2, ISO 10545-4 rating 700. Large format, low dead load.",
    keywords: ["3mm", "3 mm", "elegante", "thin", "lightweight", "facade", "cladding"],
    action: { kind: "external", href: resources.find((r) => r.title.startsWith("Elegante"))!.url },
  },
  {
    id: "mat-5mm",
    layer: "material",
    title: "Regenza Series — 5mm",
    subtitle: "Balanced weight and structural performance",
    body: "5mm porcelain slab for facades and interiors.",
    keywords: ["5mm", "5 mm", "regenza", "facade", "cladding"],
    action: { kind: "external", href: resources.find((r) => r.title.startsWith("Regenza"))!.url },
  },
  {
    id: "mat-12mm",
    layer: "material",
    title: "12mm Collection",
    subtitle: "Full-body slab · countertops, heavy duty",
    body: "12mm porcelain slabs for countertops, flooring and heavy-duty applications.",
    keywords: ["12mm", "12 mm", "countertop", "kitchen", "flooring", "thick"],
    action: { kind: "external", href: resources.find((r) => r.title.startsWith("12mm"))!.url },
  },
  {
    id: "mat-buildingskins",
    layer: "material",
    title: "Buildingskins",
    subtitle: "Stonelam façade solutions",
    body: "Stonelam buildingskins — safer, more durable façade skins using Italian-engineered large-format porcelain.",
    keywords: ["buildingskins", "building skins", "buildingskin", "facade", "skin", "rebrand"],
    action: { kind: "route", to: "/sop/architects", hash: "in-meeting" },
  },
];

// Materials layer also covers FAQ answers from the material section
const materialFaqs: SearchEntry[] = faqSections
  .filter((s) => /material|size|weight|dimension|technical|fire|install/i.test(s.title))
  .flatMap((s) =>
    s.items.map((i, idx) => ({
      id: `matfaq-${s.title}-${idx}`,
      layer: "material" as const,
      title: i.q,
      subtitle: `${s.title} · ${i.a.length > 70 ? i.a.slice(0, 70) + "…" : i.a}`,
      body: i.a,
      keywords: [s.title],
      action: { kind: "route" as const, to: "/faq", search: { q: i.q } },
    })),
  );

// ── Layer 3: SOP content ─────────────────────────────────────
function sopEntries(c: SopContent, audience: "Developers" | "Architects"): SearchEntry[] {
  const to = audience === "Developers" ? "/sop/developers" : "/sop/architects";
  const out: SearchEntry[] = [];
  c.phases.forEach((p) =>
    out.push({
      id: `sop-${audience}-phase-${p.n}`,
      layer: "sop",
      title: `${audience} SOP · ${p.n}. ${p.title}`,
      subtitle: p.note ?? "In-meeting phase",
      body: [
        ...(p.script ?? []),
        ...(p.bullets ?? []),
        ...(p.steps ?? []),
        ...(p.rules ?? []),
        ...(p.points ?? []).flatMap((x) => [x.title, ...x.quotes]),
      ].join(" "),
      keywords: [audience, "sop", "meeting", p.embed === "video" ? "video" : ""],
      action: { kind: "route", to, hash: "in-meeting" },
    }),
  );
  c.collaterals.forEach((x, i) =>
    out.push({
      id: `sop-${audience}-col-${i}`,
      layer: "sop",
      title: `${audience} SOP · ${x.name}`,
      subtitle: "Pre-meeting collateral",
      body: x.note ?? "",
      keywords: [audience, "collateral", "pre-meeting", "kit"],
      action: { kind: "route", to, hash: "pre-meeting" },
    }),
  );
  c.followUps.forEach((f, i) =>
    out.push({
      id: `sop-${audience}-fu-${i}`,
      layer: "sop",
      title: `${audience} SOP · Follow-up: ${f.label}`,
      subtitle: "Post-meeting template",
      body: f.lines.join(" "),
      keywords: [audience, "follow up", "template", "email", "message"],
      action: { kind: "route", to, hash: "post-meeting" },
    }),
  );
  return out;
}

const competitor: SearchEntry[] = competitorFoolproofing.map((c, i) => ({
  id: `comp-${i}`,
  layer: "sop",
  title: `Objection: ${c.argument}`,
  subtitle: "Competitor fool-proofing",
  body: c.defense,
  keywords: ["competitor", "objection", "rebuttal", "defense", "argument"],
  action: { kind: "route", to: "/sop/architects", hash: "competitor" },
}));

// ── Layer 4: FAQs ────────────────────────────────────────────
const faqs: SearchEntry[] = faqSections.flatMap((s) =>
  s.items.map((i, idx) => ({
    id: `faq-${s.title}-${idx}`,
    layer: "faq" as const,
    title: i.q,
    subtitle: i.a.length > 90 ? i.a.slice(0, 90) + "…" : i.a,
    body: `${i.a} ${s.title}`,
    keywords: [s.title],
    action: { kind: "route" as const, to: "/faq", search: { q: i.q } },
  })),
);

// ── Layer 5: Google Drive (opens directly in Drive) ──────────
// To add more Drive folders/files, add an entry here.
const drive: SearchEntry[] = [
  {
    id: "drive-behind-buildingskins",
    layer: "drive",
    title: "Behind the Buildingskins",
    subtitle: "Google Drive · opens directly",
    body: "Behind the buildingskins content series, stories and creative.",
    keywords: ["behind the buildingskins", "behind buildingskins", "buildingskins", "series", "content"],
    // TODO: replace with the dedicated Drive folder link once available
    action: { kind: "external", href: externalResourceLinks.behindTheBuildingskins },
  },
  {
    id: "drive-marketing-ip",
    layer: "drive",
    title: "Marketing IP Decks",
    subtitle: "Google Drive · opens directly",
    body: "Latest marketing decks and creative IP.",
    keywords: ["marketing", "decks", "ip", "creative", "presentation"],
    action: { kind: "external", href: externalResourceLinks.marketingIp },
  },
  {
    id: "drive-images",
    layer: "drive",
    title: "Image Repository",
    subtitle: "Google Drive · opens directly",
    body: "High-resolution product and project imagery.",
    keywords: ["images", "photos", "pictures", "repository", "gallery", "hi-res"],
    action: { kind: "external", href: externalResourceLinks.imageRepository },
  },
];

export const searchIndex: SearchEntry[] = [
  ...drive,
  ...documents,
  ...materials,
  ...materialFaqs,
  ...sopEntries(developersSop, "Developers"),
  ...sopEntries(architectsSop, "Architects"),
  ...competitor,
  ...faqs,
];
