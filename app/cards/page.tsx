import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cards',
  description: '仮想通貨カード（ether.fi Cash・Ethena Pay・KAST・Tria・MetaMask Card・Bybit Card・Bitget Wallet Card・RedotPay・Plasma One）のキャッシュバック率と月の上限、発行費・年会費、為替手数料、KYC、上位ランクの条件を公式資料で比べた一覧。',
  alternates: { canonical: 'https://gaizen.xyz/cards/' },
}

const AS_OF = '2026-10-03'

interface Tier {
  name: string
  /** How to reach the tier. */
  requirement: string
  cashback: string
  extra?: string
}

interface Card {
  id: string
  name: string
  logo: string
  summary: string
  /** Comparison-table cells, for the free (entry) tier. */
  entryFee: string
  entryCashback: string
  entryMax: string
  payout: string
  fx: string
  kyc: string
  tiers: Tier[]
  notes: string[]
  /** The author's own take, in their words. */
  authorNote?: string
  referral?: string
  sources: { title: string; url: string }[]
}

const CARDS: Card[] = [
  {
    id: 'etherfi',
    name: 'ether.fi Cash',
    logo: '/logos/etherfi.jpg',
    summary: '預けた暗号資産を担保に使うクレジット型のVisaカード。ランクはポイント、ETHFIのステーク、Liquidへの預け入れ、年会費のいずれかで上がる。',
    entryFee: '無料（Core）',
    entryCashback: '3%（月$2,000まで）→ 1%（$3,000まで）→ 0.5%',
    entryMax: '約$70',
    payout: 'ETHFI（7日ロック後に請求、$5以上）',
    fx: '約1% ＋ Core は最大0.5%',
    kyc: '必要（18歳以上）',
    tiers: [
      { name: 'Core', requirement: '無料', cashback: '3%：月$2,000まで → 1%：$3,000まで → 0.5%', extra: '為替：約1%＋最大0.5%' },
      { name: 'Luxe', requirement: '月5,000ポイント、またはLiquidに$1.5万、ETHFIを3万枚ステーク、年会費$199のいずれか', cashback: '3%：月$1万まで → 1%：$2万まで → 0.5%', extra: '為替：約1%＋最大0.25%。メタルカード無料' },
      { name: 'Pinnacle', requirement: '月2.5万ポイント、またはLiquidに$10万、ETHFIを15万枚ステーク、年会費$999のいずれか', cashback: '3%：月$5万まで → 1%：$8万まで → 0.5%', extra: '為替の上乗せなし。メタルカード無料' },
      { name: 'VIP', requirement: 'Liquidに$50万、またはETHFIを50万枚ステーク（招待制）', cashback: '4%：月$5万まで', extra: '為替の上乗せなし' },
    ],
    notes: [
      'ポイントはカード利用$1,000ごとに1,000、ETHFIステーク1,000枚ごとに1日5など。毎月リセットされ、翌月に持ち越せない。',
      'ATMは1回$1,000まで、24時間で5回・計$5,000まで。',
      'ユーロ建ての利用はキャッシュバック率が下がる（為替手数料がない分）。米ドルとユーロで月の利用額は合算される。',
      '利用限度額は口座ごとに変動し、担保の額などで決まる。公開された固定の上限はない。',
    ],
    authorNote: '筆者は今後、ether.fi Cash をメインのカードとして使っていく予定です。ETHFI を買ったのも、実際に触ってみてサービスの使い勝手がよかったことが決め手でした。',
    referral: 'https://www.ether.fi/@ara_stock',
    sources: [
      { title: 'ether.fi Help - How does cashback work?', url: 'https://help.ether.fi/en/articles/262374-how-does-cashback-work' },
      { title: 'ether.fi Help - How do Membership levels work?', url: 'https://help.ether.fi/en/articles/303625-how-do-membership-levels-work' },
      { title: 'ether.fi Help - Membership level benefits', url: 'https://help.ether.fi/en/articles/776152-membership-level-benefits' },
      { title: 'ether.fi Help - Transaction limits and fees', url: 'https://help.ether.fi/en/articles/303623-what-are-the-transaction-limits-and-fees-for-personal-cash-credit-cards' },
    ],
  },
  {
    id: 'ethena-pay',
    name: 'Ethena Pay',
    logo: '/logos/ethena-pay.png',
    summary: 'USDeの残高に利回りが付くアプリとVisaカード。2026-09-01にAvalanche上でベータ公開。米国とEUは対象外で、日本は規約上の利用制限国に入っていない。',
    entryFee: '無料（Standard）',
    entryCashback: '4%（月$2,500まで）→ 1%（$4,000まで）→ 0%',
    entryMax: '約$115',
    payout: 'AVAX（毎日付与）',
    fx: '約1%',
    kyc: '必要（本人確認・生体認証あり）',
    tiers: [
      { name: 'Standard', requirement: '無料', cashback: '4%：月$2,500まで → 1%：$4,000まで → 0%', extra: '残高$5,000まで年5%' },
      { name: 'Pro', requirement: '$2,000相当のENAをロック、または10人を紹介（報道）', cashback: '4.5%：月$8,000まで → 2% → 1% → 0.5%', extra: '残高$10万まで年6%' },
      { name: 'VIP', requirement: '$1万相当のENAをロック、または50人を紹介（報道）', cashback: '5%：月$2万まで → 2% → 1% → 0.5%', extra: '残高$100万まで年6%' },
    ],
    notes: [
      'Pro・VIPの条件は公式の料金表・FAQに書かれておらず、上の条件は報道（The Block、2026-09-01）による。',
      '年利の上乗せ分（Daily Boost）は期間限定の販促で、保証された金利ではない。上限を超えた残高はUSDeの基本利回りだけになる。',
      'ATMは$1＋引出額の0.65%（＋ATM側の手数料）。カード発行と月額は無料。',
      'Pro・VIPは一部の加盟店（Uber、Spotify、Claudeなど）で最大5%・10%（報道）。',
    ],
    sources: [
      { title: 'Ethena Pay - Pricing', url: 'https://pay.ethena.fi/pricing' },
      { title: 'Ethena Pay - FAQ', url: 'https://pay.ethena.fi/faq' },
      { title: 'Ethena Pay - Terms of Use', url: 'https://pay.ethena.fi/terms' },
      { title: 'The Block - Ethena launches Ethena Pay on Avalanche', url: 'https://theblock.co/news/web3/2026-09-01-ethena-pay-app-avalanche-yield-cashback-413225' },
    ],
  },
  {
    id: 'kast',
    name: 'KAST',
    logo: '/logos/kast.png',
    summary: 'ステーブルコインで払うVisaカード。ランクは年会費で決まり、上位はキャッシュバックに加えてKASTポイントが付く。',
    entryFee: '無料（Standard）',
    entryCashback: '1.5%（月$2,000まで）',
    entryMax: '約$30',
    payout: '米ドル',
    fx: '0.5〜1.75%（ヘルプセンター）',
    kyc: '必要（バーチャルは簡易、物理カードは身分証＋自撮り）',
    tiers: [
      { name: 'Standard', requirement: '無料', cashback: '1.5%：月$2,000まで', extra: 'カード2枚まで無料（Visa Platinum）' },
      { name: 'Premium', requirement: '年会費$1,000', cashback: '2%：月$1万まで', extra: 'KASTポイント＋1%（Visa Infinite）' },
      { name: 'Private', requirement: '年会費$10,000', cashback: '3%：月$4万まで', extra: 'KASTポイント＋2%、金メッキのカード' },
    ],
    notes: [
      '月の上限額は公式ヘルプセンターの記載による（公式サイトの会員ページには上限の記載がない）。',
      '残高に付く利回り（Reserve）は Standard 8%・Premium 10%・Private 12% と表示されているが、2027-07-01までのキャンペーンで、その後は4〜8%に下がる。',
      '料金表のページはボット対策で取得できず、ATM手数料などは未確認。',
    ],
    sources: [
      { title: 'KAST - Membership', url: 'https://www.kast.xyz/en/membership' },
      { title: 'KAST Help - How Do Cashback Rewards Work on KAST?', url: 'https://concierge.kast.xyz/hc/en-us/articles/15806668917519-How-Do-Cashback-Rewards-Work-on-KAST' },
      { title: 'KAST - Legal', url: 'https://www.kast.xyz/en/legal' },
    ],
  },
  {
    id: 'tria',
    name: 'Tria',
    logo: '/logos/tria.png',
    summary: '自分で鍵を持つウォレットとつながるVisaカード。カードの種類（バーチャル・プラスチック・メタル）でランクが決まる。',
    entryFee: '$0〜$25（Lite・バーチャル）',
    entryCashback: '1.5%（月$1,000まで）→ 0.5%',
    entryMax: '約$15',
    payout: 'USDT（Arbitrum、四半期ごとに請求）',
    fx: 'Visaの約1%（規約上は最大3%）',
    kyc: '必要（身分証＋自撮り、18歳以上）',
    tiers: [
      { name: 'Lite（バーチャル）', requirement: '$0（会員ページ）／$25（カード規約）', cashback: '1.5%：月$1,000まで → 0.5%' },
      { name: 'Pro（プラスチック）', requirement: '$109', cashback: '4.5%：月$2,000まで → 1%', extra: 'ラウンジ、手荷物補償' },
      { name: 'Max（メタル）', requirement: '$250', cashback: '6%：月$2,000まで → 1%', extra: 'Proの特典に加えメタルカード' },
    ],
    notes: [
      '2026年6月のシーズン3から、キャッシュバックに月の上限が付いた。それ以前は上限なしで、TRIAのステークで率が上がる仕組みだった。',
      'キャッシュバックはUSDTで四半期ごとに配られ、確定まで最大90日待つ。',
      'カード料金は、会員ページではLiteが$0、カード規約では「発行・年会費」としてバーチャル$25・プラスチック$109・メタル$250。どちらが最新かは未確認。',
      'ATMは最大$2＋3%。利用限度額は担保（ウォレットの残高）に応じて変わる。',
    ],
    referral: 'https://app.tria.so/?accessCode=8XW6JV0082',
    sources: [
      { title: 'Tria Help - Cashback', url: 'https://intercom.help/tria/en/articles/13696877-cashback' },
      { title: 'Tria Docs - Card Terms International', url: 'https://docs.tria.so/card-terms-international' },
      { title: 'Tria - Membership', url: 'https://app.tria.so/membership' },
    ],
  },
  {
    id: 'plasma-one',
    name: 'Plasma One',
    logo: '/logos/plasma.png',
    summary: 'ステーブルコイン専用チェーン Plasma（XPL）のアプリと Visa カード。Bitfinex・Tether 系のプロジェクトで、キャッシュバックは XPL で受け取る。発行元は Rain。',
    entryFee: '無料（Lite、地域により $10 の入金）',
    entryCashback: '2%（月 $500 まで、二次情報）',
    entryMax: '約$10（二次情報）',
    payout: 'XPL',
    fx: 'パートナー側の手数料あり（Platinum は Plasma が負担）',
    kyc: '必要',
    tiers: [
      { name: 'Lite', requirement: '無料', cashback: '最大2%', extra: 'バーチャルカード1枚' },
      { name: 'Core', requirement: '年会費 $199、または 2万 XPL を12か月ロック', cashback: '3%：月 $1,000 まで → 2% → 1% → 0.25%（二次情報）', extra: 'AI関連の支払いは最大5%' },
      { name: 'Platinum', requirement: '10万 XPL を12か月ロック（開始から30日間の条件、その後は15万 XPL と報道）', cashback: '4%：月 $3,000 まで → 3% → 2% → 1%（二次情報）', extra: 'AI関連・航空券は最大10%、為替手数料を Plasma が負担、メタルカード' },
    ],
    notes: [
      'XPL は約 $0.095（2026-10-04、CoinGecko）。2万 XPL のロックは約 $1,900、10万 XPL は約 $9,500 に相当し、ロック中に価格が下がっても12か月は動かせない。',
      'キャッシュバックの月の利用額ごとの区切りは、公式の報酬規約で「ヘルプセンターに記載」とされているが、ヘルプセンターに具体的な数字が見当たらず、上の区切りはレビューサイトの記載による。',
      '報酬規約は 2026-09-26 付け。ATM・個人間送金・暗号資産の購入などは対象外。',
      '2026年9月のカード取扱高は約 $25.7M（Paymentscan の集計、報道）。',
    ],
    sources: [
      { title: 'Plasma - Personal (Plasma One)', url: 'https://www.plasma.org/personal' },
      { title: 'Plasma One Rewards Terms', url: 'https://www.plasma.org/plasma-one-rewards' },
      { title: 'Plasma Help - How the Plasma One tier system works', url: 'https://intercom.help/plasma-6c43763cd799/en/articles/15505864-how-the-plasma-one-tier-system-works' },
      { title: 'SpendNode - Plasma One Core Card Review', url: 'https://www.spendnode.io/crypto-cards/plasma-one-core-card/' },
    ],
  },
  {
    id: 'metamask',
    name: 'MetaMask Card',
    logo: '/logos/metamask.png',
    summary: 'MetaMask のウォレットから直接支払う Mastercard。キャッシュバックは MetaMask のステーブルコイン mUSD で受け取る。',
    entryFee: '無料（バーチャル）',
    entryCashback: '1%（上限の記載なし）',
    entryMax: '上限の記載なし',
    payout: 'mUSD',
    fx: 'Mastercard のレート（MetaMask の上乗せなし）',
    kyc: '必要',
    tiers: [
      { name: 'Virtual', requirement: '無料', cashback: '1%', extra: '1日 $15,000 まで、ATM 1日 $1,000' },
      { name: 'Metal', requirement: '年会費 $199', cashback: '3%：年 $10,000 まで → 1%', extra: '1日 $30,000 まで、ATM 1日 $5,000' },
    ],
    notes: [
      'Metal の3%は「年」$10,000まで。ほかのカードの月単位の上限とは単位が違う。',
      '公式サイトの対応地域（40か国以上）に日本は載っていない。',
      '1回ごとに小さな手数料がかかると書かれているが、金額は公式ページで確認できなかった。',
    ],
    sources: [
      { title: 'MetaMask - Card', url: 'https://metamask.io/card' },
    ],
  },
  {
    id: 'bybit',
    name: 'Bybit Card',
    logo: '/logos/bybit.png',
    summary: '取引所 Bybit の残高で払う Mastercard。ランクは「月の利用額」か「Bybit の VIP レベル」で決まり、還元率は高いが月の上限額が小さい。',
    entryFee: '未確認',
    entryCashback: '2%（月の還元 $5 まで）',
    entryMax: '$5',
    payout: 'USDT（ポイント経由）',
    fx: '未確認',
    kyc: '必要（Bybit 口座の本人確認）',
    tiers: [
      { name: 'Base', requirement: '最初のランク', cashback: '2%（還元は月 $5 まで）' },
      { name: 'Beta', requirement: '月 $500 利用、または VIP 1・2', cashback: '2%（月 $50 まで）' },
      { name: 'Alpha', requirement: '月 $3,500 利用、または VIP 3', cashback: '4%（月 $150 まで）' },
      { name: 'Apex', requirement: '月 $9,500 利用、または VIP 4・PRO 1', cashback: '6%（月 $250 まで）' },
      { name: 'Omega', requirement: '月 $12,500 利用、または VIP 5・PRO 2', cashback: '8%（月 $400 まで）' },
      { name: 'Infinite', requirement: '月 $25,000 利用、または Supreme VIP・PRO 3〜5', cashback: '10%（月 $600 まで）' },
    ],
    notes: [
      '上限は「還元額」で決まっている。無料の Base だと月 $250 使った時点で $5 に達し、それ以上は還元されない。',
      '利用額で上がったランクは、翌日から翌月末まで有効。',
      '法定通貨の残高で払った分はポイント・キャッシュバックの対象外。',
      '為替手数料と発行手数料は公式ページで確認できなかった。',
    ],
    sources: [
      { title: 'Bybit Help - Introduction to Bybit Card Rewards', url: 'https://www.bybit.com/en/help-center/article/Introduction-to-Bybit-Card-Rewards' },
    ],
  },
  {
    id: 'bitget-wallet',
    name: 'Bitget Wallet Card',
    logo: '/logos/bitget-wallet.png',
    summary: 'Bitget Wallet の USDT・USDC で払う Visa カード。毎月 $400 分までは為替・両替の手数料が戻る。公式の対応地域に日本が含まれる。',
    entryFee: '無料（KYC 承認から72時間以内の有効化で $0.1、以降は $10）',
    entryCashback: '2%（月 $200〜400 以上使うと最大3%）',
    entryMax: '上限の記載なし',
    payout: 'BTC・金・米国株トークン・USDC から選択',
    fx: '月 $400 まで実質0%、超えた分は1.7%',
    kyc: '必要（身分証＋顔認証）',
    tiers: [
      { name: '通常', requirement: '無料', cashback: '2%', extra: '月 $400 まで手数料0' },
      { name: '上位', requirement: '新規ユーザー、または月 $200〜400 以上の利用', cashback: '最大3%' },
    ],
    notes: [
      '手数料0の枠（月 $400）を超えると、米ドル以外の支払いに1.7%の為替手数料がかかる。円で払うならこの枠の大きさが実質の上限になる。',
      'ATM は1%または $5 の高い方＋為替1.7%など。',
      '利用限度額はカードのレベルで変わり、最上位は月 $300万。',
    ],
    sources: [
      { title: 'Bitget Wallet - Card', url: 'https://web3.bitget.com/en/card' },
      { title: 'Bitget Wallet blog - Spend Freely with 0 Fees', url: 'https://web3.bitget.com/en/blog/articles/card-0-fees' },
      { title: 'Bitget Wallet Help - Fees', url: 'https://web3.bitget.com/helpCenter/431' },
    ],
  },
  {
    id: 'redotpay',
    name: 'RedotPay',
    logo: '/logos/redotpay.png',
    summary: '香港発のステーブルコイン決済カード。カード自体にキャッシュバックはなく、有料の RedotPay Pro に入ると Apple Pay・Google Pay の支払いに還元が付く。',
    entryFee: 'バーチャル $10、物理 $100',
    entryCashback: 'なし',
    entryMax: '$0',
    payout: '—',
    fx: 'カードの通貨以外は1.2%',
    kyc: '必要',
    tiers: [
      { name: '通常', requirement: 'バーチャル $10・物理 $100', cashback: 'なし' },
      { name: 'Pro（月額）', requirement: '月 $12.90', cashback: 'Apple Pay・Google Pay で3%（月 $18 まで）', extra: 'バーチャルカード無料' },
      { name: 'Pro（年額）', requirement: '年 $129', cashback: 'Apple Pay・Google Pay で3%（月 $18 まで）', extra: '物理カード無料、ATM 月 $1,000 まで手数料0' },
    ],
    notes: [
      'Pro の還元は RedotPay 内で使える USDs で付き、30日で失効する。',
      'ATM は2%（米ドルカードは月 $1万超の分が3%）＋ATM側の手数料。',
    ],
    sources: [
      { title: 'RedotPay Help - Getting Started with RedotPay Pro', url: 'https://helpcenter.redotpay.com/en/articles/14686020-getting-started-with-redotpay-pro' },
      { title: 'RedotPay Help - Are There Any Fees for Getting a Card?', url: 'https://helpcenter.redotpay.com/en/articles/10566200-is-there-a-fee-to-apply-for-a-card' },
      { title: 'RedotPay Help - ATM withdrawals and fees', url: 'https://helpcenter.redotpay.com/en/articles/10622095-can-i-withdraw-cash-from-an-atm-and-are-there-any-extra-fees' },
    ],
  },
]

