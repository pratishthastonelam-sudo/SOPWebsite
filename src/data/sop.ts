export type Collateral = { name: string; note?: string };

export type PhaseStep = {
  n: number;
  title: string;
  script?: string[];
  bullets?: string[];
  steps?: string[];
  note?: string;
  rules?: string[];
  points?: { title: string; quotes: string[] }[];
  embed?: "video" | "microsite" | "sampleDisplay";
  videoId?: string;
};

export type FollowUpTemplate = {
  label: string;
  lines: string[];
};

export type SopContent = {
  persona: string;
  goal: string;
  research: string[];
  collaterals: Collateral[];
  secondMeetingCollaterals?: Collateral[];
  reminderTemplate: string[];
  phases: PhaseStep[];
  followUps: FollowUpTemplate[];
  productSampleRules: string[];
};

export const competitorFoolproofing: { argument: string; defense: string }[] = [
  {
    argument:
      "3mm is generally not recommended for facades, only for interiors",
    defense:
      "The high thickness of other materials and brands adds weight to the structure. Our 3mm prevents dead-load on the building, and is also highly durable with ISO 10545-4 RATING OF 700.",
  },
  {
    argument: "Prone to hairline cracking six months after installation",
    defense:
      "This is false. Our 3mm can withstand 700 newtons/mm sq. of force. I.e. one sq mm of our 3mm product can withstand about 70kg of weight force",
  },
  {
    argument: "Indian labor lacks the specialized skills required for 3mm slabs.",
    defense:
      "It is no problem as Stonelam provides a holistic facade solution including handling of the product and installation. We have certified fabricators who are trained by our technical team. And most importantly we do a minimum of 3 site visits where our technical expert makes sure that all our SOPs are being followed.",
  },
  {
    argument: "Highly Priced due to import duties",
    defense:
      "While import duties maybe seen as an issue, the product demands a premium due to the alleviated quality and Italian origin. Additionally, we provide a certificate of Authentication to ensure that you get ‘Laminam’ and not just any thin porcelain slab",
  },
  {
    argument: "Non customisable sizing/OR wastage",
    defense:
      "Our Large format slabs enable fewer grout lines, and thus are preferred for seamless finish and cleaner visual flow; making it the preference of many architects that want a flawless design aesthtetic",
  },
  {
    argument: "No dedicated store for all sku sample display",
    defense:
      "Our Sales team is approachable and you can fix a meeting with the display and portfolio of over 34+ skus along with proofs of durability.",
  },
  {
    argument: "Inflexible material that cannot be applied on curved surfaces",
    defense:
      "While the material is inflexible owing to high strength, the curved finish can be achieved during fabrication (refer to curve shaped model)",
  },
  {
    argument: "Technically outdated, since Laminum is an old product",
    defense:
      "Stonelam withstands multiple international certifications. Additionally, the 3mm thickness technology is not available in India - this tech originated in Italy is precision focused and is timeless.",
  },
];

