import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

// Workaround for framer motion which does not accept CSS variables for animations
export const framerColors = {
  'black-accent': 'hsl(240 10% 4%)',
  'success-900': 'hsl(120 92% 6%)',
  'error-900': 'hsl(349 94% 10%)',
  border: 'hsl(240 3.7% 15.9%)',
}

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
      'black-accent': framerColors['black-accent'],
      'white-accent': 'var(--white-accent)',
      success: {
        900: framerColors['success-900'],
        700: 'var(--success-700)',
        DEFAULT: 'var(--success)',
        200: 'var(--success-200)',
        100: 'var(--success-100)',
        50: 'var(--success-50)',
      },
      error: {
        900: framerColors['error-900'],
        700: 'var(--error-700)',
        DEFAULT: 'var(--error)',
        200: 'var(--error-200)',
        100: 'var(--error-100)',
        50: 'var(--error-50)',
      },

      terminal: 'var(--terminal)',
      border: framerColors.border,

      input: 'var(--input)',
      ring: 'var(--ring)',
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--secondary)',
        foreground: 'var(--secondary-foreground)',
      },
      destructive: {
        DEFAULT: 'var(--destructive)',
        foreground: 'var(--destructive-foreground)',
      },
      muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'var(--muted-foreground)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        foreground: 'var(--accent-foreground)',
      },
      popover: {
        DEFAULT: 'var(--popover)',
        foreground: 'var(--popover-foreground)',
      },
      card: {
        DEFAULT: 'var(--card)',
        foreground: 'var(--card-foreground)',
      },
    },
    screens: {
      'hover-hover': { raw: '(hover: hover) and (pointer: fine)' },
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
