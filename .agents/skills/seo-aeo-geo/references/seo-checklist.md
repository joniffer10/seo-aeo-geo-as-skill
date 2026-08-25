# SEO Technical Checklist

This checklist covers the full scope of technical SEO for a web application.
Work through items in priority order: P0 → P1 → P2 → P3.

---

## Technical SEO

### Crawlability

| Item | Check | Priority |
|------|-------|----------|
| `robots.txt` exists at `GET /robots.txt` | 200 response, correct content | P0 |
| `robots.txt` does not block important routes | Review `Disallow` rules carefully | P0 |
| `robots.txt` does not use `Disallow: /` for production | Would block all crawling | P0 |
| No `<meta name="robots" content="noindex">` on indexable pages | Check all page components | P0 |
| No `X-Robots-Tag: noindex` header on indexable pages | Check server/CDN config | P0 |
| Important pages are reachable via internal links | No orphan pages for key routes | P1 |
| Redirect chains are ≤1 hop | e.g., `/old` → `/new`, not `/old` → `/mid` → `/new` | P1 |
| No redirect loops | `/a` → `/b` → `/a` | P0 |
| Broken links (4xx) are resolved | Check internal links | P1 |

### Indexability

| Item | Check | Priority |
|------|-------|----------|
| Canonical URL set on every important page | `<link rel="canonical" href="...">` | P1 |
| Canonical points to the correct URL (not a redirect target) | Must resolve to 200 | P1 |
| Paginated content has correct canonical or rel=next/prev | If applicable | P2 |
| Duplicate content uses canonical to designate the preferred URL | Not both indexed | P1 |
| URL parameters that generate duplicate content are handled | Canonical or noindex | P2 |
| `sitemap.xml` exists and is referenced in `robots.txt` | `Sitemap: https://...` | P1 |
| Sitemap includes all important indexable pages | Exclude login, dashboard, admin | P1 |
| Sitemap URLs return 200 | No 4xx or 5xx URLs in sitemap | P1 |
| Sitemap `<lastmod>` is accurate where present | Do not set static future dates | P2 |

### HTTPS and Security

| Item | Check | Priority |
|------|-------|----------|
| Site is served over HTTPS | All important pages | P0 |
| HTTP redirects to HTTPS | 301 permanent redirect | P0 |
| No mixed content (HTTP assets on HTTPS pages) | Images, scripts, CSS | P1 |
| HSTS header set | Strengthens HTTPS enforcement | P2 |

### Rendering

| Item | Check | Priority |
|------|-------|----------|
| Critical content is present in the server-rendered HTML | Not JS-only | P0 |
| `<title>` and meta tags render server-side | Not injected after hydration | P0 |
| JavaScript does not cause content to be hidden before crawl | Use SSR or SSG | P0 |
| Lazy-loaded content that is SEO-relevant is not lazy-loaded | Or has static fallback | P1 |
| 3rd-party scripts do not block rendering of critical content | Check performance | P2 |

### Status Codes

| Item | Check | Priority |
|------|-------|----------|
| Important pages return 200 | Not 302, 404, 500 | P0 |
| 404 pages return HTTP 404 | Not a soft 404 (200 with "not found" content) | P1 |
| Gone pages return 410 | Where permanent removal is intended | P2 |
| Redirected pages use 301 for permanent, 302 for temporary | Don't misuse 302 for permanent moves | P1 |

### Mobile Usability

| Item | Check | Priority |
|------|-------|----------|
| Viewport meta tag is set | `<meta name="viewport" content="width=device-width, initial-scale=1">` | P1 |
| Content is not wider than the viewport | No horizontal scroll | P1 |
| Tap targets are ≥48px | Buttons, links | P2 |
| Text is legible without zooming | Font size ≥16px for body | P2 |

### Performance / Core Web Vitals

| Item | Target | Priority |
|------|--------|----------|
| LCP (Largest Contentful Paint) | < 2.5s | P1 |
| CLS (Cumulative Layout Shift) | < 0.1 | P1 |
| INP (Interaction to Next Paint) | < 200ms | P1 |
| Server response time (TTFB) | < 600ms | P1 |
| Images use modern formats (WebP, AVIF) | Where possible | P2 |
| Critical CSS is inlined or loaded early | No render-blocking CSS | P2 |
| Fonts are preloaded | Where fonts affect LCP | P2 |

### Internal Links and Architecture

| Item | Check | Priority |
|------|-------|----------|
| Every important page is reachable from at least one other page | No orphan pages | P1 |
| Navigation includes links to primary sections | Consistent sitewide nav | P1 |
| Breadcrumbs are present on interior pages | Improves structure and schema | P2 |
| Anchor text is descriptive | Not "click here" or "read more" | P2 |
| Footer links do not create duplicate thin pages | No pagination via footer | P2 |

### Duplicate Content

