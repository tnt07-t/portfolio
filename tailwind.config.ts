import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F6EFDF',
        ink: {
          DEFAULT: '#1A1714',
          faded: '#6B6358',
          quiet: '#9A9082',
        },
        forest: {
          DEFAULT: '#2F4A3C',
          deep: '#16241B',
        },
        cover: '#0C140F',
        gold: {
          DEFAULT: '#C9A24B',
          bright: '#E8C97A',
        },
      },
      fontFamily: {
        // Display = Cabinet Grotesk (Fontshare), serif = Cormorant Garamond,
        // body = Inter, mono = JetBrains Mono. Vars set in globals.css / layout.
        display: ['var(--font-cabinet)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
}
export default config
