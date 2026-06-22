import type { Chapter, Project } from '@/lib/types'

export const projectsChapter: Chapter = {
  number: 'CHAPTER 02',
  title: 'Projects',
  blurb: 'Uplift, Lumeo and more — the build story behind each.',
  footer: '— 02 —',
  href: '/projects',
}

export const projects: Project[] = [
  {
    name: 'Uplift',
    role: 'iOS · Designed & shipped solo',
    summary:
      'A wellness iOS app built end to end — design, frontend, and backend — and shipped to the App Store on my own.',
    metric: '1,000+ downloads · 700+ active users',
    stack: ['Swift', 'SwiftUI', '[PLACEHOLDER: backend stack]'],
    // links: [{ label: 'Résumé', href: '[PLACEHOLDER: app store / repo url]' }],
    // image: { src: '/assets/uplift.png', alt: 'Uplift app screens' },
  },
  {
    name: 'Lumeo Research Lab',
    role: 'uTECH · Research Assistant',
    summary: '[PLACEHOLDER: what you built / researched at Lumeo — one or two sentences with a number].',
    metric: '[PLACEHOLDER: key result / metric]',
    stack: ['[PLACEHOLDER: stack]'],
  },
  {
    name: 'SupplyBistro',
    role: 'Early-stage startup',
    summary: '[PLACEHOLDER: your role and what you built for SupplyBistro].',
    metric: 'first 3 institutional customers',
    stack: ['[PLACEHOLDER: stack]'],
  },
]
