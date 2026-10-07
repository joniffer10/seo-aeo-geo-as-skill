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
```

- **SEO is the foundation.** If a page cannot be crawled, rendered, and indexed, no amount of answer-oriented content or authority-building matters — the page does not exist from a machine's perspective.
- **AEO is the extraction layer.** Once indexed, answer engines and AI parsers need to extract discrete facts. Clear, structured, entity-aware content is extractable; vague marketing prose is ignored.
- **GEO is the long-term authority layer.** Once content is indexable and understandable, generative AI systems can cite it — provided independent evidence corroborates its claims and establishes credibility.

> **Rule 1**: Do not optimize for GEO while P0/P1 SEO problems (e.g., noindex leaks, broken SSR, blocking robots.txt) remain unsolved.  
> **Rule 2**: Never optimize for GEO by fabricating evidence, partnerships, or citations.

---

## Technical & Academic Foundations

This skill is grounded in industry standards and information retrieval engineering:

1. **W3C HTML & URL Standards**: RFC 3986 URL design, semantic HTML5 structure, and accessible markup.
2. **Google Webmaster & Search Quality Guidelines**: E-E-A-T framework (Experience, Expertise, Authoritativeness, Trustworthiness) and Core Web Vitals (LCP, INP, CLS).
3. **Information Retrieval (IR) Theory**: Vector space models, TF-IDF / BM25 lexical scoring, and dense passage retrieval (DPR) optimization.
4. **RAG & LLM Ingestion Mechanics**: Chunk optimization, clear entity-attribute-value triples, and structured markup designed for high semantic density during vector embeddings.

---

## Layered Hierarchy

```text
SEO: Technical Discoverability & Indexing
│
├── Infrastructure: DNS, HTTPS, Server Response Codes (200, 301, 404, 503)
├── Crawlability: robots.txt rules, sitemap.xml architecture, internal link crawl depth
├── Indexability: Canonical headers, self-referential tags, meta robots (index/follow)
└── Rendering Integrity: SSR/SSG hydration, JS rendering parity, Core Web Vitals (LCP, INP, CLS)

AEO: Fact Extraction & Entity Comprehension
│
├── Structural Clarity: Direct 1-2 sentence lead paragraphs under H1/H2 headers
├── Entity Mapping: Explicit N-v-N triples, JSON-LD schema (Organization, SoftwareApplication, FAQPage)
├── Machine Readability: High-contrast data tables, ordered lists, semantic microdata
└── Micro-Intent Coverage: Concise, self-contained answers targeting featured snippets

GEO: Generative AI & Vector Search Authority
│
├── Information Density: High unique insight per chunk, minimal fluff prose
├── Evidence & Attribution: Verifiable data points, direct citation of primary sources
├── Brand Consensus: Consistent entity descriptions across all domain sub-paths
└── RAG Chunk Compatibility: Self-contained section headers with complete contextual pronouns
```

---

## Agent Workflow

Execute these steps **strictly in order**. Do not skip ahead.

```text
 1. Inspect application & stack
    → Identify framework (Nuxt 3, Next.js, plain HTML, other)
    → Identify rendering mode (SSR, SSG, SPA, hybrid) and routing strategy
    → Audit meta management tools (useSeoMeta, useHead, next/head) and SEO modules

 2. Audit technical SEO infrastructure
    → Check robots.txt accessibility and routing to sitemap.xml
    → Verify sitemap.xml exists and lists valid, indexable public routes
    → Verify self-referential canonical URLs on every public page
    → Check for accidental noindex tags on production routes
    → Check response codes, redirect chains, broken links, and HTTPS termination

 3. Fix blocking SEO issues (P0)
    → Fix robots.txt blocking critical paths
    → Fix incorrect noindex meta tags
    → Fix broken SSR hydration or render parity issues

 4. Improve metadata & social graph (P1)
    → Title: unique, primary keyword early, ≤60 characters
    → Description: unique, actionable, ≤150 characters
    → Canonical: absolute, fully-qualified URL on every page
    → Open Graph: og:title, og:description, og:image, og:url
    → Twitter/X: twitter:card, twitter:title, twitter:description, twitter:image

 5. Improve semantic structure & accessibility (P1)
    → Single <h1> per page representing the primary topic
    → Logical heading hierarchy (h1 → h2 → h3) without skipping levels
    → Semantic HTML elements (<main>, <nav>, <article>, <section>, <aside>)
    → Meaningful alt text on non-decorative images and descriptive link text

 6. Implement structured data (P2)
    → Organization & WebSite on homepage (with SearchAction if applicable)
    → SoftwareApplication / Product / Service on core offering pages
    → BreadcrumbList on nested interior routes
    → FAQPage where explicit Q&A content exists
    → TechArticle / Article on technical docs and blog posts

 7. Improve AEO answerability & micro-intents (P1/P2)
    → Place a direct 1–2 sentence answer immediately under H1/H2 headers
    → Structure step-by-step processes using semantic ordered lists (<ol>)
    → Convert dense comparative text into clean, parsable HTML/Markdown tables
    → Make entity definitions explicit (e.g., "Targetify is a software tool...")

 8. Optimize GEO vector chunks & authority (P2/P3)
    → Ensure section chunks are self-contained (avoid ungrounded "it" or "this")
    → Support claims with concrete metrics, version numbers, or primary sources
    → Create high-density technical guides, benchmarks, or case studies
    → Ensure brand identity and product definitions are consistent domain-wide

 9. Validate implementation
    → Validate JSON-LD schemas using schema.org standards
    → Confirm canonical URLs and metadata render correctly in raw SSR/SSG HTML
    → Re-verify robots.txt and sitemap.xml accessibility

