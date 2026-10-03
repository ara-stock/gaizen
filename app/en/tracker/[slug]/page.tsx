import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, getProjectsData } from '@/lib/projects'
import ProjectDetail, { projectMetadata } from '@/components/tracker/ProjectDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getProjectsData().projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug, 'en')
  return project ? projectMetadata(project, 'en') : {}
}

export default async function ProjectPage({ params }: Props) {
  const project = getProjectBySlug((await params).slug, 'en')
  if (!project) notFound()
  return <ProjectDetail project={project} locale="en" />
}
