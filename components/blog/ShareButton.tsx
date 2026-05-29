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
      {label}
    </a>
  )
}
