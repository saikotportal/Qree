'use client'

import { useEffect } from 'react'

export default function GlobalError({ reset }: { reset: () => void }) {
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin === window.location.origin && e.data?.qreeRetry) reset()
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [reset])

  // global-error replaces the root layout, so globals.css is not loaded here: styles are inline.
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#07080D' }}>
        <main aria-label="Application error" style={{ minHeight: '100svh', width: '100%' }}>
          <iframe
            title="QREE application error"
            src="/qree/500.html"
            style={{ display: 'block', width: '100%', height: '100svh', border: 0 }}
          />
        </main>
      </body>
    </html>
  )
}
