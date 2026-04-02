---
title: Fathom
description: AI-powered founder scoring pipeline that aggregates public signals and evaluates applicants against a structured rubric — triaging the top of the funnel at scale.
date: 2024-12-01
tags: ai, scoring, pipeline, llm
cover: /images/projects/fathom.png
github: https://github.com/codebyshennan/fathom
website: https://iterative-fathom.vercel.app/
draft: false
author: Shen Nan Wong
keywords: founder scoring, LLM evaluation, deal flow triage, AI pipeline, venture capital
---

<!-- TODO: Add screenshot/video of Fathom — show the scoring queue, a founder's evaluation card with dimension breakdowns, and the calibration view -->

## Why I built this

Evaluating founder quality at scale is subjective and slow. Signal is buried across pitch decks, LinkedIn profiles, news coverage, and reference calls — and different team members weight factors differently. The top of the funnel was bottlenecked by how many applications the team could manually review. I wanted a consistent, automated first pass that surfaced high-potential founders earlier.

## What it does

Fathom pulls applicants from Airtable into a managed queue, aggregates publicly available signals (LinkedIn, Crunchbase, news, pitch materials), and scores each founder against a structured rubric using an LLM evaluation pipeline. Scores are calibrated across dimensions — founder-market fit, technical depth, prior execution, and domain insight.

## Scoring pipeline

### Data aggregation

For each founder, Fathom collects:

- **LinkedIn** (via Proxycurl) — work history, education, skills, connection count, activity level
- **Crunchbase** — prior companies founded, funding history, exits
- **News/web** (via Tavily) — press coverage, speaking engagements, published writing
- **Application data** (via Airtable) — pitch deck, company description, traction metrics, sector

All sources are fetched concurrently and merged into a structured founder profile document.

### Evaluation rubric

The rubric has four dimensions, each scored 1-5:

| Dimension | What it evaluates | Signal sources |
|---|---|---|
| Founder-market fit | Does their background uniquely position them for this market? | LinkedIn career trajectory, domain publications |
| Technical depth | Can they build the product themselves or evaluate those who do? | Work history, GitHub (if available), technical content |
| Prior execution | Have they built and shipped before? At what scale? | Crunchbase history, prior company outcomes |
| Domain insight | Do they have a non-obvious thesis about their market? | Application pitch, news coverage, published writing |

### Tiered evaluation

Not every application gets the same depth of analysis:

1. **Tier 1 — Quick filter** (GPT-4o-mini, ~$0.003/applicant) — reads the application summary and assigns a pass/review/reject signal. ~60% of applications are clearly outside thesis and get filtered here.
2. **Tier 2 — Full evaluation** (GPT-4o, ~$0.05/applicant) — the remaining 40% get the full rubric evaluation with all aggregated data. Each dimension gets a score and 2-3 sentences of reasoning.
3. **Tier 3 — Deep dive** (manual trigger) — for borderline cases, runs additional research (competitor analysis, market sizing) and produces a detailed assessment. Used for ~5% of applicants.

This tiered approach keeps total pipeline cost under $50/batch for ~500 applicants.

### Calibration

Raw LLM scores drift over time and across prompt versions. Fathom calibrates by:

- **Anchor examples** — 20 pre-scored founders (5 per dimension score level) are included in every evaluation prompt as few-shot examples
- **Score distribution monitoring** — if the mean score drifts beyond 0.5 from the historical mean, an alert fires and the prompt is reviewed
- **Human override loop** — partners can adjust any score with a reason. Overrides feed back into the anchor set for the next calibration cycle.

### Structured output

Every score is generated as structured output with a Zod schema:

```typescript
z.object({
  founderMarketFit: z.object({
    score: z.number().min(1).max(5),
    reasoning: z.string().min(50).max(500),
  }),
  technicalDepth: z.object({ ... }),
  priorExecution: z.object({ ... }),
  domainInsight: z.object({ ... }),
  overall: z.object({
    recommendation: z.enum(['strong_yes', 'yes', 'maybe', 'no', 'strong_no']),
    summary: z.string(),
  }),
})
```

If the LLM returns anything that doesn't match the schema — a score of 6, a missing dimension, an empty reasoning field — the evaluation is rejected and retried.

## Technical decisions

- **Tiered evaluation over uniform depth** — running a full $0.05 evaluation on every applicant wastes budget on obvious rejections. The quick filter catches 60% at 1/15th the cost.
- **Anchor-based calibration over fine-tuning** — fine-tuning locks you into a model version and requires retraining when criteria change. Few-shot anchors can be updated instantly and work across model versions.
- **Proxycurl over direct LinkedIn scraping** — rate limits, anti-bot detection, and legal risk make direct scraping impractical. Proxycurl provides clean structured data at ~$0.01/profile.

## Stack

Next.js 15, OpenAI (GPT-4o + GPT-4o-mini), Airtable API, Proxycurl, Tavily, Crunchbase API, Zod, Vercel
