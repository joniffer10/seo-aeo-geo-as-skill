# AEO Content Patterns

Answer Engine Optimization (AEO) is about making content **extractable and
understandable** by answer engines, AI systems, and large language models.
This is not a separate strategy from writing useful content — it is a
discipline of writing clearly structured, entity-aware, direct prose.

The goal: a machine should be able to extract a complete, accurate answer from
your content without needing additional context from surrounding pages.

---

## Core Principle

Write for humans first. Then structure content so that machines can extract
complete, accurate answers from it.

The difference between AEO-friendly content and generic content is not
keywords — it is **precision, structure, and entity clarity**.

---

## Pattern 1: Direct Definition First

The most important AEO pattern: **define the subject of the page in the first
paragraph**.

### Poor (vague marketing prose)

```markdown
Welcome to eHakot! We're transforming how communities think about waste.
Our innovative platform empowers cities to create cleaner environments
for future generations.
```

A machine cannot determine what eHakot is, what it does, or who uses it.

### Good (direct definition)

```markdown
## What is eHakot?

eHakot is a smart waste management system designed to help local governments
monitor waste collection schedules and activities in real time.
```

A machine can now extract:
- Entity: eHakot
- Type: smart waste management system
- User: local governments
- Function: monitor waste collection schedules and activities

This pattern applies to every page type: products, features, documentation,
blog articles. **State what the thing is before describing what it does.**

---

## Pattern 2: Question-Based Headings

Use headings that mirror the natural language questions a user would ask.

| Instead of | Use |
|-----------|-----|
| `Overview` | `What is [Product]?` |
| `Capabilities` | `What can [Product] do?` |
| `Getting Started` | `How do I get started with [Product]?` |
| `Pricing` | `How much does [Product] cost?` |
| `Supported platforms` | `Which platforms does [Product] support?` |
| `Benefits` | `Why use [Product] instead of alternatives?` |

Question headings serve two purposes:
1. They signal to answer engines that what follows is a direct answer to that question.
2. They match the actual phrasing of user queries, increasing relevance.

**Do not convert every heading into a question.** Use this pattern where it is
natural and where users genuinely ask the question.

---

## Pattern 3: Answer Blocks

An answer block is a short, self-contained paragraph that directly answers a
question. It should be:
- 1–4 sentences
- Complete without surrounding context
- Entity-explicit (use names, not pronouns)

```markdown
## How does the collection scheduler work?

The eHakot collection scheduler allows administrators to define collection
routes, assign vehicles, and set recurring schedules by zone. Field workers
receive schedule updates through the eHakot mobile app, and completed
collections are logged automatically.
```

A machine can extract this as a standalone answer. Notice:
- Subject named explicitly: "The eHakot collection scheduler"
- Users named: "administrators", "field workers"
- Action described concisely

---

## Pattern 4: FAQ Sections

FAQ sections are high-value for AEO because they package questions and answers
in a predictable, extractable structure. Pair them with `FAQPage` structured data.

### Structure

```markdown
## Frequently Asked Questions

### Does eHakot work without an internet connection?

eHakot supports offline mode for field workers. Data collected offline is
synced automatically when the device reconnects to the internet.

### Can multiple municipalities use the same eHakot instance?

Yes. eHakot supports multi-tenant deployments, allowing regional
administrators to manage several municipalities from a single dashboard.

### Is eHakot available on iOS and Android?

eHakot provides native apps for both iOS and Android for field workers.
The administrative dashboard is browser-based.
```

**FAQ quality rules:**
- Each question must be genuinely common or important
- Each answer must be direct and complete
- Avoid vague answers like "it depends" without explaining what it depends on
- Do not stuff FAQs with keyword-rich questions that no user would ask

---

## Pattern 5: Comparison Tables

Comparison tables are highly extractable by machines and useful for users
making decisions.

```markdown
## How does eHakot compare to manual scheduling?

| Capability             | Manual scheduling | eHakot            |
|------------------------|-------------------|-------------------|
| Real-time tracking     | No                | Yes               |
| Route optimization     | Manual            | Automated         |
| Reporting              | Spreadsheets      | Built-in dashboard|
| Mobile field access    | Not available     | iOS + Android app |
| Multi-municipality     | Requires separate instances | Single deployment |
```

---

## Pattern 6: Entity Definitions

Explicitly define every significant entity the first time it appears on a page.
Do not assume the reader (or machine) has context from other pages.

### Entity types to define explicitly

- **Brand/product**: What it is, who makes it, what it does
- **Technical concepts**: What the term means in this context
- **User roles**: Who each role is and what they do
- **Relationships**: How two entities relate to each other

### Example: defining user roles

```markdown
**Municipal administrators** are city or government staff who configure
zones, routes, and schedules within eHakot. **Field workers** are the
waste collection operatives who receive job assignments and log completed
collections through the eHakot mobile app.
```

---

## Pattern 7: How-To Content

Step-by-step instructions are highly structured and extractable. Use numbered
lists for sequences.

```markdown
## How to create a new collection route in eHakot

1. Log in to the eHakot administrative dashboard.
2. Navigate to **Routes** in the left sidebar.
3. Click **Create new route**.
4. Define the route name, zone, and collection days.
5. Assign a vehicle and driver to the route.
6. Click **Save and activate** to make the route live.

Field workers assigned to the route will see it in their mobile app
the next time they open it.
```

**Formatting rules:**
- Numbered lists for sequential steps
- Bullet lists for non-sequential items
- Bold key interface elements (button names, menu items)
- Include the outcome after the final step

---

## Pattern 8: Concise Definitions

When introducing a term, define it immediately. Do not rely on context.

```markdown
**Zone** — A geographically defined area within a municipality that is
assigned its own collection schedule and vehicle routes in eHakot.
```

Definition format: `**Term** — [concise definition]`

---

## Pattern 9: Explicit Relationships

State relationships between entities in plain language, not just through
navigation structure.

```markdown
A **collection route** belongs to a **zone**. Each zone can have multiple
routes, and each route is assigned to one vehicle and one or more field workers.
Routes are created and managed by municipal administrators in the eHakot
administrative dashboard.
```

This pattern helps machines understand the data model and entity graph of
your product.

---

## Pattern 10: Context Preservation

Every page should be understandable in isolation. Avoid:

- Opening with "As mentioned above..." (nothing is above on this page)
- Using pronouns without a clear antecedent on the current page
- Referring to "the system" without defining which system
- Assuming the reader has visited the homepage

**Test:** Copy the first three paragraphs of a page. Does it clearly explain
what the page is about, who it is for, and what the product/feature does?
If not, revise.

---

## What AEO Is Not

| Not this | Why |
|----------|-----|
| Keyword stuffing | Repetition of keywords degrades readability and trust |
| Writing for bots | The output should be excellent human content that is also machine-readable |
| Adding FAQs that nobody would ask | Fabricated questions degrade the quality signal |
| Hiding structured content in HTML and showing marketing copy to users | This is cloaking and is prohibited |
| Rewriting existing accurate content into vague AI-friendly fluff | Clarity serves both humans and machines |

---

## AEO Audit Questions

Ask these for each important page:

1. Does the first paragraph define what this page is about?
2. Is the primary entity (product, feature, concept) named explicitly?
3. Are user roles defined explicitly?
4. Can a machine extract the main answer without reading the entire page?
5. Are there natural user questions that have no answer on this page?
6. Do headings reflect actual questions users would search for?
7. Are entity relationships stated in plain language?
8. Is any FAQ content present, and is it genuine?
9. Are step-by-step instructions numbered and complete?
10. Can the page be understood without reading other pages?
