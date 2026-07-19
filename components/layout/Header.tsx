'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

const NAV_PATHS = [
  { path: '/blog/',      label: 'Blog' },
  { path: '/portfolio/', label: 'Portfolio' },
  { path: '/tools/',     label: 'Tools' },
  { path: '/thesis/',    label: 'Thesis' },
  { path: '/about/',     label: 'About' },
]

function ThemeToggle() {
  const [isLight, setIsLight] = useState(() => (
    typeof document !== 'undefined' && !document.documentElement.classList.contains('dark')
  ))

  const toggle = () => {
    const next = !isLight
    setIsLight(next)
    if (next) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-11 h-11 flex items-center justify-center rounded-md transition-colors"
      style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
      title={isLight ? 'ダークモードへ' : 'ライトモードへ'}
    >
      {isLight ? (
        // Moon icon
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun icon
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const isEnglish = pathname.startsWith('/en')
  const prefix = isEnglish ? '/en' : ''
  const NAV_LINKS = NAV_PATHS.map(({ path, label }) => ({ href: `${prefix}${path}`, label }))
  const homeHref = isEnglish ? '/en/' : '/'

  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--header-bg)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href={homeHref} className="flex items-center gap-2 tracking-widest text-sm font-bold flex-shrink-0" aria-label="GAIZEN FINANCE home">
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 32 32" fill="none" style={{ color: 'var(--accent)' }}>
            <path d="M2 2h28v28H2zM19.4 3.4 3.4 12.6l9.2 16 16-9.2-9.2-16ZM13.7 7.3l-6.4 11 11 6.4 6.4-11-11-6.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" />
          </svg>
          <span><span style={{ color: 'var(--foreground)' }}>GAIZEN</span><span style={{ color: 'var(--accent)' }}> FINANCE</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href)
            return (
              <Link key={href} href={href}
                className="text-xs tracking-wider transition-colors duration-150"
                aria-current={active ? 'page' : undefined}
                style={{ color: active ? 'var(--accent)' : 'var(--muted)' }}>
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center text-sm"
            style={{ color: 'var(--muted)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm" style={{ color: 'var(--muted)' }} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
