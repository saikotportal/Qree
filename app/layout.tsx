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
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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
