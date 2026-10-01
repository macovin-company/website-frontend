/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          soft: 'hsl(var(--primary-soft) / <alpha-value>)',
          fg: 'hsl(var(--primary-fg) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          soft: 'hsl(var(--secondary-soft) / <alpha-value>)',
          fg: 'hsl(var(--secondary-fg) / <alpha-value>)',
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary) / <alpha-value>)',
          soft: 'hsl(var(--tertiary-soft) / <alpha-value>)',
          fg: 'hsl(var(--tertiary-fg) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'hsl(var(--surface) / <alpha-value>)',
          2: 'hsl(var(--surface-2) / <alpha-value>)',
          inverse: 'hsl(var(--surface-inverse) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'hsl(var(--ink) / <alpha-value>)',
          muted: 'hsl(var(--ink-muted) / <alpha-value>)',
        },
        line: 'hsl(var(--line) / <alpha-value>)',
        focus: 'hsl(var(--focus) / <alpha-value>)',
        paper: 'hsl(var(--paper) / <alpha-value>)',
        mist: 'hsl(var(--mist) / <alpha-value>)',
        path: 'hsl(var(--path) / <alpha-value>)',
        ridge: 'hsl(var(--ridge) / <alpha-value>)',
        soft: 'hsl(var(--soft) / <alpha-value>)',
        ember: 'hsl(var(--ember) / <alpha-value>)',
        dusk: 'hsl(var(--dusk) / <alpha-value>)',
      },
      fontFamily: {
        brand: ['"Alfa Slab One"', 'Georgia', 'serif'],
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: ['var(--text-xs)', { lineHeight: '1.45' }],
        sm: ['var(--text-sm)', { lineHeight: '1.5' }],
        base: ['var(--text-base)', { lineHeight: '1.65' }],
        lg: ['var(--text-lg)', { lineHeight: '1.6' }],
        xl: ['var(--text-xl)', { lineHeight: '1.35' }],
        '2xl': ['var(--text-2xl)', { lineHeight: '1.2' }],
        '3xl': ['var(--text-3xl)', { lineHeight: '1.12' }],
        '4xl': ['var(--text-4xl)', { lineHeight: '1.08' }],
        '5xl': ['var(--text-5xl)', { lineHeight: '1.02' }],
        hero: ['var(--text-hero)', { lineHeight: '0.98' }],
      },
      minHeight: {
        tap: '2.75rem',
      },
      minWidth: {
        tap: '2.75rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ken-slow': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.04)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.55s ease-out both',
        'fade-up-delay': 'fade-up 0.6s ease-out 0.08s both',
        'fade-up-late': 'fade-up 0.65s ease-out 0.16s both',
        'ken-slow': 'ken-slow 22s ease-out forwards',
      },
      transitionDuration: {
        press: '100ms',
      },
    },
  },
  plugins: [],
};
