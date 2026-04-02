---
title: Vox
description: AI voice agent that autonomously conducts founder interviews — fetches application data mid-call, asks contextual questions, and logs structured feedback.
date: 2025-01-15
tags: ai, voice, elevenlabs, agents
cover: /images/projects/vox.png
github: https://github.com/codebyshennan/pilot
website: https://pilot-delta-two.vercel.app/admin
draft: false
author: Shen Nan Wong
keywords: AI voice agent, founder interviews, ElevenLabs, venture capital, autonomous agents
---

<!-- TODO: Add screenshot/video of Vox — show the admin panel with interview queue, a call in progress, and a structured evaluation report -->

## Why I built this

The investment team was spending hours on introductory calls with founders — calls that mostly followed the same script. The high-value work was in the follow-up conversations, not the initial screen. I built Vox to handle the first call autonomously: pull the founder's application data, ask contextual questions, and log a structured evaluation. This freed the team to focus on the founders who made it past the initial filter.

## What it does

Vox is an autonomous voice call system for conducting founder interviews at scale. An ElevenLabs voice agent calls founders via a shareable link, pulls their application data from Airtable mid-conversation to ask contextual follow-up questions, then logs the full transcript and structured feedback.

## Voice pipeline

### Call initiation

Each founder gets a unique shareable link. When they click it, the frontend requests a signed ElevenLabs session with a specific agent configuration — voice, persona, interview rubric, and the founder's application ID. The signed session ensures the agent has the right context before the conversation starts.

### Mid-call tool use

The voice agent has access to tools via ElevenLabs' function calling:

- **`fetch_application`** — pulls the founder's Airtable record (company, sector, stage, metrics) and injects it as context mid-conversation
- **`log_observation`** — records real-time observations during the call (e.g., "founder hesitated on unit economics question") for later scoring

This means the agent adapts its questions based on what it learns. If the founder's application says "B2B SaaS" but they mention pivoting to consumer, the agent picks up on the discrepancy and probes.

### Structured evaluation

After the call, a webhook fires with the full transcript. GPT-4o processes the transcript against a structured rubric:

| Dimension | What it evaluates |
|---|---|
| Communication clarity | Can the founder explain their business clearly? |
| Market understanding | Depth of knowledge about their market and customers |
| Technical depth | Ability to discuss product architecture and technical decisions |
| Team dynamics | How they talk about co-founders, hiring, and delegation |
| Thesis fit | Alignment with the fund's investment criteria |

Each dimension gets a 1-5 score with reasoning. Scores are validated against a Zod schema before writing to Turso — if the LLM hallucinates a score outside the valid range or invents a dimension, the validation layer catches it.

### Voice cloning

The system was deployed with professional voice clones for 18 team members. Founders hear a familiar voice that matches the partner they'll eventually meet — reducing the uncanny valley effect and making the autonomous call feel like a real conversation.

## Admin dashboard

The admin panel (Next.js) provides:

- **Interview queue** — pending, in-progress, and completed calls with status tracking
- **Evaluation viewer** — structured scores per dimension with expandable reasoning
- **Transcript browser** — full conversation with timestamp markers and agent observations
- **Analytics** — completion rates, average call duration, score distributions across the funnel

## Technical decisions

- **ElevenLabs over Bland/Vapi** — ElevenLabs' conversational AI has the lowest latency (~500ms turn-taking) and the most natural voice quality. The function calling API is clean and supports mid-conversation tool invocation.
- **Zod validation over trust-the-model** — GPT-4o with structured output is reliable ~95% of the time. But 5% hallucination on scoring data that influences investment decisions is unacceptable. Zod catches it before persistence.
- **Turso over Supabase** — Turso (libSQL) gives SQLite semantics with edge replication. For a write-light, read-heavy workload (few writes per call, many reads from the dashboard), it's simpler and cheaper than PostgreSQL.
- **Cloudflared for tunneling** — ElevenLabs webhooks need a public endpoint during development. Cloudflared provides a stable tunnel without ngrok's session limits.

## Stack

Next.js 16, ElevenLabs (voice agent + signed sessions + function calling), OpenAI (GPT-4o), Airtable, Turso (libSQL), Zod, Cloudflared, Vercel
