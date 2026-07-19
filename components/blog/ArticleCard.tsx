import Link from 'next/link'
import Image from 'next/image'
import Tag from '@/components/ui/Tag'
import type { PostMeta } from '@/types/post'

interface ArticleCardProps {
  post: PostMeta
  basePath?: string
  locale?: 'ja' | 'en'
}

const CATEGORY_LABELS = {
  ja: {
    'us-stock': '投資信託・米国株',
    'jp-stock': '日本株',
    'japan-stock': '日本株',
    nisa: 'NISA',
    macro: 'マクロ',
    crypto: '暗号資産',
  },
  en: {
    'us-stock': 'Funds & US Stocks',
    'jp-stock': 'Japanese Stocks',
    'japan-stock': 'Japanese Stocks',
    nisa: 'NISA',
    macro: 'Macro',
    crypto: 'Crypto',
  },
} as const

export default function ArticleCard({ post, basePath = '/blog', locale = 'ja' }: ArticleCardProps) {
  const { slug, frontmatter, readingTime, excerpt } = post
  const dateLocale = locale === 'en' ? 'en-US' : 'ja-JP'
  const articleHref = `${basePath}/${slug}/`
  const categoryLabel = CATEGORY_LABELS[locale][frontmatter.category as keyof typeof CATEGORY_LABELS[typeof locale]] ?? frontmatter.category

  return (
    <article className="group rounded-2xl border overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      {frontmatter.coverImage && (
        <Link href={articleHref} className="block relative w-full h-40 overflow-hidden">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
          {frontmatter.featured && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: 'var(--accent)' }}>
              PICK
            </span>
          )}
          <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--surface-2)', color: 'var(--muted)' }}>
            {categoryLabel}
          </span>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            {new Date(frontmatter.date).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span style={{ color: 'var(--border)' }}>·</span>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>{readingTime} min read</span>
        </div>

        <Link href={articleHref}>
          <h2 className="text-base font-semibold mb-2 leading-snug transition-colors group-hover:text-green-500" style={{ color: 'var(--foreground)' }}>
            {frontmatter.title}
          </h2>
        </Link>

        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
          {frontmatter.description || excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.slice(0, 3).map(tag => <Tag key={tag} tag={tag} basePath={basePath} linked={false} />)}
        </div>
      </div>
    </article>
  )
}
