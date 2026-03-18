---
title: Hive
description: Slack workspace archiver with an AI pipeline that classifies conversations and synthesizes them into a searchable knowledge base.
date: 2025-02-01
tags: ai, slack, knowledge-base, search
cover: /images/projects/hive.png
---

## What it does

Hive archives entire Slack workspaces — messages, files, threads — and runs an AI classification pipeline to synthesize conversations into a searchable knowledge base. Originally built to create a "Founder Bible" from years of Slack history across an investment team.

## How it works

- **Automated backups** — cron-scheduled archiving of all channels, threads, and files
- **Message browser** — searchable, paginated view of archived conversations
- **AI pipeline** — classifies threads by topic, then synthesizes related threads into structured articles
- **Storage layer** — pluggable backend (GCS or S3) with signed URLs and retention policies
- **Admin dashboard** — manage backup jobs, trigger classification runs, publish articles

The classification step uses a cheaper model for tagging, then a stronger model (Gemini 2.5 Pro via OpenRouter) for synthesis — keeping costs manageable at scale.

## Stack

Next.js 15, React 19, Tailwind CSS, shadcn/ui, Supabase PostgreSQL, Google Cloud Storage, OpenRouter, node-cron, Google OAuth
