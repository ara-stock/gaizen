import type { Phase, Project } from '@/types/project'
import { PHASE_LABEL, PHASE_STEP, TGE_SOURCE_LABEL } from './labels'

/** Three-segment progress meter: the further along, the less room is left to join. */
export function PhaseMeter({ phase }: { phase: Phase }) {
  const closed = phase === 'ended'
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span aria-hidden="true" className="inline-flex gap-0.5">
        {[1, 2, 3].map(n => (
          <span key={n} className="w-3.5 h-1.5 rounded-sm"
            style={{ backgroundColor: n <= PHASE_STEP[phase] ? (closed ? 'var(--muted)' : 'var(--accent)') : 'var(--border)' }} />
        ))}
      </span>
      <span className="text-xs" style={{ color: closed || phase === 'none' ? 'var(--muted)' : 'var(--foreground)' }}>{PHASE_LABEL[phase]}</span>
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

export function TgeCell({ project }: { project: Project }) {
  const { token } = project
  if (token.launched) {
    return (
      <span>
        <span className="font-mono">{token.ticker ? `$${token.ticker}` : '上場済'}</span>
        <span className="block text-xs" style={{ color: 'var(--muted)' }}>{token.tgeDate ?? '上場済'}</span>
      </span>
    )
  }
  return (
    <span>
      <span>{token.tgeExpectation || TGE_SOURCE_LABEL.none}</span>
      {token.tgeExpectation && (
        <span className="block text-xs" style={{ color: 'var(--muted)' }}>{TGE_SOURCE_LABEL[token.tgeSourceType]}</span>
      )}
    </span>
  )
}
