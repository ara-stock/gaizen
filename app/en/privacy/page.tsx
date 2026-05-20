import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for GAIZEN FINANCE. Analytics, advertising, and cookie usage.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/privacy',
    languages: { 'ja': 'https://gaizen.xyz/privacy' },
  },
}

export default function EnPrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>LEGAL</p>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Privacy Policy</h1>
      </div>
      <div className="prose max-w-none">
        <h2>Analytics</h2>
        <p>
          This site uses Cloudflare Web Analytics for traffic analysis.
          This tool does not use cookies and does not collect personally identifiable information.
        </p>

        <h2>Advertising</h2>
        <p>
          This site may display advertisements via Google AdSense.
          Google AdSense uses cookies to serve interest-based ads.
          Ad personalization can be disabled via Google&apos;s ad settings.
        </p>

        <h2>Cookies</h2>
        <p>
          Some features of this site use cookies (e.g., theme preference, language preference).
          Cookies can be disabled in your browser settings, though some functionality may not work correctly.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          This site contains links to external sites and may participate in referral programs.
          Please review the privacy policy of each external site independently.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related inquiries, please use the Contact page.
        </p>

        <p className="text-sm" style={{ color: 'var(--muted)' }}>Last updated: May 2026</p>
      </div>
    </div>
  )
}
