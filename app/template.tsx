'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Route cross-fade. template.tsx re-mounts on every navigation, so this fades
 * each new route in (~300ms). Opacity ONLY — a transform here would create a
 * containing block and break the fixed Wordmark / sticky book stage inside.
 * Reduced motion → instant.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: reduce ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
