import { redirect } from 'next/navigation'

// The site lives in static pages under /qree. Send the root there so the
// address bar always shows the real page URL (no iframe wrapper).
export default function Page() {
  redirect('/qree/index.html')
}
