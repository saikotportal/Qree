import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'QREE \u2013 Free QR Code Generator',
    template: '%s | QREE',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Saikot Islam Abir', url: 'https://saikot.dev' }],
  creator: 'Saikot Islam Abir',
  keywords: ['QR code generator', 'free QR code', 'QR scanner', 'Wi-Fi QR code', 'custom QR code', 'private QR code'],
  manifest: '/qree/manifest.json',
  alternates: { canonical: '/qree/index.html' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'QREE \u2013 Free QR Code Generator',
    description: SITE_DESCRIPTION,
    url: '/qree/index.html',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'QREE \u2013 Free QR Code Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QREE \u2013 Free QR Code Generator',
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#07080D',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
