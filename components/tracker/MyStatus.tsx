'use client'

import { useEffect, useState } from 'react'
import type { Project, ProjectStatus } from '@/types/project'
import { STATUS_LABEL, STATUS_ORDER, STATUS_STORAGE_KEY, readStored, writeStored } from './labels'

/** Lets a visitor file the project under their own status. Stored in this browser only. */
export default function MyStatus({ project }: { project: Project }) {
  const [status, setStatus] = useState<ProjectStatus>(project.status)

  useEffect(() => {
    const saved = readStored<ProjectStatus>(STATUS_STORAGE_KEY)[project.slug]
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    if (STATUS_ORDER.includes(saved)) setStatus(saved)
  }, [project.slug])

  const update = (next: ProjectStatus) => {
    setStatus(next)
    const all = readStored<ProjectStatus>(STATUS_STORAGE_KEY)
    if (next === project.status) delete all[project.slug]
    else all[project.slug] = next
    writeStored(STATUS_STORAGE_KEY, all)
  }

  return (
    <label className="inline-flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
      自分のステータス
      <select value={status} onChange={e => update(e.target.value as ProjectStatus)}
        className="text-xs rounded border px-2 py-1.5"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }}>
        {STATUS_ORDER.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
      </select>
    </label>
  )
}