10. Report findings & action plan
    → Produce a prioritized audit report matching the Audit Output Format
    → Document changes made and remaining long-term recommendations
```

---

## Audit Output Format

After completing the audit, produce a structured report:

```text
SEO/AEO/GEO SYSTEM AUDIT — [Application Target]
==================================================

SEO STATUS
----------
P0 (Blocking):      [Critical crawl, index, or hydration issues]
P1 (High Impact):   [Missing canonicals, title/meta bugs, header hierarchy]
P2 (Improvements):  [Internal link depth, sitemap updates, mobile optimization]
P3 (Long-Term):     [Site speed tuning, legacy redirects]

AEO STATUS
----------
P1 (Extraction):    [Direct answer snippet density and question header alignment]
P2 (Structured Data): [Missing or malformed JSON-LD schema]
P3 (Entities):      [Entity relationship clarity across pages]

GEO STATUS
----------
P2 (Vector Density): [Section chunk self-containment and table formatting]
P3 (Authority):     [Long-term benchmark data, case studies, and primary references]

==================================================
PRIORITIZED ACTION PLAN

1. [P0 Action Item]
2. [P1 Action Item]
3. [P2 Action Item]
```

### Priority Matrix

| Level | Meaning | Remediation Window |
| :--- | :--- | :--- |
| **P0** | **Blocking**: Site or route cannot be indexed or rendered | Immediate (Pre-deployment) |
| **P1** | **High Impact**: Core metadata, schema, or render defects | Prior to release |
| **P2** | **Improvement**: Enhanced entity mapping & chunk optimization | Next sprint |
| **P3** | **Authority**: Long-term evidence, case studies & benchmark building | Ongoing roadmap |

---

## Pre-Audit Inspection Checklist

Before making any code or configuration changes, inspect and record:

```text
□ Framework (Nuxt 3, Next.js, plain HTML, other)
□ Rendering strategy (SSR, SSG, SPA, hybrid)
□ Routing strategy (file-based, manual, dynamic)
□ Existing SEO modules (@nuxtjs/sitemap, @nuxtjs/robots, nuxt-schema-org, etc.)
□ Metadata implementation (useSeoMeta, useHead, custom hooks, static tags)
□ Sitemap (exists / missing / dynamically generated)
□ robots.txt (exists / missing / correctly configured)
□ Structured data (present / missing / partial JSON-LD)
□ Content architecture (product pages, docs, blog, landing pages)
□ Analytics/Search Console integration (GSC, GA4, Plausible, etc.)
□ Public vs. Private route matrix (which paths should be indexed?)
```

> **Rule**: Never overwrite existing SEO configurations without reading them first. Prefer incremental, targeted code updates over full rewrites.

---

## Safety and Quality Rules

### Prohibited (Black-Hat & Low-Quality Practices)
- Keyword stuffing in content, image alt text, or metadata
- Hidden text, off-screen absolute positioning, or invisible links
- Dynamic cloaking (serving different HTML to crawlers vs. human visitors)
- Fabricated statistics, user testimonials, awards, or enterprise partnerships
- Invalid or deceptive JSON-LD schema markup (e.g., tagging generic content as an `Order` or `Product`)
- Automated generation of low-value, repetitive doorway pages
- Blocking legitimate search crawlers unnecessarily

### Required (Production Standards)
- Factual precision and technical correctness across all metadata and body copy
- Structured data (`JSON-LD`) that strictly matches observable page content
- W3C semantic HTML and WCAG 2.1 AA accessibility compliance
- Honest, verifiable representation of products, features, and benchmarks
- Self-contained paragraph chunks optimized for vector search embeddings

---

## Framework Philosophy

| Principle | Engineering Meaning |
| :--- | :--- |
| **Framework-aware** | Understand framework specifics (e.g., Nuxt 3 SSR hydration, Next.js App Router metadata). |
| **Framework-agnostic** | Apply core SEO/AEO/GEO IR principles regardless of the underlying stack. |
| **Agent-friendly** | Maintain explicit execution rules; avoid guessing on technical SEO & safety rules. |
| **Incremental** | Safely improve existing codebases without tearing down working infrastructure. |
| **Minimal-dependency** | Prefer native framework APIs before introducing external npm dependencies. |
| **Evidence-driven** | Require verifiable evidence for claims; never hallucinate authority metrics. |

---

## Reference Files

| File | Purpose |
| :--- | :--- |
| `references/seo-checklist.md` | Full technical SEO checklist (status codes, canonicals, Core Web Vitals) |
| `references/aeo-patterns.md` | AEO content structures, direct-answer formatting, and featured snippets |
| `references/geo-strategy.md` | GEO authority engineering, RAG vector chunking, and source citation |
| `references/schema-guide.md` | Production JSON-LD schemas (`Organization`, `Product`, `FAQPage`, `TechArticle`) |
| `references/content-patterns.md` | Page architecture templates for landing pages, docs, and blog routes |
| `templates/robots.txt` | Baseline production-ready `robots.txt` template |
| `templates/sitemap-example.ts` | Dynamic sitemap generation example |
| `templates/metadata-example.ts` | Reusable TypeScript metadata composition patterns |
| `templates/structured-data-example.ts` | Reusable TypeScript JSON-LD schema builder |
| `examples/nuxt/implementation-guide.md` | Nuxt 3-specific SEO module and hook implementation guide |

---

## Definition of Done

An application route is considered fully optimized when:

### SEO Verification
- [x] Search crawlers can discover, crawl, and render all key public routes
- [x] Server-Side Rendering (SSR) outputs complete HTML with correct status codes (200)
- [x] Every public route contains an absolute, self-referential canonical URL
- [x] Unique, descriptive `<title>` (≤60 chars) and `<meta name="description">` (≤150 chars) tags exist
- [x] `robots.txt` is accessible and points to a valid `sitemap.xml`
- [x] Valid semantic HTML5 layout (`<main>`, `<article>`, heading hierarchy `h1 → h2 → h3`) is enforced

### AEO Verification
- [x] Key question headers are followed by explicit 1–2 sentence lead answers
- [x] Entity names, products, and core concepts are explicitly defined without ambiguous pronouns
- [x] Structured data (`JSON-LD`) validates cleanly against Schema.org specifications
- [x] Comparative data is formatted into semantic HTML tables or ordered lists

### GEO Verification
- [x] Brand entity definitions are consistent across all application routes
- [x] Section paragraphs are self-contained and retain contextual meaning when extracted as RAG vector chunks
- [x] All technical claims, statistics, or performance benchmarks cite real, verifiable sources
- [x] Supporting technical documentation or deep-dive guides exist to substantiate authority

---

> **Core Axiom**: Make the application useful to humans first, discoverable by search engines second, extractable for answer engines third, and authoritative enough to become a trusted citation source for generative LLMs over time.
