import { getPortfolioData } from '@/lib/portfolio'
import AllocationChart, { CATEGORY_COLORS } from '@/components/portfolio/AllocationChart'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Long-term, diversified portfolio — asset allocation across Japanese stocks, US stocks, and crypto.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/portfolio/',
    languages: { 'ja': 'https://gaizen.xyz/portfolio/' },
  },
}

const REGION_STYLE: Record<string, { label: string; color: string }> = {
  JP:     { label: 'Japan',  color: '#00c97a' },
  US:     { label: 'US',     color: '#00a862' },
  Crypto: { label: 'Crypto', color: '#4ade80' },
  DeFi:   { label: 'DeFi',  color: '#86efac' },
}

const GROUP_NAMES: Record<string, string> = {
  '商社': 'Trading Co',
  '銀行': 'Banks',
  '保険': 'Insurance',
  '金融': 'Financials',
  '不動産': 'Real Estate',
  '仮想通貨': 'Crypto',
  'Stable運用': 'Stable Yield',
}

const ITEM_NOTES: Record<string, string> = {
  '8058': 'Diversified trading company',
  '8001': 'Strong in non-resource & consumer sectors',
  '8031': 'Resource rights & infrastructure',
  '8053': 'Business hub & equity stakes',
  '8002': 'Power, grain & infrastructure',
  '8020': 'ICT, food & materials',
  '8306': 'Trust banking, benefits from rate hikes',
  '8316': 'Trust banking, benefits from rate hikes',
  '8766': 'Marine, fire & auto insurance',
  '8473': 'Securities, banking & fintech',
  '8591': 'Leasing, financial & real estate diversification',
  '8593': 'Leasing & infrastructure finance',
  '8425': 'Leasing & finance',
  '8801': 'Integrated real estate, commercial & logistics',
  'MSFT': 'Azure + OpenAI investment',
  'GOOGL': 'GCP + Gemini + advertising',
  'AMZN': 'AWS + EC + Prime',
  'NET': 'Edge network & Zero Trust',
  'AAPL': 'Device × AI integration (Apple Intelligence)',
  '9984': 'ARM + OpenAI flywheel',
  'PLTR': 'AI data analytics for government & defense',
  'CRCL': 'USDC issuer & stablecoin infrastructure',
  'BTC': 'Digital gold, long-term hold',
  'JLP': 'Jupiter liquidity pool',
  'OKB': 'OKX ecosystem token',
  'JUP': 'Jupiter governance token',
  'EDGE': 'EdgeX',
  'GRVT': 'upcoming — ZK Perp DEX',
  'JUICED': 'Stablecoin yield',
}

const ASSET_NAMES: Record<string, string> = {
  '日本株': 'JP Stocks',
  '米国株': 'US Stocks',
  '仮想通貨': 'Crypto',
  '金': 'Gold',
  '現金': 'Cash',
}

const ASSET_NOTES: Record<string, string> = {
  '商社・銀行・保険・金融・不動産・AI（個別株）': 'Trading cos, banks, insurance, financials, real estate, AI',
  'eMAXIS Slim S&P500（月次積立）': 'eMAXIS Slim S&P500 (monthly DCA)',
  '個別株': 'Individual stocks',
  'BTC・DeFi': 'BTC · DeFi',
  '純金積立': 'Gold accumulation plan',
  '待機資金・生活防衛資金': 'Emergency fund & standby cash',
}

const MONTHLY_NOTES: Record<string, string> = {
  '2026-05': 'Japanese stocks trending well. TOPIX near highs amid continued yen weakness. S&P 500 also showing resilience. Overall portfolio stable — no rebalancing needed.',
  '2026-04': 'Yen strengthened following Bank of Japan policy changes, temporarily lowering the yen-denominated value of US holdings. Impact was limited given high domestic stock allocation. No change from a long-term perspective.',
}

export default function EnPortfolioPage() {
  const portfolio = getPortfolioData()

  const enAssets = portfolio.assets.map(a => ({
    ...a,
    name: ASSET_NAMES[a.name] ?? a.name,
    note: ASSET_NOTES[a.note ?? ''] ?? a.note,
  }))

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>PORTFOLIO</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Asset Portfolio</h1>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>Updated: {portfolio.updatedAt}</p>
      </div>

      {/* Allocation Chart */}
      <section className="mb-16 p-6 sm:p-8 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-sm font-semibold mb-8" style={{ color: 'var(--foreground)' }}>Asset Allocation</h2>
        <AllocationChart assets={enAssets} />
      </section>

      {/* Holdings */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Holdings</h2>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            {portfolio.holdings.reduce((s, g) => s + g.items.length, 0)} positions
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.holdings.map(group => {
            const regionStyle = REGION_STYLE[group.region] ?? REGION_STYLE.JP
            const groupLabel = GROUP_NAMES[group.group] ?? group.group
            return (
              <div key={group.group} className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{groupLabel}</h3>
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
                          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                            {ITEM_NOTES[item.ticker] ?? item.note}
                          </p>
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
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {MONTHLY_NOTES[note.month] ?? note.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
