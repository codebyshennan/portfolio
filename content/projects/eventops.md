---
title: Cordon
description: Multi-agent planning system for large-scale event logistics — translates natural language into executable road closures, resource deployment, and multi-agency coordination.
date: 2024-12-01
tags: ai, maps, agents, hackathon
cover: /images/projects/cordon.png
github: https://github.com/codebyshennan/eventops
website: https://eventops-planning.vercel.app/
draft: false
author: Shen Nan Wong
keywords: multi-agent AI, event logistics, road closures, natural language planning, maps, 3D visualization
---

<!-- TODO: Add screenshot/video of Cordon — show the 3D map with road closures, the agent command bar processing a natural language request, and the timeline scrubber -->

## Why I built this

Event logistics for large-scale public events — marathons, parades, national day celebrations — is still coordinated through spreadsheets, radio calls, and physical maps. Planners spend weeks manually plotting resource positions and road closures. I wanted to see if an AI agent could collapse that into a conversational interface on top of a 3D map, letting a planner describe what they need in plain English and get an executable deployment plan back.

## What it does

Cordon turns natural language instructions into executable logistics plans for large-scale events — marathons, parades, festivals. An AI agent system processes commands like "deploy 20 marshals along the route" and places resources on a 3D map with road closures, timing, and multi-agency coordination.

## Agent system

### Command processing

The agent command bar accepts natural language input and routes it through GPT-4o with structured output:

```
"Close Orchard Road from 6am to 2pm and deploy 15 marshals at intersections"
```

This produces a structured plan:

```json
{
  "roadClosures": [{ "road": "Orchard Road", "start": "06:00", "end": "14:00" }],
  "resources": [
    { "type": "marshal", "count": 15, "placement": "intersections", "road": "Orchard Road" }
  ]
}
```

The structured output uses a Zod schema that maps directly to map operations — each action type (road closure, resource placement, zone creation) has a typed schema that the rendering layer consumes.

### Spatial reasoning

Resource placement isn't just "put 15 dots on a road." The agent uses Turf.js for spatial operations:

- **Along-route distribution** — `turf.along()` spaces resources evenly along a road segment
- **Intersection detection** — `turf.intersect()` finds where roads cross for marshal placement
- **Zone buffering** — `turf.buffer()` creates exclusion zones around sensitive areas
- **Route snapping** — user-drawn freehand lines snap to the nearest road geometry via the route's GeoJSON

### Multi-agency coordination

Large events involve police, ambulance, traffic authority, and event organizers — each with different resource types and visibility requirements. Cordon models this with layered permissions:

- Each agency sees only their resources by default
- A coordinator view shows everything
- Resource conflicts (two agencies assigned to the same intersection) are flagged automatically

## 3D map rendering

### MapLibre GL + deck.gl

The map uses MapLibre GL for the base layer and deck.gl for 3D visualization:

- **Road closures** — rendered as extruded polygons with color-coded severity (full closure = red, partial = amber)
- **Resources** — 3D icons with agency-specific colors and count labels
- **Zones** — semi-transparent polygons for restricted areas, medical stations, spectator zones
- **Routes** — the event route rendered as an animated line with direction indicators

### Timeline scrubber

The timeline scrubber is the key UX innovation. Sliding through the event duration shows how the deployment changes over time:

- 4:00 AM — road closures activate, barriers deployed
- 5:30 AM — marshals and medical teams arrive at positions
- 6:00 AM — event starts, all resources active
- 2:00 PM — event ends, resources withdraw in reverse order

Each resource and closure has a `start_time` and `end_time`, and the scrubber filters the map layers based on the current time position.

## Multi-app architecture

The project is structured as a Turborepo monorepo with four apps:

| App | Purpose |
|---|---|
| **Landing** | Marketing page with feature overview and demo |
| **Planning** | The main planning interface — map, command bar, timeline |
| **Ops Center** | Real-time monitoring during the event — live resource positions, incident tracking |
| **Field** | Mobile-optimized view for on-ground personnel — shows their assigned position and nearby resources |

Shared packages include the map renderer, the agent interface, and the resource type definitions.

## Technical decisions

- **MapLibre over Mapbox** — MapLibre is open-source and self-hostable. For a project that may need to run on government infrastructure, avoiding a commercial tile service dependency matters.
- **deck.gl over MapLibre native layers** — deck.gl handles 3D extrusion, icon clustering, and animated transitions natively. MapLibre's built-in layers are 2D-only for custom geometries.
- **Turborepo over Nx** — four apps with shared packages is Turborepo's sweet spot. Nx is more powerful but the setup overhead wasn't justified for a hackathon-origin project.
- **Redis for real-time state** — during a live event, resource positions update frequently. Redis pub/sub streams position updates to the ops center and field apps without polling.

## Stack

Next.js 16, React 19, TypeScript, MapLibre GL, react-map-gl, deck.gl, OpenAI (GPT-4o, structured output), Redis, Turf.js, Turborepo, shadcn/ui, Tailwind CSS
