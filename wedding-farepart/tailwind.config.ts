// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-jost)', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#C9A96E',
          light:   '#E8D5A3',
          dark:    '#9A7A45',
        },
        ivory: {
          DEFAULT: '#FAF6F0',
          warm:    '#F5EFE4',
        },
        earth:  '#5C3D1E',
        kente: {
          red:    '#8B1A1A',
          green:  '#1A4A2E',
          orange: '#C4511F',
        },
        wedding: {
          dark:     '#1A1209',
          'dark-soft': '#2D1F0E',
          muted:    '#9B8B7A',
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'float':      'float 6s ease-in-out infinite',
        'shimmer':    'shimmer 4s linear infinite',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'kente-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A96E' fill-opacity='0.06'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      screens: {
        xs: '380px',
      },
    },
  },
  plugins: [],
};

export default config;
