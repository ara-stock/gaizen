import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'
import matter from 'gray-matter'

const root = process.cwd()
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'gaizen-publication-'))
const cache = path.join(root, 'node_modules/.cache')
fs.mkdirSync(cache, { recursive: true })
const modulePath = path.join(cache, `posts-audit-${process.pid}.mjs`)

try {
  const source = fs.readFileSync(path.join(root, 'lib/posts.ts'), 'utf8')
  fs.writeFileSync(modulePath, ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText)
  for (const dir of ['content/blog', 'content/en/blog']) {
    fs.mkdirSync(path.join(fixture, dir), { recursive: true })
    for (const [slug, value] of [['public', 'true'], ['draft', 'false'], ['string', '"true"'], ['missing', null]]) {
      fs.writeFileSync(path.join(fixture, dir, `${slug}.md`), `---\ntitle: Test\ndate: '2026-09-11'\ntags: [test]\ncategory: test\n${value === null ? '' : `published: ${value}\n`}---\n## Heading\n\n:::comment\nFirst **bold** paragraph.\n\nSecond paragraph.\n\n- One\n- Two\n:::\n\n\`\`\`text\n:::comment\nExample only\n:::\n\`\`\`\n`)
    }
  }
  process.chdir(fixture)
  const posts = await import(pathToFileURL(modulePath).href)
  for (const locale of ['ja', 'en']) {
    assert.deepEqual(posts.getAllPostSlugs(locale, true), ['public'])
    assert.deepEqual(posts.getAllPosts(locale).map(post => post.slug), ['public'])
    for (const slug of ['draft', 'string', 'missing']) {
      assert.equal(await posts.getPostBySlug(slug, locale), null)
      assert.ok(await posts.getPostBySlug(slug, locale, true))
    }
    const post = await posts.getPostBySlug('public', locale)
    assert.ok(post.content.includes('<strong>bold</strong>'))
    assert.ok(post.content.includes('<p>Second paragraph.</p>'))
    assert.ok(post.content.includes('<li>One</li>'))
    assert.equal(post.content.split('class="author-comment"').length - 1, 1)
    assert.ok(post.content.includes(':::comment\nExample only'))
  }
  process.chdir(root)
  let count = 0
  for (const [dir, prefix] of [['content/blog', '/blog/'], ['content/en/blog', '/en/blog/']]) {
    for (const file of fs.readdirSync(dir).filter(file => file.endsWith('.md'))) {
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
      const output = path.join(root, 'out', prefix, file.slice(0, -3), 'index.html')
      assert.equal(fs.existsSync(output), data.published === true, `Publication mismatch: ${file} (${prefix})`)
      if (data.published === true) count++
    }
  }
  console.log(`PASS: publication boundaries, comment Markdown, and ${count} published article outputs`)
} finally {
  process.chdir(root)
  fs.rmSync(fixture, { recursive: true, force: true })
  fs.rmSync(modulePath, { force: true })
}
