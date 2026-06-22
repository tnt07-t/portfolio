import type { Metadata } from 'next'
import { aboutChapter } from '@/lib/data/about'
import ChapterShell from '@/components/chapter/ChapterShell'
import AboutBody from '@/components/chapter/bodies/AboutBody'

export const metadata: Metadata = {
  title: 'About — Tran Tran',
  description: 'About Tran Tran — the person behind the work.',
}

export default function AboutPage() {
  return (
    <ChapterShell chapter={aboutChapter} contactKicker="LET'S TALK —" prevLabel="Back to the book">
      <AboutBody />
    </ChapterShell>
  )
}
