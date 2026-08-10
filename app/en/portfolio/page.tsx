import { getPortfolioData } from '@/lib/portfolio'
import AllocationChart from '@/components/portfolio/AllocationChart'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'A long-term portfolio focused on business growth and durability, with allocations and holdings across Japanese stocks, US stocks, crypto assets, and stable-yield strategies.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/portfolio/',
    languages: { ja: 'https://gaizen.xyz/portfolio/', en: 'https://gaizen.xyz/en/portfolio/' },
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
  '8306': 'Potential earnings improvement in a rising-rate environment',
  '8316': 'Potential earnings improvement in a rising-rate environment',
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
  'OKB': 'OKX ecosystem token',
  'JUP': 'Jupiter governance token',
  'EDGE': 'EdgeX',
  'GRVT': 'Derivatives trading infrastructure using ZK technology',
  'MET': 'Meteora liquidity protocol on Solana',
  'JUICED': 'Stable-yield position',
  'PST': 'Stable-yield position on Huma Finance',
  'thUSD': 'Stable-yield position on Theo Network',
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
  'eMAXIS Slim S&P500（長期保有）': 'eMAXIS Slim S&P500 (long-term holding)',
  '個別株': 'Individual stocks',
  'BTC・暗号資産・Stable運用': 'BTC, crypto assets & stable yield',
  '純金積立': 'Gold accumulation plan',
  '待機資金・生活防衛資金': 'Emergency fund & standby cash',
}

const HOLDING_POLICY = [
  'Invest with a five-year or longer horizon, focusing on business growth and durability.',
  'Select Japanese companies in understandable sectors such as trading, banking, insurance, finance, and real estate.',
  'Hold the S&P 500 as one component of the long-term portfolio.',
  'Select individual US stocks after assessing the business and its room for growth.',
  'Separate crypto token holdings from stable-yield strategies and limit exposure to risks I understand.',
  'Accumulate gold through a brokerage plan.',
  'Maintain cash for emergencies and future investment opportunities.',
]

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
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: 'var(--muted)' }}>
          <span>Holdings updated: {portfolio.updatedAt}</span>
          <span>Allocation as of: {portfolio.allocationAsOf}</span>
        </div>
        <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
          The allocation is a month-end snapshot and does not reflect daily market movements.
        </p>
      </div>

      {/* Allocation Chart */}
      <section className="mb-16 p-6 sm:p-8 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-sm font-semibold mb-8" style={{ color: 'var(--foreground)' }}>Asset Allocation</h2>
        <AllocationChart assets={enAssets} />
      </section>

      <section className="mb-16">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>POLICY</p>
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Investment Policy</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {HOLDING_POLICY.map(policy => (
            <li key={policy} className="flex gap-3 p-4 rounded-lg border text-sm leading-relaxed"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--muted)' }}>
              <span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
              <span>{policy}</span>
            </li>
          ))}
        </ul>
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
                        <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{item.name}</span>
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

    </div>
  )
}
