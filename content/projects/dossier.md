---
title: Dossier
description: Turns raw deal data and call notes into IC-ready investment memos through a deep research pipeline — founder background, competitive landscape, market sizing.
date: 2025-03-01
tags: ai, research, langgraph, agents
cover: /images/projects/dossier.png
github: https://github.com/codebyshennan/memo-generation
website:
draft: false
author: Shen Nan Wong
keywords: investment memo, deal research, LangGraph, AI agents, venture capital, deep research
---

<!-- TODO: Add screenshot/video of Dossier — show the research pipeline running and a generated memo in Notion -->

## Why I built this

Writing investment memos is slow. Each one requires founder background research, competitive landscape analysis, market sizing, and synthesizing it all into a structured document — easily a full day's work per deal. With hundreds of inbound deals, the team couldn't write memos for every promising one. I built Dossier to run the research pipeline in parallel and produce a first-draft memo automatically, so the team could spend their time refining analysis instead of gathering it.

## What it does

Dossier takes raw deal data and call notes and produces structured, IC-ready investment memos. A deep research pipeline runs in parallel — founder background, competitive landscape, market sizing — then synthesizes everything into a 9-section memo and pushes it to Notion.

## Research pipeline

Before memo generation, four research strands run concurrently as a LangGraph DAG:

### Founder research

Pulls LinkedIn profiles via Proxycurl, maps career trajectory, identifies domain expertise signals, flags repeat founder status, and checks for shared connections with the team. Output is a structured founder profile with a "founder-market fit" assessment.

### Competitive landscape

A multi-step agent uses Tavily (web search) and Perplexity (synthesis) to map the competitive landscape: direct competitors, adjacent players, recent funding rounds in the space, and differentiation signals. The agent iterates — if the initial search is too broad, it narrows; if too narrow, it expands.

### Market sizing

This is the most complex strand. A LangGraph agent runs a TAM/SAM/SOM analysis:

1. **Top-down** — finds industry reports, extracts market size figures, applies geographic and segment filters
2. **Bottom-up** — estimates from unit economics: target customer count × average revenue × penetration rate
3. **Triangulation** — compares both approaches, flags discrepancies, produces a confidence-weighted estimate

The agent uses Tavily for source discovery, Perplexity for synthesis, and GPT-4o for numerical reasoning and sanity checks.

### Synthesis

All three strands feed into a synthesis step that:

- Merges findings into a unified context document
- Generates an investment thesis (bull case + bear case)
- Produces a "contrarian take" — the strongest argument against investing — to stress-test the thesis

## Memo generation

The memo generator takes the synthesized research and maps it to a 9-section template:

| Section | Source |
|---|---|
| Company Overview | Airtable deal record (template) |
| Investment Thesis | LLM synthesis from research strands |
| Memo Opinion | LLM with contrarian take |
| Market Analysis | Market sizing agent output |
| Company Details | Airtable + pitch deck extraction |
| Risk Analysis | LLM from competitive landscape + thesis |
| Competitive Advantage | Competitive landscape agent output |
| Financial Analysis | Airtable financials (template) |
| Technical Evaluation | LLM from founder research + product analysis |

Each section uses structured generation with a Zod schema to ensure consistent formatting. The final memo is pushed to Notion via the API, fully formatted with headers, tables, and callout blocks.

## Architecture

```
Airtable (deal data) ─┐
                       ├─→ LangGraph DAG ─→ Synthesis ─→ Memo Generator ─→ Notion
Call notes ───────────┘     ├─ Founder research (Proxycurl + LLM)
                            ├─ Competitive landscape (Tavily + Perplexity)
                            └─ Market sizing (multi-step agent)
```

The backend is a Hono server running on Node.js. The frontend (Next.js) provides a queue UI where the team can trigger memo generation per deal, monitor pipeline progress, and review drafts before they're pushed to Notion.

## Technical decisions

- **LangGraph over raw chains** — the research pipeline has conditional branching (narrow/expand search) and fan-out/fan-in parallelism. LangGraph's graph execution model handles this cleanly; a linear chain would require manual orchestration.
- **Tavily + Perplexity over just one** — Tavily gives structured web search results with source URLs. Perplexity gives synthesized answers with citations. Using both means the agent can verify Perplexity's synthesis against Tavily's raw sources.
- **Hono over Express** — Hono is ~14x faster on cold starts and has native TypeScript support. For a pipeline that runs many concurrent research jobs, the performance difference matters.

## Stack

Hono (Node.js backend), Next.js (frontend), LangGraph, OpenAI (GPT-4o), Tavily, Perplexity, Proxycurl, Notion API, Airtable, Zod, pnpm workspace
