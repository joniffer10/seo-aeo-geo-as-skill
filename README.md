# agent-skill-seo-aeo-geo

A production-ready reusable agent skill for auditing and improving web
applications across three layers of machine discoverability:

| Layer | Question answered |
|-------|-------------------|
| **SEO** | Can machines discover and index us? |
| **AEO** | Can machines understand and extract our answers? |
| **GEO** | Do machines have enough evidence and authority to consider our brand a useful reference? |

Designed for use with **Antigravity (AGY)** coding agents. Optimized for
**Nuxt 3 / Vue / TypeScript** projects, but framework-agnostic in principle.

---

## Core Philosophy

SEO, AEO, and GEO are not three unrelated marketing techniques.
They are **three sequential layers of machine discoverability and understanding**:

```text
SEO  →  Discoverability, crawlability, indexability, search-engine understanding
  ↓
AEO  →  Clear answers, entity understanding, machine-readable content
  ↓
GEO  →  Authority, trust, evidence, AI citation potential
```

> Make the application useful to humans first, discoverable by search engines
> second, understandable to answer engines third, and authoritative enough to
> become a trusted reference for generative systems over time.

---

## Skill Structure

```text
.agents/skills/seo-aeo-geo/
├── SKILL.md                              ← Primary agent instructions
├── references/
│   ├── seo-checklist.md                  ← Technical SEO audit checklist (P0–P3)
│   ├── aeo-patterns.md                   ← AEO content patterns and examples
│   ├── geo-strategy.md                   ← GEO authority and entity-building strategy
│   ├── schema-guide.md                   ← Structured data guide (7 schema types)
│   └── content-patterns.md              ← Page structure patterns for key content types
├── templates/
│   ├── robots.txt                        ← Safe baseline robots.txt with commentary
│   ├── sitemap-example.ts                ← Sitemap generator + Nuxt 3 module config
│   ├── metadata-example.ts               ← useSeoMeta / useHead / usePageSeo composable
│   └── structured-data-example.ts        ← Type-safe JSON-LD builder functions
└── examples/
    └── nuxt/
        └── implementation-guide.md       ← Nuxt 3 SEO implementation guide
```

---

## How It Works

This skill is auto-discovered by [Antigravity (AGY)](https://antigravity.dev)
when placed in the `.agents/skills/` directory at a project root.

When activated, the agent follows a structured 15-step workflow:

1. Inspect the application
2. Identify framework and rendering architecture
3. Audit technical SEO
4. Fix blocking SEO issues (P0)
5. Improve metadata (P1)
6. Improve semantic structure
7. Implement structured data
8. Improve internal linking
9. Identify important user questions
10. Improve AEO answerability
11. Clarify entities
12. Improve documentation
13. Identify GEO authority opportunities
14. Validate implementation
15. Report findings and changes

The agent will not skip to GEO while fundamental SEO problems remain unsolved.

---

## Audit Output Format

The skill produces a structured, prioritized audit report:

```
SEO/AEO/GEO AUDIT — [Application Name]

SEO
P0: robots.txt blocks /docs
P1: Missing canonical URLs
P1: Homepage has generic title
P2: Missing Organization schema

AEO
P1: Product page does not directly define the product
P2: No answer-oriented FAQ
P2: Entity relationships unclear

GEO
P2: No public documentation
P2: No case studies
P3: Weak external authority footprint

Recommended Action Plan
1. Fix robots.txt
2. Implement canonical URLs
3. Improve metadata
4. Add Organization/Product structured data
5. Rewrite product introduction as a direct answer
6. Create documentation
```

### Priority Model

| Level | Meaning | When to address |
|-------|---------|----------------|
| P0 | Blocking | Immediately — before anything else |
| P1 | High impact | Before launch |
| P2 | Improvement | Soon after launch |
| P3 | Long-term authority | Ongoing |

---

## Templates

| Template | Description |
|----------|-------------|
| [`robots.txt`](.agents/skills/seo-aeo-geo/templates/robots.txt) | Safe baseline with AI crawler commentary |
| [`sitemap-example.ts`](.agents/skills/seo-aeo-geo/templates/sitemap-example.ts) | Framework-neutral XML generator + Nuxt 3 config |
| [`metadata-example.ts`](.agents/skills/seo-aeo-geo/templates/metadata-example.ts) | `useSeoMeta`, `useHead`, reusable `usePageSeo` composable |
| [`structured-data-example.ts`](.agents/skills/seo-aeo-geo/templates/structured-data-example.ts) | Type-safe JSON-LD builders for 6 schema types |

---

## References

| Reference | Description |
|-----------|-------------|
| [`seo-checklist.md`](.agents/skills/seo-aeo-geo/references/seo-checklist.md) | Full technical SEO checklist with priority tables |
| [`aeo-patterns.md`](.agents/skills/seo-aeo-geo/references/aeo-patterns.md) | 10 AEO content patterns with before/after examples |
| [`geo-strategy.md`](.agents/skills/seo-aeo-geo/references/geo-strategy.md) | Earned vs. claimed authority; GEO pillars |
| [`schema-guide.md`](.agents/skills/seo-aeo-geo/references/schema-guide.md) | When to use each schema type, examples, common mistakes |
| [`content-patterns.md`](.agents/skills/seo-aeo-geo/references/content-patterns.md) | Page structures for product, feature, docs, and article pages |

---

## Nuxt 3 Implementation

See [`examples/nuxt/implementation-guide.md`](.agents/skills/seo-aeo-geo/examples/nuxt/implementation-guide.md) for:

- SSR vs. SSG configuration
- `useSeoMeta` and `useHead` patterns
- Canonical URL implementation
- Per-route and dynamic page metadata
- robots.txt and sitemap (native + module approaches)
- JSON-LD injection
- When to install modules vs. using native Nuxt 3 capabilities

---

## Safety and Quality Rules

This skill explicitly prohibits:

- Keyword stuffing, hidden text, cloaking
- Fake reviews, citations, statistics, or partnerships
- Misleading structured data
- Mass-generated thin content or doorway pages
- Blocking legitimate crawlers unnecessarily

This skill requires:

- Factual accuracy in all content and metadata
- Structured data that accurately reflects visible page content
- Verifiable evidence for any authority claims
- Human-readable content that is genuinely useful

---

## Framework Compatibility

| Framework | Support level |
|-----------|--------------|
| Nuxt 3 / Vue | Full — dedicated examples and templates |
| Next.js | Conceptually compatible — adapt TypeScript examples |
| Plain HTML / other | Full — all concepts and checklists apply |

---

## License

[MIT](LICENSE)
