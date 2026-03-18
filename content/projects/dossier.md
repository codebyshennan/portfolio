---
title: Dossier
description: Turns raw deal data and call notes into IC-ready investment memos through a deep research pipeline — founder background, competitive landscape, market sizing.
date: 2025-03-01
tags: ai, research, langgraph, agents
cover: /images/projects/dossier.png
---

## What it does

Dossier takes raw deal data and call notes and produces structured, IC-ready investment memos. A deep research pipeline runs in parallel — founder background, competitive landscape, market sizing — then synthesizes everything into a 9-section memo and pushes it to Notion.

## Research pipeline

Before memo generation, four research strands run concurrently:

- **Founder research** — LinkedIn background, prior companies, domain expertise
- **Competitive research** — market players, positioning, differentiation signals
- **Market sizing** — LangGraph multi-step agent using Tavily + Perplexity + LLM synthesis
- **Synthesis** — strands merged into a thesis draft with a contrarian take, fed to the memo generator

## Memo structure

| Section | Method |
|---|---|
| Overview | Template |
| Investment Thesis | LLM |
| Memo Opinion | LLM |
| Market Analysis | LLM + LangGraph agents |
| Company Details | Template |
| Risk Analysis | LLM |
| Competitive Advantage | LLM |
| Financial Analysis | Template |
| Technical Evaluation | LLM |

## Stack

Hono (Node.js backend), Next.js (frontend), OpenAI, LangGraph, Tavily, Perplexity, Notion API, Airtable, pnpm workspace
