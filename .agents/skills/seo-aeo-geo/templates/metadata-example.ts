/**
 * metadata-example.ts
 *
 * Reusable metadata composition patterns for TypeScript web applications.
 *
 * This file covers:
 * 1. A framework-neutral metadata type and helper
 * 2. Nuxt 3 — useSeoMeta (recommended for Nuxt projects)
 * 3. Nuxt 3 — useHead (for cases not covered by useSeoMeta)
 * 4. Route-level page metadata composition pattern
 *
 * Framework-native capabilities are preferred over third-party packages.
 */

// ==========================================================================
// 1. FRAMEWORK-NEUTRAL: Metadata type definition
// ==========================================================================

export interface PageMetadata {
  /** Page title. Unique per page. Max 60 characters. */
  title: string;
  /** Page description. Unique per page. Max 160 characters. */
  description: string;
  /** Canonical URL. Must be an absolute URL. */
  canonical: string;
  /** Open Graph image. Must be an absolute URL. Min 1200×630px. */
  ogImage?: string;
  /** Robots directive. Defaults to "index, follow". */
  robots?: string;
  /** Whether this page is an article (affects og:type). */
  isArticle?: boolean;
  /** Article publish date (ISO 8601). Only for article pages. */
  datePublished?: string;
  /** Article modified date (ISO 8601). Only for article pages. */
  dateModified?: string;
}

/** Site-wide defaults — override per page. */
export const siteMeta = {
  siteName: 'My App',
  baseUrl: 'https://example.com',
  defaultOgImage: 'https://example.com/og-default.jpg',
  twitterHandle: '@myapp',
} as const;

/**
 * Builds a complete page title string.
 * Inner pages: "Topic | Site Name"
 * Homepage: "Site Name — Tagline"
 */
export function buildTitle(pageTitle: string, isHomepage = false): string {
  if (isHomepage) return pageTitle;
  return `${pageTitle} | ${siteMeta.siteName}`;
}

// ==========================================================================
// 2. NUXT 3: useSeoMeta — recommended primary approach
//
// useSeoMeta is the recommended way to set metadata in Nuxt 3.
// It handles <title>, <meta> tags, Open Graph, and Twitter/X in one call.
// It is SSR-compatible and type-safe.
//
// Docs: https://nuxt.com/docs/api/composables/use-seo-meta
// ==========================================================================

/*
// In a Nuxt 3 page or layout component (pages/*.vue, layouts/*.vue):

<script setup lang="ts">
import { buildTitle, siteMeta } from '~/utils/metadata'

// Example: a product feature page
useSeoMeta({
  // Title — unique per page, max 60 chars
  title: buildTitle('Collection Route Management'),

  // Description — unique per page, max 160 chars
  description:
    'Learn how eHakot Collection Route Management lets municipal administrators define, assign, and update waste collection routes in real time.',

  // Open Graph
  ogTitle: buildTitle('Collection Route Management'),
  ogDescription:
    'eHakot Collection Route Management enables real-time route assignment and scheduling for municipal waste collection programs.',
  ogImage: 'https://example.com/og/collection-routes.jpg',
  ogUrl: 'https://example.com/features/collection-routes',
  ogType: 'website',
  ogSiteName: siteMeta.siteName,

  // Twitter/X
  twitterCard: 'summary_large_image',
  twitterTitle: buildTitle('Collection Route Management'),
  twitterDescription:
    'Real-time route management for municipal waste collection programs.',
  twitterImage: 'https://example.com/og/collection-routes.jpg',
  twitterSite: siteMeta.twitterHandle,

  // Robots — only set when deviating from default (index, follow)
  // robots: 'noindex, nofollow',  // Use for: login, dashboard, admin
})

// Canonical — set via useHead (useSeoMeta does not set canonical)
useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://example.com/features/collection-routes',
    },
  ],
})
</script>
*/

// ==========================================================================
// 3. NUXT 3: useHead — for cases not covered by useSeoMeta
//
// useHead handles arbitrary <head> elements including:
//   - <link rel="canonical">
//   - <link rel="preload">
//   - <script type="application/ld+json">
//   - Custom meta tags not in useSeoMeta
//
// Docs: https://nuxt.com/docs/api/composables/use-head
// ==========================================================================

/*
// Full useHead example (use useSeoMeta for meta tags where possible):

<script setup lang="ts">
useHead({
  title: 'Page Title | My App',
  meta: [
    { name: 'description', content: 'Page description.' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Page Title | My App' },
    { property: 'og:description', content: 'Page description.' },
    { property: 'og:image', content: 'https://example.com/og/page.jpg' },
    { property: 'og:url', content: 'https://example.com/page' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Page Title | My App' },
    { name: 'twitter:description', content: 'Page description.' },
    { name: 'twitter:image', content: 'https://example.com/og/page.jpg' },
  ],
  link: [
    { rel: 'canonical', href: 'https://example.com/page' },
  ],
})
</script>
*/

// ==========================================================================
// 4. NUXT 3: Composable pattern for consistent per-route metadata
//
// Use this pattern to ensure every page sets metadata consistently.
// Place in composables/usePageSeo.ts
// ==========================================================================

/*
// composables/usePageSeo.ts

import type { PageMetadata } from '~/utils/metadata'
import { siteMeta, buildTitle } from '~/utils/metadata'

export function usePageSeo(meta: PageMetadata) {
  const ogType = meta.isArticle ? 'article' : 'website'
  const ogImage = meta.ogImage ?? siteMeta.defaultOgImage

  useSeoMeta({
    title: buildTitle(meta.title),
    description: meta.description,
    ogTitle: buildTitle(meta.title),
    ogDescription: meta.description,
    ogImage,
    ogUrl: meta.canonical,
    ogType,
    ogSiteName: siteMeta.siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: buildTitle(meta.title),
    twitterDescription: meta.description,
    twitterImage: ogImage,
    twitterSite: siteMeta.twitterHandle,
    robots: meta.robots ?? 'index, follow',
    ...(meta.isArticle && meta.datePublished
      ? { articlePublishedTime: meta.datePublished }
      : {}),
    ...(meta.isArticle && meta.dateModified
      ? { articleModifiedTime: meta.dateModified }
      : {}),
  })

  useHead({
    link: [{ rel: 'canonical', href: meta.canonical }],
  })
}

// Usage in a page:
// <script setup lang="ts">
// usePageSeo({
//   title: 'Collection Route Management',
//   description: 'Manage waste collection routes for municipal operations.',
//   canonical: 'https://example.com/features/collection-routes',
//   ogImage: 'https://example.com/og/collection-routes.jpg',
// })
// </script>
*/

// ==========================================================================
// 5. APP-LEVEL DEFAULT METADATA
//
// Set fallback metadata in app.vue or a layout component.
// Per-page metadata set with useSeoMeta/useHead will override these.
// ==========================================================================

/*
// app.vue or layouts/default.vue

<script setup lang="ts">
import { siteMeta } from '~/utils/metadata'

// These are fallback values — pages should always override them
useSeoMeta({
  title: siteMeta.siteName,
  description: 'Default site description — replace this on every page.',
  ogImage: siteMeta.defaultOgImage,
  ogSiteName: siteMeta.siteName,
  twitterCard: 'summary_large_image',
  twitterSite: siteMeta.twitterHandle,
})
</script>
*/
