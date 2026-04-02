---
title: Hive
description: Slack workspace archiver with an AI pipeline that classifies conversations and synthesizes them into a searchable knowledge base.
date: 2025-02-01
tags: ai, slack, knowledge-base, search
cover: /images/projects/hive.png
github: https://github.com/codebyshennan/slack-backup
website:
draft: false
author: Shen Nan Wong
keywords: Slack archiver, AI pipeline, knowledge base, search, venture capital, investment research
---

<!-- TODO: Add screenshot/video of Hive — show the message browser, semantic search results, and a synthesized article -->

## Why I built this

Years of investment discussions, market takes, and founder evaluations were buried across hundreds of Slack channels. When someone asked "what did we think about X sector last year?" the answer existed somewhere in the archive — but finding it meant scrolling through months of threads. I wanted to turn that messy conversational history into a structured, searchable knowledge base that the team could actually use.

## What it does

Hive archives entire Slack workspaces — messages, files, threads — and runs an AI classification pipeline to synthesize conversations into a searchable knowledge base. Originally built to create a "Founder Bible" from years of Slack history across an investment team.

## Archival pipeline

### Incremental Slack sync

A cron job runs every 6 hours, pulling messages via `conversations.history` and `conversations.replies`. The sync is incremental — each channel tracks a `latest_ts` cursor, so only new messages are fetched. Files and attachments are downloaded to Google Cloud Storage with signed URLs for authenticated access.

The sync handles Slack API rate limits (tier 3, ~50 req/min) with exponential backoff and respects pagination cursors for channels with high message volume. A full initial backfill of ~200 channels and 3 years of history took ~4 hours.

### Message storage

Messages land in Supabase PostgreSQL with full metadata: channel, thread parent, author, timestamps, reactions, file attachments. Thread structure is preserved — replies link to their parent message, so the full conversation context is always available.

### Vector embeddings

Every message is embedded via OpenAI's `text-embedding-3-small` and stored in pgvector. The embedding includes thread context — a reply is embedded as `[parent message] | [reply]` so semantic search captures the conversational meaning, not just the isolated message.

## AI classification pipeline

### Two-stage model approach

1. **Tagger** (cheap model) — classifies each thread into topics: `fundraising`, `market-analysis`, `founder-advice`, `hiring`, `product-strategy`, etc. Runs on GPT-4o-mini at ~$0.002/thread.
2. **Synthesizer** (strong model) — takes all threads in a topic cluster and produces a structured article: title, summary, key takeaways, source thread links. Runs on Gemini 2.5 Pro via OpenRouter for cost efficiency on long-context synthesis.

This two-stage approach keeps costs manageable — tagging ~10K threads costs ~$20, while synthesis runs only on curated clusters.

### Article publishing

Synthesized articles go through an admin review queue before publishing. The admin dashboard shows draft articles with source thread links for verification. Published articles are full-text indexed and appear in search alongside raw messages.

## Search

Search supports three modes:

- **Semantic** — vector similarity search across embeddings, returns messages ranked by meaning
- **Keyword** — full-text PostgreSQL search with `ts_vector` for exact phrase matching
- **Hybrid** — combines both with reciprocal rank fusion, weighted toward semantic by default

Results link directly back to the original Slack thread so users can read the full context without Hive having to reproduce it.

## Technical decisions

- **Supabase over Pinecone** — pgvector handles ~50K message vectors without breaking a sweat, and keeping vectors in the same database as metadata means one connection, one backup, one bill.
- **GCS over S3** — the team was already on Google Workspace, so GCS fit naturally. Signed URLs with configurable expiry handle authenticated file access without a separate auth layer.
- **OpenRouter for synthesis** — Gemini 2.5 Pro has a 1M token context window, which matters when synthesizing dozens of related threads. OpenRouter provides a unified API across model providers with usage-based billing.

## Stack

Next.js 15, React 19, Tailwind CSS, shadcn/ui, Supabase (PostgreSQL + pgvector), Google Cloud Storage, OpenAI (embeddings), OpenRouter (Gemini 2.5 Pro), node-cron, Google OAuth
