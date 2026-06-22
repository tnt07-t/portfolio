'use client'

import { createContext, useContext } from 'react'

export interface BookNav {
  /** Flip-through to the page at `href`, then navigate there. */
  flipTo: (href: string) => void
}

export const BookNavContext = createContext<BookNav | null>(null)
export const useBookNav = () => useContext(BookNavContext)
