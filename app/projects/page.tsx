import type { Metadata } from 'next'
import { projectsChapter } from '@/lib/data/projects'
import ChapterShell from '@/components/chapter/ChapterShell'
import ProjectsBody from '@/components/chapter/bodies/ProjectsBody'

export const metadata: Metadata = {
  title: 'Projects — Tran Tran',
  description: 'Projects by Tran Tran — Uplift (1,000+ downloads), Lumeo, SupplyBistro.',
}

export default function ProjectsPage() {
  return (
    <ChapterShell chapter={projectsChapter} prevLabel="Back to the book">
      <ProjectsBody />
    </ChapterShell>
  )
}
