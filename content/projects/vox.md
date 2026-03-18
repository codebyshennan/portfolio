---
title: Vox
description: AI voice agent that autonomously conducts founder interviews — fetches application data mid-call, asks contextual questions, and logs structured feedback.
date: 2025-01-15
tags: ai, voice, elevenlabs, agents
cover: /images/projects/vox.png
---

## What it does

Vox is an autonomous voice call system for conducting founder interviews at scale. An ElevenLabs voice agent calls founders via a shareable link, pulls their application data from Airtable mid-conversation to ask contextual follow-up questions, then logs the full transcript and structured feedback.

## How it works

1. A shareable call link is generated per founder
2. The frontend requests a signed ElevenLabs session
3. The voice agent starts and invokes a tool to fetch the founder's application context
4. After the call, a webhook captures the transcript and structured evaluation

The system was deployed with professional voice clones for 18 team members, handling first-call outreach and freeing the investment team for high-signal conversations.

## Stack

Next.js 16, ElevenLabs (voice agent + signed sessions), Airtable, Turso (SQLite), Cloudflared
