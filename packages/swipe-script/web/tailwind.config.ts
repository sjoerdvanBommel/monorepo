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
        'shrink-away-bottom': 'shrink-away-bottom 1s ease-in forwards',
        'fade-down': 'fade-down .5s cubic-bezier(.57,-0.42,.83,.67) forwards',
        'fade-up': 'fade-up .5s cubic-bezier(.51,-0.25,.83,.67) forwards',
        'fade-left': 'fade-left .5s cubic-bezier(.51,-0.25,.83,.67) forwards',
        'fade-right': 'fade-right .5s cubic-bezier(.51,-0.25,.83,.67) forwards',
      },

      fontFamily: {
        sans: ['var(--font-paragraph)'],
        heading: ['var(--font-heading)'],
        paragraph: ['var(--font-paragraph)'],
        code: ['var(--font-code)'],
      },

      dropShadow: {
        white: '0 4px 6px rgb(var(--white-accent) / 0.15)',
      },
    },
    colors: {
      transparent: 'transparent',
      'black-accent': 'rgb(var(--black-accent) / <alpha-value>)',
      'white-accent': 'rgb(var(--white-accent) / <alpha-value>)',
      primary: 'rgb(var(--primary) / <alpha-value>)',
      secondary: 'rgb(var(--secondary) / <alpha-value>)',
      success: {
        900: 'hsla(var(--success-900) / <alpha-value>)',
        700: 'hsla(var(--success-700) / <alpha-value>)',
        DEFAULT: 'rgb(var(--success) / <alpha-value>)',
        200: 'hsla(var(--success-200) / <alpha-value>)',
      },
      error: {
        900: 'hsla(var(--error-900) / <alpha-value>)',
        700: 'hsla(var(--error-700) / <alpha-value>)',
        DEFAULT: 'rgb(var(--error) / <alpha-value>)',
        200: 'hsla(var(--error-200) / <alpha-value>)',
      },

      terminal: 'rgb(var(--terminal) / <alpha-value>)',
      border: 'hsla(var(--border) / <alpha-value>)',
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
