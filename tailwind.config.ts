import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // WAYFARER brand palette
        ivory: {
          DEFAULT: '#F4F1E9',
          50: '#FBFAF6',
          100: '#F4F1E9',
          200: '#ECE6D6',
          300: '#E0D7BF',
        },
        forest: {
          DEFAULT: '#183D3B',
          50: '#E8EFEE',
          100: '#C2D2D0',
          200: '#7FA19D',
          300: '#3F6360',
          400: '#264F4C',
          500: '#183D3B',
          600: '#143230',
          700: '#0F2625',
          800: '#0A1918',
          900: '#060F0F',
        },
        terracotta: {
          DEFAULT: '#D87952',
          50: '#FBF1EC',
          100: '#F6DFD2',
          200: '#EFBEA4',
          300: '#E89D76',
          400: '#D87952',
          500: '#C56035',
          600: '#9E4A28',
          700: '#77381E',
          800: '#512614',
          900: '#2C140B',
        },
        sand: {
          DEFAULT: '#E4B95F',
          50: '#FDF6E7',
          100: '#FAEBC8',
          200: '#F2D89A',
          300: '#EBC66C',
          400: '#E4B95F',
          500: '#D29F3D',
          600: '#A87C2E',
          700: '#7E5C22',
          800: '#543D16',
          900: '#2A1E0B',
        },
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
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'spin-slow': 'spin-slow 22s linear infinite',
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(24, 61, 59, 0.08)',
        card: '0 8px 30px -6px rgba(24, 61, 59, 0.12)',
        float: '0 20px 60px -12px rgba(24, 61, 59, 0.22)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
