/**
 * Content barrel — re-exports every data module + shared types so existing
 * imports (`@/lib/content`) keep working. The data itself now lives split by
 * domain under lib/data/* and is served per-chapter via app/api/*.
 *
 * Edit content in the lib/data/* modules, not here.
 */

export * from '@/lib/types'

export { profile } from '@/lib/data/profile'
export { coverPopups, coverFocus, coverTerminal } from '@/lib/data/cover'
export { highlights } from '@/lib/data/highlights'
export { chapters, contents } from '@/lib/data/chapters'
export { projects, projectsChapter } from '@/lib/data/projects'
export { experience, experienceChapter } from '@/lib/data/experience'
export { skillGroups, skillsChapter } from '@/lib/data/skills'
export { aboutSections, aboutChapter } from '@/lib/data/about'
