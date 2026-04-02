---
title: Fathom
description: AI-powered founder scoring pipeline that aggregates public signals and evaluates applicants against a structured rubric — triaging the top of the funnel at scale.
date: 2024-12-01
tags: ai, scoring, pipeline, llm
cover: /images/projects/fathom.png
github:
website:
draft: false
author: Shen Nan Wong
keywords: founder scoring, LLM evaluation, deal flow triage, AI pipeline, venture capital
---

## Why I built this

Evaluating founder quality at scale is subjective and slow. Signal is buried across pitch decks, LinkedIn profiles, news coverage, and reference calls — and different team members weight factors differently. The top of the funnel was bottlenecked by how many applications the team could manually review. I wanted a consistent, automated first pass that surfaced high-potential founders earlier.

## What it does

Fathom pulls applicants from Airtable into a managed queue, aggregates publicly available signals (LinkedIn, Crunchbase, news, pitch materials), and scores each founder against a structured rubric using an LLM evaluation pipeline. Scores are calibrated across dimensions — founder-market fit, technical depth, prior execution, and domain insight.

## How it works

- **Airtable integration** — pulls new applications into a scoring queue automatically
- **Multi-source data fusion** — aggregates LinkedIn, Crunchbase, news, and pitch deck signals per founder
- **LLM scoring pipeline** — evaluates each founder against rubric dimensions with structured output
- **Tiered evaluation** — cheaper models for initial triage, stronger models for borderline cases
- **Calibrated output** — scores are normalised across the rubric so they're comparable across candidates

The key design decision was making the scoring auditable — each dimension includes the reasoning, not just a number, so the team can validate or override the model's assessment.

## Stack

Next.js, Airtable API, OpenAI, multi-source data aggregation, structured LLM evaluation, Vercel
