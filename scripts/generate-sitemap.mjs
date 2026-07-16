import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const BLOG_DIR = path.join(ROOT, 'content/blog')
const EN_BLOG_DIR = path.join(ROOT, 'content/en/blog')
const OUT_DIR = path.join(ROOT, 'out')

const SITE_URL = 'https://gaizen.xyz'

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function getPosts(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      const { data } = matter(raw)
      return { slug: f.replace(/\.md$/, ''), ...data }
    })
    .filter(p => p.published)
}

const jaPosts = getPosts(BLOG_DIR)
const enPosts = getPosts(EN_BLOG_DIR)
const now = new Date().toISOString().split('T')[0]

const staticRoutes = [
  { url: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },
  { url: `${SITE_URL}/blog/`, priority: '0.9', changefreq: 'daily' },
  { url: `${SITE_URL}/en/`, priority: '1.0', changefreq: 'weekly' },
  { url: `${SITE_URL}/en/blog/`, priority: '0.9', changefreq: 'daily' },
  { url: `${SITE_URL}/portfolio/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${SITE_URL}/en/portfolio/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${SITE_URL}/tools/`, priority: '0.7', changefreq: 'monthly' },
  { url: `${SITE_URL}/en/tools/`, priority: '0.7', changefreq: 'monthly' },
  { url: `${SITE_URL}/about/`, priority: '0.5', changefreq: 'yearly' },
  { url: `${SITE_URL}/en/about/`, priority: '0.5', changefreq: 'yearly' },
  { url: `${SITE_URL}/editorial-policy/`, priority: '0.5', changefreq: 'yearly' },
  { url: `${SITE_URL}/en/editorial-policy/`, priority: '0.5', changefreq: 'yearly' },
  { url: `${SITE_URL}/thesis/`, priority: '0.7', changefreq: 'monthly' },
  { url: `${SITE_URL}/en/thesis/`, priority: '0.7', changefreq: 'monthly' },
  { url: `${SITE_URL}/disclaimer/`, priority: '0.3', changefreq: 'yearly' },
  { url: `${SITE_URL}/en/disclaimer/`, priority: '0.3', changefreq: 'yearly' },
  { url: `${SITE_URL}/privacy/`, priority: '0.3', changefreq: 'yearly' },
  { url: `${SITE_URL}/en/privacy/`, priority: '0.3', changefreq: 'yearly' },
  { url: `${SITE_URL}/contact/`, priority: '0.4', changefreq: 'yearly' },
  { url: `${SITE_URL}/en/contact/`, priority: '0.4', changefreq: 'yearly' },
]

function entry({ url, priority, changefreq, lastmod }) {
  const safeUrl = xmlEscape(url)
  const safeLastmod = xmlEscape(lastmod ?? now)
  const safeChangefreq = xmlEscape(changefreq)
  const safePriority = xmlEscape(priority)

  return `  <url>
    <loc>${safeUrl}</loc>
    <lastmod>${safeLastmod}</lastmod>
    <changefreq>${safeChangefreq}</changefreq>
    <priority>${safePriority}</priority>
  </url>`
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(r => entry(r)).join('\n')}
${jaPosts.map(p => entry({
  url: `${SITE_URL}/blog/${p.slug}/`,
  lastmod: (p.updatedAt || p.date || '').toString().split('T')[0],
  changefreq: 'monthly',
  priority: '0.8',
})).join('\n')}
${enPosts.map(p => entry({
  url: `${SITE_URL}/en/blog/${p.slug}/`,
  lastmod: (p.updatedAt || p.date || '').toString().split('T')[0],
  changefreq: 'monthly',
  priority: '0.8',
})).join('\n')}
</urlset>`

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml, 'utf-8')
// Keep this filename for Search Console submissions that already use it.
// It intentionally contains the URL set directly instead of a sitemap index,
// so Search Console can discover pages even if it does not fetch child sitemaps.
fs.writeFileSync(path.join(OUT_DIR, 'sitemap-index.xml'), xml, 'utf-8')
console.log(`[sitemap] Generated with ${staticRoutes.length + jaPosts.length + enPosts.length} URLs`)
