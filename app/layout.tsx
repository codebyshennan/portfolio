import "./global.css";
import clsx from "clsx";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Sidebar from "../components/sidebar";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "../components/theme-provider";
import JsonLd from "../components/json-ld";

const kaisei = localFont({
  src: "../public/fonts/kaisei-tokumin-latin-700-normal.woff2",
  weight: "700",
  variable: "--font-kaisei",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shen Nan, Wong",
    template: "%s | Shen Nan, Wong",
  },
  description: "Builder-investor based in SEA. Data infrastructure, AI systems, and venture.",
  keywords: [
    "data engineering",
    "AI systems",
    "Southeast Asia",
    "venture capital",
    "Fracxional",
    "Iterative",
    "builder-investor",
    "AI education",
    "automation",
  ],
  alternates: {
    canonical: "https://byshennan.com",
  },
  openGraph: {
    title: "Shen Nan, Wong",
    description: "Builder-investor based in SEA. Data infrastructure, AI systems, and venture.",
    url: "https://byshennan.com",
    siteName: "Shen Nan, Wong",
    images: [
      {
        url: "https://byshennan.com/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Shen Nan, Wong",
    description: "Builder-investor based in SEA. Data infrastructure, AI systems, and venture.",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shen Nan Wong",
  url: "https://byshennan.com",
  jobTitle: "Software Engineer, AI/Data",
  worksFor: { "@type": "Organization", name: "Iterative", url: "https://iterative.vc" },
  sameAs: [
    "https://www.linkedin.com/in/wongshennan/",
    "https://github.com/codebyshennan",
    "https://twitter.com/wongsn",
    "https://byshennan.substack.com/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(kaisei.variable)}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={personSchema} />
      </head>
      <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto text-black bg-white dark:text-white dark:bg-[#111010]">
        <ThemeProvider>
          <Sidebar />
          <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
            {children}
            <Analytics />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
