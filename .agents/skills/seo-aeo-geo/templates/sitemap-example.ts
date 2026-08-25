/**
 * sitemap-example.ts
 *
 * Sitemap configuration examples for two common scenarios:
 *
 * 1. Framework-neutral: A TypeScript function that generates sitemap XML
 *    directly. Suitable for any Node.js-based server or build tool.
 *
 * 2. Nuxt 3 with @nuxtjs/sitemap: Module configuration for projects
 *    that have installed the official Nuxt sitemap module.
 *
 * NOTE: Only install @nuxtjs/sitemap if your project does not already
 * have a sitemap solution. Use the native approach if you need a simple
 * static sitemap.
 */

// ==========================================================================
// 1. FRAMEWORK-NEUTRAL: Generate sitemap XML directly
// ==========================================================================

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generates a sitemap XML string from a list of URL objects.
 *
 * Usage in an Express/H3/Hono route:
 *
 *   app.get('/sitemap.xml', (req, res) => {
 *     const xml = generateSitemapXml(getSitemapUrls())
 *     res.setHeader('Content-Type', 'application/xml')
 *     res.send(xml)
 *   })
 *
 * Or write to a file during a build step.
 */
function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map((url) => {
      const lastmod = url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : '';
      const changefreq = url.changefreq ? `\n    <changefreq>${url.changefreq}</changefreq>` : '';
      const priority = url.priority !== undefined ? `\n    <priority>${url.priority.toFixed(1)}</priority>` : '';
      return `  <url>
    <loc>${url.loc}</loc>${lastmod}${changefreq}${priority}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Returns the list of URLs to include in the sitemap.
 *
 * RULES:
 * - Include only indexable pages (no login, dashboard, admin)
 * - All URLs must be absolute
 * - Do not include noindex pages
 * - Do not fabricate lastmod dates; use real modification dates
 * - priority is a hint, not a guarantee; keep it simple (1.0 / 0.8 / 0.5)
 */
function getSitemapUrls(): SitemapUrl[] {
  const BASE_URL = 'https://example.com';
  const today = new Date().toISOString().split('T')[0];

  return [
    // Homepage — highest priority
    {
      loc: `${BASE_URL}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0,
    },
    // Core marketing pages
    {
      loc: `${BASE_URL}/features`,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${BASE_URL}/pricing`,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${BASE_URL}/about`,
      changefreq: 'monthly',
      priority: 0.6,
    },
    // Documentation
    {
      loc: `${BASE_URL}/docs`,
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      loc: `${BASE_URL}/docs/getting-started`,
      changefreq: 'monthly',
      priority: 0.7,
    },
    // Blog / articles — dynamically fetched in practice
    {
      loc: `${BASE_URL}/blog/example-article`,
      lastmod: '2024-06-01',
      changefreq: 'yearly',
      priority: 0.5,
    },
  ];
}

// Export for use in build scripts or server handlers
export { generateSitemapXml, getSitemapUrls };
export type { SitemapUrl };

// ==========================================================================
// 2. NUXT 3 with @nuxtjs/sitemap
//    Install: npx nuxi module add @nuxtjs/sitemap
//    Docs: https://nuxtseo.com/sitemap/getting-started/installation
// ==========================================================================

/**
 * Add to nuxt.config.ts:
 *
 * export default defineNuxtConfig({
 *   modules: ['@nuxtjs/sitemap'],
 *
 *   site: {
 *     url: 'https://example.com',
 *     name: 'My App',
 *   },
 *
 *   sitemap: {
 *     // Exclude routes that should not be indexed
 *     exclude: [
 *       '/dashboard/**',
 *       '/admin/**',
 *       '/account/**',
 *       '/login',
 *       '/logout',
 *       '/register',
 *     ],
 *
 *     // For dynamic routes from a CMS or database, provide a route source:
 *     // sources: ['/api/__sitemap__/urls'],
 *
 *     // Set to false to allow crawlers without explicit sitemap ping
 *     // autoLastmod: true,  // enabled by default
 *   },
 * })
 *
 * NOTE: @nuxtjs/sitemap auto-generates sitemap.xml based on your file-based
 * routes. Static routes are detected automatically. Dynamic routes require
 * either a source endpoint or explicit route definitions.
 *
 * ALTERNATIVE (no module): In Nuxt 3 with SSR, you can handle /sitemap.xml
 * as a server route:
 *
 * // server/routes/sitemap.xml.ts
 * import { generateSitemapXml, getSitemapUrls } from '~/utils/sitemap'
 *
 * export default defineEventHandler((event) => {
 *   setHeader(event, 'Content-Type', 'application/xml')
 *   return generateSitemapXml(getSitemapUrls())
 * })
 */
