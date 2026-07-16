import ArticleCard from '@/components/blog/ArticleCard'
import type { PostMeta } from '@/types/post'

type Locale = 'ja' | 'en'

const SECTIONS = {
  ja: [
    {
      label: 'STEP 01',
      title: '投資を始める',
      description: '口座を作る前後に知っておきたいことを、実際の失敗と毎月の運用方法から整理します。',
      slugs: ['investing-first-30-days', 'emergency-fund', 'nisa-beginner-mistakes', 'monthly-asset-tracking'],
    },
    {
      label: 'STEP 02',
      title: 'NISAと投資信託を選ぶ',
      description: '制度の説明だけで終わらず、目論見書・コスト・純資産総額をどう判断に使うかまで扱います。',
      slugs: ['nisa-mutual-fund-checklist', 'how-to-read-mutual-fund-documents', 'sp500-vs-allcountry', 'monthly-distribution-fund-warning'],
    },
    {
      label: 'STEP 03',
      title: '長く続ける仕組みを作る',
      description: '積立額、資産配分、リバランス、出口まで、相場に振り回されにくい運用ルールを考えます。',
      slugs: ['dollar-cost-averaging', 'core-satellite-strategy', 'portfolio-rebalancing', 'investment-exit-strategy'],
    },
  ],
  en: [
    {
      label: 'STEP 01',
      title: 'Start Investing',
      description: 'Practical first steps built around real mistakes, emergency cash, and a manageable monthly routine.',
      slugs: ['investing-first-30-days', 'emergency-fund', 'nisa-beginner-mistakes', 'monthly-asset-tracking'],
    },
    {
      label: 'STEP 02',
      title: 'Choose a NISA Fund',
      description: 'Go beyond the rules and learn how to use prospectuses, costs, and fund size in an actual decision.',
      slugs: ['nisa-mutual-fund-checklist', 'how-to-read-mutual-fund-documents', 'sp500-vs-allcountry', 'monthly-distribution-fund-warning'],
    },
    {
      label: 'STEP 03',
      title: 'Build a Repeatable System',
      description: 'Set rules for contributions, allocation, rebalancing, and withdrawals without chasing the market.',
      slugs: ['dollar-cost-averaging', 'core-satellite-strategy', 'portfolio-rebalancing', 'investment-exit-strategy'],
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

  return (
    <div className="space-y-20">
      {SECTIONS[locale].map(section => {
        const sectionPosts = section.slugs
          .map(slug => posts.find(post => post.slug === slug))
          .filter((post): post is PostMeta => Boolean(post))

        if (sectionPosts.length === 0) return null

        return (
          <section key={section.label}>
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
        <section>
          <div className="mb-7 max-w-2xl">
            <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>RESEARCH NOTES</p>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
              {locale === 'en' ? 'Investment Research and Case Studies' : '投資判断のための調査ノート'}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              {locale === 'en'
                ? 'Personal research on stocks, macro themes, alternative assets, and retirement planning. These are decision records, not recommendations.'
                : '個別株、経済テーマ、代替資産、FIREについて、筆者が実際の投資判断で考えたことを記録しています。銘柄の推奨ではありません。'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {researchPosts.map(post => (
              <ArticleCard key={post.slug} post={post} basePath={basePath} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
