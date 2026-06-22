'use client'

/**
 * Bridge between the global SpineMenu (rendered in app/layout.tsx) and the book
 * engine (BookStage, rendered by app/page.tsx). They live in sibling subtrees,
 * so React context can't connect them — BookStage registers its scroll handler
 * in this module-level slot and the menu calls it. Null when no book is mounted
 * (i.e. on the standalone chapter routes), so callers can fall back to routing.
 */
type ScrollToChapter = (href: string) => void

let handler: ScrollToChapter | null = null

export function registerBookNav(fn: ScrollToChapter | null) {
  handler = fn
}

/** Scroll the book to a chapter section. Returns false if no book is mounted. */
export function scrollToChapter(href: string): boolean {
  if (!handler) return false
  handler(href)
  return true
}
