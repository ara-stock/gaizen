import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostBySlug, getRelatedPosts, extractHeadings } from '@/lib/posts'
import TableOfContents from '@/components/blog/TableOfContents'
import ArticleCard from '@/components/blog/ArticleCard'
import ShareButton from '@/components/blog/ShareButton'
import Tag from '@/components/ui/Tag'
import AdUnit from '@/components/ads/AdUnit'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPostSlugs('en', true).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'en')
  if (!post) return {}
  const { frontmatter } = post
  const hasJapaneseVersion = getAllPostSlugs('ja', true).includes(slug)
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    alternates: {
      canonical: `https://gaizen.xyz/en/blog/${slug}/`,
      ...(hasJapaneseVersion && { languages: { 'ja': `https://gaizen.xyz/blog/${slug}/` } }),
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updatedAt,
      tags: frontmatter.tags,
      ...(frontmatter.coverImage && { images: [{ url: frontmatter.coverImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      ...(frontmatter.coverImage && { images: [frontmatter.coverImage] }),
    },
  }
}

export default async function EnArticlePage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'en')
  if (!post) notFound()

  const { frontmatter, content, readingTime } = post
  const headings = extractHeadings(content)
  const related = getRelatedPosts(slug, frontmatter.tags, 'en')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedAt || frontmatter.date,
    author: { '@type': 'Person', name: 'ara', url: 'https://gaizen.xyz/en/about/' },
    publisher: { '@type': 'Organization', name: 'GAIZEN FINANCE', url: 'https://gaizen.xyz' },
    keywords: frontmatter.tags.join(', '),
    inLanguage: 'en',
    ...(frontmatter.coverImage && { image: `https://gaizen.xyz${frontmatter.coverImage}` }),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gaizen.xyz/en/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://gaizen.xyz/en/blog/' },
      { '@type': 'ListItem', position: 3, name: frontmatter.title, item: `https://gaizen.xyz/en/blog/${slug}/` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/en">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/en/blog">Blog</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="truncate">{frontmatter.title}</span>
        </nav>
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <article>
            <header className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="flex flex-wrap gap-2 mb-4">
                {frontmatter.tags.map(tag => <Tag key={tag} tag={tag} basePath="/en/blog" />)}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-6" style={{ color: 'var(--foreground)' }}>
                {frontmatter.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
                <span>
                  {new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                {frontmatter.updatedAt && frontmatter.updatedAt !== frontmatter.date && (
                  <span>Updated: {new Date(frontmatter.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                )}
                <span>{readingTime} min read</span>
              </div>
            </header>

            <div className="mb-8 p-4 rounded-lg border text-xs leading-relaxed"
              style={{ backgroundColor: 'rgba(201,168,76,0.05)', borderColor: 'rgba(201,168,76,0.2)', color: 'var(--muted)' }}>
              This article is for informational purposes only and does not constitute investment advice. Please make investment decisions at your own discretion.
            </div>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />

            <div className="mt-10 flex justify-end">
              <ShareButton title={frontmatter.title} url={`https://gaizen.xyz/en/blog/${slug}/`} label="Share on 𝕏" />
            </div>

            {/* Author bio */}
            <div className="mt-6 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
              <Link href="/en/about" className="flex items-start gap-4 p-4 rounded-xl border transition-colors hover:border-green-800 group"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <Image
                  src="/images/profile.jpg"
                  alt="ara"
                  width={48}
                  height={48}
                  className="rounded-full object-cover flex-shrink-0"
                  style={{ border: '1px solid var(--border)' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>ara</p>
                    <span className="text-xs" style={{ color: 'var(--accent)' }}>@ara_stock</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                    Side investor. Portfolio anchored in index accumulation with individual stocks across trading companies, banks, AI, and fintech — plus crypto and gold.
                  </p>
                </div>
              </Link>
            </div>

            <AdUnit slot="5151883773" format="auto" className="my-10" />

            {related.length > 0 && (
              <section className="mt-16 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
                <h2 className="text-base font-semibold mb-6" style={{ color: 'var(--foreground)' }}>Related Articles</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map(p => <ArticleCard key={p.slug} post={p} basePath="/en/blog" locale="en" />)}
                </div>
              </section>
            )}
          </article>

          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    </>
  )
}
