import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
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

const projectsData = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/projects/projects.json'), 'utf-8'))
const staticRoutes = [
  { url: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly', lastmod: projectsData.updatedAt },
  { url: `${SITE_URL}/portfolio/`, priority: '0.6', changefreq: 'monthly' },
  { url: `${SITE_URL}/tools/`, priority: '0.6', changefreq: 'monthly' },
  { url: `${SITE_URL}/tools/allocation/`, priority: '0.5', changefreq: 'yearly' },
  { url: `${SITE_URL}/tools/fire/`, priority: '0.5', changefreq: 'yearly' },
  { url: `${SITE_URL}/tools/sharpe/`, priority: '0.5', changefreq: 'yearly' },
  { url: `${SITE_URL}/tools/realestate/`, priority: '0.5', changefreq: 'yearly' },
  { url: `${SITE_URL}/about/`, priority: '0.5', changefreq: 'yearly' },
  { url: `${SITE_URL}/disclaimer/`, priority: '0.3', changefreq: 'yearly' },
  { url: `${SITE_URL}/privacy/`, priority: '0.3', changefreq: 'yearly' },
  { url: `${SITE_URL}/contact/`, priority: '0.4', changefreq: 'yearly' },
]

function entry({ url, priority, changefreq, lastmod }) {
  const safeUrl = xmlEscape(url)
  const safeChangefreq = xmlEscape(changefreq)
  const safePriority = xmlEscape(priority)
  const lastmodLine = lastmod ? `\n    <lastmod>${xmlEscape(lastmod)}</lastmod>` : ''

  return `  <url>
    <loc>${safeUrl}</loc>${lastmodLine}
    <changefreq>${safeChangefreq}</changefreq>
    <priority>${safePriority}</priority>
  </url>`
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(r => entry(r)).join('\n')}
${projectsData.projects.map(p => entry({
  url: `${SITE_URL}/tracker/${p.slug}/`,
  lastmod: p.updatedAt,
  changefreq: 'weekly',
  priority: '0.7',
})).join('\n')}
</urlset>`

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml, 'utf-8')
// Keep this filename for Search Console submissions that already use it.
// It intentionally contains the URL set directly instead of a sitemap index,
// so Search Console can discover pages even if it does not fetch child sitemaps.
fs.writeFileSync(path.join(OUT_DIR, 'sitemap-index.xml'), xml, 'utf-8')
console.log(`[sitemap] Generated with ${staticRoutes.length + projectsData.projects.length} URLs`)
