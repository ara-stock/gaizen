import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/posts'

export default function AuthorProfile({ locale = 'ja' }: { locale?: Locale }) {
  const en = locale === 'en'
  const p = en ? '/en' : ''
  const sections = en ? [
    { title: 'How I started', body: 'I started investing in my first year of graduate school after a classmate introduced me to it. My first brokerage was SBI Securities. I was given a recommendation to read A Random Walk Down Wall Street, but initially bought a stock for its shareholder benefits and apparently attractive dividend yield without reading the book or understanding the business. Years later I sold after its price halved. I do not disclose that company because of its relationship with my work.' },
    { title: 'What changed', body: 'I later read the book and began taking investing more seriously. When I restarted in my first year of full-time work, I had approximately JPY 500,000 in emergency cash. I still hold funds, but my present investment focus is the growth and durability of individual businesses. I generally invest with at least five years in mind and would like to keep a business indefinitely while the reason for owning it remains intact.' },
    { title: 'How I research a stock', body: 'My sequence is market capitalization, business, financial results, product or service experience, and finally valuation measures such as P/E and ROE. I usually check Japanese companies each earnings season; I do not check every US release, and often notice changes through X, share-price moves, or services I use. Social posts can identify something to investigate, but are not a substitute for the underlying company information.' },
    { title: 'What I record, and what I do not', body: 'I record bank, brokerage, and cash balances around month-end after salary and card payments, using Google Sheets. I do not rigorously measure investment returns adjusted for deposits, and I have not kept a purchase-reason journal or set a fixed position-size cap. The decision sheet on this site is a suggested way to make the research reviewable, not evidence of a historical trading journal.' },
  ] : [
    { title: '投資を始めたきっかけ', body: '大学院1年生のとき、同期に投資家がいたことがきっかけで投資を始めました。最初の口座はSBI証券です。『ウォール街のランダム・ウォーカー』を勧めてもらいましたが、当時は本を読まず、株主優待や配当利回りにひかれて個別株を買いました。会社をよく理解しないまま数年保有し、株価が半分になったところで損切りしました。職業と銘柄の関係から、社名は公開していません。' },
    { title: '今の投資判断につながったこと', body: '後になって本を読み、投資への理解と関心が深まりました。社会人1年目に本格的に再開したときの生活防衛資金は約50万円です。投資信託も保有していますが、現在の判断の軸は個別企業の事業の成長性と持続性です。少なくとも5年以上を考え、保有理由が崩れなければ一生持つつもりで企業を選んでいます。' },
    { title: '企業を調べる順序', body: '時価総額、事業、決算、サービスの利用、最後に株価・PER・ROEなどの指標を見ます。日本株は原則として決算ごとに確認しますが、米国株はすべての決算を追えているわけではありません。Xの投稿や大きな値動き、サービスの変化が調べるきっかけになることもあります。SNSで知った数字と、企業の一次資料で確かめた情報は区別して扱います。' },
    { title: '記録していること、できていないこと', body: '月末の給料とカード支払いが終わった頃に、銀行・証券・現金の残高をGoogleスプレッドシートへ記録しています。一方、入金を調整した運用利回りを厳密には計算しておらず、購入理由のメモや銘柄ごとの保有上限も決めていません。このサイトの投資判断シートは、調査を見直せる形にするための提案です。過去から使っていた売買日誌として紹介するものではありません。' },
  ]
  const examples = [
    ['alphabet-investment-thesis', 'Alphabet', en ? 'YouTube, Cloud, AI, and infrastructure' : 'YouTube・Cloud・AIインフラへの投資仮説'],
    ['mufg-investment-thesis', 'MUFG', en ? 'Interest rates, overseas operations, and asset management' : '金利・海外事業・資産運用事業への投資仮説'],
    ['individual-stock-investment-thesis', en ? 'Research process' : '個別株の調査手順', en ? 'A suggested one-page decision sheet' : '買う理由と見直す条件を整理するシート'],
    ['monthly-asset-tracking', en ? 'Asset tracking' : '月次資産管理', en ? 'A workbook with a fictional worked example' : 'Excelと架空の金額による記入例'],
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <p className="eyebrow mb-5">ABOUT THE AUTHOR</p>
      <div className="flex items-center gap-5 mb-6">
        <Image src="/images/profile.jpg" width={72} height={72} alt="ara" className="rounded-full" />
        <div>
          <h1 className="text-3xl font-bold">{en ? 'About ara' : '執筆者 あら。/ ara'}</h1>
          <p className="mt-2 text-sm text-muted leading-relaxed">{en ? 'An individual investor focused on business growth and durability.' : '事業の成長性と持続性を軸に長期投資を行う個人投資家。'}</p>
        </div>
      </div>
      <p className="text-muted leading-[1.9] mb-10">{en ? 'GAIZEN FINANCE brings together my investment reasoning, mistakes, and research. It is personal commentary, not a service providing individualized investment advice. Public holdings describe my circumstances and are not model allocations for readers.' : 'GAIZEN FINANCEは、投資判断に至る考え方、失敗、調べたことをまとめる個人ブログです。個別の投資助言を提供するサービスではありません。保有銘柄や配分は私自身の条件に基づくもので、読者向けのモデルポートフォリオではありません。'}</p>
      <div className="space-y-9">
        {sections.map(section => <section key={section.title}><h2 className="text-xl font-semibold mb-3">{section.title}</h2><p className="text-muted leading-[1.95]">{section.body}</p></section>)}
      </div>
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="text-xl font-semibold mb-5">{en ? 'Read the examples' : '公開している判断事例と資料'}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {examples.map(([slug, name, description]) => <Link key={slug} href={`${p}/blog/${slug}/`} className="rounded-xl border border-border bg-surface p-5"><h3 className="font-semibold text-accent">{name}</h3><p className="text-sm text-muted leading-relaxed mt-2">{description}</p></Link>)}
        </div>
      </section>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-accent">
        <Link className="inline-flex min-h-11 items-center underline underline-offset-4" href={`${p}/portfolio/`}>{en ? 'Holdings and allocation dates' : '保有方針・資産配分の基準日'}</Link>
        <Link className="inline-flex min-h-11 items-center underline underline-offset-4" href={`${p}/editorial-policy/`}>{en ? 'Sources and editorial policy' : '出典・AI利用・編集方針'}</Link>
        <Link className="inline-flex min-h-11 items-center underline underline-offset-4" href={`${p}/contact/`}>{en ? 'Contact and corrections' : 'お問い合わせ・訂正依頼'}</Link>
      </div>
    </div>
  )
}
