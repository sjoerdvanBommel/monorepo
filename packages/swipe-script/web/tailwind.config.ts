import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-paragraph)', 'var(--font-sans)', ...fontFamily.sans],
        heading: ['var(--font-heading)'],
        paragraph: ['var(--font-paragraph)'],
        code: ['var(--font-code)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops)), radial-gradient(rgba(0,0,0,.25) 0%, black 100%)',
      },

      dropShadow: {
        white: '0 4px 6px rgb(var(--white-accent) / 0.15)',
      },
    },
    colors: {
      transparent: 'transparent',
      'black-accent': 'hsla(var(--black-accent) / <alpha-value>)',
      'white-accent': 'rgb(var(--white-accent) / <alpha-value>)',
      success: {
        900: 'hsla(var(--success-900) / <alpha-value>)',
        700: 'hsla(var(--success-700) / <alpha-value>)',
        DEFAULT: 'hsla(var(--success) / <alpha-value>)',
        200: 'hsla(var(--success-200) / <alpha-value>)',
      },
      error: {
        900: 'hsla(var(--error-900) / <alpha-value>)',
        700: 'hsla(var(--error-700) / <alpha-value>)',
        DEFAULT: 'hsla(var(--error) / <alpha-value>)',
        200: 'hsla(var(--error-200) / <alpha-value>)',
      },

      terminal: 'rgb(var(--terminal) / <alpha-value>)',
      border: 'hsla(var(--border) / <alpha-value>)',

      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsla(var(--primary) / <alpha-value>)',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
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
