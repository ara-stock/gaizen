import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer. Content on this site is not investment advice.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/disclaimer',
    languages: { 'ja': 'https://gaizen.xyz/disclaimer' },
  },
}

export default function EnDisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>LEGAL</p>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Disclaimer</h1>
      </div>
      <div className="prose max-w-none">
        <h2>Not Investment Advice</h2>
        <p>
          The information published on this site (GAIZEN FINANCE) is provided for general informational purposes only.
          Nothing on this site constitutes investment advice, an investment recommendation, or a solicitation to buy or sell any financial product.
        </p>

        <h2>DYOR (Do Your Own Research)</h2>
        <p>
          All investment decisions must be made based on your own research and judgment, at your own risk.
          This site accepts no responsibility for any losses arising from investment actions taken based on information published here.
        </p>

        <h2>Accuracy of Information</h2>
        <p>
          Information on this site is based on the state of knowledge at the time of writing and is not guaranteed to be accurate or complete.
          Market conditions change, and published information may not reflect current reality.
        </p>

        <h2>Past Performance</h2>
        <p>
          Any past performance discussed on this site does not guarantee future results.
          Investing involves risk, including the possible loss of principal.
        </p>

        <h2>External Links</h2>
        <p>
          This site accepts no responsibility for the accuracy or legality of content on linked external sites.
          Some links may be referral links.
        </p>
      </div>
    </div>
  )
}