// ─────────────────────────────────────────────────────────────
// DEVELOPERS SOP  (verbatim from Notion)
// ─────────────────────────────────────────────────────────────
export const developersSop: SopContent = {
  persona:
    "Standardize how the sales team approaches developers (ROI-, risk-, timeline-driven) to increase meeting-to-sample and sample-to-site conversion.",
  goal:
    "Also leverage the brand name of Stonelam (an exclusive Stonex and Laminam venture) that can act as social proofing for their clients.",
  research: [
    "Recent on-going projects",
    "Asset Class identified (Luxury Residential / Commercial / Retail)",
    "Core facade material used in their last 3 projects identified",
    "External Competitor/building material assigned to their current project identified",
  ],
  collaterals: [
    { name: "Developer’s video" },
    { name: "Brand Video" },
    { name: "Sample kit 3mm" },
    { name: "Sample kit 5mm" },
    { name: "3/5 mm catelogue" },
    { name: "Project portfolio pdf(s)" },
    { name: "Demo kit" },
    { name: "SFS 1X1 Mockup" },
    { name: "Hook-on sample" },
    { name: "L Shape mockup" },
    { name: "Curve Mockup", note: "only show if asked" },
  ],
  reminderTemplate: [
    "Good {{Morning/Afternoon}}, Sir.",
    "Just a quick reminder regarding our meeting scheduled for {{Date}} at {{Time}} at {{Venue/Office Name}}.",
    "Looking forward to meeting you and connecting in person.",
    "Wishing you a great day, and see you soon!",
  ],
  phases: [
    {
      n: 1,
      title: "Enter and Greet",
      note: "(Introduce yourself and read the room if architect is free to talk)",
      script: [
        "Good morning, sir! [NAME] this side from Stonelam Surfaces. I handle the [ex. Delhi NCR] region and would love to introduce our work to you.",
      ],
    },
    {
      n: 2,
      title: "Introduce Stonelam / Understand Developer’s Need",
      note: "Some questions to ask:",
      bullets: [
        "“What kind of façade look are you going for—more stone, concrete, metal, or something more minimal/solid?”",
        "“Do you prefer a matte finish or something with a bit of sheen/gloss?”",
        "“For exteriors, do you usually prioritize low maintenance or premium visual impact first?”",
        "“Are you exploring natural stone right now, or open to porcelain slabs as an alternative?”",
        "“Do you like the idea of larger, seamless panels (fewer joints) or do you prefer smaller modules?”",
        "“Any past material issues you definitely want to avoid this time—like staining, fading, cracking, or shade variation?”",
      ],
    },
    {
      n: 3,
      title: "Developer video",
      note: "Anchor the conversation on how facade installation reduces long term cost.",
      script: [
        "Before we compare rates, I want to align on what façade decisions truly cost a developer: structure, time, and risk",
      ],
      embed: "video",
    },
    {
      n: 4,
      title: "Stonelam Sales Pitch + Show Product Portfolio",
      note:
        "Sir, when we build a façade, three things matter most – safety, strength, and design. Many products look good in the beginning, but later they fade, break, or give safety issues. That’s where Stonelam is different",
      points: [
        {
          title: "1. Strong but Light",
          quotes: [
            "Stonelam slabs are the world’s slimmest and lightest porcelain façades. Because they are light, they put less weight on the building. This makes installation faster and easier. But light does not mean weak. Every slab has fibreglass mesh backing, making it strong and safe.",
            "We give a 25-year warranty – for colour, porosity, thermal chemical and frost resistance, stains and scratches.",
            "And most important, Stonelam has the highest fire safety rating (A2S1D0). That’s why more than 10,000+ projects totaling about 2 crore sq. ft. in India are already using Stonelam. In fact, we have 90% market share in slim porcelain façades in India.",
          ],
        },
        {
          title: "2. Exclusive Partnership - Laminam",
          quotes: [
            "One more important thing, Sir Stonelam is the exclusive partner of Laminam, Italy in India and South Asia. Laminam is the company that invented slim slabs. Many others say they are selling ‘laminam’, but those are fake claims.",
            "Only Stonelam has the right to bring the original Laminam slabs to India. So when you choose Stonelam, you are choosing the world’s pioneer and the world’s best – with full trust.",
          ],
        },
        {
          title: "3. Not Just a Product – A Full System",
          quotes: [
            "Other companies sell porcelain as just another product. For Stonelam, façade is our only focus and we only sell large format slabs. That’s why we built India’s only façade ecosystem.",
            "We have 75+ trained fabricators who know how to work the right way. Our technical team does at least 3 visits on every site.",
            "We do a structural safety analysis for every project.",
            "So, with Stonelam, you don’t just buy slabs – you get a full partner, who supports from start to finish.",
          ],
        },
        {
          title: "4. Italian Design, Natural Materials",
          quotes: [
            "A façade is not just covering a wall. It is the face of your building. Stonelam designs come from Italy, created by the famous designer Claudio Corniola. We offer over 50+ designs and finishes – the largest range in India.",
            "All slabs are made from 100% natural raw materials. That means they are durable, recyclable, and low-maintenance for years.",
            "So with Stonelam, you get the truth of nature, Italian design, and modern technology – together.",
            "Stonelam is not just material. It is safety, design, and trust – all in one.",
          ],
        },
      ],
    },
    {
      n: 5,
      title: "Demo Kit Showcase",
      note: "Only give demo kit showcase if meeting the architect for the first time",
      steps: [
        "Place the Leather demo Kit on the platform",
        "Present Raw materials to introduce what and how stonelam product is made",
        "Explain what is porcelain",
        "USP demonstration; start demo with scratch resistance, fire resistance and stain resistance. Maintain Low water absorption",
      ],
    },
    {
      n: 6,
      title: "Display Certificates and Proofs of durability",
      bullets: [
        "Display and convey certification values for the 4 USP demonstration",
        "Offer full pack: “I’ll share the complete test pack on WhatsApp/email right after this meeting so your project/consultant team can review it point-by-point.”",
      ],
      note:
        "Trigger conditions: They ask about durability/strength · They compare thickness with competitors · They mention fire safety or compliance. Explain the reinforcement and presence of fibre mesh and its functionality.",
    },
    {
      n: 7,
      title: "Explain the Total-Cost Narrative Through the Microsite",
      note: "Price calculator microsite: https://stonelam-facade-calculator2026.netlify.app/#calculator",
      embed: "microsite",
    },
    {
      n: 8,
      title: "MOCK UP display (ON INSTALLATION)",
      note: "ONLY SHOW CURVE SAMPLE IF PROMPTED. DO NOT INTRODUCE YOURSELF.",
    },
    {
      n: 9,
      title: "Product Sample Display",
      script: [
        "We typically start with Classico, then move up to premium textures.",
        "Across price tiers, quality and durability remain consistent—the price difference is mainly due to value-added surface processes and textures, not ‘basic vs good quality’.",
        "So you can match budgets zone-wise (podium, tower, highlights) without compromising on performance.",
      ],
      rules: [
        "Show product portfolio first (different types - residential, healthcare, hospitality, institutional, etc)",
        "Start with 3mm façade relevance, then show ranges (Classico → Regale → Prestigio)",
        "Don’t show all samples at once; stage them like options",
        "Encourage touch + visual comparison under light",
      ],
      note:
        "To tackle questions related to 3mm strength and durability OR competitors’ strength, REFER TO THE TEST REPORTS provided. But DONT force them on the onset.",
      embed: "sampleDisplay",
    },
    {
      n: 10,
      title: "Thank the Client for their time and Request a second meeting",
      script: [
        "Thank you for your time today, sir. I really appreciate the opportunity to understand your façade requirements. If you’re okay with it, I’ll share the complete test pack and a few relevant project references today itself, and we can align on a short follow-up meeting next week with your consultant",
      ],
    },
  ],
  followUps: [
    {
      label: "Template 1: Interested Developer / Project Discussed / Deal Closed",
      lines: [
        "Good afternoon, Sir.",
        "I am [NAME] from Stonelam.",
        "It was a pleasure meeting you today.",
        "As discussed, I am sharing the relevant product information, including the selected catalogue, specification sheets, and other reference documents for your review.",
        "As per our conversation, I will be connecting with you again on {second meeting date} , {day}, at {time).",
        "Looking forward to building a long-term association.",
      ],
    },
    {
      label: "Template 2: Introductory / Awareness Meeting",
      lines: [
        "Good afternoon, Sir.",
        "I am [NAME] from Stonelam.",
        "It was a pleasure meeting you today and introducing our brand.",
        "We hope to have the opportunity to be a part of your future projects. If you ever need product information, samples, catalogues, or technical assistance, I’d be happy to help.",
        "Looking forward to staying connected.",
      ],
    },
  ],
  productSampleRules: [
    "Show product portfolio first (different types - residential, healthcare, hospitality, institutional, etc)",
    "Start with 3mm façade relevance, then show ranges (Classico → Regale → Prestigio)",
    "Don’t show all samples at once; stage them like options",
    "Encourage touch + visual comparison under light",
  ],
};