const muted = { color: 'var(--muted)' }

function Logo({ card, size = 28 }: { card: Card; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, tiny local icons
    <img src={card.logo} alt="" width={size} height={size} loading="lazy" className="rounded-lg border object-cover flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }} />
  )
}

const ROWS: [string, (c: Card) => string][] = [
  ['発行・年会費', c => c.entryFee],
  ['キャッシュバック', c => c.entryCashback],
  ['月の最大還元額', c => c.entryMax],
  ['受け取り', c => c.payout],
  ['為替手数料', c => c.fx],
  ['KYC', c => c.kyc],
]

export default function CardsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>仮想通貨カード比較</h1>
        <p className="text-sm leading-relaxed max-w-3xl" style={muted}>
          主な仮想通貨カード9枚を、公式のヘルプ・料金表・規約で比べました。キャッシュバック率はどれも「月の利用額のうち一定額まで」で、
          それを超えると率が下がります。表の上段は無料（いちばん下）のランクの条件です。
        </p>
        <p className="text-xs mt-3" style={muted}>確認日: {AS_OF}</p>
      </div>

      {/* Desktop: one row per card. Phones skip this and read the same rows inside each card's section. */}
      <div className="hidden lg:block rounded-xl border overflow-hidden mb-10" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
        <table className="w-full text-sm table-fixed">
          <colgroup><col style={{ width: 168 }} />{ROWS.map(([label]) => <col key={label} />)}</colgroup>
          <thead>
            <tr className="text-xs" style={{ ...muted, backgroundColor: 'var(--surface-2)' }}>
              <th scope="col" className="px-3 py-2.5 text-left font-medium">無料ランク</th>
              {ROWS.map(([label]) => <th key={label} scope="col" className="px-3 py-2.5 text-left font-medium">{label}</th>)}
            </tr>
          </thead>
          <tbody>
            {CARDS.map(c => (
              <tr key={c.id} className="border-t align-top" style={{ borderColor: 'var(--border)' }}>
                <th scope="row" className="px-3 py-2.5 text-left">
                  <a href={`#${c.id}`} className="flex items-center gap-2 font-semibold hover:underline underline-offset-2" style={{ color: 'var(--foreground)' }}>
                    <Logo card={c} size={22} />{c.name}
                  </a>
                </th>
                {ROWS.map(([label, value]) => <td key={label} className="px-3 py-2.5 leading-snug text-[13px]">{value(c)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-8">
        {CARDS.map(c => (
          <section key={c.id} id={c.id} className="scroll-mt-20 p-5 sm:p-6 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
            <div className="flex items-center gap-3 mb-3">
              <Logo card={c} size={32} />
              <h2 className="text-lg font-semibold flex-1" style={{ color: 'var(--foreground)' }}>{c.name}</h2>
              {c.referral && (
                <a href={c.referral} target="_blank" rel="sponsored nofollow noopener"
                  className="inline-block whitespace-nowrap text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)]">
                  始める（紹介リンク）
                </a>
              )}
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--prose-body)' }}>{c.summary}</p>
            {c.authorNote && (
              <p className="text-sm leading-relaxed mb-4 p-3 rounded-lg border-l-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent-subtle)', color: 'var(--foreground)' }}>
                <span className="text-xs font-semibold mr-2" style={{ color: 'var(--accent)' }}>筆者のメモ</span>{c.authorNote}
              </p>
            )}

            <dl className="lg:hidden grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-2 gap-y-1.5 text-sm border-t pt-3 mb-4" style={{ borderColor: 'var(--border)' }}>
              {ROWS.map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="text-xs pt-0.5" style={muted}>{label}</dt>
                  <dd className="min-w-0 break-words">{value(c)}</dd>
                </div>
              ))}
            </dl>

            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>ランクと条件</h3>
            {/* Phones: one block per tier, so the cashback column never scrolls out of view. */}
            <ul className="sm:hidden flex flex-col gap-2 mb-4">
              {c.tiers.map(t => (
                <li key={t.name} className="rounded-lg p-3 text-sm" style={{ backgroundColor: 'var(--surface-2)' }}>
                  <p className="font-semibold mb-1">{t.name}</p>
                  <p className="leading-snug"><span className="text-xs mr-1.5" style={muted}>条件</span>{t.requirement}</p>
                  <p className="leading-snug mt-1"><span className="text-xs mr-1.5" style={muted}>還元</span>{t.cashback}</p>
                  {t.extra && <p className="text-xs leading-snug mt-1" style={muted}>{t.extra}</p>}
                </li>
              ))}
            </ul>
            <div className="hidden sm:block mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-left" style={muted}>
                    <th scope="col" className="py-2 pr-3 font-medium w-32">ランク</th>
                    <th scope="col" className="py-2 pr-3 font-medium">なるための条件</th>
                    <th scope="col" className="py-2 pr-3 font-medium">キャッシュバック（月の利用額）</th>
                    <th scope="col" className="py-2 font-medium">ほか</th>
                  </tr>
                </thead>
                <tbody>
                  {c.tiers.map(t => (
                    <tr key={t.name} className="border-t align-top" style={{ borderColor: 'var(--border)' }}>
                      <th scope="row" className="py-2 pr-3 text-left font-semibold">{t.name}</th>
                      <td className="py-2 pr-3 leading-snug">{t.requirement}</td>
                      <td className="py-2 pr-3 leading-snug">{t.cashback}</td>
                      <td className="py-2 leading-snug text-xs" style={muted}>{t.extra ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed mb-4" style={{ color: 'var(--prose-body)' }}>
              {c.notes.map(n => <li key={n}>{n}</li>)}
            </ul>
            {c.referral && (
              <p className="text-xs leading-relaxed mb-3" style={muted}>「始める」は紹介リンクです。登録や利用に応じて筆者が報酬を受け取る場合があります。掲載内容は報酬と連動させていません。</p>
            )}
            <p className="text-xs leading-relaxed" style={muted}>
              出典：{c.sources.map((s, i) => (
                <span key={s.url}>{i > 0 && '、'}<a href={s.url} target="_blank" rel="noopener nofollow" className="underline" style={{ color: 'var(--accent)' }}>{s.title}</a></span>
              ))}
            </p>
          </section>
        ))}
      </div>

      <section className="mt-8 p-5 sm:p-6 rounded-xl border text-sm leading-relaxed" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--prose-body)' }}>
        <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--foreground)' }}>調べたが載せなかったカード</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Gnosis Pay：GNO の保有量に応じた暫定のキャッシュバック制度は2026年8〜9月に終わり、今は一般向けの還元がない（報道）。新しい MiniPay Card は申し込み受付の段階。</li>
          <li>Crypto.com：公式のカードページで確認できたのは米国向けのクレジットカードだけで、日本で使える条件を確認できなかった。</li>
        </ul>
      </section>

      <section className="mt-12 p-5 rounded-xl border text-xs leading-relaxed" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--muted)' }}>
        <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>このページの読み方と注意</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>「月の最大還元額」は、無料ランクで率が下がる手前まで使ったときの額です（例：ether.fi Core は $2,000×3%＋$1,000×1%）。それ以上使っても増え方は小さくなります。</li>
          <li>円で支払うと為替手数料がかかります。キャッシュバック率から為替手数料を引いた分が、実際に戻ってくる目安です。</li>
          <li>キャッシュバックは各社のトークン（ETHFI・AVAX）や米ドル・USDTで受け取り、トークンの場合は価格が動きます。</li>
          <li>条件は予告なく変わります。キャンペーン中の率は載せず、通常の率を載せています。申し込む前に各社の公式ページで最新の条件を確認してください。</li>
          <li>日本での利用可否と税務はご自身で確認してください。</li>
        </ul>
      </section>
    </div>
  )
}
