import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, type Locale } from '@/lib/posts'
import ArticleCard from './ArticleCard'
import ReadingGuide from './ReadingGuide'

const COPY = {
  ja: {
    eyebrow: '個人投資家 ara の企業分析と資産管理',
    title: '長期投資を、迷わず続けるために。',
    intro: 'なぜその企業を買い、何が変われば見直すのか。AlphabetとMUFGを保有する筆者が、事業の成長性と持続性をどう考えているかを公開します。',
    primary: '個別株の調べ方を読む', secondary: '資産管理のExcelを使う',
    notebook: '購入理由から、見直す条件まで',
    notebookNote: '筆者の投資仮説の要約です。将来の成長や利益を保証するものではありません。',
    reason: '着目した理由', watch: '確かめること', read: '判断の全文を読む',
    cases: [
      { name: 'Alphabet', code: 'GOOGL / GOOG', slug: 'alphabet-investment-thesis', reason: 'YouTubeのユーザー接点。現在はCloud・AIと自社インフラにも注目。', watch: '広告・Cloudの収益と、設備投資が利益につながるか。' },
      { name: 'MUFG', code: '8306', slug: 'mufg-investment-thesis', reason: '金利、海外事業、新NISAによる資産運用事業への期待。', watch: '利ざやだけでなく、信用コストと資本の余力。' },
    ],
    researchTitle: '保有企業を、どう見ているか。',
    researchIntro: '購入のきっかけ、注目する事業、買い増しと見直しの条件。会社紹介から一歩進んで、筆者の判断過程を読めます。',
    researchLink: '企業分析の記事へ',
    resourceTitle: '月末の記録を、続けられる形に。',
    resourceIntro: '銀行・証券口座・手元の現金を月ごとに記録。総額と前月比を自動集計し、棒グラフで推移を確認できるExcelです。',
    resourceNote: '空欄の入力用シートと架空の記入例を収録。筆者の残高・個人アカウントは含みません。日本語版のファイルです。',
    download: 'Excelをダウンロード', instructions: '記入例と使い方を読む',
    sampleTitle: '記録の読み方 / 架空の例',
    sampleRows: [['前月の総資産', '190万円'], ['今月の総資産', '197万円'], ['資産額の増減', '+7万円']],
    sampleNote: 'この7万円は運用益とは限りません。給与や支出も含む「残高の変化」です。',
    latest: '最近公開した記事', all: 'すべての記事',
    authorTitle: '執筆者について',
    author: '大学院時代、会社をよく理解せずに買った個別株が半値になり、損切りしました。現在は事業の成長性と持続性を軸に、長期で保有する企業を調べています。',
    authorLink: 'ara のプロフィール', policy: '出典・訂正・広告の方針',
  },
  en: {
    eyebrow: 'BUSINESS RESEARCH & ASSET TRACKING BY ARA',
    title: 'Invest steadily. Stay the course.',
    intro: 'Why buy a business, and what would change the decision? An individual investor in Alphabet and MUFG shares the reasoning behind long-term holdings, with a focus on growth and durability.',
    primary: 'Follow my stock research process', secondary: 'Use the asset tracking workbook',
    notebook: 'From a purchase reason to a review condition',
    notebookNote: 'Summaries of personal investment theses, not promises of growth or returns.',
    reason: 'Original interest', watch: 'What to check', read: 'Read the full thesis',
    cases: [
      { name: 'Alphabet', code: 'GOOGL / GOOG', slug: 'alphabet-investment-thesis', reason: 'YouTube as a customer touchpoint; now also Cloud, AI, and owned infrastructure.', watch: 'Advertising and Cloud earnings, and whether capital spending produces returns.' },
      { name: 'MUFG', code: '8306', slug: 'mufg-investment-thesis', reason: 'Interest rates, overseas businesses, and asset management opportunities from NISA.', watch: 'Lending margins alongside credit costs and capital capacity.' },
    ],
    researchTitle: 'Inside the businesses I own.',
    researchIntro: 'Why I bought, which business I watch, and when I would add or reconsider. Follow the decision process beyond a company overview.',
    researchLink: 'Browse business research',
    resourceTitle: 'Make the month-end habit easier.',
    resourceIntro: 'Record bank accounts, brokerage balances, and cash each month. An Excel workbook adds the totals and monthly changes, with bar charts to show the trend.',
    resourceNote: 'Includes a blank input sheet and a fictional example. No personal account or real author balances. The workbook is in Japanese.',
    download: 'Download Excel workbook', instructions: 'Read the example and instructions',
    sampleTitle: 'READING A RECORD / FICTIONAL EXAMPLE',
    sampleRows: [['Previous total', 'JPY 1,900,000'], ['Current total', 'JPY 1,970,000'], ['Change in assets', '+JPY 70,000']],
    sampleNote: 'The increase is not necessarily an investment gain. Salary and spending also change the balance.',
    latest: 'Recently published', all: 'All articles',
    authorTitle: 'About the author',
    author: 'In graduate school I bought an individual stock without understanding the business, then sold after its price halved. Today I research businesses for long-term ownership, focusing on growth and durability.',
    authorLink: 'Meet ara', policy: 'Sources, corrections, and advertising',
  },
}

