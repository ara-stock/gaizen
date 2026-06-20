import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Referral',
  description: 'Referral links for crypto exchanges, DEXes, and airdrop programs: Jupiter, EdgeX, GRVT, OKX Wallet, and more.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/referral/',
    languages: { 'ja': 'https://gaizen.xyz/referral/' },
  },
  robots: { index: false, follow: true },
}

type ReferralItem = {
  name: string
  description: string
  tags: string[]
  href: string
  soon?: boolean
}

type ReferralGroup = {
  category: string
  label: string
  items: ReferralItem[]
}

const referrals: ReferralGroup[] = [
  {
    category: 'Wallet',
    label: 'Wallet',
    items: [
      {
        name: 'OKX Wallet',
        description: 'Multi-chain Web3 wallet with unified access to DEXes, NFTs, and DeFi. Deep integration with the OKX ecosystem.',
        tags: ['Wallet', 'Multi-chain', 'Web3'],
        href: 'https://web3.okx.com/join/ARASTOCK',
      },
    ],
  },
  {
    category: 'DEX',
    label: 'Decentralized Exchanges',
    items: [
      {
        name: 'Jupiter',
        description: 'Solana liquidity aggregator for best-route swaps. Also supports JUP token staking.',
        tags: ['Solana', 'Swap', 'Perp'],
        href: 'https://jup.ag/?ref=zmz6ke75ec3p',
      },
      {
        name: 'EdgeX',
        description: 'High-speed Solana-based perp DEX with low latency for serious trading.',
        tags: ['Solana', 'Perp', 'Low Latency'],
        href: 'https://pro.edgex.exchange/en-US/referral/MOMIJI',
      },
      {
        name: 'GRVT',
        description: 'ZK-based hybrid DEX combining CEX-level UX with DeFi-level security.',
        tags: ['ZK', 'Hybrid', 'Perp'],
        href: 'https://grvt.io/?ref=arastock',
      },
      {
        name: 'Nado',
        description: 'On-chain social trading platform. Watching for a potential $INK token airdrop.',
        tags: ['Social', '$INK Airdrop'],
        href: 'https://app.nado.xyz?join=bseutrt',
      },
    ],
  },
  {
    category: 'Airdrops',
    label: 'Airdrops & Point Programs',
    items: [
      {
        name: 'xStocks',
        description: 'DeFi protocol for trading tokenized stocks on-chain. Earn airdrop eligibility through the points program.',
        tags: ['Points', 'Airdrop', 'Stock Token'],
        href: 'https://defi.xstocks.fi/points?ref=ARACRYPT',
      },
      {
        name: 'Solstice.fi',
        description: 'Yield optimization protocol in the Solana ecosystem. Earn points by providing liquidity. Invite code: rvhjBfkF5q',
        tags: ['Solana', 'Yield', 'DeFi'],
        href: 'https://app.solstice.finance/dashboard',
      },
      {
        name: 'Huma Finance',
        description: 'Real-world asset (RWA) based PayFi protocol offering stable yield.',
        tags: ['RWA', 'PayFi', 'Yield'],
        href: 'https://app.huma.finance?ref=7hiETI',
      },
    ],
  },
]

const CATEGORY_STYLES: Record<string, { bg: string; color: string }> = {
  Wallet:   { bg: 'rgba(134,239,172,0.12)', color: '#86efac' },
  CEX:      { bg: 'rgba(0,201,122,0.12)',   color: '#00c97a' },
  DEX:      { bg: 'rgba(0,168,98,0.12)',    color: '#00a862' },
  Airdrops: { bg: 'rgba(78,222,128,0.12)',  color: '#4ade80' },
}

export default function EnReferralPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>REFERRAL</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Referral Links</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Services listed based on personal use or research. Links on this page may be referral links.
        </p>
      </div>

      <div className="mb-8 p-4 rounded-lg border text-xs leading-relaxed"
        style={{ backgroundColor: 'rgba(0,201,122,0.05)', borderColor: 'rgba(0,201,122,0.15)', color: 'var(--muted)' }}>
        This page contains referral links. Registration or use through these links may result in benefits or compensation for the reader or site operator.
        Please do your own research before using any listed service. All investment decisions are your own responsibility.
      </div>

      <div className="space-y-12">
        {referrals.map(group => {
          const style = CATEGORY_STYLES[group.category] ?? CATEGORY_STYLES.CEX
          return (
            <section key={group.category}>
              <div className="flex items-center gap-3 mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs font-bold px-2.5 py-1 rounded font-mono tracking-wider"
                  style={{ backgroundColor: style.bg, color: style.color }}>
                  {group.category}
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{group.label}</span>
                <span className="text-xs ml-auto tabular-nums" style={{ color: 'var(--muted)' }}>
                  {group.items.length} {group.items.length === 1 ? 'service' : 'services'}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map(item => (
                  <div key={item.name}
                    className="p-5 rounded-lg border flex flex-col"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{item.name}</h3>
                    </div>

                    <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: 'var(--muted)' }}>
                      {item.description}
                    </p>

                    <div className="flex items-end justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 rounded font-mono"
                            style={{ backgroundColor: style.bg, color: style.color, fontSize: '10px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a href={item.href} target="_blank" rel="noopener noreferrer sponsored"
                        className="text-xs font-semibold flex-shrink-0 transition-opacity hover:opacity-70"
                        style={{ color: 'var(--accent)' }}>
                        Sign up →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
