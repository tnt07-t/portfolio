import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Body / UI sans.
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
})

// Editorial serif — cover name, "Ex Libris", gold popup titles.
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
})

// Utility / metrics / code-ish labels.
const jetbrains = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Tran Tran — Software Engineer',
  description:
    'Portfolio of Tran Tran, software engineer. The proof, in numbers — Uplift (1,000+ downloads), FPT Software, SupplyBistro, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Cabinet Grotesk (display) is on Fontshare, not Google Fonts — next/font
            can't load it, so it comes in via <link>. The family is wired to
            --font-cabinet in globals.css. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
