---
title: Topograph
description: Live portfolio dashboard synced from Carta and AngelList — tracks valuations, MOIC, ownership percentages, and dilution history across multiple funds.
date: 2025-01-01
tags: dashboard, data, portfolio, finance
cover: /images/projects/topograph.png
github:
website: https://topograph-two.vercel.app/
draft: false
author: Shen Nan Wong
keywords: portfolio tracker, Carta, AngelList, cap table, MOIC, dilution, venture capital
---

## Why I built this

Ownership data across a VC portfolio is split between Carta (cap tables) and AngelList (deal records). Answering "what's our current ownership in company X after their Series B?" meant pulling multiple Carta reports and cross-referencing spreadsheets. I wanted a single dashboard that modelled ownership through every financing event across all funds.

## What it does

Topograph pulls live cap table data from Carta and AngelList, models ownership through each financing event, and computes current stakes and follow-on exposure across the full portfolio. A unified dashboard surfaces ownership percentages, cost basis, MOIC, and dilution history — all in one place.

## How it works

- **API integration** — syncs cap table data from Carta and deal records from AngelList
- **Equity modelling** — tracks ownership through each financing round, computing dilution impact
- **Multi-fund view** — portfolio tracked across Fund 1, 2, and 3 with per-fund and aggregate views
- **Quarterly change logs** — valuation changes over time for trend analysis and LP reporting

## Stack

Next.js, Carta API, AngelList API, equity modelling, Vercel
