import type { Metadata } from "next";
import HomePageContent from "components/home-page-content";

export const metadata: Metadata = {
  title: "x-collective",
  description:
    "Technical leadership, automation, transformation, and career-design work from x-collective.",
  alternates: {
    canonical: "https://www.byshennan.com/collective",
  },
};

export default function CollectivePage() {
  return <HomePageContent showXCollective />;
}
