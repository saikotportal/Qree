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

// Real, directly-served pages (the root "/" only embeds index.html in an iframe).
export const INDEXABLE_PAGES = [
  { path: '/qree/index.html', priority: 1.0, changeFrequency: 'monthly' as const },
  { path: '/qree/features.html', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/qree/templates.html', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/qree/tools/scanner.html', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/qree/resources.html', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/qree/about.html', priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/qree/contact.html', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/qree/privacy.html', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/qree/terms.html', priority: 0.3, changeFrequency: 'yearly' as const },
]
