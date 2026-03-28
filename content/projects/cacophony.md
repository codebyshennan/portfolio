---
title: Cacophony
description: Multiplayer music battle game — match wild genre cards with ridiculous lyrics, and let AI generate the songs. Cards Against Humanity meets Suno AI.
date: 2024-11-01
tags: games, ai, multiplayer, hackathon
cover: /images/projects/cacophony.png
github:
website:
author: Shen Nan Wong
keywords: multiplayer music game, AI music generation, Suno AI, hackathon, Ho Chi Minh City, Cursor hackathon
---

**2nd Place — Cursor Hackathon, Ho Chi Minh City**

## Why I built this

AI music generation got good enough that you can prompt a style and lyrics and get a listenable track back in seconds. That felt like an untapped game mechanic — what if the fun wasn't in making good music, but in making the funniest, most absurd music possible? Cards Against Humanity's format (fill in the blank with something ridiculous) mapped perfectly onto genre + lyrics prompts. The hackathon gave us a weekend to prove the concept.

## What it does

Cacophony is a party game where 3–8 players compete to create the funniest AI-generated songs. Each round, a Producer draws a vibe card ("A sad Country song about ______") and Artists play lyric cards to fill in the blank. Suno AI generates real songs from the combinations, and the Producer picks the winner.

## How it works

- **Room system** — host creates a room, shares a 6-character code, players join
- **Card decks** — 583 lyric cards and 103 vibe cards, pre-written for maximum absurdity
- **AI song generation** — winning combinations get turned into actual songs via Suno API
- **Real-time sync** — Supabase Realtime keeps all players in lockstep with 60-second timed rounds
- **Score tracking** — points accumulate across rounds, configurable game length

## Stack

React 18, TypeScript, Vite, Tailwind CSS, Supabase (PostgreSQL + Realtime), Suno API
