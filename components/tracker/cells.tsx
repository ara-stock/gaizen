import type { Phase, Project } from '@/types/project'
import { PHASE_LABEL, PHASE_STEP, TGE_SOURCE_LABEL } from './labels'

export function PhaseMeter({ phase }: { phase: Phase }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span aria-hidden="true" className="inline-flex gap-0.5">
        {[1, 2, 3].map(n => (
          <span key={n} className="w-3 h-1.5 rounded-sm"
            style={{ backgroundColor: n <= PHASE_STEP[phase] ? 'var(--accent)' : 'var(--border)' }} />
        ))}
      </span>
      <span className="text-xs">{PHASE_LABEL[phase]}</span>
    </span>
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
