# Content Patterns

Reusable page structures optimized for human readability and machine
comprehension. Each pattern defines a sequence of content blocks that
serve both the user and answer-extraction systems.

Apply these patterns to new pages and evaluate existing pages against them
during an audit.

---

## Product Page

Use for: a primary product, platform, or system that users evaluate before
adopting.

```text
Structure:

1. Direct Definition
   ↳ What is [Product]?
   ↳ One clear paragraph: what it is, who it is for, what it does

2. Problem Statement
   ↳ What problem does [Product] solve?
   ↳ Describe the situation before [Product] exists

3. Solution Summary
   ↳ How does [Product] solve it?
   ↳ High-level mechanism, not feature list

4. Core Features
   ↳ Named features with one-sentence descriptions
   ↳ Group by user-relevant category

5. Benefits
   ↳ Outcomes the user achieves (not capabilities of the product)
   ↳ "Field workers receive real-time updates" not "Real-time update system"

6. Who Is It For?
   ↳ Explicit user/organization types
   ↳ Specific enough to be useful ("Philippine local government units with
     existing waste collection programs")

7. Use Cases
   ↳ 2–4 concrete scenarios where the product is used
   ↳ Named, specific, real-world

8. FAQ
   ↳ 5–10 genuinely common questions with direct answers
   ↳ Pair with FAQPage structured data

9. Call to Action
   ↳ One primary action (get access, contact, sign up, download)
```

### Example: Direct Definition Block

```markdown
## What is eHakot?

eHakot is a digital waste management platform designed for local government
units (LGUs) in the Philippines. It enables municipal administrators to
manage collection routes and schedules, and provides field workers with
real-time job assignments through a dedicated mobile app.
```

---

## Feature Page

Use for: a specific feature within a larger product.

```text
Structure:

1. Feature Definition
   ↳ What is [Feature Name]?
   ↳ One paragraph: what the feature is and what it does

2. Problem This Feature Solves
   ↳ Specific problem, not generic "efficiency improvement"

3. How It Works
   ↳ Step-by-step or mechanism description
   ↳ Name the user roles involved

4. Who Benefits?
   ↳ Which user roles use this feature?
   ↳ What do they get from it?

5. Example
   ↳ A concrete, realistic usage scenario
   ↳ Named roles, named actions, named outcomes

6. Related Features
   ↳ Explicit links to features that work alongside this one
   ↳ Brief description of the relationship
```

### Example: Feature Definition Block

```markdown
## What is Collection Route Management?

Collection Route Management is the eHakot feature that allows municipal
administrators to define, assign, and update waste collection routes within
their jurisdiction. Routes can be scheduled by day and zone, and changes
are reflected immediately in the field worker mobile app.
```

---

## Documentation Page

Use for: technical documentation, user guides, API references, setup guides.

```text
Structure:

1. Overview
   ↳ What does this document cover?
   ↳ Who is this document for?
   ↳ What knowledge/access is assumed?

2. Prerequisites
   ↳ Explicitly list what the reader needs before starting
   ↳ Link to prerequisite setup where applicable

3. Installation / Setup
   ↳ Numbered steps
   ↳ Exact commands, not paraphrases
   ↳ Expected outcome of each step

4. Core Usage
   ↳ The primary workflow, step by step
   ↳ Code examples with context

5. Examples
   ↳ 2–3 realistic, complete examples
   ↳ Show input, configuration, and expected output

6. Configuration Reference
   ↳ Table of all configuration options
   ↳ Name | Type | Default | Description

7. Troubleshooting
   ↳ Common errors with exact error message or symptom
   ↳ Cause
   ↳ Resolution

8. FAQ
   ↳ Questions specific to this feature or integration
```

### Example: Overview Block

```markdown
## Overview

This guide explains how to configure the eHakot Collection Scheduler for
a new municipality. It covers creating zones, defining routes, and assigning
vehicles and field workers.

**Who this is for:** Municipal IT administrators or eHakot system administrators
with an active eHakot account for their municipality.

**Prerequisite:** Your municipality must have a confirmed eHakot account. See
[Getting Access](/docs/getting-access) if you have not yet registered.
```

### Configuration Reference Table Format

```markdown
| Option             | Type    | Default    | Description                                          |
|--------------------|---------|------------|------------------------------------------------------|
| `zone.name`        | string  | (required) | Display name of the collection zone                  |
| `zone.schedule`    | array   | []         | Days of the week collection occurs (e.g., `["Mon", "Thu"]`) |
| `vehicle.id`       | string  | (required) | ID of the assigned vehicle                           |
| `notifyWorkers`    | boolean | true       | Whether to send push notifications to assigned workers |
```

---

## Educational Article

Use for: blog posts, guides, research summaries, how-to articles.

```text
Structure:

1. Direct Answer (Lede)
   ↳ Answer the article's primary question in the first 2–3 sentences
   ↳ Do not bury the answer in an introduction

2. Context
   ↳ Why does this topic matter?
   ↳ What is the current situation that makes this relevant?

3. Explanation
   ↳ Detailed explanation of the topic
   ↳ Use headings to organize sub-topics

4. Examples
   ↳ Concrete, realistic examples
   ↳ Named, specific, verifiable where possible

5. Data and Evidence
   ↳ Reference real data, studies, or documentation
   ↳ Cite sources with URLs
   ↳ Do not fabricate statistics or research

6. Related Questions
   ↳ 3–5 additional questions this article's topic leads to
   ↳ Link to answers where they exist

7. References
   ↳ Numbered citations for data, research, or external claims
```

### Example: Direct Answer Lede

```markdown
# How Do Local Governments Manage Waste Collection Schedules?

Most Philippine local government units manage waste collection schedules
through a combination of paper-based route cards and manual coordination
between administrators and barangay field workers. Digital platforms such as
eHakot are being introduced to automate scheduling, reduce missed collections,
and provide real-time visibility into field operations.
```

Compare this to a vague introduction:

```markdown
# How Do Local Governments Manage Waste Collection Schedules?

Waste management is a critical service that affects the daily lives of millions
of citizens. In recent years, technology has transformed many industries,
including waste management. In this article, we will explore...
```

The vague version delays the answer by three sentences and provides no
extractable information in those three sentences.

---

## General Content Principles

These apply across all page types:

| Principle | Application |
|-----------|-------------|
| **Define before describing** | Introduce an entity before explaining what it does |
| **Name entities explicitly** | Use proper nouns; avoid "it", "they", "the system" |
| **One topic per section** | Each `<h2>` covers exactly one concept |
| **Paragraphs ≤4 sentences** | Long paragraphs reduce extractability |
| **Use tables for comparisons** | More scannable and more extractable than prose |
| **Use numbered lists for sequences** | Order matters; bullets suggest arbitrary order |
| **Use bullets for non-sequential items** | Lists of options, features, requirements |
| **Avoid passive voice for processes** | "The scheduler assigns routes" not "Routes are assigned" |
| **State the actor** | "Administrators define zones" not "Zones are defined" |
| **Quote error messages exactly** | In troubleshooting sections |
| **Link related pages explicitly** | "See [Collection Route Management](/features/routes) for..." |
