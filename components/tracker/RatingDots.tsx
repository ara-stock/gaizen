export default function RatingDots({ value, emptyLabel }: { value?: number; emptyLabel: string }) {
  if (!value) return <span className="text-xs" style={{ color: 'var(--muted)' }}>{emptyLabel}</span>
  return (
    <span className="inline-flex items-center gap-1" role="img" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className="w-2 h-2 rounded-full"
          style={{ backgroundColor: n <= value ? 'var(--accent)' : 'var(--border)' }} />
      ))}
      <span className="text-xs font-mono ml-1" style={{ color: 'var(--muted)' }}>{value}/5</span>
    </span>
  )
}
