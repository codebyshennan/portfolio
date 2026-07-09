export type VentureLink = {
  name: string;
  href: string;
  domain: string;
  label: string;
  description?: string;
  smallCaps?: boolean;
};

export const xCollectiveBrands: VentureLink[] = [
  {
    name: "fracxional",
    href: "https://fracxional.com",
    domain: "fracxional.com",
    label: "Fractional CTO / CPO",
    description:
      "Embedded technical and product leadership for early-stage startups and venture-backed teams.",
    smallCaps: true,
  },
  {
    name: "nxrratives",
    href: "https://nxrratives.com",
    domain: "nxrratives.com",
    label: "Career coaching",
    description:
      "Facilitated career-design workshops that turn reflection, anxiety, and options into a usable next-step plan.",
  },
  {
    name: "innxvate",
    href: "https://innxvate.org",
    domain: "innxvate.org",
    label: "Digital transformation",
    description:
      "Strategy-to-execution consulting for organizations closing the gap between transformation plans and production systems.",
  },
];

export const launching: VentureLink[] = [
  {
    name: "notionplus",
    href: "https://notionplus.xyz",
    domain: "notionplus.xyz",
    label: "Notion apps",
  },
  {
    name: "firstyearin",
    href: "https://firstyearin.xyz",
    domain: "firstyearin.xyz",
    label: "First-year stories",
  },
  {
    name: "whatsinmy",
    href: "https://whatsinmy.xyz",
    domain: "whatsinmy.xyz",
    label: "Affiliate dashboard",
  },
];
