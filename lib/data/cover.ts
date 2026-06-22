import type { CoverPopup, CoverFocus } from '@/lib/types'

/** Animated gold "road" labels orbiting the laptop on the cover. */
export const coverPopups: CoverPopup[] = [
  { kicker: '> cornell', title: 'Cornell AppDev', sub: 'DESIGN · iOS', side: 'left', top: '8%', thumb: true },
  { kicker: '> research', title: 'Lumeo Research Lab', sub: 'uTECH · RESEARCH ASST', side: 'left', top: '39%' },
  { kicker: '> experiences', title: 'FPT Software', sub: '60K ENTERPRISE · IN TESTING', side: 'left', top: '72%' },
  { kicker: '> experiences', title: 'SupplyBistro', sub: 'FIRST 3 CLIENTS', side: 'right', top: '12%', thumb: true },
]

/** Bottom-right "focus" callout on the cover (two stacked title lines). */
export const coverFocus: CoverFocus = {
  kicker: '> focus',
  lines: ['Backend Developer', 'Infrastructure'],
  sub: 'WHAT I DO BEST',
}

/** Terminal categories typed inside the laptop on the cover. */
export const coverTerminal = ['> cornell', '> research', '> experiences', '> focus']
