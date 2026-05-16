import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: '長期・分散・積立を軸にした投資方針。バフェット流の「理解できるものへの投資」と事業の継続性・拡張性を重視した個別株選定の考え方。',
}

const principles = [
  {
    number: '01',
    title: '現在事業の利益創出力・持続性・将来性で投資先を評価する',
    body: '①今の事業が利益を生んでいるか、②競合に奪われにくく収益が長続きするか、③そこから将来どう広がるか——この3軸を自分の言葉で説明できない銘柄には投資しない。',
  },
  {
    number: '02',
    title: '時価総額の大きい銘柄を中心に選ぶ',
    body: '財務体力があり、市場シェアが高い企業はブランド力や顧客の乗り換えコスト（スイッチングコスト）が強い。業界トップクラスは景気後退時にも相対的に安定しやすく、長期保有に向いている。',
  },
  {
    number: '03',
    title: '理解できる銘柄にのみ投資する',
    body: '事業の仕組み・収益構造・競争優位性を自分の言葉で説明できる企業だけに絞る。知識が深いほど割安・割高の判断精度が上がり、相場の揺れに動じにくくなる。',
  },
  {
    number: '04',
    title: 'コア・サテライト構造で長期保有する',
    body: 'NISA積立枠でS&P500インデックスを毎月積立（コア）し、NISA成長投資枠・特定口座で個別株のαを狙う（サテライト）。どちらも5年以上の長期視点で保有し、資産クラスと地域の両軸で分散する。',
  },
]

const sectors = [
  {
    sector: '商社',
    region: 'JP',
    reason: '権益 × 事業ハブ × 身軽さ',
    detail: '資源・エネルギー・食料などの権益を保有しつつ、各産業の事業導入ハブとして機能します。製造物を持たない身軽さゆえに資本効率が高く、継続的なキャッシュフローが期待できます。',
    examples: ['三菱商事', '伊藤忠商事', '三井物産', '住友商事', '丸紅', '兼松'],
  },
  {
    sector: '銀行',
    region: 'JP',
    reason: '信託報酬 × 金利上昇の恩恵',
    detail: '投資信託の組成・販売によって自動的に信託報酬が入り続ける収益構造があります。金利上昇局面では利ざやの拡大という直接的なメリットも享受できます。',
    examples: ['三菱UFJ FG', '三井住友 FG'],
  },
  {
    sector: '保険',
    region: 'JP',
    reason: '加入が必須・準必須のサービス',
    detail: '海上・火災・自動車保険は法令や社会慣習上「加入が必須またはほぼ必然」となるサービスです。景気に左右されにくい安定した保険料収入が見込めます。',
    examples: ['東京海上HD'],
  },
  {
    sector: '金融',
    region: 'JP',
    reason: 'Fintech × リース × 多角化',
    detail: 'SBIは証券・銀行・暗号資産を横断するFintechプラットフォーム。オリックス・三菱HCキャピタル・みずほリースはリースとインフラファイナンスで安定したキャッシュフローを持ちます。',
    examples: ['SBIホールディングス', 'オリックス', '三菱HCキャピタル', 'みずほリース'],
  },
  {
    sector: '不動産',
    region: 'JP',
    reason: '総合不動産 × 物流 × 商業',
    detail: '三井不動産は住宅・商業・物流・ホテルに分散した総合不動産デベロッパー。安定した賃料収入と再開発案件による含み益の両方が期待できます。',
    examples: ['三井不動産'],
  },
  {
    sector: 'AI / Cloud',
    region: 'US',
    reason: '現在の収益性 × AI拡張',
    detail: 'Microsoft（Azure+OpenAI）、Alphabet（GCP+Gemini+広告）、Amazon（AWS）はそれぞれ強固な収益基盤の上にAIインフラを展開。Cloudflareはエッジネットワークとゼロトラストセキュリティで高成長を続けます。',
    examples: ['Microsoft', 'Alphabet', 'Amazon', 'Cloudflare'],
  },
  {
    sector: 'Hardware / AI Infra',
    region: 'US',
    reason: 'チップ設計 × デバイス × AIフライホイール',
    detail: 'Appleはデバイス × Apple Intelligenceの統合でオンデバイスAIのハードウェアレイヤーを握ります。ソフトバンクHDはARMのIPライセンスとOpenAI出資を通じ、AIインフラの起点に位置します。',
    examples: ['Apple', 'ソフトバンクHD'],
  },
  {
    sector: 'Defense / Data',
    region: 'US',
    reason: '政府・軍事向けAIデータ分析',
    detail: 'Palantirは政府・国防機関向けのAIデータ分析プラットフォームを提供。公共セクターの長期契約に基づく安定収益と、商業部門への展開が進行中です。',
    examples: ['Palantir'],
  },
  {
    sector: 'Fintech / Crypto Infra',
    region: 'US',
    reason: 'ステーブルコインインフラ',
    detail: 'Circle InternetはUSDCの発行体としてステーブルコインインフラの中心に位置します。規制整備が進むにつれてその存在感はさらに増すと考えています。',
    examples: ['Circle Internet'],
  },
  {
    sector: '金（ゴールド）',
    region: 'Global',
    reason: '地政学・インフレヘッジ',
    detail: '地政学的リスクの高まりや法定通貨の価値希薄化（インフレ）に対するヘッジとして保有。物理的に供給量が制約されるハードアセットとして、株式・債券と異なる値動きをする点が分散効果をもたらします。証券会社の純金積立を通じて定期積立しています。',
    examples: ['純金積立'],
  },
  {
    sector: '仮想通貨',
    region: 'Crypto',
    reason: '商品ポジション × 供給不足期待',
    detail: '暗号資産を株式ではなく「商品（コモディティ）」として位置付けています。腕時計・ワイン・絵画のように、コアなユーザーの熱狂やウォレット紛失などによる実質的な供給減少が価格を押し上げると考えています。金と同様、地政学リスク・インフレへのヘッジとしても機能します。',
    examples: ['BTC', 'JLP', 'OKB', 'JUP', 'EDGE', 'GRVT'],
  },
]

