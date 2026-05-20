import { getAllPosts, getAllTags } from '@/lib/posts'
import ArticleCard from '@/components/blog/ArticleCard'
import Tag from '@/components/ui/Tag'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Investment insights on long-term investing, index funds, Japanese stocks, and crypto.',
  alternates: {
    canonical: 'https://gaizen.xyz/en/blog',
    languages: { 'ja': 'https://gaizen.xyz/blog' },
  },
}

export default function EnBlogPage() {
  const posts = getAllPosts('en')
  const tags = getAllTags('en')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>BLOG</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Investment Insights</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Long-term investing, index funds, and market analysis. {posts.length} articles.
        </p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b" style={{ borderColor: 'var(--border)' }}>
          {tags.map(tag => <Tag key={tag} tag={tag} basePath="/en/blog" />)}
        </div>
      )}

      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => <ArticleCard key={post.slug} post={post} basePath="/en/blog" locale="en" />)}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>No articles yet. Check back soon.</p>
        </div>
      )}
    </div>
  )
}
