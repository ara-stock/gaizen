import { getPortfolioData } from '@/lib/portfolio'
import AllocationChart from '@/components/portfolio/AllocationChart'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: '長期・分散投資のポートフォリオ公開。日本株・米国株・仮想通貨の資産配分と保有銘柄。',
  alternates: { canonical: 'https://gaizen.xyz/portfolio/', languages: { 'en': 'https://gaizen.xyz/en/portfolio/' } },
}

const REGION_STYLE: Record<string, { label: string; color: string }> = {
  JP:     { label: 'Japan',  color: '#00c97a' },
  US:     { label: 'US',     color: '#00a862' },
  Crypto: { label: 'Crypto', color: '#4ade80' },
  DeFi:   { label: 'DeFi',  color: '#86efac' },
}

export default function PortfolioPage() {
  const portfolio = getPortfolioData()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>PORTFOLIO</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>資産ポートフォリオ</h1>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>更新: {portfolio.updatedAt}</p>
      </div>

      {/* Allocation Chart */}
      <section className="mb-16 p-6 sm:p-8 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-sm font-semibold mb-8" style={{ color: 'var(--foreground)' }}>Asset Allocation</h2>
        <AllocationChart assets={portfolio.assets} />
      </section>

      {/* Holdings */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>保有銘柄</h2>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            {portfolio.holdings.reduce((s, g) => s + g.items.length, 0)} 銘柄
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.holdings.map(group => {
            const regionStyle = REGION_STYLE[group.region] ?? REGION_STYLE.JP
            return (
              <div key={group.group} className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{group.group}</h3>
                  <span className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{ backgroundColor: `${regionStyle.color}18`, color: regionStyle.color, border: `1px solid ${regionStyle.color}30` }}>
                    {regionStyle.label}
                  </span>
                </div>
                <div className="space-y-2">
                  {group.items.map(item => (
                    <div key={item.ticker} className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{item.name}</span>
                          {item.ticker.includes('upcoming') || item.name === 'GRVT' ? (
                            <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(107,114,128,0.2)', color: 'var(--muted)', fontSize: '10px' }}>upcoming</span>
                          ) : null}
                        </div>
                        {item.note && (
                          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{item.note}</p>
                        )}
                      </div>
                      <span className="text-xs font-mono flex-shrink-0 mt-0.5" style={{ color: 'var(--muted)' }}>
                        {item.ticker}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Monthly Notes */}
      <section>
        <h2 className="text-sm font-semibold mb-6" style={{ color: 'var(--foreground)' }}>Monthly Notes</h2>
        <div className="space-y-4">
          {portfolio.monthlyNotes.map((note, i) => (
            <div key={i} className="p-5 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-xs font-semibold mb-2 font-mono" style={{ color: 'var(--accent)' }}>{note.month}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{note.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
