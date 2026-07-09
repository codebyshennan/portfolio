export type VentureLink = {
  name: string;
  href: string;
  domain: string;
  label: string;
  iconSrc?: string;
  description?: string;
};

export const xCollectiveBrands: VentureLink[] = [
  {
    name: "fracxional",
    href: "https://fracxional.com",
    domain: "fracxional.com",
    label: "Fractional CTO / CPO",
    description:
      "Embedded technical and product leadership for early-stage startups and venture-backed teams.",
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
    iconSrc: "https://notionplus.xyz/icon.svg?icon.0how5vgff.ys6.svg",
  },
  {
    name: "firstyearin",
    href: "https://firstyearin.xyz",
    domain: "firstyearin.xyz",
    label: "First-year stories",
    iconSrc: "https://firstyearin.xyz/icon.svg?icon.0nwk4fqi849cd.svg",
  },
  {
    name: "whatsinmy",
    href: "https://whatsinmy.xyz",
    domain: "whatsinmy.xyz",
    label: "Affiliate dashboard",
    iconSrc: "https://whatsinmy.xyz/icon.svg?icon.0.~zzeb66vgfo.svg",
  },
];
