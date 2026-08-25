# Structured Data (Schema.org) Guide

Structured data communicates factual information about your pages to machines
in a vocabulary they understand. All examples in this guide use JSON-LD, the
recommended format.

**Critical rule:** Structured data must accurately represent content visible
on the page. Do not add schema for content that does not exist or is not
visible to users.

---

## Implementation Pattern

JSON-LD is injected into the `<head>` or `<body>` as a `<script>` tag:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "...",
  ...
}
</script>
```

Multiple schema types can be combined in one script block using `@graph`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", ... },
    { "@type": "WebSite", ... }
  ]
}
```

---

## Organization

### When to use
On the homepage. Describes the company, brand, or organization behind the site.

### When NOT to use
On every page. Organization belongs on the homepage or a dedicated About page.

### Required / important properties

| Property | Purpose |
|----------|---------|
| `name` | Official name of the organization |
| `url` | Homepage URL |
| `logo` | Logo image URL |
| `contactPoint` | Contact information |
| `sameAs` | Links to official profiles (LinkedIn, GitHub, social) |
| `description` | Factual description of the organization |

### Example

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "eHakot",
  "url": "https://ehakot.gov.ph",
  "logo": "https://ehakot.gov.ph/logo.png",
  "description": "eHakot is a smart waste management system for local governments.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@ehakot.gov.ph"
  },
  "sameAs": [
    "https://github.com/ehakot",
    "https://linkedin.com/company/ehakot"
  ]
}
```

### Common mistakes
- Setting `logo` to a relative URL (must be absolute)
- Using a description that does not match the page content
- Adding multiple Organization schemas with different names

---

## WebSite

### When to use
On the homepage. Enables the Sitelinks Searchbox in Google Search when paired
with a site search implementation.

### When NOT to use
On every page. One WebSite per domain.

### Required / important properties

| Property | Purpose |
|----------|---------|
| `name` | Brand name |
| `url` | Homepage URL |
| `potentialAction` | SearchAction for sitelinks searchbox (optional) |

### Example

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "eHakot",
  "url": "https://ehakot.gov.ph",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ehakot.gov.ph/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### Common mistakes
- Adding `potentialAction` when no site search exists
- Setting `url` to a URL that is not the homepage

---

## WebPage

### When to use
On generic pages that do not match a more specific schema type. Provides
basic identity information for the page.

### When NOT to use
When a more specific type applies (Article, Product, SoftwareApplication, etc.).

### Required / important properties

| Property | Purpose |
|----------|---------|
| `name` | Page title |
| `url` | Canonical URL of the page |
| `description` | Page description |
| `isPartOf` | Reference to the WebSite |
| `breadcrumb` | BreadcrumbList (can be nested) |

### Example

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "About eHakot",
  "url": "https://ehakot.gov.ph/about",
  "description": "Learn about eHakot, the waste management platform for local governments.",
  "isPartOf": {
    "@type": "WebSite",
    "url": "https://ehakot.gov.ph"
  }
}
```

---

## BreadcrumbList

### When to use
On any interior page with a clear hierarchy. Enhances SERP appearance with
breadcrumb trail.

### When NOT to use
On the homepage (no hierarchy above it).

### Required / important properties

Each `ListItem` requires `position` and `item` (or `name` for the last item).

### Example

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ehakot.gov.ph"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Features",
      "item": "https://ehakot.gov.ph/features"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Collection Scheduling"
    }
  ]
}
```

### Common mistakes
- `position` values not starting at 1 or not being sequential
- Last item having an `item` URL (current page — optional but consistent)
- Breadcrumb not matching the actual URL hierarchy

---

## SoftwareApplication

### When to use
On a product page for a software application.

### When NOT to use
For services that are not software (use `Service`). For physical products (use `Product`).

### Required / important properties

| Property | Purpose |
|----------|---------|
| `name` | Name of the application |
| `applicationCategory` | e.g., `"BusinessApplication"`, `"WebApplication"` |
| `operatingSystem` | e.g., `"Web"`, `"iOS"`, `"Android"` |
| `description` | What the application does |
| `offers` | Pricing information, if publicly available |
| `url` | Product page URL |

### Example

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "eHakot",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, iOS, Android",
  "description": "eHakot is a waste management platform for local governments to monitor collection schedules and field activities.",
  "url": "https://ehakot.gov.ph",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "PHP",
    "description": "Available to Philippine local government units under the national program."
  }
}
```

