---
title: "What Building AI Systems at a VC Fund Actually Taught Me"
description: Eight advanced AI concepts I learned building real products — from agentic planning to voice agents, dynamic ontology discovery, and why the context window is a reasoning resource, not just memory.
date: 2026-03-29
tags: ai, engineering, agents, vc, building
draft: true
author: Shen Nan Wong
keywords: agentic AI, LLM orchestration, hybrid search, multi-agent systems, RAG, voice agents, MCP, structured generation, venture capital, Iterative
cover:
---

Over the past several months, I built a suite of internal AI tools at a Southeast Asian VC fund — products designed to automate the operations of a lean venture fund running at scale. We called them the Moonshots. They range from a channel-native LLM orchestration layer to a voice agent that calls founders and writes structured feedback, to a hybrid search system for navigating our expert network.

None of these were toy projects. They run in production, handle real deal flow, and touch the decisions we make about which companies to fund. Building them forced me to confront AI concepts at a depth that reading papers and tutorials never quite gets you to.

This is what I learned.

> [!GLOSSARY]
>
> Meridian :: Channel-native LLM orchestrator. Plans multi-step workflows, gets human approval, then executes deterministically via MCP servers.
>
> Atlas :: Hybrid expert network search. Classifies query intent and blends SQL filtering with semantic vector retrieval dynamically.
>
> Bearing :: Investment memo generator. Orchestrates parallel research agents across multiple search providers, synthesizes into IC-ready docs.
>
> Compass :: Community channel knowledge base. Archives threads, classifies by topic using emergent ontology discovery, publishes category articles.
>
> Fathom :: Founder fluency classifier. Assigns tiers (Breakout / Repeat / Operator / Novice) via LLM + deterministic rule layer for auditability.
>
> Pilot :: Voice interview agent. Conducts live founder first calls, fetches application context mid-call, logs structured feedback to Airtable.

---

## 1. LLMs Are Better at Planning Than Doing

The most important architectural insight across all these projects: **LLMs are good at reasoning about what to do, but unreliable when asked to iteratively do it**.

