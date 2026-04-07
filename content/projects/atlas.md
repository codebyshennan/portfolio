---
title: Atlas
description: AI-powered network mapper that models founder and investor relationships as a graph — surface warm intro paths and relationship context at deal time.
date: 2025-03-15
tags: ai, graph, linkedin, rag
cover: /images/projects/atlas.png
github: https://github.com/codebyshennan/smart-network
website: https://atlas-steel-three.vercel.app/
draft: false
author: Shen Nan Wong
keywords: network mapping, graph database, LinkedIn, RAG, relationship intelligence, venture capital
---

![Atlas network search](/images/projects/atlas.png)

## Why I built this

VC relationship capital is locked in LinkedIn profiles, scattered email threads, and people's heads. When evaluating a deal, knowing who on the team has a warm connection to the founder — or to someone who does — can change the outcome. But surfacing that information meant asking around, checking LinkedIn manually, and hoping someone remembered. I wanted to make the team's collective network queryable.

## What it does

Atlas models the founder and investor network as a graph, with edges weighted by interaction strength. A natural-language query layer sits on top: ask "who has a connection to this founder?" and it traverses the graph, finds the shortest warm path, and summarises the relationship context.

![Atlas architecture](/images/projects/atlas-arch.svg)

## Data pipeline

### LinkedIn ingestion

LinkedIn profile data is batch-imported as structured JSON — work history, education, connections, shared groups. Each profile becomes a node; shared experiences (same company, same university, co-investors) become edges. The pipeline runs nightly against a watchlist of ~2,000 profiles, with incremental updates for new connections.

### Data model

The graph is stored in Supabase PostgreSQL with two normalized tables built on top of the raw `profiles` data:

- **`expert_companies`** — normalized from `profiles.experiences` JSONB into an indexed relational table, enabling fast company-based lookups without scanning unstructured JSON
- **`expert_connections`** — materialized relationship graph between experts, making multi-hop path queries feasible without repeated JOIN chains

Each edge in the connection graph carries:

- **Weight** — interaction strength (co-invested > same company > same university > shared connection)
- **Recency** — exponential decay based on last interaction date
- **Context** — free-text description of the relationship ("co-invested in Series A of Company X")

Indexes: IVFFlat for pgvector similarity search, B-tree on company/name columns for point lookups. An in-memory schema cache (1-hour TTL) eliminates 200–500ms of repeated DB introspection on every search.

### Query pipeline

Natural-language queries run through a multi-step pipeline:

1. **Query classification** — extracts `locationTerms` alongside a semantic weight (0–50%) using gpt-4.1-nano or Groq llama-3.3-70b interchangeably via OpenRouter. SQL generation and classification run in parallel to cut latency.
2. **Hybrid search** — SQL filters with hard geographic constraints narrow the candidate set, then pgvector similarity search ranks by semantic relevance
3. **LLM reranker** — a final LLM pass re-ranks hybrid results with geographic hard constraints applied, improving precision on location-qualified queries like "find fintech founders based in Singapore"
4. **Context synthesis** — summarises the relationship path in natural language: "You → Sarah (co-invested in Fund II deal) → Mark (Stanford MBA '18) → Target Founder"

### Network visualization

Expert profiles have a Connections tab showing known connections grouped by relationship type, alongside an interactive force-directed network graph (react-force-graph-2d). The graph renders live on click — useful for visually tracing multi-hop paths before committing to an outreach sequence.

## Technical decisions

- **PostgreSQL over Neo4j** — the graph fits in ~50K nodes. Recursive CTEs handle path queries well enough, and keeping everything in one database (Supabase) avoids the operational overhead of a dedicated graph DB.
- **OpenRouter for model flexibility** — query classification and reranking switch between gpt-4.1-nano (OpenAI) and llama-3.3-70b (Groq) depending on load and latency. OpenRouter's unified API makes this a config change, not a code change.
- **Nightly batch over real-time sync** — network relationships don't change by the hour. A nightly job keeps data fresh enough for deal-time lookups without the complexity of real-time event processing.
- **Materialized connection table over runtime joins** — computing the relationship graph at query time across thousands of profiles is too slow for interactive search. Pre-materializing the `expert_connections` table trades storage for sub-100ms path lookups.

## Stack

Next.js 15, React 19, Supabase (PostgreSQL + pgvector), OpenRouter (gpt-4.1-nano, Groq llama-3.3-70b), OpenAI (embeddings), react-force-graph-2d, Tailwind CSS, Vercel