### Common mistakes
- Setting `offers.price` when pricing is not publicly disclosed
- Using `applicationCategory` values not in the schema.org vocabulary
- Describing features not present in the actual application

---

## FAQPage

### When to use
On a page that contains genuine, user-relevant FAQ content visible on the page.

### When NOT to use
On pages where the FAQ questions are fabricated for SEO. The questions and
answers must exist as visible content on the page.

### Required / important properties

Each FAQ item requires `name` (the question) and `acceptedAnswer.text` (the answer).

### Example

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does eHakot work without an internet connection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "eHakot supports offline mode for field workers. Data collected offline is synced automatically when the device reconnects to the internet."
      }
    },
    {
      "@type": "Question",
      "name": "Which government entities can use eHakot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "eHakot is available to local government units (LGUs) in the Philippines, including cities and municipalities managing their own waste collection operations."
      }
    }
  ]
}
```

### Common mistakes
- FAQ questions that do not appear as visible text on the page
- Vague or unhelpful answers
- More than ~10 FAQs in the schema (keep to genuinely important questions)
- Using markup on a page that is not actually a FAQ page

---

## Article

### When to use
For blog posts, guides, news articles, educational content. Use `TechArticle`
for technical documentation or tutorials.

### Required / important properties

| Property | Purpose |
|----------|---------|
| `headline` | Article title (matches `<h1>`) |
| `author` | Person or Organization who wrote it |
| `datePublished` | ISO 8601 date |
| `dateModified` | ISO 8601 date of last update |
| `description` | Short summary |
| `image` | Representative image |
| `publisher` | Organization |

### Example

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Local Governments Can Automate Waste Collection Scheduling",
  "description": "A practical guide to digitizing waste collection management using modern platforms designed for local governments.",
  "author": {
    "@type": "Person",
    "name": "Maria Santos",
    "url": "https://ehakot.gov.ph/team/maria-santos"
  },
  "publisher": {
    "@type": "Organization",
    "name": "eHakot",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ehakot.gov.ph/logo.png"
    }
  },
  "datePublished": "2024-03-15",
  "dateModified": "2024-06-01",
  "image": "https://ehakot.gov.ph/blog/waste-scheduling-guide/cover.jpg",
  "url": "https://ehakot.gov.ph/blog/waste-scheduling-guide"
}
```

### Common mistakes
- `headline` not matching the actual `<h1>`
- `datePublished` set to a future date
- `dateModified` not updated when content changes
- `image` URL not resolving to an actual image

---

## Person

### When to use
On author bio pages, team member pages, or when attributing authorship to an article.

### When NOT to use
For fictional or anonymized authors.

### Required / important properties

| Property | Purpose |
|----------|---------|
| `name` | Full name |
| `url` | Profile page URL |
| `jobTitle` | Role or title |
| `worksFor` | Organization |
| `sameAs` | Professional profiles |

### Example

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Maria Santos",
  "url": "https://ehakot.gov.ph/team/maria-santos",
  "jobTitle": "Product Manager",
  "worksFor": {
    "@type": "Organization",
    "name": "eHakot"
  },
  "sameAs": [
    "https://linkedin.com/in/mariasantos"
  ]
}
```

---

## Validation

All structured data must be validated before deployment.

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **Google Search Console**: Review the Enhancements section after deployment

Validation confirms:
- JSON-LD is syntactically valid
- Required properties are present
- Enum values match schema.org vocabulary
- No schema errors that would prevent rich result eligibility
