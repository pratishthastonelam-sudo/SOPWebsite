import { createFileRoute } from "@tanstack/react-router";
import { SopView } from "@/components/sop-view";
import { developersSop } from "@/data/sop";

export const Route = createFileRoute("/sop/developers")({
  head: () => ({
    meta: [
      { title: "Developers SOP — Stonelam Surfaces" },
      {
        name: "description",
        content:
          "The Stonelam standard operating procedure for engaging developers — research, pitch, sampling, follow-up and competitor fool-proofing.",
      },
      { property: "og:title", content: "Developers SOP — Stonelam Surfaces" },
      {
        property: "og:description",
        content:
          "Pre-meeting research, in-meeting pitch, follow-up templates and competitor fool-proofing for the developer audience.",
      },
    ],
  }),
  component: DevelopersSopPage,
});

function DevelopersSopPage() {
  return (
    <SopView
      audience="Developers"
      eyebrow="Stonelam Playbook · Developers"
      intro="A complete field playbook for meeting developers — from pre-meeting research and required collaterals to the in-meeting pitch, the facade calculator walk-through, video showcase, follow-up templates and rebuttals for the most common competitor arguments."
      content={developersSop}
    />
  );
}
