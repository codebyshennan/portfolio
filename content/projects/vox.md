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

![Vox call queue](/images/projects/vox.png)

## Why I built this

We'd been running founder interviews through Persona Studios — a no-code voice agent platform built by one of our portfolio companies. It worked well enough for the validation program: structured agenda flow, Airtable sync, voice cloning of the GP. But the platform's ceiling was visible. Prompting control was limited, LLM selection was locked, telephony wasn't supported, and every customization required going through the platform's UI.

The investment team needed something that could handle first calls at scale, adapt questions based on what the founder said mid-conversation, and produce structured evaluation scores that fed directly into the decision pipeline. I rebuilt it from scratch on ElevenLabs with full control over the prompting, rubric, and integrations.

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

After the call, a webhook fires with the full transcript. GPT-4o processes the transcript against Iterative's evaluation rubric — the same criteria the investment team uses manually.

**Green flags** (each scored 1–3, weighted by importance):

| Flag | Weight | What it looks for |
|---|---|---|
| VC-Backable Ambition | ×3 | Intent to build to $50–100M revenue in 7–10 years, self-initiated |
| Resilience & Coachability | ×3 | Specific, emotionally authentic instance of persistence or feedback acceptance |
| Strong Internal Motivation | ×2 | Deep personal connection to the problem, not surface-level interest |
| Ingenuity at Hacking Systems | ×2 | Concrete example of a rule-breaking but clever workaround |
| Clarity of Hypothesis | ×2 | Precise, testable assumption with a realistic 2-month validation plan |
| Unique Insight | ×1 | Counterintuitive understanding grounded in real user conversations |

Total possible: 39 points. Every score requires a direct transcript quote as justification — the rubric instructs maximal cynicism, defaulting to the lowest plausible score without clear evidence.

**Red flags** are binary checks: founder already past validation stage ($1k+ MRR), non-tech business, or ethical/attitude issues in the conversation.

Scores are validated against a Zod schema before writing to Turso — if the LLM hallucinates a score outside the valid range or invents a dimension, the validation layer catches it.

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
