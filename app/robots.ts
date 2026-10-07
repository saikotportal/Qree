import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Error pages (403/404/500/503) are noindex via <meta>; they are intentionally
// NOT blocked here so crawlers can fetch them and see that directive.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
