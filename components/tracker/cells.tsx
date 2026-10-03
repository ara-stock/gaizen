import type { Phase, Project } from '@/types/project'
import { PHASE_STEP } from './labels'
import { dict, type Locale } from './i18n'

/** Three-segment progress meter: the further along, the less room is left to join. */
export function PhaseMeter({ phase, locale = 'ja' }: { phase: Phase; locale?: Locale }) {
  const closed = phase === 'ended'
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span aria-hidden="true" className="inline-flex gap-0.5">
        {[1, 2, 3].map(n => (
          <span key={n} className="w-3.5 h-1.5 rounded-sm"
            style={{ backgroundColor: n <= PHASE_STEP[phase] ? (closed ? 'var(--muted)' : 'var(--accent)') : 'var(--border)' }} />
        ))}
      </span>
      <span className="text-xs" style={{ color: closed || phase === 'none' ? 'var(--muted)' : 'var(--foreground)' }}>{dict(locale).phase[phase]}</span>
    </span>
  )
}

export function ProjectLogo({ project, size = 40 }: { project: Project; size?: number }) {
  const style = { width: size, height: size, backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }
  if (!project.logo) {
    return (
      <span aria-hidden="true" className="rounded-lg border flex items-center justify-center font-bold flex-shrink-0" style={style}>
        {project.name[0]}
      </span>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, tiny local icons
    <img src={project.logo} alt="" width={size} height={size} loading="lazy"
      className="rounded-lg border object-cover flex-shrink-0" style={style} />
  )
}

export function TgeCell({ project, locale = 'ja' }: { project: Project; locale?: Locale }) {
  const { token } = project
  const d = dict(locale)
  if (token.launched) {
    return (
      <span>
        <span className="font-mono">{token.ticker ? `$${token.ticker}` : d.listed}</span>
        <span className="block text-xs" style={{ color: 'var(--muted)' }}>{token.tgeDate ?? d.listed}</span>
      </span>
    )
  }
  return (
    <span>
      <span>{token.tgeExpectation || d.tgeSource.none}</span>
      {token.tgeExpectation && (
        <span className="block text-xs" style={{ color: 'var(--muted)' }}>{d.tgeSource[token.tgeSourceType]}</span>
      )}
    </span>
  )
}
