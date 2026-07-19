import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for GAIZEN FINANCE. Covers Google AdSense advertising, cookie usage, analytics, and data handling.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/privacy/',
    languages: { ja: 'https://gaizen.xyz/privacy/', en: 'https://gaizen.xyz/en/privacy/' },
  },
}

export default function EnPrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>LEGAL</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Privacy Policy</h1>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>Last updated: July 2026</p>
      </div>

      <div className="space-y-8">

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>About This Site</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            GAIZEN FINANCE (URL: https://gaizen.xyz) is an independently operated website focused on long-term investing.
            This Privacy Policy explains how user information is handled on this site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Advertising (Google AdSense)</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
            This site uses <strong style={{ color: 'var(--foreground)' }}>Google AdSense</strong> (Google LLC, USA) to display advertisements.
            As part of ad serving, Google and third-party vendors may place or read cookies in your browser or use web beacons,
            IP addresses, and other identifiers to collect information for ad delivery, measurement, and personalization.
          </p>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
            For more information, see{' '}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              How Google uses information from sites or apps that use its services
            </a>.
          </p>
          <div className="p-4 rounded-lg border text-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--muted)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Opt Out of Personalized Ads</p>
            <p className="leading-relaxed mb-2">You can opt out of personalized advertising via the following links:</p>
            <ul className="space-y-1">
              <li>
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                  Google Ads Settings
                </a>
              </li>
              <li>
                <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                  NAI (Network Advertising Initiative) Opt-Out
                </a>
              </li>
            </ul>
          </div>
          <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--muted)' }}>
            In regions where advertising consent is required, a Google-provided consent message may be displayed.
            You can review or change your choices through the privacy settings shown with that message.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Cookies and Local Storage</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
            Cookies and local storage allow websites to retain information in your browser. They may be used on this site for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: 'var(--muted)' }}>
            <li>Saving theme preferences in local storage (dark/light mode)</li>
            <li>Ad delivery, measurement, and personalization through Google AdSense</li>
          </ul>
          <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--muted)' }}>
            You can disable cookies in your browser settings, though some features (such as theme saving) may not function correctly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Analytics</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            This site uses <strong style={{ color: 'var(--foreground)' }}>Cloudflare Web Analytics</strong> for traffic analysis.
            According to Cloudflare, this tool does not use cookies, collect or use visitors&apos; personal data, or track individuals across websites.
            It is used to review aggregate page views, referrers, and page-performance metrics.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Third-Party Links &amp; Referrals</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            This site contains links to external websites and may participate in referral (affiliate) programs.
            We are not responsible for the content or privacy practices of linked sites.
            Please review the privacy policy of each external site independently.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Personal Information</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            This site does not collect personal information directly (no contact forms).
            Any information shared via X (Twitter) DMs for inquiries will be used solely for responding and will not be shared with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Changes to This Policy</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            This policy may be updated at any time without prior notice. The &quot;Last updated&quot; date at the top of this page will reflect any changes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Contact</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            For privacy-related questions, please reach out via the{' '}
            <a href="/en/contact/" style={{ color: 'var(--accent)' }}>Contact page</a>.
          </p>
        </section>

      </div>
    </div>
  )
}
