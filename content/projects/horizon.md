---
title: Horizon
description: Operational health dashboard that monitors DNS, SSL, email deliverability, and third-party services — with Slack alerts when anything breaks.
date: 2024-12-15
tags: monitoring, devops, dashboard, alerting
cover: /images/projects/horizon.png
github:
website: https://dashboard-wongsns-projects.vercel.app/
draft: false
author: Shen Nan Wong
keywords: ops health, synthetic monitoring, infrastructure dashboard, Slack alerting, uptime, venture capital
---

## Why I built this

The operational stack spanned DNS, SSL certificates, email deliverability, Airtable automations, Pipedream workflows, ActiveCampaign, and Google Search Console. Failures in any layer were invisible until they caused outages — an expired SSL cert, a broken Pipedream flow, an email deliverability drop. There was no unified health view and no proactive alerting.

## What it does

Horizon runs scheduled health checks against every service endpoint and API, normalises results into a common status schema, and aggregates them into a single dashboard. When any check breaches its threshold, a Slack alert fires immediately — surfacing failures before they become incidents.

## How it works

- **Synthetic monitoring** — scheduled checks against health endpoints for each service
- **Common status schema** — all results normalised so DNS, SSL, email, and third-party APIs report in the same format
- **Threshold-based alerting** — Slack webhook fires when any check breaches its configured limit
- **Single pane of glass** — all infrastructure health visible in one dashboard

The goal was reducing mean time to detection. Failures that previously went unnoticed for hours are now caught within minutes.

## Stack

Next.js, cron-based health checks, Slack Webhooks, multi-source API integration, Vercel
