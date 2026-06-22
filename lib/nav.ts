import { chapters } from '@/lib/data/chapters'

export interface NavItem {
  label: string
  href: string
}

/** Primary nav: Home + the 4 chapters. Drives the spine hamburger menu. */
export const navItems: NavItem[] = [
  { label: 'Cover', href: '/' },
  ...chapters.map((c) => ({ label: c.title, href: c.href })),
]
