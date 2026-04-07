---
title: Bearing
description: AI-powered investment memo system for Iterative — runs parallel research agents to independently verify founder claims, map the SEA competitive landscape, and produce a structured Decision Brief before drafting the full IC memo.
date: 2025-03-01
tags: ai, research, langgraph, agents
cover: /images/projects/bearing.png
github: https://github.com/codebyshennan/memo-generation
website: https://bearing-gamma.vercel.app/
draft: false
author: Shen Nan Wong
keywords: investment memo, deal research, LangGraph, AI agents, venture capital, deep research, OpenRouter, Tracxn, EnrichLayer
---

![Bearing memo generation](/images/projects/bearing.png)

## Why I built this

Writing investment memos is slow. Each one requires founder background research, competitive landscape analysis, market sizing, and synthesizing it all into a structured document — easily a full day's work per deal. With hundreds of inbound deals, the team couldn't write memos for every promising one. I built Bearing to run the research pipeline in parallel and produce both a Decision Brief and a full IC memo automatically, so the team could spend time refining analysis instead of gathering it.

## What it does

Bearing takes raw deal data and call notes from Airtable and Notion, runs three parallel research agents to independently verify founder claims, map the SEA competitive landscape, and validate the problem — then uses that grounded research to produce a **Decision Brief** (Invest / Pass / Watch recommendation with reasoning) before drafting the full 7-section memo and pushing it to Notion.

## Research agents

Three research strands run concurrently before any generation begins.

### Founder research

Fetches LinkedIn profiles via the EnrichLayer API, with a Neon DB cache (90-day TTL) to avoid redundant lookups. Cache misses fall through to Tavily web search for founders without LinkedIn data. Output is a structured profile covering career trajectory, domain expertise signals, repeat founder status, and a founder-market fit assessment.

### Competitive research

Uses a two-step approach: an LLM first generates a precise company definition to anchor the competitive query, then hits the Tracxn API for Southeast Asia competitors and Tavily for global coverage. This sequencing prevents false positives — querying Tracxn with a vague description returns noise; querying with a sharp definition returns actual comparables.

### Problem validation

Tavily searches for evidence that the problem is real: news coverage, forum discussions, incumbent solutions, and market reports. Output feeds directly into the problem evaluation framework.

## Evaluation framework

Before the memo is drafted, Bearing scores the deal against Iterative's rubric:

| Dimension | How it's scored |
|---|---|
| Problem popularity | 1–5 scale: how many people have this problem? |
| Problem acuity | 1–5 scale: how painful is it right now? |
| Evidence tier | Idea → Surveys → Signups → Active users → Paying users + retention |
| Founder spikes | Three checks: does what they say / convincing / internally motivated |
| Contrarian view | Strongest argument against investing |
| SEA fit | Does the opportunity make sense in Southeast Asia? |
| Rejection reasons | Scan against top 5 historical rejection patterns |

The problem quadrant (popularity × acuity) sits at the centre of the evaluation — Iterative's thesis is that most failed startups die on a problem nobody cares about, not a bad product.

## Decision Brief

Claude Sonnet 4.6 with extended thinking (8,000-token budget) reads the full research context and evaluation scores, then produces the Decision Brief: an Invest / Pass / Watch recommendation with a structured rationale covering the bull case, bear case, and the single biggest risk. The thinking budget is intentional — the brief needs to work through contradictions in the research (founder claims vs. competitive data, evidence tier vs. founder confidence) before committing to a recommendation.

## Memo generation

The Decision Brief and research outputs feed into the memo generator, which maps content to a 7-section template:

| Section | Source |
|---|---|
| Company Overview | Airtable deal record |
| Decision Brief | Claude Sonnet 4.6 with thinking |
| Investment Thesis | LLM synthesis from research agents |
| Market Analysis | Market sizing agent (LangGraph) |
| Competitive Landscape | Tracxn + Tavily research agent |
| Founder Assessment | EnrichLayer + Tavily founder agent |
| Risk Analysis | LLM from evaluation framework |

Each section is generated with Claude Sonnet 4.6 using structured output via Zod schemas to enforce consistent formatting. The final memo is pushed to Notion, fully formatted with headers, tables, and callout blocks.

## LLM routing

All models are accessed through OpenRouter, with specific models chosen per task:

| Task | Model |
|---|---|
| Company definition | Gemini 2.5 Flash-Lite |
| Founder profile synthesis | Gemini 2.5 Flash |
| Decision Brief | Claude Sonnet 4.6 (thinking, 8k budget) |
| Memo sections | Claude Sonnet 4.6 |

Gemini Flash-Lite handles cheap, fast classification tasks. Full Flash handles synthesis with long context. Claude with thinking handles the single high-stakes inference step where reasoning quality matters most.

## Architecture

```
Airtable / Notion (deal data)
        │
        ▼
  Research agents (parallel)
  ├─ Founder: EnrichLayer → Neon cache → Tavily fallback
  ├─ Competitive: LLM definition → Tracxn (SEA) + Tavily (global)
  └─ Problem validation: Tavily
        │
        ▼
  Evaluation framework (rubric scoring)
        │
        ▼
  Decision Brief (Claude Sonnet 4.6 with thinking)
        │
        ▼
  Memo generation (Claude Sonnet 4.6, 7 sections)
        │
        ▼
  Notion (formatted memo)
```

Market sizing runs as a separate LangGraph agent with TAM/SAM/SOM analysis (top-down + bottom-up + triangulation). The backend is a Hono server on Node.js. The Next.js frontend provides a queue UI where the team can trigger memo generation per deal, monitor pipeline progress, and review drafts before they land in Notion.

## Technical decisions

- **Decision Brief before memo generation** — generating the full memo without a prior recommendation produces meandering analysis. The brief forces the model to commit to a position first; the memo sections then defend and elaborate that position rather than hedge in every direction.
- **Claude with thinking for the brief only** — extended thinking is expensive and slow. It's used exactly once per deal, on the step where contradictory evidence needs to be weighed and a binary recommendation produced. Every other generation step uses standard inference.
- **EnrichLayer over Proxycurl** — EnrichLayer's API returns richer career data at lower cost for the volume Bearing processes. The Neon DB cache further reduces spend — most repeat founders show up in multiple deals, so the 90-day TTL pays off quickly.
- **Tracxn over Crunchbase for SEA** — Tracxn has deeper coverage of Southeast Asian startups, which is Iterative's investment geography. Crunchbase is US-centric; using it for SEA competitive analysis returns gaps and false negatives.
- **LangGraph scoped to market sizing** — the market sizing agent needs conditional branching (narrow/expand search, top-down vs. bottom-up reconciliation). LangGraph's graph execution handles this cleanly. The other research agents are simple sequential pipelines that don't benefit from graph orchestration.

## Stack

Hono (Node.js backend), Next.js (frontend), LangGraph (market sizing agent), OpenRouter (Gemini 2.5 Flash-Lite, Gemini 2.5 Flash, Claude Sonnet 4.6), EnrichLayer, Tracxn, Tavily, Neon DB (founder cache), Notion API, Airtable, Zod
