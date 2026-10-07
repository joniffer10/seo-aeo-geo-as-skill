---
name: seo-aeo-geo
description: >-
  Production-ready skill grounded in web standards, information retrieval theory,
  and search engine engineering. Conducts structured, multi-layered audits and
  optimizations across traditional SEO (crawlability, indexing, technical health),
  AEO (structured answers, entity extraction, JSON-LD), and GEO (authority signals,
  vector search readiness, generative citation potential). Framework-aware (Nuxt 3,
  Next.js, modern web stacks) and fully deterministic.
---

# SEO + AEO + GEO Optimization Skill

## Purpose

This skill guides a coding agent through a structured, layered audit and improvement process for web applications. It translates modern Information Retrieval (IR) research, W3C web standards, Google Search Quality Rater Guidelines (E-E-A-T), and LLM RAG (Retrieval-Augmented Generation) ingestion mechanics into deterministic engineering workflows across three distinct layers:

- **SEO (Search Engine Optimization)**: Technical discoverability, rendering integrity, indexability, metadata, and canonical structure.
- **AEO (Answer Engine Optimization)**: Direct answerability, entity extraction clarity, schema validation, and machine-parsable content layout.
- **GEO (Generative Engine Optimization)**: Information density, statistical source attribution, cross-page citation potential, and vector search chunk compatibility.

Invoke this skill when:
- Bootstrapping a new web application and setting up baseline search infrastructure
- Auditing an existing application for technical SEO, AEO, or GEO gaps
- Improving a specific route or page type (product, landing, documentation, article)
- Implementing structured data (`JSON-LD`) for complex entities
- Preparing an application for a public release or enterprise search indexing

---

## Mental Model

The three layers represent **sequential prerequisites**, not parallel marketing tracks:

```text
SEO (Foundation Layer)   → Can crawlers access, render, and index the raw content?
                           ↓
AEO (Extraction Layer)   → Can search parsers & answer engines extract explicit facts and entities?
                           ↓
GEO (Authority Layer)    → Does the content possess sufficient statistical authority, evidence,
                             and vector chunk density to be cited in generative LLM responses?
