---
title: Compass
description: Slack workspace archiver and AI knowledge platform — preserves institutional knowledge from Iterative's founder community, classifies conversations into a searchable Founder Bible, and answers questions with inline citations.
date: 2025-02-01
tags: ai, slack, knowledge-base, search
cover: /images/projects/compass.png
github: https://github.com/codebyshennan/slack-backup
website:
draft: false
author: Shen Nan Wong
keywords: Slack archiver, AI pipeline, knowledge base, RAG, venture capital, founder community, pgvector
---

## Why I built this

Years of investment discussions, founder advice, and market takes were buried across hundreds of Slack channels. When someone asked "what did the community think about hiring in SEA last year?" the answer existed somewhere in the archive — but finding it meant scrolling through months of threads. I wanted to turn that messy conversational history into a structured, searchable knowledge base and eventually close the loop: when a founder posts a new question, the system should be able to answer it from what the community already knows.

## What it does

Compass archives entire Slack workspaces — messages, threads, files — and runs an AI pipeline that classifies conversations into a searchable Founder Bible, surfaces knowledge gaps, and answers questions with inline citations drawn from the real archive. It also watches for new Slack messages and can reply automatically, grounded only in what the community has actually said.

## Archival pipeline

### Incremental Slack sync

A node-cron scheduler fires a 5-step pipeline: users → channels → messages + files → finalize → embed. The sync is incremental — each channel tracks a `latest_ts` cursor so only new messages are fetched each run. A full initial backfill of years of history runs as a fire-and-forget background job.

The pipeline handles Slack API rate limits with exponential backoff and respects pagination cursors for high-volume channels.

### Message storage

Messages land in Neon PostgreSQL with full metadata: channel, thread parent, author, timestamps, reactions, reply count, file attachments. Thread structure is preserved — replies link to their parent message so full conversation context is always available.

### Embeddings

Every message is embedded using `text-embedding-3-small` (1536 dimensions) and stored as a `vector(1536)` pgvector column on the messages table. The embedding includes thread context — a reply is embedded as `[parent message] | [reply]` so semantic search captures conversational meaning, not isolated messages. Embeddings are processed in batches of 500, with a separate backup run of 2,000 per job for catchup on backfill.

## Founder Bible pipeline

### Phase 1 — Classify

`deepseek/deepseek-chat` (via OpenRouter) processes threads and organically discovers topic categories — it doesn't map to a predefined taxonomy. For each thread cluster it extracts advice nuggets with attributions: who said what, in what context. This keeps the classification grounded in the actual discourse rather than forcing threads into pre-baked categories.

### Phase 2 — Synthesize

`google/gemini-2.5-pro` (via OpenRouter) takes the classified thread clusters and generates polished markdown articles: title, summary, key takeaways, and links to source threads. Gemini's 1M context window matters here — synthesizing dozens of related threads in a single pass produces more coherent articles than chunking.

Synthesized articles go through a staff review queue before publishing. The admin dashboard shows drafts with source thread links for verification. Published articles are full-text indexed and appear in search alongside raw messages.

## Ask Panel

A streaming SSE endpoint that answers natural language questions over the archive.

### Search

Every query runs dual search in parallel:

- **Keyword FTS** — PostgreSQL `ts_vector` for exact phrase matching
- **Semantic** — pgvector similarity search across message embeddings

Results from both paths are merged and deduplicated before being passed to the LLM. Natural language filter parsing handles channel mentions (`in #hiring`) and date ranges (`since last quarter`) before search runs, so queries are pre-scoped to the right slice of the archive.

### Generation

`gpt-4.1` reads the merged search results and generates an answer with inline citations `[1][2]` — every claim is traceable to a specific message. The tool loop runs three tools:

| Tool | Purpose |
|---|---|
| `searchSlackHistory` | Executes the dual FTS + vector search |
| `detectQueryFilters` | Parses channel/date constraints from natural language |
| `suggestFollowUps` | Generates 2-3 follow-up questions based on the answer |

## Auto-Reply

Watches for new Slack messages and closes the loop on questions the community has already answered.

Three-stage pipeline per new message:

1. **Classify** (`claude-haiku` via OpenRouter) — binary: is this a question worth answering? Cheap and fast, runs on every new message.
2. **Retrieve** — if yes, runs the full Ask pipeline to find an answer from the archive.
3. **Post** — three modes: `auto` (post immediately), `draft` (route to staff review queue), `off`.

Auto-reply only cites real archived messages. If the archive doesn't contain a credible answer, it doesn't reply.

## Community Bot

Separate from Auto-Reply, the Community Bot proactively surfaces relevant archived knowledge when it detects a question.

Three gates before replying:

1. **Question detection** — does the message contain a question?
2. **Relevance** — pgvector similarity check: are there archived messages with high enough similarity to be useful?
3. **Age** — skip if the closest sources are too recent (avoids citing last week's speculation as settled wisdom).

The bot only cites actual archived messages — never LLM-generated content. Grounding is structural, not optional.

## Digest and Knowledge Gaps

**Digest**: weekly admin-generated summaries with top threads by reply count and unanswered questions surfaced for team review.

**Knowledge Gaps**: surfaces messages that contain `?` and have `reply_count = 0` — questions the community posted but nobody answered. Also identifies topics with low article coverage relative to message volume, so gaps in the Founder Bible are visible.

## Platform portability

The entire intelligence layer — Bible pipeline, Ask Panel, Auto-Reply, Community Bot — operates on DB rows only. The only Slack-specific code is `lib/api/slack/api.ts`, which implements six methods: fetch users, fetch channels, fetch messages, fetch replies, post message, upload file. Replacing that file ports Compass to Discord or Telegram.

## Technical decisions

- **DeepSeek for classification, Gemini for synthesis** — classification is a cheap, high-volume step where organic category discovery matters more than reasoning depth. Synthesis is a low-volume step where long context and coherent writing quality matter. The model split matches the task shape.
- **Dual search with deduplication** — FTS catches exact terms that embeddings miss (product names, specific numbers). Semantic search catches paraphrases and conceptual matches that FTS misses. Running both and deduplicating outperforms either alone on recall, which matters when the archive is the only source of truth.
- **pgvector in Neon over a dedicated vector DB** — keeping vectors co-located with message metadata means joined queries (filter by channel + semantic rank) run in a single DB round-trip. A separate vector DB would require fetching candidate IDs, then querying Neon for metadata — two hops on every search.
- **Claude Haiku for Auto-Reply classification** — the question-detection step runs on every new Slack message. At that volume, using a larger model would dominate cost. Haiku is accurate enough for binary intent classification and runs in under 200ms.
- **DB-row-only intelligence** — the portability constraint was set early. Any feature that wrote Slack-specific assumptions into the pipeline logic would have made Discord/Telegram porting a rewrite. Keeping all features DB-row-only meant adding channel and platform columns to the messages table and nothing else.

## Stack

Next.js, Hono (Node.js backend), Neon (PostgreSQL + pgvector), OpenRouter (deepseek/deepseek-chat, google/gemini-2.5-pro, claude-haiku), OpenAI (gpt-4.1, text-embedding-3-small), node-cron, Slack API, Zod, shadcn/ui, Tailwind CSS
