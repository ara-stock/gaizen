import type { Metadata } from 'next'
import { AS_OF, CARDS, type Card } from '@/content/cards/cards'
import { CARDS_EN } from '@/content/cards/cards.en'

export type Locale = 'ja' | 'en'

/** English text replaces the Japanese fields it covers; tiers merge element by element. */
function cardsFor(locale: Locale): Card[] {
  if (locale === 'ja') return CARDS
  return CARDS.map(c => {
    const en = CARDS_EN[c.id]
    if (!en) return c
    const { tiers, ...rest } = en
    return { ...c, ...rest, tiers: c.tiers.map((tier, i) => ({ ...tier, ...tiers?.[i] })) }
  })
}

const TEXT = {
  ja: {
    title: '仮想通貨カード比較',
    intro: (n: number) => `主な仮想通貨カード${n}枚を、公式のヘルプ・料金表・規約で比べました。キャッシュバック率はどれも「月の利用額のうち一定額まで」で、それを超えると率が下がります。表の上段は無料（いちばん下）のランクの条件です。`,
    asOf: '確認日',
    entryTier: '無料ランク',
    fee: '発行・年会費',
    cashback: 'キャッシュバック',
    max: '月の最大還元額',
    payout: '受け取り',
    fx: '為替手数料',
    start: '始める（紹介リンク）',
    authorNote: '筆者のメモ',
    tiers: 'ランクと条件',
    tier: 'ランク',
    requirement: 'なるための条件',
    requirementShort: '条件',
    cashbackBands: 'キャッシュバック（月の利用額）',
    cashbackShort: '還元',
    other: 'ほか',
    referralNote: '「始める」は紹介リンクです。登録や利用に応じて筆者が報酬を受け取る場合があります。掲載内容は報酬と連動させていません。',
    sources: '出典：',
    sep: '、',
    excludedTitle: '調べたが載せなかったカード',
    excluded: [
      'Gnosis Pay：GNO の保有量に応じた暫定のキャッシュバック制度は2026年8〜9月に終わり、今は一般向けの還元がない（報道）。新しい MiniPay Card は申し込み受付の段階。',
      'Crypto.com：公式のカードページで確認できたのは米国向けのクレジットカードだけで、日本で使える条件を確認できなかった。',
    ],
    howTitle: 'このページの読み方と注意',
    how: [
      '「月の最大還元額」は、無料ランクで率が下がる手前まで使ったときの額です（例：ether.fi Core は $2,000×3%＋$1,000×1%）。それ以上使っても増え方は小さくなります。',
      '円で支払うと為替手数料がかかります。キャッシュバック率から為替手数料を引いた分が、実際に戻ってくる目安です。',
      'キャッシュバックは各社のトークン（ETHFI・AVAX）や米ドル・USDTで受け取り、トークンの場合は価格が動きます。',
      '条件は予告なく変わります。キャンペーン中の率は載せず、通常の率を載せています。申し込む前に各社の公式ページで最新の条件を確認してください。',
      '日本での利用可否と税務はご自身で確認してください。',
    ],
  },
  en: {
    title: 'Crypto card comparison',
    intro: (n: number) => `${n} major crypto cards, compared using each issuer's official help center, pricing and terms. Every cashback rate applies only up to a monthly spend amount and drops after that. The table shows the free (entry) tier.`,
    asOf: 'Checked',
    entryTier: 'Free tier',
    fee: 'Card / annual fee',
    cashback: 'Cashback',
    max: 'Max cashback / month',
    payout: 'Paid in',
    fx: 'FX fee',
    start: 'Start (ref link)',
    authorNote: "Author's note",
    tiers: 'Tiers and requirements',
    tier: 'Tier',
    requirement: 'How to qualify',
    requirementShort: 'Qualify',
    cashbackBands: 'Cashback (by monthly spend)',
    cashbackShort: 'Cashback',
    other: 'Other',
    referralNote: '"Start" is a referral link. The author may be rewarded when you sign up or use the card. What is written here is not tied to those rewards.',
    sources: 'Sources: ',
    sep: ', ',
    excludedTitle: 'Researched but not listed',
    excluded: [
      'Gnosis Pay: the interim cashback program based on GNO holdings ended in August–September 2026, and there is no general cashback now (press). The new MiniPay Card is still taking sign-ups.',
      'Crypto.com: the official card page only showed a US credit card, so conditions for use outside the US could not be confirmed.',
    ],
    howTitle: 'How to read this page',
    how: [
      '"Max cashback / month" is what the free tier pays if you spend right up to where the rate drops (e.g. ether.fi Core: $2,000 × 3% + $1,000 × 1%). Spending more adds little.',
      'Paying in a currency other than the card currency (for the author, yen) adds an FX fee. Cashback minus the FX fee is roughly what you actually get back.',
      "Cashback is paid in each issuer's token (ETHFI, AVAX), US dollars or USDT; token payouts move with the price.",
      "Terms change without notice. Promotional rates are left out in favour of standard rates. Check the issuer's official page before you apply.",
      'Check availability where you live and your own tax obligations.',
    ],
  },
}

