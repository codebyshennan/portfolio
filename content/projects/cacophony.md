---
title: Cacophony
description: Multiplayer music battle game — match wild genre cards with ridiculous lyrics, and let AI generate the songs. Cards Against Humanity meets Suno AI.
date: 2024-11-01
tags: games, ai, multiplayer, hackathon
cover: /images/projects/cacophony.png
github:
website: https://cacophony-game.vercel.app/
draft: false
author: Shen Nan Wong
keywords: multiplayer music game, AI music generation, Suno AI, hackathon, Ho Chi Minh City, Cursor hackathon
---

![Cacophony game lobby](/images/projects/cacophony.png)

**2nd Place — Cursor Hackathon, Ho Chi Minh City**

## Why I built this

AI music generation got good enough that you can prompt a style and lyrics and get a listenable track back in seconds. That felt like an untapped game mechanic — what if the fun wasn't in making good music, but in making the funniest, most absurd music possible? Cards Against Humanity's format (fill in the blank with something ridiculous) mapped perfectly onto genre + lyrics prompts. The hackathon gave us a weekend to prove the concept.

## What it does

Cacophony is a party game where 3–8 players compete to create the funniest AI-generated songs. Each round, a Producer draws a vibe card ("A sad Country song about ______") and Artists play lyric cards to fill in the blank. Suno AI generates real songs from the combinations, and the Producer picks the winner.

## Game architecture

### Room system

Players create or join rooms via a 6-character code. The room state machine handles:

- **Lobby** → waiting for minimum 3 players, host can configure round count and timer duration
- **Card draw** → Producer draws a vibe card, Artists receive 7 lyric cards from their hand
- **Play phase** → 60-second timer for Artists to submit their lyric card (Supabase Realtime syncs the countdown across all clients)
- **Reveal** → cards are revealed one by one with dramatic timing
- **Judge** → Producer picks the winner, points awarded
- **Song generation** → winning combo is sent to Suno API, generated track plays for all players

### Card system

The deck was hand-written for maximum absurdity:

- **583 lyric cards** — ranging from mundane ("doing my taxes") to surreal ("a sentient toaster's existential crisis") to topical ("my startup's burn rate")
- **103 vibe cards** — genre + mood combinations: "A dramatic Opera about ______", "An aggressive Death Metal ballad about ______", "A whispered ASMR lullaby about ______"

Cards are shuffled per-room using a Fisher-Yates shuffle seeded by the room ID, ensuring consistent ordering across clients without server-side state.

### Real-time sync

Supabase Realtime channels handle all multiplayer state:

- **Presence** — who's in the room, who's connected, who's the current Producer
- **Broadcast** — card plays, timer ticks, round transitions, song playback triggers
- **Database changes** — score updates and game history persist to PostgreSQL

The 60-second round timer is server-authoritative (Supabase database function with `now()`) to prevent client-side manipulation. Clients display a countdown synced to the server timestamp.

### Song generation

The Suno API integration was the trickiest part. Suno generates a ~30-second audio clip from a text prompt in about 15-20 seconds. The flow:

1. Winning vibe + lyric combo is formatted as a Suno prompt
2. API request fires, returns a job ID
3. Client polls for completion (Suno doesn't support webhooks)
4. Once ready, the audio URL is broadcast to all players via Realtime
5. All clients play the track simultaneously with a synced start

Generation failures (Suno rate limits, content filter rejections) fall back to displaying the prompt text without audio — the comedic value is in the combination, not the music quality.

## Technical decisions

- **Supabase Realtime over Socket.io** — Supabase was already the database layer. Adding Realtime channels avoided a separate WebSocket server. The presence API handles player connectivity natively.
- **Client-side card rendering over server-side** — cards are dealt client-side from a deterministic shuffle. This means no round-trip latency on card draw and the server doesn't need to track hand state. The tradeoff is that a motivated player could inspect their deck — acceptable for a party game.
- **Suno over UDIO** — Suno's generation quality was more consistent for short comedy tracks at the time of the hackathon. UDIO had better fidelity for longer pieces but higher latency.

## Stack

React 18, TypeScript, Vite, Tailwind CSS, Supabase (PostgreSQL + Realtime + Presence), Suno API