export default function PublicationHome({ locale = 'ja' }: { locale?: Locale }) {
  const t = COPY[locale]
  const prefix = locale === 'en' ? '/en' : ''
  const posts = getAllPosts(locale)
  const caseSlugs = ['alphabet-investment-thesis', 'mufg-investment-thesis']
  const cases = posts.filter(post => caseSlugs.includes(post.slug))
  const latest = posts.filter(post => !caseSlugs.includes(post.slug)).slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <section className="publication-hero py-12 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <p className="eyebrow mb-5">{t.eyebrow}</p>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.25] text-balance">{t.title}</h1>
            <p className="mt-6 text-base sm:text-lg leading-[1.9] text-muted">{t.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="publication-button" href={`${prefix}/blog/individual-stock-investment-thesis/`}>{t.primary}</Link>
              <Link className="publication-button publication-button-secondary" href="#asset-workbook">{t.secondary}</Link>
            </div>
          </div>
          <div className="research-notebook">
            <p className="eyebrow">INVESTMENT NOTES</p>
            <h2 className="text-lg font-semibold mt-2 mb-5">{t.notebook}</h2>
            <div className="space-y-6">
              {t.cases.filter(item => cases.some(post => post.slug === item.slug)).map(item => (
                <div key={item.slug} className="border-t border-border pt-5">
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <h3 className="text-2xl font-semibold tracking-tight">{item.name}</h3>
                    <span className="font-mono text-xs text-muted">{item.code}</span>
                  </div>
                  <dl className="space-y-2 text-sm leading-relaxed">
                    <div><dt className="font-semibold inline">{t.reason}: </dt><dd className="inline text-muted">{item.reason}</dd></div>
                    <div><dt className="font-semibold inline">{t.watch}: </dt><dd className="inline text-muted">{item.watch}</dd></div>
                  </dl>
                  <Link className="inline-flex min-h-11 items-center mt-2 text-sm font-semibold text-accent underline underline-offset-4" href={`${prefix}/blog/${item.slug}/`}>{t.read} <span aria-hidden="true" className="ml-2">→</span></Link>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted leading-relaxed">{t.notebookNote}</p>
          </div>
        </div>
      </section>

      <ReadingGuide compact locale={locale} />

      <section className="publication-section" id="business-research">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow mb-3">BUSINESS RESEARCH</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.researchTitle}</h2>
          <p className="text-muted mt-4 leading-relaxed">{t.researchIntro}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {cases.map(post => <ArticleCard key={post.slug} post={post} basePath={`${prefix}/blog`} locale={locale} />)}
        </div>
        <Link className="inline-flex min-h-11 items-center text-sm text-accent font-semibold mt-4 underline underline-offset-4" href={`${prefix}/blog/#research`}>{t.researchLink}</Link>
      </section>

      <section className="publication-section scroll-mt-24" id="asset-workbook">
        <div className="workbook-feature grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12">
          <div>
            <p className="eyebrow mb-3">FREE WORKBOOK</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-snug">{t.resourceTitle}</h2>
            <p className="mt-4 text-muted leading-relaxed">{t.resourceIntro}</p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a className="publication-button" href="/downloads/gaizen-asset-tracking-template.xlsx" download>{t.download}<span className="text-xs opacity-80">.xlsx</span></a>
              <Link className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4" href={`${prefix}/blog/monthly-asset-tracking/`}>{t.instructions}</Link>
            </div>
            <p className="mt-4 text-xs text-muted leading-relaxed">{t.resourceNote}</p>
          </div>
          <div className="rounded-xl bg-surface border border-border p-5 sm:p-6">
            <p className="text-xs font-semibold text-muted mb-4">{t.sampleTitle}</p>
            <dl className="space-y-4">
              {t.sampleRows.map(([label, value]) => (
                <div key={label} className="flex flex-wrap justify-between gap-2 border-b border-border pb-3">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="text-lg font-semibold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm text-muted mt-4 leading-relaxed">{t.sampleNote}</p>
          </div>
        </div>
      </section>

      <section className="publication-section">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="text-2xl font-semibold">{t.latest}</h2>
          <Link href={`${prefix}/blog/`} className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4">{t.all}</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {latest.map(post => <ArticleCard key={post.slug} post={post} basePath={`${prefix}/blog`} locale={locale} />)}
        </div>
      </section>

      <section className="py-12 sm:py-16 grid sm:grid-cols-[80px_1fr] gap-6 max-w-3xl">
        <Image src="/images/profile.jpg" alt="ara" width={72} height={72} className="rounded-full" />
        <div>
          <h2 className="text-lg font-semibold">{t.authorTitle} / ara</h2>
          <p className="mt-3 text-sm text-muted leading-[1.9]">{t.author}</p>
          <div className="flex flex-wrap gap-x-6 mt-3 text-sm text-accent">
            <Link className="inline-flex items-center min-h-11 underline underline-offset-4" href={`${prefix}/about/`}>{t.authorLink}</Link>
            <Link className="inline-flex items-center min-h-11 underline underline-offset-4" href={`${prefix}/editorial-policy/`}>{t.policy}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
