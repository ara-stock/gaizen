import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thesis / Now',
  description: '現在注目している投資テーマと考察。AI・Energy・Gold・BTC・Stablecoin。',
  alternates: { canonical: 'https://gaizen.xyz/thesis/' },
}

const themes = [
  {
    id: 'AI',
    title: 'AI Infrastructure',
    status: 'High Conviction',
    statusColor: '#10b981',
    description: 'AIの普及に伴うデータセンター・半導体・電力インフラ需要を長期テーマとして注視しています。特定銘柄の売買推奨ではなく、個人的な調査対象です。',
    tickers: ['NVDA', 'AMD', 'MSFT', 'GOOGL'],
  },
  {
    id: 'Energy',
    title: 'Energy Transition',
    status: 'Watching',
    statusColor: '#6b7280',
    description: 'AIデータセンターの電力需要急増と再生可能エネルギーへの移行が同時進行しており、長期的に有望なテーマと見ています。ただし具体的な銘柄選定はまだ研究中のため、現時点では様子見スタンスです。',
    tickers: [],
  },
  {
    id: 'Gold',
    title: 'Gold / Hard Assets',
    status: 'Accumulating',
    statusColor: '#c9a84c',
    description: '地政学的リスクの高まりと法定通貨の価値希薄化（インフレ）に対するヘッジとして保有。物理的に供給量が制約されるハードアセットは株式・債券と異なる値動きをするため、ポートフォリオ全体の分散効果をもたらします。証券会社の純金積立で定期積立中。',
    tickers: ['純金積立'],
  },
  {
    id: 'Crypto',
    title: 'Crypto as Commodity',
    status: 'Small Allocation',
    statusColor: '#10b981',
    description: '暗号資産を株式ではなく「商品（コモディティ）」として位置付けています。希少性やコアユーザーの需要を調査していますが、価格変動が大きく、インフレ・地政学リスクへのヘッジ効果も保証されないため、小さな配分に限定しています。',
    tickers: ['BTC', 'JLP', 'OKB', 'JUP', 'EDGE', 'GRVT'],
  },
  {
    id: 'Stablecoin',
    title: 'Stablecoin Yield',
    status: 'Monitoring',
    statusColor: '#6b7280',
    description: 'ステーブルコインを活用したDeFiイールドファーミング。金利環境次第で魅力的なリターンが期待できる。リスク管理が重要。',
    tickers: ['USDC', 'USDT'],
  },
  {
    id: 'Payment',
    title: 'Payment & TradFi Bridge',
    status: 'Watching',
    statusColor: '#c9a84c',
    description: 'Visaはグローバルカード決済ネットワークに加え、ブロックチェーン上でのUSDC決済APIも展開しており、伝統金融と仮想通貨オンチェーンをつなぐインフラとして注目しています。バンクオブニューヨークメロンは世界最大の資産管理・カストディ（資産の安全な保管・管理）会社で、デジタル資産カストディへの参入も進めており、機関投資家マネーとブロックチェーンの接点を担う存在です。',
    tickers: ['V', 'BK'],
  },
]

export default function ThesisPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>THESIS / NOW</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>現在注目しているテーマ</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          長期的な視点で注目しているテーマの個人的な観測リスト。売買推奨ではありません。
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
