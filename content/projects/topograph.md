---
title: Topograph
description: Live portfolio dashboard synced from Carta and AngelList — tracks valuations, MOIC, ownership percentages, and dilution history across multiple funds.
date: 2025-01-01
tags: dashboard, data, portfolio, finance
cover: /images/projects/topograph.png
github: https://github.com/codebyshennan/soi
website: https://topograph-two.vercel.app/
draft: false
author: Shen Nan Wong
keywords: portfolio tracker, Carta, AngelList, cap table, MOIC, dilution, venture capital
---

![Topograph portfolio view](/images/projects/topograph.png)

## Why I built this

Ownership data across a VC portfolio is split between Carta (cap tables) and AngelList (deal records). Answering "what's our current ownership in company X after their Series B?" meant pulling multiple Carta reports and cross-referencing spreadsheets. I wanted a single dashboard that modelled ownership through every financing event across all funds.

## What it does

Topograph pulls live cap table data from Carta and AngelList, models ownership through each financing event, and computes current stakes and follow-on exposure across the full portfolio. A unified dashboard surfaces ownership percentages, cost basis, MOIC, and dilution history — all in one place.

## Data integration

### Carta API

Carta provides cap table data per company: share classes, outstanding shares, option pools, and conversion terms. Topograph pulls:

- **Stakeholder positions** — fund's shares by class, with vesting schedules and conversion rights
- **Financing rounds** — pre/post-money valuation, new shares issued, price per share
- **Cap table snapshots** — fully-diluted ownership at each round close

The API returns data per fund entity, so Topograph aggregates across Fund 1, 2, and 3 to compute total exposure per company.

### AngelList API

AngelList provides deal-level data that Carta doesn't: investment amount, deal terms (pro-rata rights, liquidation preferences), and syndicate co-investors. This fills in the financial picture that Carta's equity-focused view misses.

### Reconciliation

Carta and AngelList don't always agree — rounding differences, timing mismatches on round closes, and occasional data entry errors. Topograph runs a reconciliation step that flags discrepancies above a configurable threshold (default: 0.5% ownership difference) for manual review.

## Equity modelling

### Dilution waterfall

For each company, Topograph models the ownership waterfall:

1. Start with initial investment position (shares + cost basis)
2. Apply each subsequent financing round: new shares issued → dilution to existing holders
3. Factor in option pool expansions and convertible note conversions
4. Compute current fully-diluted ownership percentage

The model handles standard and weighted-average anti-dilution provisions, pay-to-play clauses, and participation rights on liquidation preferences.

### Portfolio metrics

| Metric | Computation |
|---|---|
| MOIC | Current fair value ÷ total invested capital |
| IRR | Time-weighted return using investment dates and current valuation |
| Ownership % | Fully-diluted shares held ÷ total fully-diluted shares |
| Unrealised gain | (Current valuation × ownership %) - cost basis |
| Follow-on exposure | Pro-rata allocation needed to maintain ownership in next round |

All metrics are computed per-company and aggregated per-fund, with a portfolio-wide roll-up.

### Quarterly snapshots

Topograph stores quarterly snapshots of all metrics, enabling trend analysis: MOIC over time, ownership drift, and valuation multiples. The snapshot diff view highlights which companies moved the most quarter-over-quarter — useful for LP reporting and internal reviews.

## Technical decisions

- **Quarterly sync over real-time** — cap table data changes at most a few times per year (financing rounds, option grants). A quarterly sync with manual trigger for round closes is sufficient. Real-time would add complexity for no practical benefit.
- **Computed columns over pre-aggregated tables** — ownership percentages and MOIC are computed on read, not stored. This means the dashboard always reflects the latest data model without migration headaches when the calculation logic changes.
- **Server-side rendering for financial data** — all portfolio data stays server-side. The client never receives raw ownership numbers or valuations — only the rendered dashboard. This is a security requirement for LP-sensitive data.

## Stack

Next.js 15, Carta API, AngelList API, Supabase PostgreSQL, Tailwind CSS, Vercel
