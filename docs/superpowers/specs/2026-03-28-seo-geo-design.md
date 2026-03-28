# SEO & GEO Optimization — Design Spec

**Date:** 2026-03-28
**Site:** byshennan.com (Next.js portfolio)
**Priority:** Fracxional clients → hiring → VCs/founders in SEA
**Publishing cadence:** Active (new posts every few weeks)

---

## Goals

1. Rank better in traditional search (Google/Bing) for queries like "data engineer Southeast Asia", "AI data engineering courses", "Fracxional".
2. Be cited and surfaced by AI tools (Perplexity, ChatGPT, Gemini) when someone asks about builder-investors in SEA, AI educators, or VC data infrastructure.

---

## Approach: Holistic (Technical + Content Layer)

One-time technical fixes establish the foundation; a lightweight content framework ensures every future post compounds both SEO and GEO value.

---

## Section 1: Technical SEO Fixes

### 1.1 Fix `robots.ts`

Uncomment the sitemap reference so search engines and AI crawlers can discover all URLs.

```ts
// app/robots.ts
export default function robots() {
  return {
    rules: [{ userAgent: "*" }],
    sitemap: "https://byshennan.com/sitemap.xml",  // was commented out
    host: "https://byshennan.com",
  };
}
```

### 1.2 JSON-LD Structured Data

Inject structured data as `<script type="application/ld+json">` in `<head>` via Next.js metadata or a `JsonLd` component.

**Person schema** (global, in `app/layout.tsx`):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shen Nan Wong",
  "url": "https://byshennan.com",
  "jobTitle": "Software Engineer, AI/Data",
  "worksFor": { "@type": "Organization", "name": "Iterative" },
  "sameAs": [
    "https://www.linkedin.com/in/wongshennan/",
    "https://github.com/codebyshennan",
    "https://twitter.com/wongsn",
    "https://byshennan.substack.com/"
  ]
}
```

**BlogPosting schema** (per post, in `app/blog/[slug]/page.tsx`):
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "<post title>",
  "description": "<post description>",
  "datePublished": "<ISO date>",
  "author": {
    "@type": "Person",
    "name": "Shen Nan Wong",
    "url": "https://byshennan.com"
  },
  "url": "https://byshennan.com/blog/<slug>"
}
```

**SoftwareApplication schema** (per project, in `app/projects/[slug]/page.tsx`):
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "<project title>",
  "description": "<project description>",
  "url": "<project website or github>",
  "author": {
    "@type": "Person",
    "name": "Shen Nan Wong"
  }
}
```

Implementation: a thin `JsonLd` component (`components/json-ld.tsx`) that renders the script tag. Each page passes its own schema object.

### 1.3 Canonical URLs

Add `alternates.canonical` to every page's metadata:

- `app/layout.tsx` root metadata: `alternates: { canonical: "https://byshennan.com" }`
- `app/about/page.tsx`: `alternates: { canonical: "https://byshennan.com/about" }`
- `app/blog/page.tsx`: `alternates: { canonical: "https://byshennan.com/blog" }`
- `app/projects/page.tsx`: `alternates: { canonical: "https://byshennan.com/projects" }`
- `app/blog/[slug]/page.tsx` `generateMetadata`: `alternates: { canonical: "https://byshennan.com/blog/<slug>" }`
- `app/projects/[slug]/page.tsx` `generateMetadata`: `alternates: { canonical: "https://byshennan.com/projects/<slug>" }`

### 1.4 Enhanced Global Metadata Keywords

Add `keywords` to the root metadata object in `app/layout.tsx`:

```ts
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
```

---

## Section 2: Content/GEO Framework

### 2.1 Extended Frontmatter Fields

Add two optional fields to every `.md`/`.mdx` post:

```yaml
author: Shen Nan Wong
keywords: data engineering, AI systems, Southeast Asia, Fracxional
```

`lib/content.ts` is updated to parse these fields into `PostMeta`. They feed into:
- `BlogPosting` JSON-LD `author` field
- Per-page `metadata.keywords`

### 2.2 FAQ Block Convention

Each post may optionally include a `## FAQ` section at the bottom. Questions are written as `### ` level-3 headings (natural language, no special prefix); the answer is the paragraph immediately following. The `PostDetail` component detects the presence of an `## FAQ` heading in the markdown, parses h3/paragraph pairs beneath it, and injects a `FAQPage` JSON-LD schema alongside the post's `BlogPosting` schema.

