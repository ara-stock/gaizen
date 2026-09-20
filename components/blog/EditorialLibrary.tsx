import ArticleCard from '@/components/blog/ArticleCard'
import Link from 'next/link'
import type { PostMeta } from '@/types/post'

type Locale = 'ja' | 'en'

const SECTIONS = {
  ja: [
    {
      label: 'RESEARCH',
      title: '企業分析と投資判断',
      description: '時価総額から調べ始め、事業、決算、サービス、株価指標へ。筆者の判断手順と、実際に保有する企業の事例です。',
      slugs: ['individual-stock-investment-thesis', 'alphabet-investment-thesis', 'mufg-investment-thesis', 'japan-bank-stocks', 'ai-infrastructure-stocks'],
    },
    {
      label: 'RECORDS',
      title: '資産管理と見直し',
      description: '月次記録のExcelと計算例を使い、残高の増減を読み取るところから、現金の備えと資産配分を考えます。',
      slugs: ['monthly-asset-tracking', 'emergency-fund', 'portfolio-rebalancing', 'investment-exit-strategy'],
    },
    {
      label: 'START',
      title: '投資を始める',
      description: '口座を作る前後に知っておきたいことを、実際の失敗と毎月の運用方法から整理します。',
      slugs: ['investing-first-30-days', 'nisa-beginner-mistakes', 'rakuten-vs-sbi-securities', 'dollar-cost-averaging'],
    },
    {
      label: 'FUNDS',
      title: 'NISAと投資信託を選ぶ',
      description: '制度の説明だけで終わらず、目論見書・コスト・純資産総額をどう判断に使うかまで扱います。',
      slugs: ['nisa-360-full-utilization', 'how-to-read-mutual-fund-documents', 'why-sp500-over-allcountry', 'monthly-distribution-fund-warning'],
    },
  ],
  en: [
    {
      label: 'RESEARCH',
      title: 'Business Research and Decisions',
      description: 'From market cap to business, results, services, and valuation. Follow the process and the companies the author owns.',
      slugs: ['individual-stock-investment-thesis', 'alphabet-investment-thesis', 'mufg-investment-thesis', 'japan-bank-stocks', 'ai-infrastructure-stocks'],
    },
    {
      label: 'RECORDS',
      title: 'Asset Tracking and Reviews',
      description: 'A workbook and worked examples for reading balance changes, then planning cash reserves and allocation.',
      slugs: ['monthly-asset-tracking', 'emergency-fund', 'portfolio-rebalancing', 'investment-exit-strategy'],
    },
    {
      label: 'START',
      title: 'Start Investing',
      description: 'Practical first steps built around real mistakes, emergency cash, and a manageable monthly routine.',
      slugs: ['investing-first-30-days', 'nisa-beginner-mistakes', 'rakuten-vs-sbi-securities', 'dollar-cost-averaging'],
    },
    {
      label: 'FUNDS',
      title: 'Choose a NISA Fund',
      description: 'Go beyond the rules and learn how to use prospectuses, costs, and fund size in an actual decision.',
      slugs: ['nisa-360-full-utilization', 'how-to-read-mutual-fund-documents', 'why-sp500-over-allcountry', 'monthly-distribution-fund-warning'],
    },
  ],
} satisfies Record<Locale, { label: string; title: string; description: string; slugs: string[] }[]>

interface EditorialLibraryProps {
  posts: PostMeta[]
  locale?: Locale
}

export default function EditorialLibrary({ posts, locale = 'ja' }: EditorialLibraryProps) {
  const basePath = locale === 'en' ? '/en/blog' : '/blog'
  const curatedSlugs = new Set(SECTIONS[locale].flatMap(section => section.slugs))
  const researchPosts = posts.filter(post => !curatedSlugs.has(post.slug))
  const featuredResearch = researchPosts.slice(0, 12)
  const archiveResearch = researchPosts.slice(12)

  return (
    <div className="space-y-20">
      <nav aria-label={locale === 'ja' ? '記事のテーマ' : 'Article topics'} className="flex flex-wrap gap-3">
        {SECTIONS[locale].map(section => (
          <a key={section.label} href={`#${section.label.toLowerCase()}`} className="publication-button publication-button-secondary">{section.title}</a>
        ))}
        {researchPosts.length > 0 && <a href="#perspectives" className="publication-button publication-button-secondary">{locale === 'ja' ? '他の資産・家計' : 'Other assets and household finances'}</a>}
      </nav>
      {SECTIONS[locale].map(section => {
        const sectionPosts = section.slugs
          .map(slug => posts.find(post => post.slug === slug))
          .filter((post): post is PostMeta => Boolean(post))

        if (sectionPosts.length === 0) return null

        return (
          <section key={section.label} id={section.label.toLowerCase()} className="scroll-mt-24">
            <div className="grid lg:grid-cols-[240px_1fr] gap-6 lg:gap-10">
              <div>
                <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>{section.label}</p>
                <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>{section.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{section.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {sectionPosts.map(post => (
                  <ArticleCard key={post.slug} post={post} basePath={basePath} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {researchPosts.length > 0 && (
        <section id="perspectives" className="scroll-mt-24">
          <div className="mb-7 max-w-2xl">
            <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>RESEARCH NOTES</p>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
              {locale === 'en' ? 'Other Assets and Household Finances' : '他の資産・家計を考える'}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              {locale === 'en'
                ? 'Notes on gold, Bitcoin, inflation, and mortgage decisions. Read each asset in the context of your own cash needs and time horizon.'
                : '金・Bitcoin・インフレ・住宅ローンについての考察。資産ごとの特徴を、家計と使う時期に照らして読みます。'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredResearch.map(post => (
              <ArticleCard key={post.slug} post={post} basePath={basePath} locale={locale} />
            ))}
          </div>
          {archiveResearch.length > 0 && (
            <details className="mt-8 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <summary className="cursor-pointer px-5 py-4 text-sm font-semibold">
                {locale === 'en'
                  ? `Browse ${archiveResearch.length} more research notes`
                  : `その他の調査ノート ${archiveResearch.length}件を見る`}
              </summary>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 px-5 pb-5 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                {archiveResearch.map(post => (
                  <Link
                    key={post.slug}
                    href={`${basePath}/${post.slug}/`}
                    className="text-sm leading-relaxed transition-colors hover:text-green-500"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {post.frontmatter.title}
                  </Link>
                ))}
              </div>
            </details>
          )}
        </section>
      )}
    </div>
  )
}
