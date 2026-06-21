Project: Personal portfolio for a CS major, recruiter-optimized. The site is a digital book: chapters are pages, navigation feels like turning pages. The book is the skin; a solid responsive single-page app is the skeleton.
Non-negotiable principles (apply to every task):

Recruiter-first. From any chapter, the Resume button and any project must be reachable in one click. The chapter index is always visible (top bar on desktop, bottom sheet or hamburger on mobile).
The book metaphor must never block content. It is progressive enhancement layered over a responsive base that works with zero animation.
Build to a quality floor every time: responsive to 360px width, visible keyboard focus rings, prefers-reduced-motion respected, semantic HTML, alt text on images.
Metrics beat adjectives. Never write "built with scale." Write the number.
Don't invent content. Where real content is missing, use clearly-marked placeholders like [PLACEHOLDER: resume.pdf] so they're greppable.

Tech stack (do not substitute):

Next.js (App Router, TypeScript), Tailwind CSS, shadcn/ui for primitives (button, dialog, card, sheet).
Framer Motion for all animation. Lenis for desktop smooth-scroll only.
chess.js + react-chessboard for the chess chapter only.
Deploy target: Vercel.

Animation contract:

The landing → Chapter 1 transition is the ONE expensive moment: a full 3D page-flip, 500–600ms, ease-out, with a shadow gradient sweeping across the fold and a slight scale dip (1 → 0.97 → 1).
Every other chapter-to-chapter transition is fast: 250–350ms cross-fade or short horizontal slide. No 3D flip after the first.
Interactive content (chess board, images) mounts only AFTER a transition settles (~100ms delay), then fades in. Never re-render interactive components mid-transform.
On mobile OR prefers-reduced-motion: no 3D flip anywhere. Chapters become scroll-snap sections (mobile) or instant cross-fade (reduced motion). Same content, same order.

Design tokens (warm paper + ink):

Palette: paper #F3ECDF, deep ink #1E1B16, faded ink #5A5247, oxblood accent #7A2E22 (used sparingly — links, active chapter marker, CTA), highlight wash #E4D8C2.
Type: display = Fraunces (serif, optical sizing on, used for chapter titles and hero); body = Inter; mono/utility = the system mono stack for metrics and code-ish labels. Load via next/font/google.
Texture: a very subtle paper grain (low-opacity noise overlay or SVG filter), never loud. Page edges hint at stacked paper (thin layered shadows on the right/bottom of the active page).
Border radius: minimal (2–4px). This is paper, not glass.

Chapter order (recruiter-first, not the original outline order):

Hero / cover
Projects
Experience
Skills
About (passions + hobbies folded in)
Chess (the closing interactive page) — the ONLY chapter with a chess board

Global layout: sticky top bar = name (left), chapter index (center, hover-highlight + click-to-flip), Resume button (right, oxblood, always present). Page counter somewhere subtle ("Ch. 2 / 6"). Keyboard: left/right arrows flip chapters, Esc opens chapter index.