import Link from 'next/link'

interface TagProps {
  tag: string
  linked?: boolean
  basePath?: string
}

export default function Tag({ tag, linked = true, basePath = '/blog' }: TagProps) {
  const className = "inline-block px-2.5 py-0.5 rounded text-xs tracking-wide transition-colors"
  const style = {
    backgroundColor: 'rgba(201,168,76,0.1)',
    color: 'var(--accent)',
    border: '1px solid rgba(201,168,76,0.2)',
  }

  if (!linked) return <span className={className} style={style}>{tag}</span>

  return (
    <Link href={`${basePath}/tag/${encodeURIComponent(tag)}`} className={className} style={style}>
      {tag}
    </Link>
  )
}
