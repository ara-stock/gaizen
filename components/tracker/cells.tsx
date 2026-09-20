import type { Phase, Project } from '@/types/project'
import { PHASE_BADGE, PHASE_LABEL, TGE_SOURCE_LABEL } from './labels'

export function PhaseBadge({ phase }: { phase: Phase }) {
  const { mark, color } = PHASE_BADGE[phase]
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ color, backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)` }}>
      <span aria-hidden="true">{mark}</span>
      {PHASE_LABEL[phase]}
    </span>
  )
}

export function ProjectLogo({ project, size = 40 }: { project: Project; size?: number }) {
  const style = { width: size, height: size, backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }
  if (!project.logo) {
    return (
      <span aria-hidden="true" className="rounded-full border flex items-center justify-center font-bold flex-shrink-0" style={style}>
        {project.name[0]}
      </span>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, tiny local icons
    <img src={project.logo} alt="" width={size} height={size} loading="lazy"
      className="rounded-full border object-cover flex-shrink-0" style={style} />
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
