/**
 * structured-data-example.ts
 *
 * Reusable JSON-LD structured data generation for TypeScript web applications.
 *
 * This file provides:
 * 1. Type-safe JSON-LD builder functions for common schema types
 * 2. A combined homepage schema example
 * 3. A product/software page schema example
 * 4. A FAQ page schema example
 * 5. An article page schema example
 * 6. Nuxt 3 injection pattern
 *
 * RULES:
 * - Only add schema for content that exists and is visible on the page
 * - All values must accurately represent actual page content
 * - Do not use schema to mark up content that is not present
 * - Validate output at: https://validator.schema.org/
 */

// ==========================================================================
// TYPES
// ==========================================================================

type SchemaValue = string | number | boolean | SchemaObject | SchemaObject[];

interface SchemaObject {
  '@type': string;
  [key: string]: SchemaValue | undefined;
}

interface JsonLdGraph {
  '@context': 'https://schema.org';
  '@graph': SchemaObject[];
}

// ==========================================================================
// BUILDER FUNCTIONS
// ==========================================================================

/** Organization schema — use on homepage or About page */
function buildOrganization(opts: {
  name: string;
  url: string;
  logo: string;
  description: string;
  email?: string;
  sameAs?: string[];
}): SchemaObject {
  return {
    '@type': 'Organization',
    name: opts.name,
    url: opts.url,
    logo: opts.logo,
    description: opts.description,
    ...(opts.email
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: opts.email,
          },
        }
      : {}),
    ...(opts.sameAs?.length ? { sameAs: opts.sameAs as unknown as SchemaValue } : {}),
  };
}

/** WebSite schema — use on homepage only */
function buildWebSite(opts: {
  name: string;
  url: string;
  /** Optional: only add if site search exists at this URL pattern */
  searchUrl?: string;
}): SchemaObject {
  const base: SchemaObject = {
    '@type': 'WebSite',
    name: opts.name,
    url: opts.url,
  };

  if (opts.searchUrl) {
    base['potentialAction'] = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: opts.searchUrl,
      } as unknown as SchemaValue,
      'query-input': 'required name=search_term_string',
    };
  }

  return base;
}

/** BreadcrumbList schema — use on interior pages */
function buildBreadcrumbs(
  items: Array<{ name: string; url?: string }>
): SchemaObject {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })) as unknown as SchemaValue,
  };
}

/** SoftwareApplication schema — use on software product pages */
function buildSoftwareApplication(opts: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  /** Only include if pricing is publicly stated */
  price?: string;
  priceCurrency?: string;
  priceDescription?: string;
}): SchemaObject {
  return {
    '@type': 'SoftwareApplication',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: opts.applicationCategory,
    operatingSystem: opts.operatingSystem,
    ...(opts.price !== undefined
      ? {
          offers: {
            '@type': 'Offer',
            price: opts.price,
            priceCurrency: opts.priceCurrency ?? 'USD',
            ...(opts.priceDescription ? { description: opts.priceDescription } : {}),
          },
        }
      : {}),
  };
}

/** FAQPage schema — use only when FAQ content is visible on the page */
function buildFaqPage(
  faqs: Array<{ question: string; answer: string }>
): SchemaObject {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })) as unknown as SchemaValue,
  };
}

