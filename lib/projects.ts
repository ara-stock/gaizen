import fs from 'fs'
import path from 'path'
import type { Project, ProjectsData } from '@/types/project'
import type { Locale } from '@/components/tracker/i18n'

const DIR = path.join(process.cwd(), 'content/projects')

/**
 * Objects merge key by key, arrays of the same length merge element by element
 * (null keeps the base value), anything else in the overlay replaces the base.
 */
function merge(base: unknown, overlay: unknown): unknown {
  if (overlay === null || overlay === undefined) return base
  if (Array.isArray(base) && Array.isArray(overlay)) {
    return overlay.length === base.length ? base.map((b, i) => merge(b, overlay[i])) : overlay
  }
  if (typeof base === 'object' && base !== null && typeof overlay === 'object' && !Array.isArray(overlay)) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
    for (const [k, v] of Object.entries(overlay)) out[k] = merge(out[k], v)
    return out
  }
  return overlay
}

function translate(p: Project, overlay: unknown): Project {
  const merged = merge(p, overlay) as Project
  return {
    ...merged,
    sources: merged.sources.map(s => ({ ...s, date: s.date?.replace(/^(.+)閲覧$/, 'accessed $1') })),
  }
}

export function getProjectsData(locale: Locale = 'ja'): ProjectsData {
  const data = JSON.parse(fs.readFileSync(path.join(DIR, 'projects.json'), 'utf-8')) as ProjectsData
  if (locale === 'ja') return data
  const en = JSON.parse(fs.readFileSync(path.join(DIR, 'projects.en.json'), 'utf-8')) as Record<string, unknown>
  return { ...data, projects: data.projects.map(p => translate(p, en[p.slug])) }
}

export function getProjectBySlug(slug: string, locale: Locale = 'ja'): Project | undefined {
  return getProjectsData(locale).projects.find(p => p.slug === slug)
}
