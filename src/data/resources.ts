import ecatalogue from "@/assets/docs/E-catalogue.pdf.asset.json";
import cert from "@/assets/docs/certification_booklet.pdf.asset.json";
import twelvemm from "@/assets/docs/12MM_COLLECTION_compressed.pdf.asset.json";
import elegante from "@/assets/docs/ELEGANTE_SERIES_3MM_compressed.pdf.asset.json";

export type ResourceGroupId =
  | "certification"
  | "portfolios"
  | "catalogues"
  | "ebrochure";

export type Resource = {
  title: string;
  description: string;
  group: ResourceGroupId;
  url: string;
  size: number;
};

const mb = (b: number) => Math.max(0.1, Math.round((b / 1024 / 1024) * 10) / 10);

export const resources: Resource[] = [
  // Technical certification
  {
    title: "Certification Booklet",
    description: "Test reports, certifications and technical compliance.",
    group: "certification",
    url: cert.url,
    size: mb(cert.size),
  },

  // Project portfolios
  {
    title: "Commercial Projects",
    description: "Reference book of Stonelam commercial installations.",
    group: "portfolios",
    url: "/docs/Commercial_Projects.pdf",
    size: mb(21588977),
  },
  {
    title: "Hospitality Projects",
    description: "Stonelam installations across hotels, restaurants and hospitality venues.",
    group: "portfolios",
    url: "/docs/Hospitality_Projects.pdf",
    size: mb(14121953),
  },
  {
    title: "Healthcare Projects",
    description: "Hygiene-focused, non-porous applications for healthcare spaces.",
    group: "portfolios",
    url: "/docs/Healthcare_Projects.pdf",
    size: mb(6618782),
  },
  {
    title: "Residential Projects",
    description: "Residential applications: kitchens, walls, façades and more.",
    group: "portfolios",
    url: "/docs/Residential_Projects.pdf",
    size: mb(12439260),
  },

  // Product catalogues
  {
    title: "Elegante Series — 3mm",
    description: "Lightweight 3mm slabs for façades, walls and interiors.",
    group: "catalogues",
    url: elegante.url,
    size: mb(elegante.size),
  },
  {
    title: "Regenza Series — 5mm",
    description: "5mm slabs balancing weight and structural performance.",
    group: "catalogues",
    url: "/docs/REGENZA_SERIES_5MM_2026.pdf",
    size: mb(13369429),
  },
  {
    title: "12mm Collection",
    description: "Full-body 12mm slabs for countertops and heavy-duty applications.",
    group: "catalogues",
    url: twelvemm.url,
    size: mb(twelvemm.size),
  },

  // E-brochure
  {
    title: "E-Catalogue",
    description: "The complete Stonelam product e-brochure.",
    group: "ebrochure",
    url: ecatalogue.url,
    size: mb(ecatalogue.size),
  },
];

export const resourceGroups: {
  id: ResourceGroupId;
  title: string;
  description: string;
}[] = [
  {
    id: "certification",
    title: "Technical Certification",
    description:
      "Independent test reports, fire ratings and technical compliance documentation.",
  },
  {
    id: "portfolios",
    title: "Project Portfolios",
    description:
      "Commercial, hospitality, healthcare and residential reference projects — real installations at scale.",
  },
  {
    id: "catalogues",
    title: "Product Catalogues",
    description: "Full ranges by thickness — 3mm, 5mm and 12mm collections.",
  },
  {
    id: "ebrochure",
    title: "E-Brochure",
    description: "The consolidated Stonelam e-catalogue for quick sharing.",
  },
];

export const externalResourceLinks = {
  marketingIp:
    "https://drive.google.com/drive/folders/1aHuaY8lduMU3H4woX1gb9SzzUnMWpVce?usp=drive_link",
  // TODO: swap for the dedicated "Behind the Buildingskins" Drive link
  behindTheBuildingskins:
    "https://drive.google.com/drive/folders/1aHuaY8lduMU3H4woX1gb9SzzUnMWpVce?usp=drive_link",
  imageRepository:
    "https://drive.google.com/drive/folders/1qvRicGNG9lwZpimudYhEHyRS-sTHG0Fj?usp=drive_link",
};
