---
title: Atlas
description: AI-powered network mapper that models founder and investor relationships as a graph — surface warm intro paths and relationship context at deal time.
date: 2025-03-15
tags: ai, graph, linkedin, rag
cover: /images/projects/atlas.png
github:
website: https://atlas-steel-three.vercel.app/
draft: false
author: Shen Nan Wong
keywords: network mapping, graph database, LinkedIn, RAG, relationship intelligence, venture capital
---

## Why I built this

VC relationship capital is locked in LinkedIn profiles, scattered email threads, and people's heads. When evaluating a deal, knowing who on the team has a warm connection to the founder — or to someone who does — can change the outcome. But surfacing that information meant asking around, checking LinkedIn manually, and hoping someone remembered. I wanted to make the team's collective network queryable.

## What it does

Atlas models the founder and investor network as a graph, with edges weighted by interaction strength. A natural-language query layer sits on top: ask "who has a connection to this founder?" and it traverses the graph, finds the shortest warm path, and summarises the relationship context. Relationship intelligence surfaces automatically at deal time instead of requiring manual research.

## How it works

- **Graph modelling** — founders, investors, and team members as nodes; interactions as weighted edges
- **LinkedIn data extraction** — Proxycurl API pulls professional network data and enriches the graph
- **Natural-language queries** — LLM converts questions into graph traversals, summarises retrieved paths with context
- **Deal-time integration** — relationship context appears when reviewing a company, not as a separate lookup

## Stack

Next.js, Proxycurl API, OpenAI, graph data modelling, RAG pipeline, Vercel
