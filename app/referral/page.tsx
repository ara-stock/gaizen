import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Referral',
  description: '仮想通貨取引所・DEX・エアドロップのリファラルリンクまとめ。Binance Japan, Jupiter, EdgeX, GRVT など。',
  alternates: { canonical: 'https://gaizen.xyz/referral/', languages: { 'en': 'https://gaizen.xyz/en/referral/' } },
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
    label: 'ウォレット',
    items: [
      {
        name: 'OKX Wallet',
        description: 'マルチチェーン対応のWeb3ウォレット。DEX・NFT・DeFiへのアクセスを一元管理。OKXエコシステムとのシームレスな連携が強み。',
        tags: ['Wallet', 'Multi-chain', 'Web3'],
        href: 'https://web3.okx.com/join/ARASTOCK',
      },
    ],
  },
  {
    category: 'CEX',
    label: '中央集権型取引所',
    items: [
      {
        name: 'Binance Japan',
        description: '世界最大手の仮想通貨取引所の日本法人。円建て取引・豊富な銘柄・低手数料が特徴。紹介コードで手数料割引あり。',
        tags: ['CEX', 'Japan', '円建て'],
        href: 'https://s.binance.com/CIASvlL5?ref=GRO_55250_T606B',
      },
    ],
  },
  {
    category: 'DEX',
    label: '分散型取引所',
    items: [
      {
        name: 'Jupiter',
        description: 'Solana上の流動性アグリゲーター。最適ルートでスワップ。JUPトークンのステーキングにも対応。',
        tags: ['Solana', 'Swap', 'Perp'],
        href: 'https://jup.ag/?ref=zmz6ke75ec3p',
      },
      {
        name: 'EdgeX',
        description: 'Solanaベースの高速Perp DEX。低レイテンシで本格的なトレードが可能。',
        tags: ['Solana', 'Perp', '低レイテンシ'],
        href: 'https://pro.edgex.exchange/en-US/referral/MOMIJI',
      },
      {
        name: 'GRVT',
        description: 'ZKベースのハイブリッドDEX。CEX並みのUXとDeFiのセキュリティを両立。',
        tags: ['ZK', 'Hybrid', 'Perp'],
        href: 'https://grvt.io/?ref=arastock',
      },
      {
        name: 'Nado',
        description: 'オンチェーンのソーシャルトレーディングプラットフォーム。$INK トークンのエアドロップに期待。',
        tags: ['Social', '$INK Airdrop'],
        href: 'https://app.nado.xyz?join=bseutrt',
      },
    ],
  },
  {
    category: 'Airdrops',
    label: 'エアドロップ・ポイントプログラム',
    items: [
      {
        name: 'xStocks',
        description: 'オンチェーンで株式トークンを取引できるDeFiプロトコル。ポイントプログラム参加でエアドロップ権利を獲得。',
        tags: ['Points', 'Airdrop', 'Stock Token'],
        href: 'https://defi.xstocks.fi/points?ref=ARACRYPT',
      },
      {
        name: 'Solstice.fi',
        description: 'Solanaエコシステムのイールド最適化プロトコル。流動性提供でポイント獲得。招待コード: rvhjBfkF5q',
        tags: ['Solana', 'Yield', 'DeFi'],
        href: 'https://app.solstice.finance/dashboard',
      },
      {
        name: 'Huma Finance',
        description: 'リアルワールドアセット（RWA）ベースのPayFiプロトコル。安定したイールドを提供。',
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

export default function ReferralPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>REFERRAL</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>リファラルまとめ</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          利用経験または調査内容に基づいて掲載しているサービスのリファラルリンクです。
        </p>
      </div>

      <div className="mb-8 p-4 rounded-lg border text-xs leading-relaxed"
        style={{ backgroundColor: 'rgba(0,201,122,0.05)', borderColor: 'rgba(0,201,122,0.15)', color: 'var(--muted)' }}>
        本ページにはリファラルリンクが含まれます。リンク経由の登録・利用により、読者または運営者に紹介特典・報酬が付与されることがあります。
        掲載サービスの利用・投資判断はご自身でご確認の上、自己責任でお願いします。
      </div>

      <div className="space-y-12">
        {referrals.map(group => {
          const style = CATEGORY_STYLES[group.category] ?? CATEGORY_STYLES.CEX
          return (
            <section key={group.category}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs font-bold px-2.5 py-1 rounded font-mono tracking-wider"
                  style={{ backgroundColor: style.bg, color: style.color }}>
                  {group.category}
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{group.label}</span>
                <span className="text-xs ml-auto tabular-nums" style={{ color: 'var(--muted)' }}>
                  {group.items.length} サービス
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map(item => (
                  <div key={item.name}
                    className="p-5 rounded-lg border flex flex-col"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                    {/* Name */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{item.name}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: 'var(--muted)' }}>
                      {item.description}
                    </p>

                    {/* Tags + CTA */}
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
                        登録 →
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
