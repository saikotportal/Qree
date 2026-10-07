'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[v0] QREE application error', error)
  }, [error])

  // The embedded 500 page asks the app to retry when its "Try again" button is pressed.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin === window.location.origin && e.data?.qreeRetry) reset()
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [reset])

  return (
    <main className="error-frame" aria-label="Server error">
      <iframe title="QREE server error" src="/qree/500.html" />
    </main>
  )
}
