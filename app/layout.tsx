import './globals.css'
import Link from 'next/link'
import type { ReactNode } from 'react'
export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'Sri Lankan Gold Price — Real-Time',
  description: 'Live gold prices in LKR with calculators, charts, and Sri Lankan banks pawning info.',
  other: { 'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || undefined }
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (<html lang="en"><head>
  {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ? (
    <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`} crossOrigin="anonymous" />
  ) : null}
  </head><body className="min-h-screen bg-brand-bg text-white antialiased">
  <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <Link href="/" className="text-lg font-semibold tracking-wide">{process.env.NEXT_PUBLIC_SITE_NAME || 'Sri Lankan Gold Price — Real-Time'}</Link>
      <div className="flex gap-4 text-sm">
        <Link href="/calculator" className="opacity-90 hover:opacity-100">Calculator</Link>
        <Link href="/banks" className="opacity-90 hover:opacity-100">Banks</Link>
        <Link href="/about" className="opacity-90 hover:opacity-100">About</Link>
      </div>
    </nav>
  </header>
  <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
  <footer className="border-t border-white/10 bg-black/40"><div className="mx-auto max-w-6xl px-4 py-6 text-sm opacity-80">© {new Date().getFullYear()} SL Gold Live. For information only. Not investment advice.</div></footer>
  </body></html>)}
