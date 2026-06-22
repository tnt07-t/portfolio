import type { Metadata } from 'next'
import { experienceChapter } from '@/lib/data/experience'
import ChapterShell from '@/components/chapter/ChapterShell'
import ExperienceBody from '@/components/chapter/bodies/ExperienceBody'

export const metadata: Metadata = {
  title: 'Experience — Tran Tran',
  description: 'Experience of Tran Tran — FPT Software (60k-employee enterprise) and SupplyBistro.',
}

export default function ExperiencePage() {
  return (
    <ChapterShell chapter={experienceChapter} prevLabel="Back to the book">
      <ExperienceBody />
    </ChapterShell>
  )
}
