import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Compass } from "lucide-react";

export const Route = createFileRoute("/sop/")({
  head: () => ({
    meta: [
      { title: "SOPs — Stonelam Knowledge Hub" },
      {
        name: "description",
        content:
          "Choose your Stonelam SOP — the developer or architect playbook. Pitch, sampling, follow-up and competitor fool-proofing.",
      },
      { property: "og:title", content: "Stonelam SOPs" },
      {
        property: "og:description",
        content:
          "Role-based Stonelam playbooks for developers and architects — end-to-end field process.",
      },
    ],
  }),
  component: SopIndex,
});

const options = [
  {
    to: "/sop/developers" as const,
    title: "Developers SOP",
    desc: "ROI-, risk- and timeline-driven pitch. Total-cost narrative, façade calculator walk-through and follow-up templates.",
    Icon: Building2,
  },
  {
    to: "/sop/architects" as const,
    title: "Architects SOP",
    desc: "Relationship-first specification playbook — awareness building, sampling flow and competitor rebuttals.",
    Icon: Compass,
  },
];

function SopIndex() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-12 md:pt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Role-based playbooks
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
        Standard Operating Procedures.
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Two SOPs, rendered end-to-end inside the site. Pick your track — or hover the
        &ldquo;SOP&rdquo; menu in the header to jump directly.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {options.map((o) => (
          <Link
            key={o.to}
            to={o.to}
            className="group flex flex-col justify-between gap-8 rounded-2xl border border-border bg-card p-8 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
          >
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
                <o.Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight">
                {o.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition group-hover:gap-2">
              Open playbook <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
