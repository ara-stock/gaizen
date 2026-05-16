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

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

function calcReadingTime(text: string): number {
  const words = text.replace(/<[^>]*>/g, '').length
  return Math.ceil(words / 400)
}

function getExcerpt(content: string, length = 120): string {
  return content.replace(/^#+\s.+$/gm, '').replace(/[#*`>\[\]]/g, '').trim().slice(0, length) + '...'
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

export function getAllPosts(): PostMeta[] {
  return getAllPostSlugs()
    .map(slug => getPostMeta(slug))
    .filter((p): p is PostMeta => p !== null && p.frontmatter.published)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export function getPostMeta(slug: string): PostMeta | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
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

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return {
    slug,
    frontmatter: data as Post['frontmatter'],
    content: processed.toString(),
    readingTime: calcReadingTime(content),
    excerpt: getExcerpt(content),
  }
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter(p => p.frontmatter.tags.includes(tag))
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(p => p.frontmatter.category === category)
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap(p => p.frontmatter.tags)
  return [...new Set(tags)].sort()
}

export function getRelatedPosts(slug: string, tags: string[], limit = 3): PostMeta[] {
  return getAllPosts()
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
