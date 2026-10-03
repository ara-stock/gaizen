// The site has one root layout with lang="ja". Pages under /en/ are English,
// so their exported HTML gets lang="en" here, after `next build`.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const EN_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'out', 'en')

let count = 0
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(file)
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf-8')
      const fixed = html.replace(/<html([^>]*) lang="ja"/, '<html$1 lang="en"')
      if (fixed !== html) {
        fs.writeFileSync(file, fixed, 'utf-8')
        count++
      }
    }
  }
}

if (fs.existsSync(EN_DIR)) walk(EN_DIR)
console.log(`[html-lang] Set lang="en" on ${count} pages`)
