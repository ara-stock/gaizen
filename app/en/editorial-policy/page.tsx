import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How GAIZEN FINANCE creates and verifies articles, uses first-hand experience and AI assistance, handles advertising, and corrects errors.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/editorial-policy/',
    languages: { ja: 'https://gaizen.xyz/editorial-policy/' },
  },
}

const policies = [
  ['01', 'Help readers make their own decisions', 'Articles organize systems, costs, risks, and comparison criteria. They are not written to push a specific product. When a topic has no single answer, the author’s decision is clearly separated from the broader options available to readers.'],
  ['02', 'Separate first-hand experience from general information', 'Investment mistakes, brokerage use, contribution routines, and asset tracking are identified as the author’s own experience. A personal result is never presented as a universal outcome.'],
  ['03', 'Verify figures and rules with primary sources', 'We prioritize Japan’s Financial Services Agency and National Tax Agency for rules, fund prospectuses and reports for investment products, and company filings for corporate data. Important figures and rules are accompanied by source references and relevant dates.'],
  ['04', 'Disclose risk and conflicts of interest', 'Articles include material risks and disclose relevant holdings where useful. Advertising, affiliate, or referral compensation does not determine editorial conclusions. Compensated links are labeled so readers can identify them.'],
  ['05', 'Use AI as an editorial assistant', 'AI may assist with outlines, editing, translation, and checklists. It does not invent the author’s investing experience or opinions. Topic selection, first-hand commentary, source verification, conclusions, and publication decisions remain with the site owner.'],
  ['06', 'Correct material errors', 'When a rule changes or an error is confirmed, the article is corrected and the updated date is changed for material revisions. Readers can report concerns through the contact details on this site. Product terms should always be checked with the official provider before investing.'],
] as const

export default function EnEditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12 max-w-2xl">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>EDITORIAL POLICY</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>How We Write and Verify</h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          GAIZEN FINANCE is an investing publication where individual investor ara documents real decisions and mistakes. This page explains how articles are produced and checked.
        </p>
        <p className="text-xs mt-4" style={{ color: 'var(--muted)' }}>Last updated: July 2026</p>
      </header>

      <div className="space-y-4">
        {policies.map(([number, title, body]) => (
          <section key={number} className="p-5 sm:p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex gap-4">
              <span className="text-xs font-mono pt-0.5" style={{ color: 'var(--accent)' }}>{number}</span>
              <div>
                <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{body}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-2xl border text-sm leading-relaxed" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
        Read <Link href="/en/about/" style={{ color: 'var(--accent)' }}>About</Link> for the author’s investment philosophy, <Link href="/en/disclaimer/" style={{ color: 'var(--accent)' }}>Disclaimer</Link> for advertising and risk details, and <Link href="/en/contact/" style={{ color: 'var(--accent)' }}>Contact</Link> to report an error.
      </div>
    </div>
  )
}
