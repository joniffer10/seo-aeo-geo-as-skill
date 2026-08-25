---
name: seo-aeo-geo
description: >-
  Production-ready skill for auditing and improving web applications across
  three layers of machine discoverability: SEO (discovery and indexing),
  AEO (answer extraction and entity understanding), and GEO (authority and
  AI citation potential). Designed for Nuxt 3 / Vue / TypeScript projects
  but framework-agnostic in principle. Invoke when building, auditing, or
  improving a web application's visibility and machine comprehension.
---

# SEO + AEO + GEO Optimization Skill

## Purpose

This skill guides a coding agent through a structured, layered audit and
improvement process for web applications. It covers:

- **SEO** — technical discoverability, indexability, metadata, and semantic structure
- **AEO** — content answerability, entity clarity, and machine extraction quality
- **GEO** — authority signals, evidence quality, and AI citation potential

Invoke this skill when:
- Starting a new web application and setting up SEO infrastructure
- Auditing an existing application for SEO, AEO, or GEO gaps
- Improving a specific page type (product, documentation, article)
- Implementing structured data
- Preparing for a launch or public release

---

## Mental Model

The three layers are **sequential dependencies**, not parallel marketing tracks:

```text
SEO = Can machines discover and index us?
       ↓
AEO = Can machines understand and extract our answers?
       ↓
GEO = Do machines have enough evidence and authority to consider
      our brand a useful reference?
```

**SEO is the foundation.** If a page cannot be crawled, rendered, and indexed,
no amount of answer-oriented content or authority-building matters — the page
does not exist from a machine's perspective.

**AEO is the extraction layer.** Once a page is indexed, answer engines and AI
systems need to understand what it says. Clear, structured, entity-aware content
is extractable. Vague marketing prose is not.

**GEO is the long-term authority layer.** Once content is indexed and
understandable, it can be cited by generative AI systems — but only if
independent evidence corroborates its claims and establishes its credibility.

> Do not optimize for GEO while SEO problems remain unsolved.
> Do not optimize for GEO by fabricating evidence.

---

## Layered Hierarchy

```text
SEO
│
├── Discoverability (robots.txt, sitemap, HTTPS, DNS)
├── Crawlability (status codes, redirects, internal links, JS rendering)
├── Indexability (canonical, noindex, duplicate content)
└── Search-engine understanding (metadata, semantic HTML, structured data)
        ↓
AEO
│
├── Clear answers (direct definitions, question-based headings)
├── Question understanding (FAQ patterns, how-to structures)
├── Entity understanding (explicit entity definitions, relationships)
└── Machine-readable content (structured prose, tables, step-by-step)
        ↓
GEO
│
├── Authority (expert content, institutional references)
├── Trust (verifiable claims, transparent authorship)
├── Evidence (documentation, case studies, research)
├── Entity recognition (consistent brand/product descriptions)
└── AI citation potential (authoritative, citable, linkable content)
```

---

## Agent Workflow

Execute these steps **in order**. Do not skip ahead.

