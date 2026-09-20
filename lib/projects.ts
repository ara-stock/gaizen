import fs from 'fs'
import path from 'path'
import type { Project, ProjectsData } from '@/types/project'

export function getProjectsData(): ProjectsData {
  const filePath = path.join(process.cwd(), 'content/projects/projects.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as ProjectsData
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjectsData().projects.find(p => p.slug === slug)
}
