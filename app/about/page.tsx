import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description: '事業の成長性と持続性を軸に長期投資を行う個人投資家araのプロフィール、投資経験、判断基準を紹介します。',
  alternates: { canonical: 'https://gaizen.xyz/about/' },
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
    title: '投資仮説を検証しながら長期保有する',
    body: '短期の株価ではなく、事業の利益創出力・競争優位・成長余地が維持されているかを確認する。投資した理由が崩れていない限り、5年以上の長期視点で保有する。',
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
    reason: '預貸金利ざや × 手数料収益',
    detail: '貸出と預金の金利差に加え、決済・資産運用・信託など複数の手数料収益があります。金利上昇は利ざや改善につながる可能性がある一方、債券評価損や信用コストの増加にも注意が必要です。',
    examples: ['三菱UFJ FG', '三井住友 FG'],
  },
  {
    sector: '保険',
    region: 'JP',
    reason: '加入が必須・準必須のサービス',
    detail: '海上・火災・自動車保険には、法令・契約・リスク管理上必要とされる商品があります。継続需要が見込まれる一方、自然災害・運用環境・保険金支払いの変動には注意が必要です。',
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
    detail: '暗号資産を株式ではなく「商品（コモディティ）」として位置付け、希少性と需要を調査しています。価格変動が大きく、インフレ・地政学リスクへのヘッジ効果も保証されないため、小さな配分に限定しています。',
    examples: ['BTC', 'OKB', 'JUP', 'EDGE', 'GRVT', 'MET'],
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

      <header className="mb-10 max-w-2xl">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>ABOUT</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>GAIZEN FINANCEについて</h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          個人投資家araが、実際の投資判断と失敗、企業や制度を調べた過程を記録する長期投資メディアです。
          読者が自分で調べ、納得して判断するための材料を公開します。
        </p>
      </header>

      {/* Author Profile */}
      <div className="mb-16 p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="flex-shrink-0">
            <Image
              src="/images/profile.jpg"
              alt="ara / GAIZEN FINANCE 運営者"
              width={72}
              height={72}
              className="rounded-full object-cover"
              style={{ border: '2px solid var(--border)' }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <p className="text-base font-bold" style={{ color: 'var(--foreground)' }}>あら。/ ara</p>
              <a
                href="https://x.com/ara_stock"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: 'rgba(0,201,122,0.1)', color: 'var(--accent)', border: '1px solid rgba(0,201,122,0.2)' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @ara_stock
              </a>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              事業の成長性と持続性を軸に、長期投資を行う個人投資家です。商社・銀行・AI・Fintech分野を中心に、現在の利益創出力と将来の成長余地を自分の言葉で説明できる投資先を選んでいます。
            </p>
          </div>
        </div>
        {/* Speech bubble style note */}
        <div className="mt-4 sm:ml-[88px] relative">
          <div className="absolute -top-2 left-4 w-0 h-0"
            style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '8px solid var(--border)' }} />
          <div className="absolute -top-1.5 left-4 w-0 h-0"
            style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '8px solid var(--surface)' }} />
          <div className="p-3 rounded-lg text-xs leading-relaxed italic"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
            相場を予測するのではなく、蓋然性の高い選択を続けること。——それだけをずっとやっています。
          </div>
        </div>
      </div>

      <section className="mb-16">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>EXPERIENCE</p>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>失敗から始まった投資経験</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          <p>
            初めて投資したのは大学院1年生の頃です。当時は投資への関心が薄く、勧められた本も読まないまま、株主優待と配当利回りだけを見て個別株を買いました。その結果、数年後に株価が半分になり損切りしました。
          </p>
          <p>
            社会人1年目に生活防衛資金を用意し、NISAでのインデックス積立から投資を再開しました。その後、事業を理解できる企業への長期投資へ軸足を移しています。売買を繰り返して利益を逃した経験や、レバレッジ商品の値動きに耐えられず損切りした経験も含め、成功例だけではなく判断を誤った過程を記事に残します。
          </p>
          <p>
            制度や数値は一次情報で確認し、個人の経験と一般的な情報を分けて記載します。詳しい作成方法は<a href="/editorial-policy/" style={{ color: 'var(--accent)' }}>編集・検証方針</a>で公開しています。
          </p>
        </div>
      </section>

      {/* GAIZEN Philosophy */}
      <div className="mb-16">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>GAIZEN</p>
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>投資し、育て、心にゆとりを持つ。</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          <p>
            「GAIZEN」は<strong style={{ color: 'var(--foreground)' }}>蓋然（がいぜん）</strong>に由来します。蓋然とは、ある事柄が起こる確からしさ——確率や可能性の高さを表す言葉です。
          </p>
          <p>
            相場を予測しようとするのではなく、<strong style={{ color: 'var(--foreground)' }}>蓋然性の高い選択</strong>を粛々と積み重ねていく。それがここでの一貫したテーマです。
          </p>
          <p>
            現在は、事業の<strong style={{ color: 'var(--foreground)' }}>成長性と持続性</strong>を投資判断の軸に据えています。投資仮説が崩れていない限り長期で保有し、価格と事業の状況を見ながら追加投資を行います。
          </p>
        </div>
      </div>

      <div className="mb-14">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>ABOUT</p>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>投資方針</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          「理解できるものへの投資」を前提に、現在の利益創出力、事業の持続性、将来の成長性を重視して投資先を選びます。
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
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>PERSONAL INVESTMENT THESIS</p>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
          以下は筆者が投資判断に使っている仮説の例です。企業の将来を保証する事実ではなく、決算や事業環境の変化に応じて見直します。
        </p>
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
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>RESEARCH AREAS</p>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
          現在調査している分野と保有例です。最新の保有状況と資産配分は<a href="/portfolio/" style={{ color: 'var(--accent)' }}>Portfolio</a>に掲載しています。
        </p>
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
            { label: '投資判断の軸', value: '成長性・持続性' },
            { label: '主な投資対象', value: '理解できる事業' },
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