```text
 1. Inspect application
    → Read existing files: robots.txt, sitemap, head/metadata, page components
    → Identify framework, rendering mode, routing strategy

 2. Identify framework/rendering architecture
    → SSR, SSG, SPA, hybrid?
    → Nuxt 3, Next.js, plain HTML, other?
    → Existing SEO modules or meta libraries?

 3. Audit technical SEO
    → Check robots.txt is present and correct
    → Check sitemap exists and includes important pages
    → Check canonical URLs on all important pages
    → Check for noindex on pages that should be indexed
    → Check for redirect chains, broken links, missing pages
    → Check HTTPS

 4. Fix blocking SEO issues (P0)
    → Fix robots.txt if it blocks important routes
    → Fix noindex if incorrectly applied
    → Fix broken redirects

 5. Improve metadata (P1)
    → Title: unique, descriptive, ≤60 characters
    → Description: unique, useful, ≤160 characters
    → Canonical: set correctly on every important page
    → Open Graph: og:title, og:description, og:image, og:url
    → Twitter/X: twitter:card, twitter:title, twitter:description, twitter:image

 6. Improve semantic structure (P1)
    → Single <h1> per page
    → Logical heading hierarchy (h1 → h2 → h3)
    → Semantic HTML elements (main, nav, article, section, aside)
    → Meaningful alt text on images
    → Descriptive link text

 7. Implement structured data (P2)
    → Organization on homepage
    → WebSite on homepage
    → WebPage or appropriate type on key pages
    → BreadcrumbList on interior pages
    → Product/SoftwareApplication/Service on product pages
    → FAQPage where FAQ content exists
    → Article on blog/educational content
    → See: references/schema-guide.md

 8. Improve internal linking (P2)
    → Identify orphan pages
    → Link related pages explicitly
    → Use descriptive anchor text

 9. Identify important user questions
    → What would a target user search for?
    → What questions does the product page answer?
    → What questions does the documentation answer?

10. Improve AEO answerability (P1)
    → Product page: direct definition in first paragraph
    → Use question-based headings where appropriate
    → Add FAQ sections to product and documentation pages
    → Make entity relationships explicit
    → See: references/aeo-patterns.md

11. Clarify entities (P2)
    → Define brand, product, and people entities explicitly
    → Ensure entity descriptions are consistent across pages
    → Avoid pronouns without antecedents in machine-facing content

12. Improve documentation (P2)
    → Documentation should follow: Overview → Prerequisites → Usage → Examples
    → Make it understandable without additional context
    → See: references/content-patterns.md

13. Identify GEO authority opportunities (P3)
    → Is there public documentation that can be expanded?
    → Are there case studies or evidence that can be created?
    → Are there industry topics the brand can contribute expert content on?
    → See: references/geo-strategy.md

14. Validate implementation
    → Confirm structured data is valid (schema.org vocabulary)
    → Confirm canonical URLs are correct
    → Confirm metadata renders correctly in SSR/SSG output
    → Confirm robots.txt and sitemap are accessible

15. Report findings and changes
    → Produce a prioritized audit report (see Audit Output format below)
    → List all changes made
    → List remaining recommendations
```

---

## Audit Output Format

After completing the audit, produce a structured report:

```
SEO/AEO/GEO AUDIT — [Application Name]
========================================

SEO
---
P0: [Blocking issues — must fix immediately]
P1: [High impact — fix before launch]
P2: [Improvements — fix soon]
P3: [Long-term — plan for later]

AEO
---
P1: [High impact on answer extractability]
P2: [Content clarity improvements]
P3: [Entity and relationship improvements]

GEO
---
P2: [Authority improvements]
P3: [Long-term evidence and citation opportunities]

========================================
Recommended Action Plan

1. [Highest priority action]
2. [Next action]
...
```

### Priority Model

| Level | Meaning                   | When to address       |
|-------|---------------------------|-----------------------|
| P0    | Blocking                  | Before anything else  |
| P1    | High impact               | Before launch         |
| P2    | Improvement               | Soon after launch     |
| P3    | Long-term authority       | Ongoing               |

Always resolve P0 before P1, P1 before P2, P2 before P3.

---

## Pre-Audit Inspection Checklist

Before making any changes, inspect and record:

```text
□ Framework (Nuxt 3, Next.js, plain HTML, other)
□ Rendering strategy (SSR, SSG, SPA, hybrid)
□ Routing strategy (file-based, manual, hybrid)
□ Existing SEO modules (@nuxtjs/sitemap, @nuxtjs/robots, nuxt-schema-org, etc.)
□ Metadata implementation (useSeoMeta, useHead, custom, none)
□ Sitemap (exists / missing / auto-generated)
□ robots.txt (exists / missing / correct / incorrect)
□ Structured data (present / missing / partial)
□ Content architecture (product pages, docs, blog, landing pages)
□ Analytics/search integrations (GSC, GA, Plausible, etc.)
□ Public vs. private routes (which routes should be indexed?)
```

