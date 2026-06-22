import type { Metadata } from 'next'
import { skillsChapter } from '@/lib/data/skills'
import ChapterShell from '@/components/chapter/ChapterShell'
import SkillsBody from '@/components/chapter/bodies/SkillsBody'

export const metadata: Metadata = {
  title: 'Skills — Tran Tran',
  description: 'The stack Tran Tran works in, end to end.',
}

export default function SkillsPage() {
  return (
    <ChapterShell chapter={skillsChapter} prevLabel="Back to the book">
      <SkillsBody />
    </ChapterShell>
  )
}
