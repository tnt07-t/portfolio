/**
 * Shared content types for the portfolio.
 *
 * Data lives in lib/data/* (one module per domain) and is imported directly by
 * the server components that render each chapter. Keeping the shapes here means
 * the data modules and the React pages all agree on one contract.
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

export interface CoverFocus {
  kicker: string
  lines: string[]
  sub: string
}

/** Highlights page — "The proof, in numbers." */
export interface Highlight {
  /** Two-digit index label, e.g. "01". */
  index: string
  name: string
  blurb: string
  metric: string
}

/** Table-of-contents entry. */
export interface ContentsEntry {
  title: string
  page: string
  /** Route this entry navigates to (e.g. "/projects"). */
  href: string
}

/**
 * Chapter teaser shown on the divider pages inside the book. The full expanded
 * chapter lives at its own route, fed by the matching data module below.
 */
export interface Chapter {
  number: string
  title: string
  blurb: string
  footer: string
  /** Route to the full chapter (e.g. "/projects"). */
  href: string
}

/* ── Expanded chapter content (served per-route over the API) ── */

export interface Project {
  name: string
  /** Short role / category line, e.g. "iOS · Solo". */
  role: string
  summary: string
  /** The headline metric — numbers beat adjectives. */
  metric: string
  stack: string[]
  /** Optional links (live, repo, case study). */
  links?: SocialLink[]
  /** Optional image in public/assets; alt is required when set. */
  image?: { src: string; alt: string }
}

export interface ExperienceItem {
  org: string
  role: string
  /** e.g. "Summer 2025" or "2024 — present". */
  period: string
  summary: string
  /** Bulleted outcomes, metrics first. */
  highlights: string[]
}

export interface SkillGroup {
  /** e.g. "Languages", "Backend", "Infra". */
  category: string
  items: string[]
}

export interface AboutSection {
  heading: string
  body: string
}
