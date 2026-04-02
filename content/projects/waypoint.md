---
title: Waypoint
description: Pipeline metrics dashboard that tracks deal stage conversion, velocity, and SLA breaches — giving the investment team a single screen for pipeline health.
date: 2025-02-15
tags: dashboard, data, metrics, airtable
cover: /images/projects/waypoint.png
github:
website: https://waypoint-phi-six.vercel.app/
draft: false
author: Shen Nan Wong
keywords: pipeline dashboard, SLA tracking, deal velocity, metrics, Airtable, venture capital
---

## Why I built this

The team reviewed the pipeline weekly but had no single view of how deals were moving. Stage conversion rates, time-in-stage, and SLA breaches were scattered across Airtable views and spreadsheets. The question at every meeting was the same: "which deals need attention right now?" I built Waypoint to answer that question in a 30-second glance.

## What it does

Waypoint tracks where every application stands in the investment pipeline. It shows stage-by-stage conversion rates, deal velocity metrics, and SLA flags — so the team knows how fast deals are moving and where bottlenecks form. Deals breaching their stage SLA get flagged immediately.

## How it works

- **Airtable sync** — pulls application data and stage transitions in real time
- **Stage conversion** — visualises how many deals move between each pipeline stage
- **Velocity tracking** — measures time-in-stage per deal and flags outliers
- **SLA monitoring** — binary flags when a deal exceeds its expected stage duration
- **Stripped-back UI** — started with 12 widgets, cut to 3 after watching what the team actually referenced in meetings

The key design decision was making SLA breaches the primary alert mechanism rather than color-coding every metric on a gradient. Binary: this deal needs attention or it doesn't.

## Stack

Next.js, Airtable API, time-series data modelling, Vercel
