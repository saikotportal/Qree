// Single source of truth for the production origin.
// Set NEXT_PUBLIC_SITE_URL on Vercel (e.g. https://qree.app) - no trailing slash.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://qree.saikot.dev')
).replace(/\/$/, '')

export const SITE_NAME = 'QREE'
export const SITE_DESCRIPTION =
  'Create beautiful, customizable QR codes for links, Wi-Fi, contacts and more. Free, private and no sign-up required.'

// Clean public URLs (next.config.mjs rewrites them to the static files in public/qree).
export const INDEXABLE_PAGES = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' as const },
  { path: '/features', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/templates', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/tools/scanner', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/resources', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
]
