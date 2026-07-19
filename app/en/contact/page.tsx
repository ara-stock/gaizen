import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact GAIZEN FINANCE. Social links and how to get in touch.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/contact/',
    languages: { ja: 'https://gaizen.xyz/contact/', en: 'https://gaizen.xyz/en/contact/' },
  },
}

export default function EnContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>CONTACT</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Get in Touch</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Questions or feedback about articles? Reach out via social.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { platform: 'X (Twitter)', handle: '@ara_stock', url: 'https://x.com/ara_stock', description: 'Investment thoughts and site updates.' },
          { platform: 'GitHub', handle: 'ara-stock/gaizen', url: 'https://github.com/ara-stock/gaizen', description: 'Source code for this site is open.' },
        ].map(item => (
          <a key={item.platform} href={item.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-lg border transition-colors hover:border-gray-600"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--foreground)' }}>{item.platform}</p>
              <p className="text-xs" style={{ color: 'var(--accent)' }}>{item.handle}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{item.description}</p>
            </div>
            <span className="text-lg" style={{ color: 'var(--muted)' }}>→</span>
          </a>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          For business inquiries or collaboration, please reach out via X (Twitter) DM.
          Individual investment advice is not offered.
        </p>
      </div>
    </div>
  )
}