type Text = typeof TEXT.ja

export function cardsMetadata(locale: Locale): Metadata {
  const ja = 'https://gaizen.xyz/cards/'
  const en = 'https://gaizen.xyz/en/cards/'
  return {
    title: 'Cards',
    description: locale === 'en'
      ? 'Crypto cards (ether.fi Cash, Ethena Pay, KAST, Tria, Plasma One, MetaMask Card, Bybit Card, Bitget Wallet Card, RedotPay) compared on cashback rates and monthly caps, card and annual fees, FX fees, KYC and tier requirements, from official sources.'
      : '仮想通貨カード（ether.fi Cash・Ethena Pay・KAST・Tria・Plasma One・MetaMask Card・Bybit Card・Bitget Wallet Card・RedotPay）のキャッシュバック率と月の上限、発行費・年会費、為替手数料、KYC、上位ランクの条件を公式資料で比べた一覧。',
    alternates: { canonical: locale === 'en' ? en : ja, languages: { ja, en } },
    ...(locale === 'en' ? { openGraph: { locale: 'en_US' } } : {}),
  }
}

const muted = { color: 'var(--muted)' }

function Logo({ card, size = 28 }: { card: Card; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, tiny local icons
    <img src={card.logo} alt="" width={size} height={size} loading="lazy" className="rounded-lg border object-cover flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }} />
  )
}

const ROWS = (tx: Text): [string, (c: Card) => string][] => [
  [tx.fee, c => c.entryFee],
  [tx.cashback, c => c.entryCashback],
  [tx.max, c => c.entryMax],
  [tx.payout, c => c.payout],
  [tx.fx, c => c.fx],
  ['KYC', c => c.kyc],
]