const REGION_COLOR: Record<string, string> = {
  JP: '#00c97a',
  US: '#00a862',
  Crypto: '#4ade80',
  Global: '#86efac',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-14">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>ABOUT</p>
        <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>投資方針</h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          長期・分散・積立を軸に、「理解できるものへの投資」と「事業の継続性・拡張性」を重視した個別株選定を組み合わせています。
        </p>
      </div>

      {/* Core Principles */}
      <section className="mb-16">
        <p className="text-xs tracking-widest mb-6 font-semibold" style={{ color: 'var(--accent)' }}>CORE PRINCIPLES</p>
        <div className="space-y-4">
          {principles.map(p => (
            <div key={p.number} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-start gap-4">
                <span className="text-xs font-bold font-mono flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>{p.number}</span>
                <div>
                  <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{p.title}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case studies */}
      <section className="mb-16">
        <p className="text-xs tracking-widest mb-6 font-semibold" style={{ color: 'var(--accent)' }}>CASE STUDY</p>
        <div className="space-y-4">
          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'rgba(0,201,122,0.25)' }}>
            <p className="text-xs font-semibold mb-4" style={{ color: 'var(--accent)' }}>Alphabet（Google）</p>
            <div className="space-y-3 text-sm">
              {[
                { label: '現在', text: '広告事業（検索・YouTube）とGCPクラウド事業で安定した収益基盤を持つ。' },
                { label: '拡張', text: 'AI（Gemini）をGCPと組み合わせることでノード稼働率を向上。AIインフラのノウハウ自体が新たな参入障壁（堀）となる。' },
                { label: '追い風', text: 'データセンター需要の逼迫によりインフラの入手難・価格高騰が進行。クラウドへのコスト移行ニーズが高まるほどGCPの相対的な競争力が上がる。' },
              ].map(({ label, text }) => (
                <div key={label} className="flex gap-3">
                  <span className="flex-shrink-0 font-mono text-xs mt-0.5 w-12" style={{ color: 'var(--accent)' }}>{label}</span>
                  <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'rgba(0,201,122,0.25)' }}>
            <p className="text-xs font-semibold mb-4" style={{ color: 'var(--accent)' }}>ソフトバンクHD</p>
            <div className="space-y-3 text-sm">
              {[
                { label: '現在', text: 'ARMの設計は独自CPU・GPUの開発に広く利用されており、AIインフラチップとの親和性が高い。IPライセンスモデルはスケールしやすい収益構造。' },
                { label: '拡張', text: 'OpenAIへの出資を通じてAIエコシステムの中心に位置する。ARMアーキテクチャ普及 → AI推論チップ需要増 → OpenAIのモデル強化 → さらなるARMチップ需要、というフライホイールが期待できる。' },
              ].map(({ label, text }) => (
                <div key={label} className="flex gap-3">
                  <span className="flex-shrink-0 font-mono text-xs mt-0.5 w-12" style={{ color: 'var(--accent)' }}>{label}</span>
                  <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="mb-16">
        <p className="text-xs tracking-widest mb-6 font-semibold" style={{ color: 'var(--accent)' }}>STOCKS — 重点セクター</p>
        <div className="space-y-4">
          {sectors.map(s => {
            const regionColor = REGION_COLOR[s.region] ?? 'var(--accent)'
            return (
              <div key={s.sector} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `${regionColor}18`, color: regionColor, border: `1px solid ${regionColor}30`, fontSize: '10px' }}>
                      {s.region}
                    </span>
                    <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{s.sector}</h2>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(0,201,122,0.1)', color: 'var(--accent)', border: '1px solid rgba(0,201,122,0.2)' }}>
                    {s.reason}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{s.detail}</p>
                <div className="flex flex-wrap gap-2">
                  {s.examples.map(e => (
                    <span key={e} className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ backgroundColor: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Summary */}
      <section>
        <p className="text-xs tracking-widest mb-6 font-semibold" style={{ color: 'var(--accent)' }}>SUMMARY</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'コア（積立）', value: 'インデックス積立' },
            { label: 'サテライト（α）', value: '個別株・仮想通貨' },
            { label: '長期投資', value: '5年以上' },
            { label: '重点セクター', value: '商社・AI・金融・Infra' },
          ].map(({ label, value }) => (
            <div key={label} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{label}</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
