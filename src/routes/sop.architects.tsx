import { createFileRoute } from "@tanstack/react-router";
import { SopView } from "@/components/sop-view";
import { architectsSop } from "@/data/sop";

export const Route = createFileRoute("/sop/architects")({
  head: () => ({
    meta: [
      { title: "Architects SOP — Stonelam Surfaces" },
      {
        name: "description",
        content:
          "The Stonelam standard operating procedure for engaging architects — awareness-building pitch, sampling, follow-up and competitor fool-proofing.",
      },
      { property: "og:title", content: "Architects SOP — Stonelam Surfaces" },
      {
        property: "og:description",
        content:
          "Pre-meeting research, brand pitch, sampling flow, follow-up templates and competitor fool-proofing for the architect audience.",
      },
    ],
  }),
  component: ArchitectsSopPage,
});

function ArchitectsSopPage() {
  return (
    <SopView
      audience="Architects"
      eyebrow="Stonelam Playbook · Architects"
      intro="A relationship-first playbook for engaging architects — from pre-meeting research and collaterals to the awareness-building pitch, sampling flow, follow-up templates and rebuttals for common competitor arguments."
      content={architectsSop}
    />
  );
}
