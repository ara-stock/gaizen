'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useSyncExternalStore } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'エアドロップ' },
  { href: '/portfolio/', label: '保有方針' },
  { href: '/tools/', label: '計算ツール' },
  { href: '/about/', label: '筆者について' },
]

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

function ThemeToggle() {
  const isLight = useSyncExternalStore(
    subscribeToTheme,
    () => !document.documentElement.classList.contains('dark'),
    () => true,
  )

  const toggle = () => {
    const next = !isLight
    document.documentElement.classList.toggle('dark', !next)
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark')
    } catch {
      // The toggle still works when browser storage is unavailable.
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

  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--header-bg)', backdropFilter: 'blur(12px)' }}>
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 tracking-widest text-sm font-bold flex-shrink-0" aria-label="GAIZEN FINANCE home">
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 32 32" fill="none" style={{ color: 'var(--accent)' }}>
            <path d="M2 2h28v28H2zM19.4 3.4 3.4 12.6l9.2 16 16-9.2-9.2-16ZM13.7 7.3l-6.4 11 11 6.4 6.4-11-11-6.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" />
          </svg>
          <span>
            <span style={{ color: 'var(--foreground)' }}>GAIZEN</span>
            <span className="hidden sm:inline" style={{ color: 'var(--accent)' }}> FINANCE</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="メインメニュー" className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className="text-sm min-h-11 inline-flex items-center transition-colors duration-150"
                aria-current={active ? 'page' : undefined}
                style={{ color: active ? 'var(--accent)' : 'var(--muted)' }}>
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center text-sm"
            style={{ color: 'var(--muted)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav id="mobile-navigation" aria-label="モバイルメニュー" className="md:hidden border-t px-4 py-4 flex flex-col gap-2" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm min-h-11 flex items-center" style={{ color: 'var(--muted)' }} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
