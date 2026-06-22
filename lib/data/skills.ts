import type { Chapter, SkillGroup, SkillsPayload } from '@/lib/types'

export const skillsChapter: Chapter = {
  number: 'CHAPTER 03',
  title: 'Skills',
  blurb: 'The stack, end to end.',
  footer: '— 03 —',
  href: '/skills',
}

export const skillGroups: SkillGroup[] = [
  { category: 'Languages', items: ['Swift', '[PLACEHOLDER: languages]'] },
  { category: 'Backend', items: ['[PLACEHOLDER: backend tools]'] },
  { category: 'Infrastructure', items: ['[PLACEHOLDER: infra / cloud]'] },
  { category: 'Frontend', items: ['SwiftUI', 'React', 'Next.js', 'TypeScript'] },
]

export const skillsPayload: SkillsPayload = {
  chapter: skillsChapter,
  groups: skillGroups,
}