AI tools (Perplexity, ChatGPT, Gemini) heavily weight FAQ-structured content for citation. Example in markdown:

```md
## FAQ

### What is Fracxional?
Fracxional is an AI and data engineering education consultancy founded by Shen Nan Wong, delivering courses to enterprises and universities across Southeast Asia.

### Who is Shen Nan Wong?
Shen Nan Wong is a builder-investor based in Ho Chi Minh City, Southeast Asia. He is the sole engineer at Iterative, an early-stage VC fund, and the founder of Fracxional.
```

The `FAQPage` JSON-LD structure:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "<question text>",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "<answer text>"
      }
    }
  ]
}
```

### 2.3 Author Bio Footer

A static author bio block rendered at the bottom of every blog post in `components/posts/details.tsx`, pulling from `lib/info.tsx`. It includes:
- Full name with link to homepage
- Role and employer (Iterative, with link)
- Fracxional mention with link
- Location (Ho Chi Minh City, Southeast Asia)

~2–3 sentences. Rendered after post content, before view counter.

### 2.4 `llms.txt` — LLM-Readable Site Summary

A markdown file served at `https://byshennan.com/llms.txt` (via `app/llms.txt/route.ts`) that gives AI crawlers a clean, structured summary of the site. Perplexity, ChatGPT Browse, and other AI tools already read this file.

Format (plain markdown):
```md
# Shen Nan Wong

> Builder-investor based in Southeast Asia. Sole engineer at Iterative (iterative.vc), an early-stage VC fund. Founder of Fracxional — AI and data engineering education for enterprises and universities across Asia.

## Pages

- [Home](https://byshennan.com): Introduction, social links, blog stats.
- [About](https://byshennan.com/about): Career timeline, tech stack, background.
- [Blog](https://byshennan.com/blog): Essays on data engineering, AI systems, venture, and life in SEA.
- [Projects](https://byshennan.com/projects): Side projects and open-source work.

## Blog Posts

- [The Builder-Investor](https://byshennan.com/blog/builder-investor): On combining engineering and investing at a VC fund in Southeast Asia.

## Contact

- LinkedIn: https://www.linkedin.com/in/wongshennan/
- GitHub: https://github.com/codebyshennan
- Substack: https://byshennan.substack.com/
- Fracxional: https://fracxional.com
```

The route generates this file dynamically, pulling blog and project slugs from `lib/content.ts` so it stays current as content is added. Also add `llms.txt` to the sitemap.

### 2.5 Writing Conventions Checklist

A non-code checklist to follow when authoring new posts:

- [ ] Name your employer/project explicitly in the first paragraph (Iterative, Fracxional)
- [ ] Include a location reference (Ho Chi Minh City, Southeast Asia, Singapore)
- [ ] Use your full name ("Shen Nan Wong") at least once per post
- [ ] Link to Fracxional and Iterative using descriptive anchor text (not just "here")
- [ ] Add a `## FAQ` section at the bottom with 2–4 questions about the post topic and about you
- [ ] Fill in `author` and `keywords` frontmatter fields
- [ ] No manual step needed for `llms.txt` — the dynamic route auto-includes new content

---

## Files Affected

| File | Change |
|------|--------|
| `app/robots.ts` | Uncomment sitemap URL |
| `app/layout.tsx` | Add Person JSON-LD, add `keywords`, add canonical |
| `app/about/page.tsx` | Add canonical |
| `app/blog/page.tsx` | Add canonical |
| `app/projects/page.tsx` | Add canonical |
| `app/blog/[slug]/page.tsx` | Add BlogPosting JSON-LD, canonical, keywords from frontmatter |
| `app/projects/[slug]/page.tsx` | Add SoftwareApplication JSON-LD, canonical |
| `lib/content.ts` | Parse `author` and `keywords` frontmatter fields |
| `components/json-ld.tsx` | New: thin component to render `<script type="application/ld+json">` |
| `components/posts/details.tsx` | Add author bio footer; detect FAQ section and inject FAQPage JSON-LD |
| `app/llms.txt/route.ts` | New: dynamic route serving LLM-readable site summary |
| Content `.md` files | Add `author`/`keywords` frontmatter; add FAQ sections |

---

## Out of Scope

- Changing visual design or layout
- Adding new pages
- Performance optimization (Core Web Vitals)
- Analytics changes