Never overwrite existing SEO configuration without first reading it.
Prefer incremental, targeted changes over full rewrites.

---

## Safety and Quality Rules

### Prohibited

- Keyword stuffing in content or metadata
- Hidden text or hidden links
- Cloaking (showing different content to crawlers vs. users)
- Fake reviews or testimonials
- Fabricated citations or references
- Fabricated statistics or research
- Fabricated partnerships or users
- Fabricated case studies
- Misleading structured data (marking content as something it is not)
- Mass-generated thin pages
- Doorway pages
- Deceptive redirects
- Blocking legitimate crawlers unnecessarily

### Required

- Factual accuracy in all content and metadata
- Structured data that accurately reflects the page content
- Human-readable content that is genuinely useful
- Accessible HTML (semantic, alt text, labels)
- Honest representation of product, services, and claims
- Verifiable evidence for any claims in GEO-oriented content

---

## Framework Philosophy

| Principle            | Meaning                                                                 |
|----------------------|-------------------------------------------------------------------------|
| Framework-aware      | Know how Nuxt 3 / Vue handles SSR, head management, and routing         |
| Framework-agnostic   | SEO/AEO/GEO concepts apply regardless of framework                      |
| Agent-friendly       | Every decision has explicit rules; do not improvise on safety topics     |
| Incremental          | Improve existing projects; do not rebuild unless explicitly requested   |
| Minimal-dependency   | Use native framework capabilities before installing packages            |
| Evidence-driven      | Do not invent claims, statistics, partnerships, or authority signals    |

---

## Reference Files

| File                                    | Purpose                                         |
|-----------------------------------------|-------------------------------------------------|
| `references/seo-checklist.md`           | Full SEO technical audit checklist              |
| `references/aeo-patterns.md`            | AEO content patterns and answerability guide    |
| `references/geo-strategy.md`            | GEO authority and entity-building strategy      |
| `references/schema-guide.md`            | Structured data types, examples, common errors  |
| `references/content-patterns.md`        | Page structure patterns for key content types   |
| `templates/robots.txt`                  | Safe baseline robots.txt template               |
| `templates/sitemap-example.ts`          | Sitemap configuration example (Nuxt + generic)  |
| `templates/metadata-example.ts`         | Reusable TypeScript metadata composition        |
| `templates/structured-data-example.ts`  | Reusable JSON-LD TypeScript example             |
| `examples/nuxt/implementation-guide.md` | Nuxt 3-specific SEO implementation guide        |

---

## Definition of Done

An application is considered optimized when:

### SEO
- ✓ Search engines can discover important pages
- ✓ Important pages are crawlable (no blocking robots rules, no JS-only rendering without SSR)
- ✓ Important pages are indexable (no incorrect noindex, correct canonical)
- ✓ Canonical URLs are set correctly
- ✓ Metadata is unique and meaningful on every important page
- ✓ Sitemap exists and includes important pages
- ✓ robots.txt is correct and does not block important pages
- ✓ Semantic HTML structure is clear
- ✓ Structured data accurately represents page content

### AEO
- ✓ Pages clearly explain what they are in the first paragraph
- ✓ Important user questions have direct answers
- ✓ Entities (brand, product, people, concepts) are explicitly defined
- ✓ Content can be extracted by machines without losing meaning
- ✓ Documentation is self-contained and understandable
- ✓ Related concepts are explicitly connected via text or links

### GEO
- ✓ Brand identity is consistent across all pages
- ✓ Product and entity relationships are clearly described
- ✓ All claims have supporting evidence or are qualified as estimates
- ✓ Documentation demonstrates expertise in the subject area
- ✓ Supporting authoritative content exists (guides, case studies, research)
- ✓ External references are real and verifiable
- ✓ No artificial authority signals have been fabricated

---

> **Make the application useful to humans first, discoverable by search engines
> second, understandable to answer engines third, and authoritative enough to
> become a trusted reference for generative systems over time.**