export default function CardsPage({ locale }: { locale: Locale }) {
  const tx = TEXT[locale]
  const cards = cardsFor(locale)
  const rows = ROWS(tx)
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{tx.title}</h1>
        <p className="text-sm leading-relaxed max-w-3xl" style={muted}>
          {tx.intro(cards.length)}
        </p>
        <p className="text-xs mt-3" style={muted}>{tx.asOf}: {AS_OF}</p>
      </div>

      {/* Desktop: one row per card. Phones skip this and read the same rows inside each card's section. */}
      <div className="hidden lg:block rounded-xl border overflow-hidden mb-10" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
        <table className="w-full text-sm table-fixed">
          <colgroup><col style={{ width: 168 }} />{rows.map(([label]) => <col key={label} />)}</colgroup>
          <thead>
            <tr className="text-xs" style={{ ...muted, backgroundColor: 'var(--surface-2)' }}>
              <th scope="col" className="px-3 py-2.5 text-left font-medium">{tx.entryTier}</th>
              {rows.map(([label]) => <th key={label} scope="col" className="px-3 py-2.5 text-left font-medium">{label}</th>)}
            </tr>
          </thead>
          <tbody>
            {cards.map(c => (
              <tr key={c.id} className="border-t align-top" style={{ borderColor: 'var(--border)' }}>
                <th scope="row" className="px-3 py-2.5 text-left">
                  <a href={`#${c.id}`} className="flex items-center gap-2 font-semibold hover:underline underline-offset-2" style={{ color: 'var(--foreground)' }}>
                    <Logo card={c} size={22} />{c.name}
                  </a>
                </th>
                {rows.map(([label, value]) => <td key={label} className="px-3 py-2.5 leading-snug text-[13px]">{value(c)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-8">
        {cards.map(c => (
          <section key={c.id} id={c.id} className="scroll-mt-20 p-5 sm:p-6 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
            <div className="flex items-center gap-3 mb-3">
              <Logo card={c} size={32} />
              <h2 className="text-lg font-semibold flex-1" style={{ color: 'var(--foreground)' }}>{c.name}</h2>
              {c.referral && (
                <a href={c.referral} target="_blank" rel="sponsored nofollow noopener"
                  className="inline-block whitespace-nowrap text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)]">
                  {tx.start}
                </a>
              )}
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--prose-body)' }}>{c.summary}</p>
            {c.authorNote && (
              <p className="text-sm leading-relaxed mb-4 p-3 rounded-lg border-l-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent-subtle)', color: 'var(--foreground)' }}>
                <span className="text-xs font-semibold mr-2" style={{ color: 'var(--accent)' }}>{tx.authorNote}</span>{c.authorNote}
              </p>
            )}

            <dl className="lg:hidden grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-2 gap-y-1.5 text-sm border-t pt-3 mb-4" style={{ borderColor: 'var(--border)' }}>
              {rows.map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="text-xs pt-0.5" style={muted}>{label}</dt>
                  <dd className="min-w-0 break-words">{value(c)}</dd>
                </div>
              ))}
            </dl>

            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{tx.tiers}</h3>
            {/* Phones: one block per tier, so the cashback column never scrolls out of view. */}
            <ul className="sm:hidden flex flex-col gap-2 mb-4">
              {c.tiers.map(tier => (
                <li key={tier.name} className="rounded-lg p-3 text-sm" style={{ backgroundColor: 'var(--surface-2)' }}>
                  <p className="font-semibold mb-1">{tier.name}</p>
                  <p className="leading-snug"><span className="text-xs mr-1.5" style={muted}>{tx.requirementShort}</span>{tier.requirement}</p>
                  <p className="leading-snug mt-1"><span className="text-xs mr-1.5" style={muted}>{tx.cashbackShort}</span>{tier.cashback}</p>
                  {tier.extra && <p className="text-xs leading-snug mt-1" style={muted}>{tier.extra}</p>}
                </li>
              ))}
            </ul>
            <div className="hidden sm:block mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-left" style={muted}>
                    <th scope="col" className="py-2 pr-3 font-medium w-32">{tx.tier}</th>
                    <th scope="col" className="py-2 pr-3 font-medium">{tx.requirement}</th>
                    <th scope="col" className="py-2 pr-3 font-medium">{tx.cashbackBands}</th>
                    <th scope="col" className="py-2 font-medium">{tx.other}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.tiers.map(tier => (
                    <tr key={tier.name} className="border-t align-top" style={{ borderColor: 'var(--border)' }}>
                      <th scope="row" className="py-2 pr-3 text-left font-semibold">{tier.name}</th>
                      <td className="py-2 pr-3 leading-snug">{tier.requirement}</td>
                      <td className="py-2 pr-3 leading-snug">{tier.cashback}</td>
                      <td className="py-2 leading-snug text-xs" style={muted}>{tier.extra ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed mb-4" style={{ color: 'var(--prose-body)' }}>
              {c.notes.map(n => <li key={n}>{n}</li>)}
            </ul>
            {c.referral && (
              <p className="text-xs leading-relaxed mb-3" style={muted}>{tx.referralNote}</p>
            )}
            <p className="text-xs leading-relaxed" style={muted}>
              {tx.sources}{c.sources.map((s, i) => (
                <span key={s.url}>{i > 0 && tx.sep}<a href={s.url} target="_blank" rel="noopener nofollow" className="underline" style={{ color: 'var(--accent)' }}>{s.title}</a></span>
              ))}
            </p>
          </section>
        ))}
      </div>

      <section className="mt-8 p-5 sm:p-6 rounded-xl border text-sm leading-relaxed" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--prose-body)' }}>
        <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{tx.excludedTitle}</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          {tx.excluded.map(x => <li key={x}>{x}</li>)}
        </ul>
      </section>

      <section className="mt-12 p-5 rounded-xl border text-xs leading-relaxed" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--muted)' }}>
        <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{tx.howTitle}</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          {tx.how.map(x => <li key={x}>{x}</li>)}
        </ul>
      </section>
    </div>
  )
}
