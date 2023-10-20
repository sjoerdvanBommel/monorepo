import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops)), radial-gradient(rgba(0,0,0,.25) 0%, black 100%)',
      },

      animation: {
        background:
          'rotate 90s linear infinite, change-blob 100s ease-in-out infinite',
        'appear-float':
          'float 40s ease-in-out infinite, appear 6s cubic-bezier(.17,.67,.28,1.01) forwards',
        'appear-float-random':
          'float-random 40s ease-in-out infinite, appear 2s cubic-bezier(.17,.67,.28,1.01) forwards',
        appear: 'appear 2s cubic-bezier(.17,.67,.28,1.01) forwards',
      },

      fontFamily: {
        sans: ['var(--font-paragraph)'],
        heading: ['var(--font-heading)'],
        paragraph: ['var(--font-paragraph)'],
      },
    },
    colors: {
      transparent: 'transparent',
      'black-accent': 'var(--black-accent)',
      primary: '#fff717',
      secondary: '#ff1572',
      typescript: '#4479C3',
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            }
          },
          'animation-duration': (value) => {
            return {
              'animation-duration': value,
            }
          },
        },
        {
          values: theme('transitionDelay'),
        },
      )
    }),
  ],
}

export default config
