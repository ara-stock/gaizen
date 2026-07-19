'use client'

import { useEffect, useState } from 'react'

interface Heading { id: string; text: string; level: number }

interface TableOfContentsProps {
  headings: Heading[]
  locale?: 'ja' | 'en'
  mobile?: boolean
}

export default function TableOfContents({ headings, locale = 'ja', mobile = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) }),
      { rootMargin: '0px 0px -60% 0px' }
    )
    headings.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const label = locale === 'en' ? 'On this page' : 'この記事の目次'

  if (mobile) {
    return (
      <details className="lg:hidden mb-10 rounded-xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold flex items-center justify-between" style={{ color: 'var(--foreground)' }}>
          {label}
          <span aria-hidden="true" className="text-xs" style={{ color: 'var(--accent)' }}>＋</span>
        </summary>
        <ol className="px-4 pb-4 space-y-2 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
          {headings.map(({ id, text, level }, index) => (
            <li key={id} style={{ paddingLeft: level === 3 ? '12px' : '0' }}>
              <a href={`#${id}`} className="flex gap-2 text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                <span className="font-mono flex-shrink-0" style={{ color: 'var(--accent)' }}>{index + 1}.</span>
                <span>{text}</span>
              </a>
            </li>
          ))}
        </ol>
      </details>
    )
  }

  return (
    <nav className="sticky top-20">
      <p className="text-xs tracking-widest font-semibold mb-4" style={{ color: 'var(--muted)' }}>{label}</p>
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: level === 3 ? '12px' : '0' }}>
            <a
              href={`#${id}`}
              className="text-xs leading-snug transition-colors block py-0.5"
              style={{ color: activeId === id ? 'var(--accent)' : 'var(--muted)' }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
