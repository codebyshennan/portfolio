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

<!-- TODO: Add screenshot/video of Atlas — show the network graph visualization and a natural-language query returning warm intro paths -->

## Why I built this

VC relationship capital is locked in LinkedIn profiles, scattered email threads, and people's heads. When evaluating a deal, knowing who on the team has a warm connection to the founder — or to someone who does — can change the outcome. But surfacing that information meant asking around, checking LinkedIn manually, and hoping someone remembered. I wanted to make the team's collective network queryable.

## What it does

Atlas models the founder and investor network as a graph, with edges weighted by interaction strength. A natural-language query layer sits on top: ask "who has a connection to this founder?" and it traverses the graph, finds the shortest warm path, and summarises the relationship context.

## Data pipeline

### LinkedIn ingestion

Proxycurl API pulls structured profile data — work history, education, connections, shared groups. Each profile becomes a node; shared experiences (same company, same university, co-investors) become edges. The pipeline runs nightly against a watchlist of ~2,000 profiles, with incremental updates for new connections.

### Graph construction

The graph uses an adjacency list stored in Supabase PostgreSQL with recursive CTE queries for path traversal. Each edge carries:

- **Weight** — interaction strength (co-invested > same company > same university > shared connection)
- **Recency** — exponential decay based on last interaction date
- **Context** — free-text description of the relationship ("co-invested in Series A of Company X")

### Query layer

Natural-language queries are converted to graph operations via an LLM:

1. **Entity resolution** — "the founder of Acme" → resolve to a specific node via fuzzy name matching + company association
2. **Path search** — BFS/Dijkstra on weighted edges to find the shortest warm path from any team member to the target
3. **Context synthesis** — the LLM summarises the path in natural language: "You → Sarah (co-invested in Fund II deal) → Mark (Stanford MBA '18) → Target Founder"

### Hybrid search

Not every query is a graph traversal. "Find all founders in fintech who previously worked at Stripe" is a filter query. Atlas uses a hybrid approach: SQL filters narrow the candidate set, then vector similarity (pgvector) ranks by semantic relevance. The query planner decides which path to take based on the query structure.

## Technical decisions

- **PostgreSQL over Neo4j** — the graph fits in ~50K nodes. Recursive CTEs handle path queries well enough, and keeping everything in one database (Supabase) avoids the operational overhead of a dedicated graph DB.
- **Proxycurl over direct scraping** — LinkedIn rate-limits aggressively. Proxycurl provides a clean API with structured output and handles the scraping infrastructure. The cost (~$0.01/profile) is negligible at our scale.
- **Nightly batch over real-time sync** — network relationships don't change by the hour. A nightly job keeps data fresh enough for deal-time lookups without the complexity of real-time event processing.

## Stack

Next.js 15, React 19, Supabase (PostgreSQL + pgvector), Proxycurl API, OpenAI (embeddings + chat), Tailwind CSS, Vercel
