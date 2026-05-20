'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isEnglish = pathname.startsWith('/en')

  const jaPath = isEnglish ? pathname.slice(3) || '/' : pathname
  const enPath = isEnglish ? pathname : `/en${pathname === '/' ? '' : pathname}`

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const switchTo = (lang: 'ja' | 'en') => {
    localStorage.setItem('gaizen-lang', lang)
    setOpen(false)
    router.push(lang === 'en' ? enPath : jaPath)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border transition-colors"
        style={{ color: 'var(--foreground)', borderColor: 'var(--border)', backgroundColor: 'transparent' }}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="font-semibold">{isEnglish ? 'EN' : 'JP'}</span>
        <svg
          width="9" height="9" viewBox="0 0 9 9" fill="currentColor"
          style={{ color: 'var(--muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
        >
          <path d="M1.5 3L4.5 6.5L7.5 3H1.5Z" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1.5 rounded-lg border shadow-lg overflow-hidden z-50"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', minWidth: '130px' }}
        >
          <button
            role="option"
            aria-selected={!isEnglish}
            onClick={() => switchTo('ja')}
            className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors"
            style={{
              color: isEnglish ? 'var(--muted)' : 'var(--foreground)',
              backgroundColor: isEnglish ? 'transparent' : 'rgba(0,201,122,0.06)',
            }}
          >
            <span>日本語</span>
            {!isEnglish && <span style={{ color: 'var(--accent)', fontSize: '10px' }}>✓</span>}
          </button>
          <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
          <button
            role="option"
            aria-selected={isEnglish}
            onClick={() => switchTo('en')}
            className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors"
            style={{
              color: isEnglish ? 'var(--foreground)' : 'var(--muted)',
              backgroundColor: isEnglish ? 'rgba(0,201,122,0.06)' : 'transparent',
            }}
          >
            <span>English</span>
            {isEnglish && <span style={{ color: 'var(--accent)', fontSize: '10px' }}>✓</span>}
          </button>
        </div>
      )}
    </div>
  )
}
