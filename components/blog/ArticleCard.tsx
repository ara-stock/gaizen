import Link from 'next/link'
import Tag from '@/components/ui/Tag'
import type { PostMeta } from '@/types/post'

interface ArticleCardProps {
  post: PostMeta
  basePath?: string
  locale?: 'ja' | 'en'
}

export default function ArticleCard({ post, basePath = '/blog', locale = 'ja' }: ArticleCardProps) {
  const { slug, frontmatter, readingTime, excerpt } = post
  const dateLocale = locale === 'en' ? 'en-US' : 'ja-JP'

  return (
    <article className="p-6 rounded-lg border transition-colors" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs" style={{ color: 'var(--muted)' }}>
          {new Date(frontmatter.date).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span className="text-xs" style={{ color: 'var(--muted)' }}>{readingTime} min read</span>
      </div>

      <Link href={`${basePath}/${slug}`}>
        <h2 className="text-base font-semibold mb-2 leading-snug hover:text-yellow-400 transition-colors" style={{ color: 'var(--foreground)' }}>
          {frontmatter.title}
        </h2>
      </Link>

      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
        {frontmatter.description || excerpt}
      </p>

      <div className="flex flex-wrap gap-2">
        {frontmatter.tags.map(tag => <Tag key={tag} tag={tag} />)}
      </div>
    </article>
  )
}
