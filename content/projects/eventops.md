---
title: EventOps AI
description: Multi-agent planning system for large-scale event logistics — translates natural language into executable road closures, resource deployment, and multi-agency coordination.
date: 2024-12-01
tags: ai, maps, agents, hackathon
cover: /images/projects/eventops.png
github:
website:
---

## Why I built this

Event logistics for large-scale public events — marathons, parades, national day celebrations — is still coordinated through spreadsheets, radio calls, and physical maps. Planners spend weeks manually plotting resource positions and road closures. I wanted to see if an AI agent could collapse that into a conversational interface on top of a 3D map, letting a planner describe what they need in plain English and get an executable deployment plan back.

## What it does

EventOps AI turns natural language instructions into executable logistics plans for large-scale events — marathons, parades, festivals. An AI agent system processes commands like "deploy 20 marshals along the route" and places resources on a 3D map with road closures, timing, and multi-agency coordination.

## How it works

The core loop is simple: describe what you need, and the system figures out where to put things and when.

- **Agent command bar** — natural language input routed through OpenAI to a structured output schema
- **3D map** — MapLibre GL + deck.gl renders routes, zones, and resources with time-based visibility
- **Timeline scrubber** — slide through the event duration to see resource deployment phases
- **Drawing tools** — freehand or road-snap modes for routes, click-to-place for zones
- **Multi-app architecture** — Turborepo monorepo with landing, planning, ops-center, and field apps

## Stack

Next.js 16, React 19, TypeScript, MapLibre GL, react-map-gl, deck.gl, OpenAI (gpt-4o), Redis, shadcn/ui, Tailwind CSS, Turf.js