/** Article schema — use on blog posts, guides, and educational articles */
function buildArticle(opts: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl?: string;
  publisherName: string;
  publisherLogo: string;
}): SchemaObject {
  return {
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: {
      '@type': 'Person',
      name: opts.authorName,
      ...(opts.authorUrl ? { url: opts.authorUrl } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: opts.publisherName,
      logo: {
        '@type': 'ImageObject',
        url: opts.publisherLogo,
      },
    },
  };
}

/** Serializes a schema graph to a JSON-LD string */
function serializeJsonLd(nodes: SchemaObject[]): string {
  const graph: JsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
  return JSON.stringify(graph, null, 2);
}

// ==========================================================================
// USAGE EXAMPLES
// ==========================================================================

// --- Homepage ---
const homepageJsonLd = serializeJsonLd([
  buildOrganization({
    name: 'eHakot',
    url: 'https://ehakot.gov.ph',
    logo: 'https://ehakot.gov.ph/logo.png',
    description:
      'eHakot is a waste management platform for local governments to monitor collection schedules and field activities.',
    email: 'support@ehakot.gov.ph',
    sameAs: ['https://github.com/ehakot', 'https://linkedin.com/company/ehakot'],
  }),
  buildWebSite({
    name: 'eHakot',
    url: 'https://ehakot.gov.ph',
    // searchUrl: 'https://ehakot.gov.ph/search?q={search_term_string}',
    // Only uncomment searchUrl if site search is implemented
  }),
]);

// --- Software product page ---
const productPageJsonLd = serializeJsonLd([
  buildSoftwareApplication({
    name: 'eHakot',
    description:
      'eHakot is a digital waste management platform for Philippine local government units. It provides route management, field scheduling, and real-time monitoring for waste collection operations.',
    url: 'https://ehakot.gov.ph',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    price: '0',
    priceCurrency: 'PHP',
    priceDescription: 'Available to Philippine local government units under the national program.',
  }),
  buildBreadcrumbs([
    { name: 'Home', url: 'https://ehakot.gov.ph' },
    { name: 'Platform' },
  ]),
]);

// --- FAQ page ---
const faqPageJsonLd = serializeJsonLd([
  buildFaqPage([
    {
      question: 'Does eHakot work without an internet connection?',
      answer:
        'eHakot supports offline mode for field workers. Data collected offline is synced automatically when the device reconnects to the internet.',
    },
    {
      question: 'Which government entities can use eHakot?',
      answer:
        'eHakot is available to local government units (LGUs) in the Philippines, including cities and municipalities managing their own waste collection operations.',
    },
    {
      question: 'Is eHakot available on iOS and Android?',
      answer:
        'Yes. eHakot provides native apps for both iOS and Android for field workers. The administrative dashboard is browser-based and accessible on any device.',
    },
  ]),
]);

// --- Article page ---
const articlePageJsonLd = serializeJsonLd([
  buildArticle({
    headline: 'How Local Governments Can Automate Waste Collection Scheduling',
    description:
      'A practical guide to digitizing waste collection management using modern platforms designed for local governments.',
    url: 'https://ehakot.gov.ph/blog/automate-waste-collection-scheduling',
    image: 'https://ehakot.gov.ph/blog/automate-waste-collection-scheduling/cover.jpg',
    datePublished: '2024-03-15',
    dateModified: '2024-06-01',
    authorName: 'Maria Santos',
    authorUrl: 'https://ehakot.gov.ph/team/maria-santos',
    publisherName: 'eHakot',
    publisherLogo: 'https://ehakot.gov.ph/logo.png',
  }),
  buildBreadcrumbs([
    { name: 'Home', url: 'https://ehakot.gov.ph' },
    { name: 'Blog', url: 'https://ehakot.gov.ph/blog' },
    { name: 'Automate Waste Collection Scheduling' },
  ]),
]);

export {
  buildOrganization,
  buildWebSite,
  buildBreadcrumbs,
  buildSoftwareApplication,
  buildFaqPage,
  buildArticle,
  serializeJsonLd,
  homepageJsonLd,
  productPageJsonLd,
  faqPageJsonLd,
  articlePageJsonLd,
};

// ==========================================================================
// NUXT 3 INJECTION PATTERN
//
// Inject JSON-LD into the page <head> using useHead.
// Call this in the <script setup> of each relevant page.
// ==========================================================================

/*
// In a Nuxt 3 page component:

<script setup lang="ts">
import { buildOrganization, buildWebSite, serializeJsonLd } from '~/utils/structured-data'

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: serializeJsonLd([
        buildOrganization({
          name: 'eHakot',
          url: 'https://ehakot.gov.ph',
          logo: 'https://ehakot.gov.ph/logo.png',
          description: 'eHakot is a waste management platform for local governments.',
        }),
        buildWebSite({
          name: 'eHakot',
          url: 'https://ehakot.gov.ph',
        }),
      ]),
    },
  ],
})
</script>

// IMPORTANT: Nuxt 3's useHead sanitizes innerHTML by default in some versions.
// If the script tag is not rendering, use:
//   { type: 'application/ld+json', innerHTML: json, tagPosition: 'head' }
// Or use the nuxt-schema-org module for automatic injection:
//   npx nuxi module add nuxt-schema-org
//   Docs: https://nuxtseo.com/schema-org/getting-started/installation
*/