| Item | Check | Priority |
|------|-------|----------|
| www vs. non-www resolved with canonical or redirect | Not both indexed | P1 |
| Trailing slash handled consistently | `/page` vs. `/page/` — pick one | P1 |
| Printer-friendly or amp versions use canonical | If applicable | P2 |
| Pagination does not create near-duplicate page 1 | Use canonical to page 1 if relevant | P2 |

---

## Metadata

### Title Tag

```html
<title>[Page-Specific Topic] | [Brand Name]</title>
```

| Rule | Detail |
|------|--------|
| Unique per page | No two pages should share a title |
| Describes the page | Not the website |
| ≤60 characters | Prevents truncation in SERPs |
| Includes primary keyword naturally | Do not stuff |
| Homepage: Brand + tagline | e.g., `Acme — Smart Waste Management for Cities` |
| Inner pages: Topic + Brand | e.g., `Waste Collection Schedules | Acme` |

### Meta Description

```html
<meta name="description" content="...">
```

| Rule | Detail |
|------|--------|
| Unique per page | No duplicates |
| ≤160 characters | Prevents truncation |
| Describes what the page offers | Not keyword list |
| Includes a value proposition or call to action where relevant | |
| Does not repeat the title verbatim | |

### Canonical

```html
<link rel="canonical" href="https://example.com/page">
```

| Rule | Detail |
|------|--------|
| Absolute URL | Not relative |
| Points to the current page's preferred URL | Unless consolidating duplicates |
| Present on every indexable page | |
| Consistent with sitemap URLs | |

### Robots Meta Tag

```html
<!-- Default: allow indexing and following -->
<meta name="robots" content="index, follow">

<!-- Block indexing (use carefully) -->
<meta name="robots" content="noindex, nofollow">
```

| Rule | Detail |
|------|--------|
| Only use `noindex` on pages that must not appear in search results | Login, dashboard, admin, staging |
| Never apply `noindex` to pages you want indexed | Obvious but critical |
| `nofollow` on all links is rarely correct | Use per-link `rel="nofollow"` instead |

### Open Graph

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://...">
<meta property="og:url" content="https://...">
<meta property="og:type" content="website">
<meta property="og:site_name" content="...">
```

| Property | Requirement |
|----------|-------------|
| `og:title` | Required. Unique per page. |
| `og:description` | Required. ≤200 characters. |
| `og:image` | Required. Minimum 1200×630px. Absolute URL. |
| `og:url` | Required. Canonical URL of the page. |
| `og:type` | Required. `website` for homepage, `article` for articles. |
| `og:site_name` | Recommended. Consistent brand name. |

### Twitter/X Metadata

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://...">
<meta name="twitter:site" content="@handle">
```

| Property | Requirement |
|----------|-------------|
| `twitter:card` | Required. Use `summary_large_image` for image-rich pages. |
| `twitter:title` | Required. |
| `twitter:description` | Required. |
| `twitter:image` | Required if using `summary_large_image`. Absolute URL. |

---

## Semantic Architecture

### HTML Structure

| Rule | Detail |
|------|--------|
| One `<h1>` per page | Matches the page's primary topic |
| Heading hierarchy: h1 → h2 → h3 | Do not skip levels |
| `<main>` wraps primary content | Not `<div id="main">` |
| `<nav>` wraps navigation | Primary nav, footer nav, breadcrumbs |
| `<article>` wraps self-contained content | Blog posts, documentation articles |
| `<section>` groups related content | With an appropriate heading |
| `<aside>` for supplementary content | Related links, sidebars |
| `<header>` and `<footer>` for page-level landmarks | |
| `<figure>` and `<figcaption>` for images with captions | |

### URL Structure

| Rule | Detail |
|------|--------|
| URLs are lowercase | `/waste-collection`, not `/WasteCollection` |
| Words separated by hyphens | `/waste-collection`, not `/waste_collection` |
| URLs describe the content | `/features/schedule-tracking`, not `/page?id=23` |
| Short and readable | Avoid deeply nested paths unless meaningful |
| Consistent trailing slash policy | Pick one and enforce it |

### Breadcrumbs

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/features">Features</a></li>
    <li aria-current="page">Schedule Tracking</li>
  </ol>
</nav>
```

Breadcrumbs should:
- Reflect the actual URL hierarchy
- Be linked (except current page)
- Be accompanied by `BreadcrumbList` structured data

---

## Structured Data — When to Consider

Structured data must **accurately represent content on the page**. Do not add
schema types for content that does not exist.

| Schema Type | Use When |
|-------------|----------|
| `Organization` | Homepage — describes the company |
| `WebSite` | Homepage — enables sitelinks search box |
| `WebPage` | Generic pages that don't match a more specific type |
| `BreadcrumbList` | Any interior page with a logical hierarchy |
| `SoftwareApplication` | A software product page |
| `Product` | A physical or digital product for purchase |
| `Service` | A service offering page |
| `Article` | Blog posts, news, educational articles |
| `FAQPage` | Pages with genuine FAQ content |
| `Person` | Author profiles, team member pages |
| `LocalBusiness` | Physical location pages |

> See `references/schema-guide.md` for per-type guidance and examples.
