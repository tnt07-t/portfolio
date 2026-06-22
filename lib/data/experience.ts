import type { Chapter, ExperienceItem } from '@/lib/types'

export const experienceChapter: Chapter = {
  number: 'CHAPTER 01',
  title: 'Experience',
  blurb: 'FPT Software and SupplyBistro in full — roles, scope, outcomes.',
  footer: '— 01 —',
  href: '/experience',
}

export const experience: ExperienceItem[] = [
  {
    org: 'FPT Software',
    role: '[PLACEHOLDER: role / title]',
    period: '[PLACEHOLDER: dates]',
    summary: 'Built internal tooling used across a 60,000-employee enterprise.',
    highlights: [
      'In testing across 3 departments.',
      '[PLACEHOLDER: outcome with a number]',
    ],
  },
  {
    org: 'SupplyBistro',
    role: '[PLACEHOLDER: role / title]',
    period: '[PLACEHOLDER: dates]',
    summary: 'Early-stage startup — helped land the first institutional customers.',
    highlights: [
      'First 3 institutional clients onboarded.',
      '[PLACEHOLDER: outcome with a number]',
    ],
  },
]
