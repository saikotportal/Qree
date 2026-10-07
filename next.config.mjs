/** @type {import('next').NextConfig} */

// The QREE site is a set of static files in public/qree. These rules serve
// them from clean, root-level URLs (/, /about, /tools/scanner, /site.css ...)
// and permanently redirect the old /qree/*.html URLs to the clean ones.
const pages = ['about', 'features', 'templates', 'resources', 'contact', 'privacy', 'terms']

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/qree', destination: '/', permanent: true },
      { source: '/qree/index.html', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/qree/tools/scanner.html', destination: '/tools/scanner', permanent: true },
      { source: '/tools/scanner.html', destination: '/tools/scanner', permanent: true },
      ...pages.flatMap((p) => [
        { source: `/qree/${p}.html`, destination: `/${p}`, permanent: true },
        { source: `/${p}.html`, destination: `/${p}`, permanent: true },
      ]),
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/qree/index.html' },
        { source: '/tools/scanner', destination: '/qree/tools/scanner.html' },
        ...pages.map((p) => ({ source: `/${p}`, destination: `/qree/${p}.html` })),
      ],
      // Anything not found in app routes or public/ (site.css, i18n.js, sw.js,
      // manifest.json, tools/jsQR.js ...) is looked up in public/qree.
      fallback: [{ source: '/:path*', destination: '/qree/:path*' }],
    }
  },
}

export default nextConfig
