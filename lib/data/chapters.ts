import type { Chapter, ContentsEntry } from '@/lib/types'
import { projectsChapter } from './projects'
import { experienceChapter } from './experience'
import { skillsChapter } from './skills'
import { aboutChapter } from './about'

/** The 4 chapter teasers, in order — drives both the book dividers and contents. */
export const chapters: Chapter[] = [
  experienceChapter,
  projectsChapter,
  skillsChapter,
  aboutChapter,
]

/** Table of contents, derived from the chapters so there's one source. */
export const contents: ContentsEntry[] = chapters.map((c, i) => ({
  title: c.title,
  page: `${i + 1}`,
  href: c.href,
}))
