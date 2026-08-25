# Nuxt 3 SEO Implementation Guide

This guide covers SEO, AEO, and GEO implementation in a Nuxt 3 application.
It starts with native Nuxt 3 capabilities and only recommends additional
modules when they provide clear, meaningful value.

**Assumption:** You have a working Nuxt 3 project. This guide does not assume
any specific modules are installed.

---

## 1. Understand Your Rendering Strategy

Before implementing anything, identify how your Nuxt 3 app renders:

| Strategy | `nuxt.config.ts` setting | SEO implication |
|----------|--------------------------|-----------------|
| SSR (default) | `ssr: true` | Pages render server-side — metadata is in the HTML response |
| SSG (pre-rendered) | `ssr: true` + `nitro.prerender` | Pages are pre-built — metadata must be set at build time |
| SPA (client-only) | `ssr: false` | Metadata is injected by JS — crawlers may miss it |

**If `ssr: false`**, switch to `ssr: true` before implementing SEO. SPA mode
means `<title>` and `<meta>` tags are not in the server-rendered HTML, which
significantly limits crawler and AI system access to your content.

---

## 2. Global Site Configuration

Nuxt 3 has a built-in `site` config that is used by many SEO-related features:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      // Fallback title — should be overridden on every page
      title: 'My App',
      // Viewport — required for mobile usability
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
      ],
      // Preconnect to external origins used for fonts or CDN
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      ],
    },
  },

  // Runtime config for environment-specific values
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://example.com',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME ?? 'My App',
    },
  },
})
```

---

## 3. Per-Page Metadata with `useSeoMeta`

`useSeoMeta` is the recommended Nuxt 3 composable for page-level metadata.
It is type-safe, SSR-compatible, and handles all common meta tags.

```vue
<!-- pages/features/collection-routes.vue -->
<script setup lang="ts">
const config = useRuntimeConfig()

useSeoMeta({
  title: 'Collection Route Management | My App',
  description:
    'Manage waste collection routes for your municipality. Define zones, assign vehicles, and track schedules in real time.',

  // Open Graph
  ogTitle: 'Collection Route Management | My App',
  ogDescription:
    'Real-time route management for municipal waste collection programs.',
  ogImage: `${config.public.siteUrl}/og/collection-routes.jpg`,
  ogUrl: `${config.public.siteUrl}/features/collection-routes`,
  ogType: 'website',
  ogSiteName: config.public.siteName,

  // Twitter/X
  twitterCard: 'summary_large_image',
  twitterTitle: 'Collection Route Management | My App',
  twitterDescription:
    'Real-time route management for municipal waste collection programs.',
  twitterImage: `${config.public.siteUrl}/og/collection-routes.jpg`,
})

// Canonical — set separately via useHead
useHead({
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}/features/collection-routes`,
    },
  ],
})
</script>
```

### Canonical URL Notes

- Always set canonical as an **absolute URL**
- The canonical must match the URL that appears in your sitemap
- Use `runtimeConfig.public.siteUrl` to avoid hardcoding the domain
- In development, `siteUrl` will be your local URL — ensure `NUXT_PUBLIC_SITE_URL` is set in production

---

## 4. Dynamic Page Metadata

For pages with data fetched from an API or CMS:

```vue
<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const { data: article } = await useFetch(`/api/blog/${route.params.slug}`)

// Guard: ensure data exists before setting metadata
if (article.value) {
  useSeoMeta({
    title: `${article.value.title} | ${config.public.siteName}`,
    description: article.value.excerpt,
    ogTitle: article.value.title,
    ogDescription: article.value.excerpt,
    ogImage: article.value.coverImage ?? `${config.public.siteUrl}/og-default.jpg`,
    ogUrl: `${config.public.siteUrl}/blog/${route.params.slug}`,
    ogType: 'article',
    articlePublishedTime: article.value.publishedAt,
    articleModifiedTime: article.value.updatedAt,
  })

  useHead({
    link: [
      { rel: 'canonical', href: `${config.public.siteUrl}/blog/${route.params.slug}` },
    ],
  })
}
</script>
```

---

## 5. Controlling Robots (noindex)

### Pages that should NOT be indexed

Apply `noindex` on pages that must not appear in search results:

```vue
<!-- pages/dashboard.vue -->
<script setup lang="ts">
useSeoMeta({
  robots: 'noindex, nofollow',
})
</script>
```

Pages that typically require `noindex`:
- `/dashboard`
- `/admin`
- `/account`
- `/login`, `/logout`, `/register`
- `/verify-email`, `/reset-password`
- Staging environments (use environment variable to apply globally)

### Global noindex for staging environments

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        // Only add noindex in non-production environments
        ...(process.env.NODE_ENV !== 'production'
          ? [{ name: 'robots', content: 'noindex, nofollow' }]
          : []),
      ],
    },
  },
})
```

---

## 6. robots.txt

### Native approach (Nuxt server route)

```ts
// server/routes/robots.txt.ts
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl

  setHeader(event, 'Content-Type', 'text/plain')

  return `User-agent: *
Disallow: /dashboard/
Disallow: /admin/
Disallow: /account/
Disallow: /api/
Disallow: /login
Disallow: /logout
Disallow: /register
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`
})
```

### Module approach

If your project uses `@nuxtjs/robots`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/robots'],
  robots: {
    disallow: ['/dashboard', '/admin', '/account', '/api'],
    sitemap: `${process.env.NUXT_PUBLIC_SITE_URL}/sitemap.xml`,
  },
})
```

