import fs from 'fs'
import path from 'path'

const EN_OUT_DIR = path.join(process.cwd(), 'out', 'en')

function updateHtmlLang(dir) {
  if (!fs.existsSync(dir)) return 0

  let updated = 0
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      updated += updateHtmlLang(filePath)
    } else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(filePath, 'utf8')
      const nextHtml = html.replace('<html lang="ja"', '<html lang="en"')
      if (nextHtml !== html) {
        fs.writeFileSync(filePath, nextHtml, 'utf8')
        updated += 1
      }
    }
  }
  return updated
}

console.log(`[lang] Updated ${updateHtmlLang(EN_OUT_DIR)} English HTML files`)
