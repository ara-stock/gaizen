import Link from 'next/link'
import { getPostMeta, type Locale } from '@/lib/posts'

const GUIDES = {
  ja: [
    {
      title: '企業を調べ、判断する',
      description: '調べる順序をつかみ、Alphabet・MUFGの具体例で確認します。',
      slugs: ['individual-stock-investment-thesis', 'alphabet-investment-thesis', 'mufg-investment-thesis'],
    },
    {
      title: '資産を記録し、見直す',
      description: 'Excelの記入例から、現金の備えと資産配分の見直しへ。',
      slugs: ['monthly-asset-tracking', 'emergency-fund', 'portfolio-rebalancing'],
    },
    {
      title: '少額から投資を始める',
      description: '口座開設、商品の資料、買った後の注意点を順に確認します。',
      slugs: ['investing-first-30-days', 'how-to-read-mutual-fund-documents', 'nisa-beginner-mistakes'],
    },
  ],
  en: [
    {
      title: 'Research a Business',
      description: 'Start with the research process, then work through Alphabet and MUFG.',
      slugs: ['individual-stock-investment-thesis', 'alphabet-investment-thesis', 'mufg-investment-thesis'],
    },
    {
      title: 'Record and Review Assets',
      description: 'Use the workbook example, then consider emergency cash and allocation.',
      slugs: ['monthly-asset-tracking', 'emergency-fund', 'portfolio-rebalancing'],
    },
    {
      title: 'Start with a Small Investment',
      description: 'Open an account, read fund documents, and understand common mistakes.',
      slugs: ['investing-first-30-days', 'how-to-read-mutual-fund-documents', 'nisa-beginner-mistakes'],
    },
  ],
} satisfies Record<Locale, { title: string; description: string; slugs: string[] }[]>

interface ReadingGuideProps {
  locale?: Locale
  compact?: boolean
}

export default function ReadingGuide({ locale = 'ja', compact = false }: ReadingGuideProps) {
  const basePath = locale === 'en' ? '/en/blog' : '/blog'

  return (
    <section className={compact ? 'publication-section' : 'mb-16'}>
      <div className="mb-8 max-w-2xl">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>START HERE</p>
        <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
          {locale === 'en' ? 'Choose a Reading Path' : '目的から読む'}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          {locale === 'en'
            ? 'Follow a short reading path based on where you are in your investing journey.'
            : '現在の状況に合うテーマから、順番に読み進められます。'}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {GUIDES[locale].map((guide, guideIndex) => (
          <div key={guide.title} className="p-5 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-xs font-mono mb-3" style={{ color: 'var(--accent)' }}>PATH 0{guideIndex + 1}</p>
            <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{guide.title}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>{guide.description}</p>
            <ol className="space-y-3">
              {guide.slugs.map((slug, articleIndex) => {
                const post = getPostMeta(slug, locale)
                if (!post?.frontmatter.published) return null
                return (
                  <li key={slug}>
                    <Link href={`${basePath}/${slug}/`} className="flex gap-2 text-sm leading-relaxed min-h-11 items-start transition-colors hover:text-green-500">
                      <span className="font-mono flex-shrink-0" style={{ color: 'var(--accent)' }}>{articleIndex + 1}.</span>
                      <span style={{ color: 'var(--foreground)' }}>{post.frontmatter.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
      </div>
    </section>
  )
}
