import type { Metadata } from "next";
import HomePageContent from "components/home-page-content";
import { hideVentures } from "lib/seo";

export const metadata: Metadata = {
  title: "x-collective",
  description:
    "Technical leadership, automation, transformation, and career-design work from x-collective.",
  alternates: {
    canonical: "https://www.byshennan.com/collective",
  },
  // The page stays reachable by direct link so it can still be shared with a
  // client — it just drops out of search while HIDE_VENTURES is on.
  robots: hideVentures ? { index: false, follow: false } : undefined,
};

export default function CollectivePage() {
  return <HomePageContent showXCollective />;
}
