import Link from 'next/link'
import { getPostMeta, type Locale } from '@/lib/posts'

const GUIDES = {
  ja: [
    {
      title: '投資をこれから始める',
      description: '口座開設から最初の積立まで、失敗を避けながら進めるための順番です。',
      slugs: ['investing-first-30-days', 'nisa-beginner-mistakes', 'emergency-fund'],
    },
    {
      title: 'NISA・投資信託を理解する',
      description: '制度と商品の仕組みを理解し、自分で選べる状態を目指します。',
      slugs: ['nisa-perfect-strategy', 'how-to-read-mutual-fund-documents', 'sp500-vs-allcountry'],
    },
    {
      title: '投資方針を組み立てる',
      description: '長期投資の軸と、個別株や他資産を組み合わせる考え方を整理します。',
      slugs: ['core-satellite-strategy', 'portfolio-rebalancing', 'bonds-and-gold'],
    },
  ],
  en: [
    {
      title: 'Start Investing',
      description: 'A practical sequence from opening an account to making your first recurring investment.',
      slugs: ['investing-first-30-days', 'nisa-beginner-mistakes', 'emergency-fund'],
    },
    {
      title: 'Understand NISA and Funds',
      description: 'Learn how the system and products work before choosing what to buy.',
      slugs: ['nisa-perfect-strategy', 'how-to-read-mutual-fund-documents', 'sp500-vs-allcountry'],
    },
    {
      title: 'Build an Investment Policy',
      description: 'Develop a long-term framework for combining index funds, stocks, and other assets.',
      slugs: ['core-satellite-strategy', 'portfolio-rebalancing', 'bonds-and-gold'],
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
    <section className={compact ? 'py-16 border-b' : 'mb-16'}>
      <div className="mb-8">
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
          <div key={guide.title} className="p-5 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-xs font-mono mb-3" style={{ color: 'var(--accent)' }}>0{guideIndex + 1}</p>
            <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{guide.title}</h3>
            <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>{guide.description}</p>
            <ol className="space-y-3">
              {guide.slugs.map((slug, articleIndex) => {
                const post = getPostMeta(slug, locale)
                if (!post?.frontmatter.published) return null
                return (
                  <li key={slug}>
                    <Link href={`${basePath}/${slug}`} className="flex gap-2 text-xs leading-relaxed transition-colors hover:text-green-500">
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
