import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-24" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="text-xs tracking-widest font-bold mb-4">
              <span style={{ color: 'var(--foreground)' }}>GAIZEN</span>
              <span style={{ color: 'var(--accent)' }}> FINANCE</span>
            </p>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
              Invest grow breathe.<br />
              資産形成で、ゆとりを。
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://x.com/ara_stock"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @ara_stock
              </a>
              <a
                href="https://github.com/ara-stock/gaizen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                ara-stock/gaizen
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-wider font-semibold mb-4" style={{ color: 'var(--muted)' }}>CONTENT</p>
            <div className="flex flex-col gap-2">
              {[
                ['Blog', '/blog'],
                ['Portfolio', '/portfolio'],
                ['Thesis', '/thesis'],
                ['About', '/about'],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="text-xs" style={{ color: 'var(--muted)' }}>{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-wider font-semibold mb-4" style={{ color: 'var(--muted)' }}>TOOLS</p>
            <div className="flex flex-col gap-2">
              {[
                ['ポートフォリオ配分', '/tools/allocation'],
                ['FIREシミュレーター', '/tools/fire'],
                ['シャープレシオ', '/tools/sharpe'],
                ['不動産利回り', '/tools/realestate'],
                ['Referral', '/referral'],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="text-xs" style={{ color: 'var(--muted)' }}>{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-wider font-semibold mb-4" style={{ color: 'var(--muted)' }}>LEGAL</p>
            <div className="flex flex-col gap-2">
              {[
                ['Disclaimer', '/disclaimer'],
                ['Privacy Policy', '/privacy'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="text-xs" style={{ color: 'var(--muted)' }}>{label}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} GAIZEN FINANCE. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            本サイトの情報は投資助言ではありません。投資は自己責任で。
          </p>
        </div>
      </div>
    </footer>
  )
}
