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

<!-- TODO: Add screenshot/video of Meridian in action — show a Slack thread with a multi-tool workflow executing -->

## Why I built this

The investment team had a growing collection of AI tools — memo generation, network mapping, deal research, Slack search — but each lived in a separate app. Using them meant context-switching, copying data between windows, and manually stitching results together. I wanted a single surface where any Slack message could trigger any tool (or chain of tools) without leaving the conversation.

## What it does

Meridian is a TypeScript service that sits between Slack and multiple MCP (Model Context Protocol) servers. When someone sends a message, it parses intent, routes the request to the right server(s), executes multi-step tool chains, and streams results back into the originating thread. Adding a new capability is a single MCP server registration — no changes to the core router.

## Architecture

The system is built around three layers:

1. **Slack ingress** — Slack Bolt receives messages, extracts thread context (parent message, prior replies), and passes the full conversation to the intent parser
2. **Intent routing** — Claude API with tool-use definitions parses the message into one or more MCP tool calls. The router resolves which server owns each tool and batches calls that can run in parallel
3. **MCP execution** — each registered server exposes tools via the Model Context Protocol spec. Meridian maintains persistent connections to each server, handles retries, and multiplexes results back into a single Slack reply

### Multi-step chains

The interesting part is chaining. A message like "research this founder and draft a memo" triggers Atlas (network lookup) → Fathom (scoring) → Dossier (memo generation) as a sequential pipeline. Each step's output becomes context for the next. The chain definition lives in a simple JSON config — no orchestration code needed.

### Server registration

New tools register by pointing Meridian at their MCP endpoint:

```json
{
  "name": "dossier",
  "endpoint": "https://dossier.internal/mcp",
  "tools": ["generate_memo", "research_founder", "research_market"]
}
```

The router discovers available tools at startup and re-discovers on a configurable interval. Hot-reloading means deploying a new tool server makes it available to Slack users within seconds.

### Thread context management

Slack threads are the UX primitive. Every tool invocation preserves thread context — if you ask a follow-up question, the system has the full history of what was already retrieved or generated. Context is stored in a lightweight KV store (Vercel KV) with a TTL matching Slack's thread activity window.

## Technical decisions

- **MCP over custom RPC** — MCP is an open standard with a growing ecosystem. Using it means any MCP-compatible server can plug into Meridian without adapter code. The protocol handles tool discovery, parameter schemas, and streaming natively.
- **Claude tool-use for routing** — intent classification via tool-use definitions is more robust than keyword matching or fine-tuned classifiers. Adding a new tool to the routing layer is just adding a tool definition to the prompt — no retraining.
- **Slack Bolt over webhooks** — Bolt handles socket mode, retry logic, and rate limiting out of the box. The alternative was managing webhook verification, challenge responses, and retry deduplication manually.

## Stack

TypeScript, Slack Bolt (socket mode), Claude API (tool-use), Model Context Protocol SDK, Vercel KV, Vercel (deployment)
