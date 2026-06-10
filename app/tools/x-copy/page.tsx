'use client'

import { useState } from 'react'

const X_CHAR = '𝕏'

export default function XCopyPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(X_CHAR)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 flex flex-col items-center gap-8">
      <div className="text-center">
        <p className="text-xs tracking-widest mb-2 font-semibold" style={{ color: 'var(--accent)' }}>TOOLS</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>𝕏 コピーツール</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          ボタンを押すと <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)' }}>𝕏</code> がクリップボードにコピーされます。
        </p>
      </div>

      <button
        onClick={handleCopy}
        className="w-40 h-40 rounded-2xl text-7xl flex items-center justify-center transition-all active:scale-95 hover:brightness-110"
        style={{
          backgroundColor: 'var(--surface)',
          border: `2px solid ${copied ? 'var(--accent)' : 'var(--border)'}`,
          boxShadow: copied ? '0 0 24px rgba(0,201,122,0.2)' : 'none',
        }}
        aria-label="𝕏をコピー"
      >
        {X_CHAR}
      </button>

      <p className="text-sm h-5 transition-opacity" style={{ color: 'var(--accent)', opacity: copied ? 1 : 0 }}>
        コピーしました！
      </p>
    </div>
  )
}
