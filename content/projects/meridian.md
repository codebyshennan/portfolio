---
title: Meridian
description: Slack-native MCP server that routes natural-language requests to multiple AI tool servers in-thread — turning any message into a multi-tool workflow.
date: 2025-04-01
tags: ai, mcp, slack, agents
cover: /images/projects/meridian.png
github: https://github.com/codebyshennan/slack-mcp-bridge
website: https://meridian-tan-xi.vercel.app/
draft: false
author: Shen Nan Wong
keywords: MCP server, Model Context Protocol, Slack integration, multi-agent orchestration, LLM tool use, venture capital
---

![Meridian system dashboard](/images/projects/meridian.png)

## Why I built this

The investment team's data was split across Airtable, StandardMetrics, Tracxn, Gmail, and Slack — with no unified view. Answering questions like "has this company applied before?" or "which companies in this batch are comparable to Acme?" meant manually cross-referencing multiple platforms. Reconciling the data cost roughly 1–3 person-days per quarter for a 40-company cohort.

I built Meridian to make all of that queryable from Slack. Rather than building custom integrations per tool, I structured it around MCP (Model Context Protocol) — a standardized interface where any data source can be registered as a server, and the agent figures out which servers to call and in what order based on the natural language query.

## What it does

Meridian is a TypeScript service that sits between Slack and multiple MCP (Model Context Protocol) servers. When someone sends a message, it parses intent, routes the request to the right server(s), executes multi-step tool chains, and streams results back into the originating thread. Adding a new capability is a single MCP server registration — no changes to the core router.

## Architecture

The system is built around three layers:

1. **Slack ingress** — Slack Bolt receives messages, extracts thread context (parent message, prior replies), and passes the full conversation to the intent parser
2. **Intent routing** — Claude API with tool-use definitions parses the message into one or more MCP tool calls. The router resolves which server owns each tool and batches calls that can run in parallel
3. **MCP execution** — each registered server exposes tools via the Model Context Protocol spec. Meridian maintains persistent connections to each server, handles retries, and multiplexes results back into a single Slack reply

### Query categories

The investment team's queries fall into four distinct types, each requiring different reasoning:

| Category | Example | Complexity |
|---|---|---|
| Simple retrieval | "Why was this company rejected in S25?" | Direct field lookup |
| Chronological tracing | "What was their revenue last time they applied vs. now?" | Cross-record temporal reasoning |
| Comparative analysis | "Which other companies are doing similar things in fintech?" | Similarity matching across full dataset |
| Aggregation | "Break down this batch by geography and industry" | Statistical computation |

Simple retrieval reduces to a direct Airtable lookup. Comparative analysis requires dynamic query generation across all records. Aggregation needs a separate calculation layer — LLMs can't do arithmetic reliably, so queries with statistical requirements get routed to a sandboxed code execution step.

### Context management

MCP tool definitions bring large chunks of schema context into the prompt. A single Airtable integration with field descriptions already consumes 3–5k tokens; adding retrieved data for a complex query can hit 20–30k tokens. At that scale, context fills up before the agent finishes reasoning.

Meridian resolves this with a `TransientDataStore` approach: after each tool call, useful outputs are cached in a short-lived "memory box" keyed to the Slack thread. Subsequent steps read from the cache rather than re-fetching, keeping the active context window lean. The cache TTL is matched to the thread activity window.

```
Slack message
    │
    ▼
MessageRouter
    │
    ├── ContextManager (adds business context, checks cache)
    │
    └── WorkflowRunner (plans + executes)
           │
           ├── MCP clients (Airtable, StandardMetrics, Tracxn, Gmail)
           │
           └── TransientDataStore (cache tool outputs per thread)
```

### Multi-step chains

A message like "research this founder and draft a memo" triggers Atlas (network lookup) → Bearing (research agents) → memo generation as a sequential pipeline. Each step's output becomes context for the next. The chain definition lives in a simple JSON config — no orchestration code needed.

### Observability

All query executions are traced through Langfuse: request/response logging, latency per tool call, accuracy scores against a gold query set. The eval harness runs a set of representative queries with known expected answers and scores the agent's output — tracking accuracy progression as the system improves.

### Server registration

New tools register by pointing Meridian at their MCP endpoint:

```json
{
  "name": "bearing",
  "endpoint": "https://bearing.internal/mcp",
  "tools": ["generate_memo", "research_founder", "research_market"]
}
```

The router discovers available tools at startup and re-discovers on a configurable interval. Hot-reloading means deploying a new tool server makes it available to Slack users within seconds.

## Technical decisions

- **MCP over custom RPC** — MCP is an open standard with a growing ecosystem. Using it means any MCP-compatible server can plug into Meridian without adapter code. The protocol handles tool discovery, parameter schemas, and streaming natively.
- **Claude tool-use for routing** — intent classification via tool-use definitions is more robust than keyword matching or fine-tuned classifiers. Adding a new tool to the routing layer is just adding a tool definition to the prompt — no retraining.
- **TransientDataStore over stateless calls** — without caching, every multi-step query re-fetches the same data. The cache layer keeps the context window manageable and makes chained queries fast enough for interactive use.
- **Slack Bolt over webhooks** — Bolt handles socket mode, retry logic, and rate limiting out of the box. The alternative was managing webhook verification, challenge responses, and retry deduplication manually.

## Stack

TypeScript, Slack Bolt (socket mode), Claude API (tool-use), Model Context Protocol SDK, Airtable API, StandardMetrics API, Langfuse (observability), Vercel KV, Vercel (deployment)
