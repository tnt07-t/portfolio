'use client'

import { createContext } from 'react'

export type BookMode = 'flip' | 'plain' | 'none'

export interface BookActive {
  /** flip = pinned 3D stage; plain = normal stacked scroll; none = not in the book */
  mode: BookMode
  /** domId of the page currently flat/active — flip mode only */
  activeId: string | null
}

/**
 * Lets a chapter heading deep in the tree know when its page is the one on
 * screen, so it can type itself in at the right moment. The 3D flip stacks all
 * pages in the same spot, so an IntersectionObserver can't tell which is shown;
 * the stage publishes the active page here instead. Outside the book (the
 * standalone chapter routes) the default 'none' lets headings fall back to a
 * plain IntersectionObserver.
 */
export const BookActiveContext = createContext<BookActive>({ mode: 'none', activeId: null })
