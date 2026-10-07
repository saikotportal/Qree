export default function Page() {
  // fixed + inset-0 sizes the shell to the *visible* viewport (no 100vh overshoot
  // behind mobile browser bars), so only the iframe scrolls — never the outer page.
  return (
    <main className="fixed inset-0 overflow-hidden">
      <iframe
        title="QREE QR code generator"
        src="/qree/index.html"
        className="block h-full w-full border-0"
      />
    </main>
  )
}