This distinction — planning vs. execution — is the core tension in agentic AI. The naive approach is [ReAct](https://arxiv.org/abs/2210.03629) (Yao et al., 2022): give the model a task, let it call a tool, observe the result, call another tool, and loop until done. This breaks in practice. The model can enter reasoning loops, hallucinate tool arguments, or make locally correct but globally incoherent decisions because it's not maintaining state — it's predicting the next plausible token at each step.

**Meridian** resolves this by separating the phases hard. The LLM — routed through OpenRouter to `anthropic/claude-3.5-sonnet` — produces a structured workflow plan. The user approves it. Then execution is purely deterministic — step through the plan, call tools, accumulate results. The LLM's role ends at planning.

This is the same philosophy behind why [chain-of-thought prompting](https://arxiv.org/abs/2201.11903) (Wei et al., 2022) consistently outperforms direct generation: front-load the reasoning, back-load the action. The right unit of LLM involvement isn't "a call per step" — it's "a call per decision point."

The human-in-the-loop approval gate sits between planning and execution for exactly this reason. A plan is legible. Execution is opaque. Approving a natural-language plan is something humans are good at. Approving individual tool calls mid-execution is not.

---

## 2. Query Intent Is a Pre-Retrieval Reasoning Step

The standard RAG mental model: embed the query, retrieve similar chunks, generate with context. **Atlas** adds a step before retrieval that changes the retrieval strategy itself.

Different query types have fundamentally different information-retrieval semantics. A query like *"investors in Jakarta"* is a lookup — the relevant dimension is a structured attribute (location), and semantic similarity to that phrase is noise. A query like *"founders who navigated a hard pivot"* is genuinely semantic — there's no keyword that surfaces the right profiles, only the meaning.

Running semantic search on the first type retrieves profiles that *talk about* Jakarta founders. Running pure keyword search on the second type misses every relevant profile that didn't use the exact phrase.

So **Atlas** classifies the query first — using `gpt-4.1-nano` for fast, cheap intent classification — and uses that to set a `semanticWeight` between 0.0 and 0.5 before running hybrid search. Embeddings use `text-embedding-3-small` stored in pgvector, and analysis of matched profiles runs on Groq's `llama-3.3-70b` for low-latency generation. SQL generation and cosine similarity scoring run in parallel before the results are merged and ranked. A structured query gets weight 0.0 (pure SQL). A qualitative one gets 0.3–0.5 (meaningful semantic influence). Most queries are hybrids and land somewhere in between.

This maps to a concept called **query routing** in [multi-index RAG](https://www.pinecone.io/learn/hybrid-search-intro/): different indexes serve different query types, and a classifier decides which to call. Fixed retrieval strategies are a simplification that works until it doesn't. Building in query-awareness from the start is almost always worth it.

---

## 3. Let the Model Discover Its Own Taxonomy

Most classification systems start with a fixed label set. The problem is that the right taxonomy isn't always knowable upfront — it emerges from the data itself.

**Compass** classifies community channel threads by topic, but we didn't define the topic list before running the pipeline. Instead, the model receives whatever categories already exist and is asked to either assign a thread to one, or propose a new one. A `is_new_category` flag in the output schema lets the model surface category proposals. Staff review and accept or reject them before they're used in subsequent runs. **Compass** uses OpenRouter routing to Gemini 2.5 Pro for synthesis and a cheaper model for classification, with Supabase storing the growing category graph and an automated cron handling nightly backups.

This is **emergent ontology discovery** with a human curation layer. The LLM does the discovery work. Humans do the quality control. The taxonomy grows organically rather than being forced into a predefined shape.

The older statistical approach to this problem was LDA — Latent Dirichlet Allocation — which infers topic distributions from word co-occurrence patterns. The original [RAG paper](https://arxiv.org/abs/2005.11401) (Lewis et al., 2020) brought retrieval-augmented generation into the mainstream, but the retrieval step it described was fixed — a single dense retriever with no query-type awareness. LLM-based classification replaces this with semantic understanding, which means it can distinguish threads that use identical vocabulary but discuss different concepts. "Growth" in a fundraising context versus a marketing context are the same word, different topics. LDA can't see that. An LLM can.

The confidence score per classification matters too. A 0.4 confidence doesn't mean failure — it means the thread is genuinely ambiguous. That signal routes borderline cases to human review, which is a richer output than binary classified/not-classified.

---

## 4. Schema Design Is Prompt Design

`generateObject` with a structured schema is the developer-facing API for a deeper concept: **constrained decoding**, where the model's output distribution is shaped to conform to a schema at generation time rather than post-hoc parsing. The formal treatment of this is in [Willard & Louf (2023)](https://arxiv.org/abs/2307.09702), which underpins libraries like Outlines and influenced OpenAI's [structured outputs](https://openai.com/index/introducing-structured-outputs-in-the-api/).

The naive version — "output JSON" in the prompt — relies on instruction-following and mostly works. Until it doesn't: at scale, 1% parse failures across thousands of classification runs means hundreds of failures requiring manual review or re-runs.

But the more interesting point isn't reliability. It's that **the fields you put in your schema are the concepts you're asking the model to attend to during generation**.

**Compass**'s classification schema includes `nuggets` (discrete advice units), `attributed_to` (which speakers to credit), and a nullable `category` field. These aren't just output fields — they shape what the model focuses on while generating. Including `attributed_to` directs attention toward speaker identity. Allowing null on `category` lets the model explicitly signal "this thread has no classifiable content" rather than being forced into a least-bad category. Forcing classification where none applies produces low-confidence garbage. Allowing null keeps the data clean.

Schema design, prompt design, and data quality are the same problem from different angles.

---

## 5. The Context Window Is a Reasoning Resource

The context window is usually described as "how much the model can remember." That framing leads to poor architectural decisions. More accurately: **everything in the context window competes for the model's attention, and attention is finite**.

Research on the ["lost in the middle" problem](https://arxiv.org/abs/2307.03172) (Liu et al., 2023) shows that LLMs systematically underweight information placed in the middle of long contexts. The beginning and end receive disproportionate attention. If 80% of the context is tool descriptions the model doesn't need for a given request, that's 80% of attention capacity allocated to irrelevant information.

**Meridian** addresses this with lazy tool loading — injecting only a summary manifest of available tools initially, and expanding specific tool descriptions on demand. This reduced prompt size by 40–80% and materially improved routing decisions. Not because the model was smarter, but because the signal-to-noise ratio improved. The ContextManager handles this with a 5-minute TTL cache so repeated requests don't re-fetch tool metadata on every turn.

The TransientDataStore takes the same principle further. When the model fetches 500 Airtable records, keeping them in the conversation context would dilute every subsequent turn. Instead, results are stored externally with a dataset ID pointer — cached for 10 minutes — and the model gets back only a summary (fields, record count, sample values). Subsequent turns reference the ID. This is **context compression** — preserving reasoning capacity by keeping the context window clean.

Extended thinking (**Meridian** supports a configurable thinking token budget) works in the opposite direction: explicitly expanding the reasoning context before the response. It's useful for planning — where you want the model to consider many possible tool sequences before committing — and less useful for bounded tasks like structured extraction where more deliberation doesn't improve the output.

---

## 6. The Supervisor Pattern in Multi-Agent Systems

There are three canonical multi-agent topologies: peer-to-peer, hierarchical mesh, and supervisor. **Bearing** uses the [supervisor pattern](https://langchain-ai.github.io/langgraph/tutorials/multi_agent/agent_supervisor/) for market research, and it's worth understanding why.

In the supervisor pattern, one agent holds the global plan and delegates to specialists. It receives their outputs, decides what to do next, and is the only agent with a global view of the task state. **Bearing**'s Hono-based orchestration layer manages a LangGraph supervisor agent that dispatches a Brave researcher, a Tavily researcher, and a Perplexity researcher in parallel, then hands their outputs to a synthesis analyst. After each researcher returns, the supervisor decides who acts next — or whether the task is done. Before generating the final memo, a dedicated synthesis step produces a SynthesisReport capturing the investment thesis alongside a contrarian take, which becomes the backbone of the IC-ready document.

This makes the pipeline adaptive. If Brave returns nothing useful, the supervisor re-routes to Perplexity rather than passing an empty result to synthesis. A fixed sequential pipeline can't do this.

The failure mode of the supervisor pattern is **routing drift**: as the message history grows, the model's attention on the original task fades, and routing decisions degrade. This is why strict termination conditions matter — without an explicit `END` signal after synthesis completes, the supervisor can continue routing on a finished task, burning tokens on redundant research.

The `name` field on each agent's message output (`name: "Brave Researcher"`) enables **attributed state** in the shared message history. The supervisor and synthesis agents can reason about provenance: "the Perplexity result conflicts with what Brave found." Without attribution, the history is a flat text blob where source information is lost.

---

## 7. Evaluating AI When Ground Truth Is Uncertain

**Fathom** claims 85% accuracy on a held-out set of 20 founders drawn from a 50-row manually reviewed ground truth. That number deserves scrutiny, and scrutinizing it is how you develop good AI evaluation instincts.

The classification task — assigning founders to tiers (Breakout, Repeat, Operator, Novice) — isn't objective. Two experienced investors would disagree on borderline cases. The ground truth set reflects one person's judgement at one point in time. "85% accuracy" means "agrees with the labeler 85% of the time on 20 examples" — not "correctly classifies founders 85% of the time" in any absolute sense. **Fathom** uses EnrichLayer to pull LinkedIn profile data before the LLM evaluator runs, which keeps the input representation consistent across the full applicant pool.

This is the **label noise problem**: when ground truth is constructed from subjective human judgement, model accuracy is partly a measure of how well the model mimics the specific labeler, not how well it captures the underlying construct. [Northcutt et al. (2021)](https://arxiv.org/abs/1911.00068) formalized this in *Confident Learning*, showing that even benchmark datasets like ImageNet contain systematic label errors that inflate reported accuracy figures.

The tag-based rule layer in **Fathom** — where the model outputs tags first (`repeat_founder`, `corporate_research`, `indie_builder`) and deterministic rules derive the tier — addresses a different but related problem: **legibility**. Rather than a black-box tier assignment, you can see exactly why someone was classified Novice (has `corporate_research`, lacks `startup_employee`). That auditability matters operationally: when a partner disputes a classification, you can show the reasoning, not just the label.

Legibility isn't just a UX concern. It's a property of the system's decision-making that makes it trustworthy enough to act on.

---

## 8. Voice Agents Are a Different Reasoning Environment

**Pilot** surfaces constraints that don't exist in text-based AI and are rarely discussed in the literature.

In text, a model can hedge, list options, ask clarifying questions, and produce structured output. In voice, all of this breaks. A voice agent that says "I have three options for you: option one, option two, option three" is immediately exhausting. The model must commit to a conversational register — shorter sentences, direct assertions, less epistemic hedging — that feels natural in speech rather than legible on a screen.

The mid-call tool invocation (fetching the founder's application from Airtable during a live call) has a **latency budget** that text agents don't have. If the API call takes 3 seconds, the voice agent has 3 seconds of silence or filler speech. This means the model must generate bridging content that doesn't depend on the tool result — which requires reasoning about what it doesn't yet know when generating the filler. **Pilot** uses a Cloudflare tunnel to bridge the Airtable proxy to ElevenLabs callbacks, and Turso stores call transcripts for post-call analysis.

Post-call, ElevenLabs sends a webhook with the full transcript and a structured analysis object: scores for founders, market, traction, and recommendation, plus rationale and win conditions. This is **retrospective structured generation** — the model outputs a structured summary of a completed conversation, not a response to a current query. Using the same model for real-time dialogue and post-call extraction is a pragmatic choice. A dedicated extraction pass over the transcript would likely be more reliable.

The part that made **Pilot** actually useful rather than a demo: the structured analysis output maps directly onto our existing feedback schema — the same fields used when a human partner conducts a first call. A voice-conducted interview produces the same database record as a human one, meaning it participates in all downstream analytics — funnel velocity, partner load balancing, SLA tracking — without any special casing.

---

## 9. Chaining MCP Servers Breaks Down Fast

Building **Meridian**, I connected it to multiple MCP servers simultaneously — Airtable, the team's workspace, a web search tool, an internal data store. In theory, the LLM now had access to everything it needed. In practice, the system degraded quickly once the tool catalog grew.

The problem is **prompt bloat**. Every connected MCP server contributes its full tool schema to the system prompt — descriptions, parameters, examples. With five servers each exposing 10–15 tools, you've consumed a significant fraction of the context window before the user has said a word. A recent paper — [RAG-MCP (Gan & Sun, 2025)](https://arxiv.org/abs/2505.03275) — quantifies exactly this: naive injection of all MCP tool descriptions collapses tool selection accuracy to 13.62%. Using RAG to pre-select relevant tools before injection more than tripled accuracy and cut prompt tokens by over 50%.

But even before accuracy degrades, there's a subtler attention problem. The ["lost in the middle" research](https://arxiv.org/abs/2307.03172) applies directly here: when a hundred tool descriptions occupy the middle third of the context, the model's attention on the actual user query diminishes. [LongFuncEval (2025)](https://arxiv.org/abs/2505.10570) benchmarked this precisely, finding a 7–85% drop in tool selection accuracy as the available tool catalog grows — even on 128K-context models. Long context doesn't solve the problem; attention quality does.

The fix **Meridian** landed on — lazy and dynamic tool loading via a manifest-first injection pattern, with Langfuse providing trace and span observability across every tool call — is essentially reinventing retrieval-augmented tool selection. You're RAG-ing the tools themselves. It cut prompt size by 40–80% and made routing noticeably more accurate. The underlying lesson: **the MCP architecture makes it trivially easy to add servers, and dangerously easy to degrade your model's reasoning in doing so**. Tool proliferation is the new dependency hell.

---

## 10. Sophisticated RAG Works — But It's Slow

**Atlas** does query classification, then hybrid SQL + vector retrieval, with dynamic semantic weighting. It produces better results than naive similarity search. It also takes noticeably longer, and that latency creates a real UX problem for an interactive search tool.

The academic framing of this tradeoff is well-studied. [A 2024 analysis from ETH Zurich](https://arxiv.org/abs/2412.11854) measured where RAG latency actually goes in production pipelines: retrieval accounts for roughly 41% of end-to-end latency and nearly half of time-to-first-token. The [RAGO paper (2025)](https://arxiv.org/abs/2503.14649) found that in hyperscale retrieval scenarios, over 80% of pipeline time can be spent in retrieval alone — and that iterative retrievals during decoding stall the generation pipeline entirely.

For **Atlas**, the latency breakdown is roughly: LLM classification call → parallel SQL + vector retrieval → merge and rank → generate response. The classification call is the first LLM round-trip, and it happens before any retrieval. A [Pinecone engineering post](https://www.pinecone.io/learn/fast-retrieval-augmented-generation/) frames this cleanly: every agent reasoning step is an LLM call — slow and expensive. The smarter you make your retrieval pipeline, the more LLM calls it typically requires.

The honest verdict: multi-step intelligent RAG is the right architecture for *quality*, but it's the wrong architecture if your p95 latency budget is under two seconds. For a search tool used by a handful of partners doing occasional deep searches, the tradeoff is acceptable. For anything interactive at volume, you'd need to front-load the intelligence (precompute classifications, cache embeddings aggressively) or accept that sophisticated retrieval and fast retrieval are in tension. There's no free lunch.

---

## 11. Observability Is Hard, and Auto-Evals Are Harder

In a conventional software system, you know if something is broken because it throws an error or returns the wrong type. In an AI system, **the failures are plausible**. A misrouted tool call, a hallucinated argument, a subtly wrong classification — these produce outputs that look reasonable, log no exceptions, and pass all your type checks. You only catch them when a user complains or you happen to spot the output.

This is why so much time in building **Meridian**, **Bearing**, and **Fathom** went into Langfuse traces, structured logging at every LLM boundary, and manually reviewing outputs. Not because I wanted to — because there was no alternative. The signal isn't in error rates; it's in the quality of the LLM's reasoning across hundreds of calls.

The natural instinct is to automate this with an LLM judge. Use a model to evaluate other model outputs, run it continuously, get a score. The problem is that LLM judges have systematic biases that make them unreliable for this purpose. The foundational work here is [Zheng et al. (2023)](https://arxiv.org/abs/2306.05685) — the MT-Bench paper — which names three core failure modes: **position bias** (preferring whichever answer appears first), **verbosity bias** (preferring longer outputs regardless of quality), and **self-enhancement bias** (models scoring their own outputs higher). A follow-on study, [Panickssery et al. (2024)](https://arxiv.org/abs/2404.13076), found a causal link between a model's ability to recognize its own outputs and its tendency to prefer them — meaning self-bias is structural, not random noise. And [Ye et al. (2024)](https://arxiv.org/abs/2410.02736) catalogued 12 distinct bias types in LLM judges, suggesting the MT-Bench three were just the most visible ones.

[RAGAS](https://arxiv.org/abs/2309.15217) — the most widely used automated RAG evaluation framework — measures faithfulness, answer relevance, context precision, and recall. It's useful for catching obvious regressions. But because RAGAS metrics are themselves computed using LLM-as-judge internally, all of these biases apply to it. You can tune a RAG system to score well on RAGAS and still ship something that misleads users in subtle ways that no automated metric captures.

What I've landed on: automated evals are good for catching regressions (did this prompt change break something obvious?), not for measuring quality in any absolute sense. Human review of a sampled output set remains the only reliable signal for whether your AI system is actually doing what you think it's doing. [HELM (Liang et al., 2022)](https://arxiv.org/abs/2211.09110) made this argument for benchmark evaluation broadly — accuracy is one of seven axes that matter, and automated benchmarks systematically miss most of the others. The same holds for production AI systems. Build observability infrastructure early, review outputs regularly, and treat your automated eval scores as a floor, not a ceiling.

---

## What I'd Tell Myself at the Start

If I were starting over, the one thing I'd internalize earlier: **the interesting AI problems are almost never about the model**. The model is the easy part. The hard parts are context management, evaluation design, retrieval architecture, and knowing when to let the LLM reason versus when to make execution deterministic.

Most AI products fail not because they used the wrong model, but because they gave the model the wrong information at the wrong time, or asked it to do things that are better done deterministically. Getting that judgment right is the craft.
