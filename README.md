# QREE — Free QR Code Studio

QREE is a private, browser-first QR code studio. Create, style, scan and export QR codes with no account, no watermark and no server round-trip — your content and uploads stay in your browser.

The QREE site itself is a set of static pages (`public/qree/`) served by a small [Next.js](https://nextjs.org) app that embeds and routes to them.

## Features

- **Create QR codes** for links, text, Wi-Fi, contacts, email and more
- **Customize** colors, shapes, logo, frame and contrast
- **Export** and share your codes, or print them
- **Bulk generation** for producing many codes at once
- **Built-in scanner** (`/qree/tools/scanner.html`) powered by jsQR
- **Templates and resources** pages to get started quickly
- **Light / dark theme** toggle
- **Installable PWA** with offline support via a service worker
- **Back-to-top button**, custom scrollbar and custom text-selection styling across every page

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS 4 / shadcn tooling for the Next.js shell
- Vanilla HTML, CSS and JavaScript for the QREE site in `public/qree/`
- [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) and [jsQR](https://github.com/cozmo/jsQR) for generating and scanning codes

## Getting started

Requirements: Node.js 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Then open <http://localhost:3000> — the root page loads the QREE generator. Pages are also available directly under `/qree/`, for example `/qree/about.html`.

Other scripts:

```bash
pnpm build   # production build
pnpm start   # serve the production build
```

## Project structure

```
.
├── app/                  # Next.js app (layout, root page, error pages)
├── components/ui/        # Shared UI components
├── lib/                  # Utilities
├── proxy.ts              # Routes unknown /qree/* paths to the 404 page
├── public/
│   └── qree/             # The QREE static site
│       ├── index.html    # QR generator
│       ├── about.html, features.html, templates.html,
│       │   resources.html, contact.html, privacy.html, terms.html
│       ├── 403/404/500/503.html   # Error pages
│       ├── tools/        # Scanner and vendored QR libraries
│       ├── site.css, site.js, shared-shell.js, backtop.js, i18n.js, consent.js
│       ├── sw.js         # Service worker (offline cache)
│       └── manifest.json # PWA manifest
└── package.json
```

## Notes

- When you change or add files in `public/qree/`, update the `ASSETS` list and bump the `CACHE` version in `public/qree/sw.js` so returning visitors receive the new files.
- New pages under `public/qree/` must also be added to the `qreePages` set in `proxy.ts`, otherwise they are served as 404.
- The generator page (`index.html`) loads some libraries from public CDNs; the About page and the scanner use locally vendored copies and work fully offline.

## SEO

- `app/robots.ts` and `app/sitemap.ts` generate `/robots.txt` and `/sitemap.xml`; the page list lives in `lib/site.ts`.
- Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://qree.saikot.dev`) in your host's environment variables.
- The static pages in `public/qree/` hold absolute canonical / Open Graph URLs for `https://qree.saikot.dev`. If the domain changes, replace it everywhere:
  `grep -rl "qree.saikot.dev" . --exclude-dir=node_modules | xargs sed -i 's#https://qree.saikot.dev#https://YOUR-DOMAIN#g'`
- Add any new public page to `INDEXABLE_PAGES` in `lib/site.ts` as well as to `proxy.ts`.

## Deployment

The project deploys as a standard Next.js app — for example on [Vercel](https://vercel.com): import the repository and deploy with the default settings.

## Author

Designed and developed by [Saikot Islam Abir](https://saikot.dev).

## Acknowledgements

- [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) by Kazuhiko Arase (MIT)
- [jsQR](https://github.com/cozmo/jsQR) by Cosmo Wolfe (Apache-2.0)
- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) by Denys Kozak (MIT)
