import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import type { Post, PostMeta } from '@/types/post'

export type Locale = 'ja' | 'en'

const CONTENT_DIRS: Record<Locale, string> = {
  ja: path.join(process.cwd(), 'content/blog'),
  en: path.join(process.cwd(), 'content/en/blog'),
}

function getContentDir(locale: Locale): string {
  return CONTENT_DIRS[locale]
}

function calcReadingTime(text: string): number {
  const words = text.replace(/<[^>]*>/g, '').length
  return Math.ceil(words / 400)
}

function getExcerpt(content: string, length = 120): string {
  return content.replace(/^#+\s.+$/gm, '').replace(/[#*`>\[\]]/g, '').trim().slice(0, length) + '...'
}

export function getAllPostSlugs(locale: Locale = 'ja'): string[] {
  const dir = getContentDir(locale)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

export function getAllPosts(locale: Locale = 'ja'): PostMeta[] {
  return getAllPostSlugs(locale)
    .map(slug => getPostMeta(slug, locale))
    .filter((p): p is PostMeta => p !== null && p.frontmatter.published)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export function getPostMeta(slug: string, locale: Locale = 'ja'): PostMeta | null {
  const filePath = path.join(getContentDir(locale), `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    frontmatter: data as PostMeta['frontmatter'],
    readingTime: calcReadingTime(content),
    excerpt: getExcerpt(content),
  }
}

export async function getPostBySlug(slug: string, locale: Locale = 'ja'): Promise<Post | null> {
  const filePath = path.join(getContentDir(locale), `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  // Convert :::comment ... ::: blocks to author bubble HTML
  const processedContent = content.replace(
    /:::comment\n([\s\S]*?)\n:::/g,
    (_, text) =>
      `<div class="author-comment"><img src="/images/avatar.jpg" alt="あら。" /><div class="author-comment-bubble">${text.trim()}</div></div>`
  )

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedContent)

  return {
    slug,
    frontmatter: data as Post['frontmatter'],
    content: processed.toString(),
    readingTime: calcReadingTime(content),
    excerpt: getExcerpt(content),
  }
}

export function getPostsByTag(tag: string, locale: Locale = 'ja'): PostMeta[] {
  return getAllPosts(locale).filter(p => p.frontmatter.tags.includes(tag))
}

export function getPostsByCategory(category: string, locale: Locale = 'ja'): PostMeta[] {
  return getAllPosts(locale).filter(p => p.frontmatter.category === category)
}

export function getAllTags(locale: Locale = 'ja'): string[] {
  const tags = getAllPosts(locale).flatMap(p => p.frontmatter.tags)
  return [...new Set(tags)].sort()
}

export function getTopTags(locale: Locale = 'ja', limit = 10): string[] {
  const counts = new Map<string, number>()
  getAllPosts(locale).flatMap(p => p.frontmatter.tags).forEach(t => {
    counts.set(t, (counts.get(t) ?? 0) + 1)
  })
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag)
}

export function getRelatedPosts(slug: string, tags: string[], locale: Locale = 'ja', limit = 3): PostMeta[] {
  return getAllPosts(locale)
    .filter(p => p.slug !== slug && p.frontmatter.tags.some(t => tags.includes(t)))
    .slice(0, limit)
}

export function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const regex = /<h([2-3])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[2-3]>/g
  const headings: { id: string; text: string; level: number }[] = []
  let match
  while ((match = regex.exec(html)) !== null) {
    headings.push({ level: parseInt(match[1]), id: match[2], text: match[3].replace(/<[^>]+>/g, '') })
  }
  return headings
}
