'use client'

interface ShareButtonProps {
  title: string
  url: string
  label?: string
}

export default function ShareButton({ title, url, label = '𝕏 でシェア' }: ShareButtonProps) {
  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium transition-colors"
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid var(--border)',
        color: 'var(--muted)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.3)'
        ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'
        ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      {label}
    </a>
  )
}