// ─────────────────────────────────────────────────────────────
// ARCHITECTS SOP  (verbatim from Notion)
// ─────────────────────────────────────────────────────────────
export const architectsSop: SopContent = {
  persona:
    "The Architect is unaware of the brand.",
  goal:
    "The goal is not to push the architect to give a project directly but to establish a relationship and Stonelam brand awareness.",
  research: [
    "Recent on-going projects",
    "Core facade material used in their last 3 projects identified",
    "External Competitor/building material assigned to their current project identified",
  ],
  collaterals: [
    { name: "3mm sample kit" },
    { name: "5mm sample kit" },
    { name: "Certificate booklet" },
    { name: "Recent launched marketing catalogues (eg new shade, mockup, brochure, etc)" },
    { name: "Portfolio/project catalogue" },
    { name: "Brand Video" },
    { name: "Demo Kit" },
    { name: "SFS 1x1 Sample" },
  ],
  secondMeetingCollaterals: [
    { name: "Hook-on sample" },
    { name: "L Shape mockup" },
    { name: "Curve Mockup" },
  ],
  reminderTemplate: [
    "Good {{Morning/Afternoon}}, Sir.",
    "Just a quick reminder regarding our meeting scheduled for {{Date}} at {{Time}} at {{Venue/Office Name}}.",
    "Looking forward to meeting you and connecting in person. Wishing you a great day, and see you soon!",
  ],
  phases: [
    {
      n: 1,
      title: "Enter and Greet",
      note: "(Introduce yourself and read the room if architect is free to talk)",
      script: [
        "Good morning, ma’am/sir! [NAME] this side from Stonelam Surfaces. I handle the [ex. Delhi NCR] region and would love to introduce our work to you.",
      ],
    },
    {
      n: 2,
      title: "Set the context",
      note:
        "(Start the conversation for which the meeting was scheduled - introducing products, new shade line, introducing brand)",
      script: [
        "Sir, you may already know Laminam—the Italian company that pioneered the large-format porcelain slab category. Stonelam is an exclusive Stonex + Laminam venture, and we are targetting a shift to a safer, more durable buildingskins through our facade solutions.",
        "Continue the conversation (new architect / first meeting): May I know which material Are you leaning towards for your current facades? stone / ACP / HPL / GRC / terracotta?",
      ],
      bullets: [
        "If stone/brick cladding: “That gives a premium look, but it adds weight and needs more structural consideration. With 3mm, you get the look with a much lighter system.”",
        "If ACP/HPL: “Execution is faster, but approvals and long-term performance depend heavily on fire rating and surface stability. We usually enter when fire + durability becomes a concern.”",
        "If terracotta/GRC: “Great material families—our edge is the combination of ultra-low thickness + A2 fire rating + premium surface textures.”",
      ],
    },
    {
      n: 3,
      title: "Show Brand Video",
      script: [
        "Most Architects we work with are looking for surfaces that look stunning on day one and 10 year later - with zero compromise on finish quality. That exactly what Stonelam delivers.",
        "Traditional stone or cladding materials add weight, bulk, and complexity to a façade. Architects spend time worrying about structural load, fire safety, long-term maintenance. These are real constraints that affect your design decisions.",
        "Stonelam 3mm removes those constraints.",
      ],
      embed: "video",
      videoId: "YcxHT8zAUvY",
    },
    {
      n: 4,
      title: "Stonelam Sales Pitch",
      note:
        "Sir, when we build a façade, three things matter most – safety, strength, and design. Many products look good in the beginning, but later they fade, break, or give safety issues. That’s where Stonelam is different",
      points: [
        {
          title: "1. Strong but Light",
          quotes: [
            "Stonelam slabs are the world’s slimmest and lightest porcelain façades. Because they are light, they put less weight on the building. This makes installation faster and easier. But light does not mean weak. Every slab has fibreglass mesh backing, making it strong and safe.",
            "We give a 25-year warranty – for colour, porosity, thermal chemical and frost resistance, stains and scratches.",
            "And most important, Stonelam has the highest fire safety rating (A2S1D0). That’s why more than 10,000+ projects totaling about 2 crore sq. ft. in India are already using Stonelam. In fact, we have 90% market share in slim porcelain façades in India.",
          ],
        },
        {
          title: "2. Exclusive Partnership - Laminam",
          quotes: [
            "One more important thing, Sir Stonelam is the exclusive partner of Laminam, Italy in India and South Asia. Laminam is the company that invented slim slabs. Many others say they are selling ‘laminam’, but those are fake claims.",
            "Only Stonelam has the right to bring the original Laminam slabs to India. So when you choose Stonelam, you are choosing the world’s pioneer and the world’s best – with full trust.",
          ],
        },
        {
          title: "3. Not Just a Product – A Full System",
          quotes: [
            "Other companies sell porcelain as just another product. For Stonelam, façade is our only focus and we only sell large format slabs. That’s why we built India’s only façade ecosystem.",
            "We have 75+ trained fabricators who know how to work the right way. Our technical team does at least 3 visits on every site.",
            "We do a structural safety analysis for every project.",
            "So, with Stonelam, you don’t just buy slabs – you get a full partner, who supports from start to finish.",
          ],
        },
        {
          title: "4. Italian Design, Natural Materials",
          quotes: [
            "A façade is not just covering a wall. It is the face of your building. Stonelam designs come from Italy, created by the famous designer Claudio Corniola. We offer over 50+ designs and finishes – the largest range in India.",
            "All slabs are made from 100% natural raw materials. That means they are durable, recyclable, and low-maintenance for years.",
            "So with Stonelam, you get the truth of nature, Italian design, and modern technology – together.",
            "Stonelam is not just material. It is safety, design, and trust – all in one.",
          ],
        },
      ],
    },
    {
      n: 5,
      title: "Demo Kit Showcase",
      note: "Only give demo kit showcase if meeting the architect for the first time",
      steps: [
        "Place the Leather demo Kit on the platform",
        "Present Raw materials to introduce what and how stonelam product is made",
        "Explain what is porcelain",
        "USP demonstration; start demo with scratch resistance, fire resistance and stain resistance. Maintain Low water absorption",
      ],
    },
    {
      n: 6,
      title: "Display Certificates and Proofs of durability",
      bullets: [
        "Display and convey certification values for the 4 USP demonstration",
        "Offer full pack: “I’ll share the complete test pack on WhatsApp/email right after this meeting so your project/consultant team can review it point-by-point.”",
      ],
      note:
        "Trigger conditions: They ask about durability/strength · They compare thickness with competitors · They mention fire safety or compliance. Explain the reinforcement and presence of fibre mesh and its functionality.",
    },
    {
      n: 7,
      title: "Product Sample display",
      script: [
        "We typically start with Classico, then move up to premium textures.",
        "Across price tiers, quality and durability remain consistent—the price difference is mainly due to value-added surface processes and textures, not ‘basic vs good quality’.",
        "So you can match budgets zone-wise (podium, tower, highlights) without compromising on performance.",
      ],
      rules: [
        "Show product portfolio first (different types - residential, healthcare, hospitality, institutional, etc)",
        "Start with 3mm façade relevance, then show ranges (Classico → Regale → Prestigio)",
        "Don’t show all samples at once; stage them like options",
        "Encourage touch + visual comparison under light",
      ],
      note:
        "To tackle questions related to 3mm strength and durability OR competitors’ strength, REFER TO THE TEST REPORTS provided. But DONT force them on the onset.",
      embed: "sampleDisplay",
    },
    {
      n: 8,
      title: "Thank the Client for their time and Request a second meeting",
      script: [
        "Thank you for your time today, sir. I really appreciate the opportunity to understand your façade requirements. If you’re okay with it, I’ll share the complete test pack and a few relevant project references today itself, and we can align on a short follow-up meeting next week with your consultant",
      ],
    },
  ],
  followUps: [
    {
      label: "Template 1: Interested / Project Discussed / Deal Closed",
      lines: [
        "Good afternoon, Sir.",
        "I am [NAME] from Stonelam.",
        "It was a pleasure meeting you today.",
        "As discussed, I am sharing the relevant product information, including the selected catalogue, specification sheets, and other reference documents for your review.",
        "As per our conversation, I will be connecting with you again on {second meeting date} , {day}, at {time).",
        "Looking forward to building a long-term association.",
      ],
    },
    {
      label: "Template 2: Introductory / Awareness Meeting",
      lines: [
        "Good afternoon, Sir.",
        "I am [NAME] from Stonelam.",
        "It was a pleasure meeting you today and introducing our brand.",
        "We hope to have the opportunity to be a part of your future projects. If you ever need product information, samples, catalogues, or technical assistance, I’d be happy to help.",
        "Looking forward to staying connected.",
      ],
    },
  ],
  productSampleRules: [
    "Show product portfolio first (different types - residential, healthcare, hospitality, institutional, etc)",
    "Start with 3mm façade relevance, then show ranges (Classico → Regale → Prestigio)",
    "Don’t show all samples at once; stage them like options",
    "Encourage touch + visual comparison under light",
  ],
};
