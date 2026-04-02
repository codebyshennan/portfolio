---
title: Meridian
description: Slack-native MCP server that routes natural-language requests to multiple AI tool servers in-thread — turning any message into a multi-tool workflow.
date: 2025-04-01
tags: ai, mcp, slack, agents
cover: /images/projects/meridian.png
github:
website: https://meridian-tan-xi.vercel.app/
draft: false
author: Shen Nan Wong
keywords: MCP server, Model Context Protocol, Slack integration, multi-agent orchestration, LLM tool use, venture capital
---

## Why I built this

The investment team had a growing collection of AI tools — memo generation, network mapping, deal research, Slack search — but each lived in a separate app. Using them meant context-switching, copying data between windows, and manually stitching results together. I wanted a single surface where any Slack message could trigger any tool (or chain of tools) without leaving the conversation.

## What it does

Meridian is a TypeScript service that sits between Slack and multiple MCP (Model Context Protocol) servers. When someone sends a message, it parses intent, routes the request to the right server(s), executes multi-step tool chains, and streams results back into the originating thread. Adding a new capability is a single MCP server registration — no changes to the core router.

## How it works

1. A Slack message arrives and is parsed for intent
2. The router identifies which MCP server(s) to invoke
3. Multi-step tool chains execute transparently across servers
4. Results stream back into the Slack thread in real time

The key insight was using MCP as the standardisation layer — every tool exposes the same interface, so the router doesn't need to know anything about individual tools. New capabilities plug in without touching existing code.

## Stack

TypeScript, Model Context Protocol, Slack Bolt, Claude API (tool-use), Vercel
