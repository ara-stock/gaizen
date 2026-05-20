import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thesis / Now',
  description: 'Current investment themes and positioning. AI infrastructure, energy transition, gold, crypto, stablecoins.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/thesis',
    languages: { 'ja': 'https://gaizen.xyz/thesis' },
  },
}

const themes = [
  {
    id: 'AI',
    title: 'AI Infrastructure',
    status: 'Strong Buy',
    statusColor: '#10b981',
    description: 'Explosive demand for data centers, semiconductors, and power infrastructure as AI adoption accelerates. A diversified position across the AI supply chain — anchored by NVIDIA — is the core thesis.',
    tickers: ['NVDA', 'AMD', 'MSFT', 'GOOGL'],
  },
  {
    id: 'Energy',
    title: 'Energy Transition',
    status: 'Watching',
    statusColor: '#6b7280',
    description: 'The surge in AI data center power demand is running in parallel with the shift to renewable energy — a multi-decade structural theme. Specific stock selection still in research; currently observing.',
    tickers: [],
  },
  {
    id: 'Gold',
    title: 'Gold / Hard Assets',
    status: 'Accumulating',
    statusColor: '#c9a84c',
    description: 'Held as a hedge against geopolitical risk and fiat currency debasement (inflation). Physically supply-constrained hard assets move differently from equities and bonds, providing portfolio diversification. Accumulated via a brokerage gold accumulation program.',
    tickers: ['Gold Accum.'],
  },
  {
    id: 'Crypto',
    title: 'Crypto as Commodity',
    status: 'Strong Hold',
    statusColor: '#10b981',
    description: 'Crypto assets are treated as commodities, not equities — like watches, wine, or art, where core user conviction and effective supply reduction from lost wallets drive price appreciation. Also functions as a geopolitical and inflation hedge alongside gold.',
    tickers: ['BTC', 'JLP', 'OKB', 'JUP', 'EDGE', 'GRVT'],
  },
  {
    id: 'Stablecoin',
    title: 'Stablecoin Yield',
    status: 'Monitoring',
    statusColor: '#6b7280',
    description: 'DeFi yield farming using stablecoins. Can generate attractive returns depending on the interest rate environment. Risk management is the critical variable.',
    tickers: ['USDC', 'USDT'],
  },
  {
    id: 'Payment',
    title: 'Payment & TradFi Bridge',
    status: 'Watching',
    statusColor: '#c9a84c',
    description: 'Visa operates the global card payment network and is expanding USDC settlement via blockchain API — positioned as the bridge between traditional finance and on-chain infrastructure. BNY Mellon is the world\'s largest asset custody firm and is moving into digital asset custody, sitting at the intersection of institutional capital and blockchain.',
    tickers: ['V', 'BK'],
  },
]

export default function EnThesisPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>THESIS / NOW</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Current Investment Themes</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Active themes and current positioning from a long-term perspective.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map(theme => (
          <div key={theme.id} className="p-6 rounded-xl border flex flex-col" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-mono mb-1" style={{ color: 'var(--muted)' }}>{theme.id}</p>
                <h2 className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>{theme.title}</h2>
              </div>
              <span className="text-xs px-2 py-0.5 rounded flex-shrink-0 ml-2" style={{
                backgroundColor: `${theme.statusColor}18`,
                color: theme.statusColor,
                border: `1px solid ${theme.statusColor}30`,
              }}>
                {theme.status}
              </span>
            </div>

            <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: 'var(--muted)' }}>
              {theme.description}
            </p>

            {theme.tickers.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {theme.tickers.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{ backgroundColor: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
