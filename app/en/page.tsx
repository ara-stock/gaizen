import Link from 'next/link'
import type { Metadata } from 'next'
import { getProjectsData } from '@/lib/projects'
import TrackerBoard from '@/components/tracker/TrackerBoard'

export const metadata: Metadata = {
  title: { absolute: 'GAIZEN FINANCE | Airdrop' },
  description: 'The crypto airdrop and points programs the author actually takes part in, listed by TGE timing, progress, VC funding, X followers and team base.',
  alternates: { canonical: 'https://gaizen.xyz/en/', languages: { ja: 'https://gaizen.xyz/', en: 'https://gaizen.xyz/en/' } },
  openGraph: { locale: 'en_US' },
}

export default function EnglishHomePage() {
  const { projects, updatedAt } = getProjectsData('en')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Airdrop</h1>
        <p className="text-sm leading-relaxed max-w-3xl" style={{ color: 'var(--muted)' }}>
          The airdrop and points programs the author is taking part in or considering. Funding, team and TGE timing are checked against official
          announcements and press reports, with sources on each project&apos;s page.
        </p>
        <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>Updated: {updatedAt}</p>
      </div>

      <TrackerBoard projects={projects} locale="en" />

      <section className="mt-12 p-5 rounded-xl border text-xs leading-relaxed" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--muted)' }}>
        <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>How to read this page</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Projects are grouped by how the author takes part: perp trading, DeFi lending, staking, points and holding. Click a column heading to sort. The default order is the author&apos;s recommendation. &quot;Main&quot; marks what the author focuses on most; &quot;Side only&quot; marks projects used for a limited reason, such as a one-off event.</li>
          <li>In the staking and holding groups, &quot;FDV ÷ revenue&quot; is the fully diluted valuation divided by the last 365 days of revenue (the line below uses the last 90 days × 4). The author treats 5x or less as cheap and highlights those. The denominator is revenue, not profit.</li>
          <li>The phase (early, mid, late) is the author&apos;s judgment from how long the points program has run and how close the TGE is. The reasoning is on each project&apos;s page.</li>
          <li>X followers are a rough gauge of reach. They include bots and dormant accounts and do not match actual users.</li>
          <li>&quot;Start&quot; buttons are referral links. The author may be rewarded when you sign up or trade. What is written here is not tied to those rewards.</li>
          <li>Airdrops and points have no guaranteed value. A TGE may never happen, you may be excluded from the distribution, and you can lose the funds you deposit.</li>
          <li>The author is based in Japan, and some notes describe access from Japan. Check whether each service is available where you live, and your own tax obligations. See the <Link href="/disclaimer/" className="underline" style={{ color: 'var(--accent)' }}>disclaimer</Link> (Japanese).</li>
        </ul>
      </section>
    </div>
  )
}
