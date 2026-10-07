import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const qreePages = new Set([
  'index.html',
  'about.html',
  'features.html',
  'templates.html',
  'resources.html',
  'contact.html',
  'privacy.html',
  'terms.html',
  'tools/scanner.html',
  '403.html',
  '404.html',
  '500.html',
  '503.html',
])

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (!pathname.startsWith('/qree/')) return NextResponse.next()

  const relativePath = pathname.slice('/qree/'.length)
  if (relativePath && !relativePath.includes('/') && !relativePath.includes('.') && !qreePages.has(relativePath)) {
    return NextResponse.rewrite(new URL('/qree/404.html', request.url))
  }

  if (relativePath.endsWith('.html') && !qreePages.has(relativePath)) {
    return NextResponse.rewrite(new URL('/qree/404.html', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/qree/:path*'],
}
