/**
 * Single source of truth for all portfolio content.
 *
 * Page components import these values directly (static, server-renderable —
 * no API, no fetch). When real content arrives, edit it here in one place.
 * Anything not yet known is a greppable [PLACEHOLDER: ...] marker.
 */

export interface SocialLink {
  label: 'GitHub' | 'LinkedIn' | 'Email' | 'Résumé'
  href: string
}

export interface Profile {
  name: string
  /** Short role line shown under the name on the cover. */
  tagline: string
  resumeUrl: string
  github: string
  linkedin: string
  email: string
}

export const profile: Profile = {
  name: 'Tran Tran',
  tagline: "Software Engineer · May '28",
  resumeUrl: '/resume.pdf', // [PLACEHOLDER: resume.pdf] — drop the file into public/
  github: '[PLACEHOLDER: github-url]',
  linkedin: '[PLACEHOLDER: linkedin-url]',
  email: 'tnt54@cornell.edu',
}

/** Animated gold "road" labels orbiting the laptop on the cover. */
export interface CoverPopup {
  kicker: string
  title: string
  sub: string
  /** Cover side the popup is anchored to. */
  side: 'left' | 'right'
  /** Vertical anchor as a CSS top percentage. */
  top: string
  /** Whether to show the dashed image placeholder thumbnail. */
  thumb?: boolean
}

export const coverPopups: CoverPopup[] = [
  { kicker: '> cornell', title: 'Cornell AppDev', sub: 'DESIGN · iOS', side: 'left', top: '8%', thumb: true },
  { kicker: '> research', title: 'Lumeo Research Lab', sub: 'uTECH · RESEARCH ASST', side: 'left', top: '39%' },
  { kicker: '> experiences', title: 'FPT Software', sub: '60K ENTERPRISE · IN TESTING', side: 'left', top: '72%' },
  { kicker: '> experiences', title: 'SupplyBistro', sub: 'FIRST 3 CLIENTS', side: 'right', top: '12%', thumb: true },
]

/** Bottom-right "focus" callout on the cover (two stacked title lines). */
export const coverFocus = {
  kicker: '> focus',
  lines: ['Backend Developer', 'Infrastructure'],
  sub: 'WHAT I DO BEST',
}

/** Terminal categories typed inside the laptop on the cover. */
export const coverTerminal = ['> cornell', '> research', '> experiences', '> focus']

/** Highlights page — "The proof, in numbers." */
export interface Highlight {
  /** Two-digit index label, e.g. "01". */
  index: string
  name: string
  blurb: string
  metric: string
}

export const highlights: Highlight[] = [
  { index: '01', name: 'Uplift', blurb: ' — iOS app, designed & shipped solo.', metric: '1,000+ downloads · 700+ active' },
  { index: '02', name: 'FPT Software', blurb: ' — tooling for a 60k-employee enterprise.', metric: 'in testing · 3 departments' },
  { index: '03', name: 'SupplyBistro', blurb: ' — early startup, first clients landed.', metric: 'first 3 institutional customers' },
]

/** Contents (table of contents). Chess removed per project scope. */
export interface ContentsEntry {
  title: string
  page: string
}

export const contents: ContentsEntry[] = [
  { title: 'Projects', page: 'p. 01' },
  { title: 'Experience', page: 'p. 02' },
  { title: 'Skills', page: 'p. 03' },
  { title: 'About', page: 'p. 04' },
]

/**
 * Chapter divider pages. Bodies are the design's teaser copy; real content
 * is provided later. [ EXPANDING NEXT ] marks each as a teaser per the design.
 */
export interface Chapter {
  number: string
  title: string
  blurb: string
  footer: string
}

export const chapters: Chapter[] = [
  {
    number: 'CHAPTER 01',
    title: 'Projects',
    blurb: 'Uplift, Lumeo and more — the build story behind each.',
    footer: '— 01 —',
  },
  {
    number: 'CHAPTER 02',
    title: 'Experience',
    blurb: 'FPT Software and SupplyBistro in full — roles, scope, outcomes.',
    footer: '— 02 —',
  },
  {
    number: 'CHAPTER 03',
    title: 'Skills',
    blurb: 'The stack, end to end.',
    footer: '— 03 —',
  },
  {
    number: 'CHAPTER 04 · THE LAST PAGE',
    title: 'About',
    blurb: 'The person behind the work.',
    footer: '— 04 · FIN —',
  },
]
