import { getAllTags, getPostsByTag } from '@/lib/posts'
import ArticleCard from '@/components/blog/ArticleCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  return getAllTags().map(tag => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return { title: `#${decoded}`, description: `${decoded} に関する記事一覧` }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = getPostsByTag(decoded)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <Link href="/blog" className="text-xs mb-6 block hover:text-white transition-colors" style={{ color: 'var(--muted)' }}>
          ← Blog に戻る
        </Link>
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>TAG</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>#{decoded}</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>{posts.length} 件の記事</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => <ArticleCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <p className="text-sm" style={{ color: 'var(--muted)' }}>このタグの記事はありません。</p>
      )}
    </div>
  )
}
