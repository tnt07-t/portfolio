import type { AboutPayload, AboutSection, Chapter } from '@/lib/types'

export const aboutChapter: Chapter = {
  number: 'CHAPTER 04 · THE LAST PAGE',
  title: 'About',
  blurb: 'The person behind the work.',
  footer: '— 04 · FIN —',
  href: '/about',
}

export const aboutSections: AboutSection[] = [
  {
    heading: 'The short version',
    body: 'CS major at Cornell, backend & infrastructure focused, happiest shipping things people actually use. [PLACEHOLDER: a sentence or two in your own voice].',
  },
  {
    heading: 'Away from the keyboard',
    body: '[PLACEHOLDER: passions & hobbies — what you do for fun].',
  },
]

export const aboutPayload: AboutPayload = {
  chapter: aboutChapter,
  sections: aboutSections,
  contact: { kicker: "LET'S TALK —" },
}
