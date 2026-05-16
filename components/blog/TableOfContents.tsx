'use client'

import { useEffect, useState } from 'react'

interface Heading { id: string; text: string; level: number }

export default function TableOfContents({ headings }: { headings: Heading[] }) {
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

  return (
    <nav className="sticky top-20">
      <p className="text-xs tracking-widest font-semibold mb-4" style={{ color: 'var(--muted)' }}>目次</p>
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
