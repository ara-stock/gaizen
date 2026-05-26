import { getAllPosts, getTopTags } from '@/lib/posts'
import ArticleCard from '@/components/blog/ArticleCard'
import Tag from '@/components/ui/Tag'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: '長期投資・仮想通貨・不動産・マクロ経済に関する投資記録と考察。',
  alternates: {
    canonical: 'https://gaizen.xyz/blog',
    languages: { 'en': 'https://gaizen.xyz/en/blog' },
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getTopTags('ja', 10)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>BLOG</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>投資記録</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          長期投資・仮想通貨・マクロ経済に関する考察と記録。全 {posts.length} 記事。
        </p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b" style={{ borderColor: 'var(--border)' }}>
          {tags.map(tag => <Tag key={tag} tag={tag} />)}
        </div>
      )}

      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => <ArticleCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>記事はまだありません。</p>
        </div>
      )}
    </div>
  )
}