---

## 7. Sitemap

### Native approach (Nuxt server route)

```ts
// server/routes/sitemap.xml.ts
// See templates/sitemap-example.ts for the generateSitemapXml utility

import { generateSitemapXml, getSitemapUrls } from '~/utils/sitemap'

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/xml')
  return generateSitemapXml(getSitemapUrls())
})
```

### Module approach

If your project uses `@nuxtjs/sitemap`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap'],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    name: 'My App',
  },

  sitemap: {
    exclude: [
      '/dashboard/**',
      '/admin/**',
      '/account/**',
      '/login',
      '/logout',
      '/register',
    ],
    // For dynamic routes from an API:
    // sources: ['/api/__sitemap__/urls'],
  },
})
```

---

## 8. Structured Data (JSON-LD)

### Native approach via `useHead`

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
const config = useRuntimeConfig()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            name: config.public.siteName,
            url: config.public.siteUrl,
            logo: `${config.public.siteUrl}/logo.png`,
            description: 'Your organization description.',
          },
          {
            '@type': 'WebSite',
            name: config.public.siteName,
            url: config.public.siteUrl,
          },
        ],
      }),
    },
  ],
})
</script>
```

> See `templates/structured-data-example.ts` for builder functions that make
> this more maintainable.

### Module approach (nuxt-schema-org)

If your project uses `nuxt-schema-org` (part of the Nuxt SEO suite):

```bash
npx nuxi module add nuxt-schema-org
```

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
useSchemaOrg([
  defineOrganization({
    name: 'My App',
    logo: '/logo.png',
    sameAs: ['https://github.com/my-app'],
  }),
  defineWebSite({
    name: 'My App',
  }),
])
</script>
```

Only install `nuxt-schema-org` if your project will have complex, multi-page
structured data requirements. For simple use cases, `useHead` with JSON-LD
strings is sufficient and has no additional dependencies.

---

## 9. Open Graph Images

OG images significantly affect click-through rates from social sharing and
AI-generated link previews.

### Static OG images

Store OG images in `/public/og/` and reference them with absolute URLs:

```
public/
  og/
    default.jpg        ← 1200×630px, used as fallback
    homepage.jpg
    features.jpg
    collection-routes.jpg
```

### Dynamic OG images

For dynamic pages (blog, documentation), consider generating OG images at
build time using `nuxt-og-image` (part of Nuxt SEO):

```bash
npx nuxi module add nuxt-og-image
```

Only install this if you have many dynamic pages with unique OG image needs.
Static OG images are simpler and sufficient for most applications.

---

## 10. Route-Level Metadata Verification

After implementing metadata, verify it renders correctly:

```bash
# Check server-rendered HTML output
curl -s https://your-site.com/features/collection-routes | grep -E '<title>|<meta|<link rel="canonical"'

# Or in development:
curl -s http://localhost:3000/features/collection-routes | grep -E '<title>|<meta|<link rel="canonical"'
```

The metadata must be present in the raw HTML response, not added by
JavaScript after the page loads. If you only see metadata after opening
DevTools, your metadata is not SSR-rendered.

---

## 11. Module Decision Guide

| Need | Native solution | Module (only if needed) |
|------|----------------|-------------------------|
| Page metadata | `useSeoMeta` + `useHead` | — |
| Canonical URLs | `useHead` link tag | — |
| robots.txt | `server/routes/robots.txt.ts` | `@nuxtjs/robots` |
| Sitemap | `server/routes/sitemap.xml.ts` | `@nuxtjs/sitemap` |
| JSON-LD | `useHead` script tag | `nuxt-schema-org` |
| OG images | Static `/public/og/` images | `nuxt-og-image` |
| Full SEO suite | Mix of above | `@nuxtseo/module` (wraps all) |

**Default to native.** Install a module only when it solves a real problem
that native Nuxt 3 does not handle well (e.g., auto-generating sitemaps for
hundreds of dynamic routes, generating OG images programmatically).

---

## 12. Audit Checklist for Nuxt 3 Projects

Before reporting SEO readiness, verify:

```text
□ ssr: true in nuxt.config.ts
□ NUXT_PUBLIC_SITE_URL is set in production environment
□ useSeoMeta called on every public page
□ <link rel="canonical"> set on every public page
□ noindex applied to all authenticated/private routes
□ robots.txt accessible at /robots.txt and references sitemap
□ sitemap.xml accessible at /sitemap.xml and contains all public pages
□ Sitemap URLs return 200
□ JSON-LD present in server-rendered HTML on homepage and product pages
□ OG image exists and resolves to an image (1200×630px minimum)
□ <title> and <meta description> are unique on every page
□ No two pages share the same title or description
□ Metadata renders in curl output (not JS-injected only)
```
