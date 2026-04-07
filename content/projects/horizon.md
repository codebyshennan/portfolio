---
title: Horizon
description: Operational health dashboard that monitors DNS, SSL, email deliverability, and third-party services — with Slack alerts when anything breaks.
date: 2024-12-15
tags: monitoring, devops, dashboard, alerting
cover: /images/projects/horizon.png
github: https://github.com/codebyshennan/metric-dashboard
website: https://dashboard-kappa-three-55.vercel.app/
draft: false
author: Shen Nan Wong
keywords: ops health, synthetic monitoring, infrastructure dashboard, Slack alerting, uptime, venture capital
---


## Why I built this

The operational stack spanned DNS, SSL certificates, email deliverability, Airtable automations, Pipedream workflows, ActiveCampaign, and Google Search Console. Failures in any layer were invisible until they caused outages — an expired SSL cert, a broken Pipedream flow, an email deliverability drop. There was no unified health view and no proactive alerting.

## What it does

Horizon runs scheduled health checks against every service endpoint and API, normalises results into a common status schema, and aggregates them into a single dashboard. When any check breaches its threshold, a Slack alert fires immediately — surfacing failures before they become incidents.

## Health checks

### Check types

Each service has a tailored check:

| Service | Check method | Threshold |
|---|---|---|
| DNS | `dig` query against authoritative nameservers | Record mismatch or SERVFAIL |
| SSL | Certificate expiry check via TLS handshake | < 14 days to expiry |
| Email (SPF/DKIM/DMARC) | DNS TXT record validation | Missing or misconfigured record |
| Email deliverability | Postmark reputation API | Score < 95 |
| Airtable | API ping + schema validation | > 2s response or schema drift |
| Pipedream | Workflow execution status via API | Any failed execution in last 24h |
| ActiveCampaign | API health + automation status | Any paused automation |
| Google Search Console | Coverage report via API | Indexed pages dropping > 10% |

### Scheduling

Checks run on staggered cron schedules based on criticality:

- **Every 5 minutes**: SSL, DNS (outages are immediately visible to users)
- **Every hour**: email deliverability, Airtable, Pipedream
- **Every 6 hours**: ActiveCampaign, Google Search Console (slower-moving metrics)

### Common status schema

All check results normalize to:

```typescript
{
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  latency_ms: number;
  message: string;
  checked_at: string;
  metadata: Record<string, unknown>;
}
```

This means the dashboard and alerting layer don't need to know anything about individual check implementations. Adding a new service is writing one check function that returns this schema.

## Alerting

### Slack integration

When any check transitions from `healthy` to `degraded` or `down`, a Slack webhook fires with:

- Service name and current status
- What specifically failed (e.g., "SSL cert for domain X expires in 3 days")
- Link to the dashboard for details
- Suggested remediation (e.g., "Run certbot renew" or "Check Pipedream workflow X")

Alerts are debounced — a flapping service (healthy → degraded → healthy within 10 minutes) sends one alert, not three. Recovery notifications fire when a previously-down service returns to healthy.

### Incident tracking

The dashboard stores check history with 90-day retention. Each status transition is logged, enabling:

- **Uptime calculation** — % of time each service was in `healthy` state
- **Incident timeline** — when did it break, how long was it down, when was it fixed
- **Trend detection** — is a service's latency gradually increasing before it fails?

## Technical decisions

- **Synthetic monitoring over log-based** — the fund doesn't run its own servers (everything is SaaS or serverless). Log aggregation doesn't apply. Synthetic checks from the outside are the right model.
- **Vercel cron over dedicated scheduler** — Vercel's cron jobs (`vercel.json` cron expressions) handle the scheduling. No need for a separate cron service or always-on server.
- **Slack over PagerDuty** — the team lives in Slack. Adding PagerDuty would mean another tool to check. Slack webhooks with channel-based routing (critical → #ops-alerts, informational → #ops-health) covers the use case.

## Stack

Next.js 15, Vercel Cron, Slack Webhooks, Postmark API, Google Search Console API, Airtable API, Pipedream API, ActiveCampaign API, Tailwind CSS, Vercel
