/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f8f9fc',
        primary: '#0d6efd',
        secondary: '#f97316',
        success: '#10b981',
        pinkAccent: '#0d6efd',
        purpleAccent: '#a855f7',
        navy: {
          950: '#090E1A',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155'
        },
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#0d6efd',
          700: '#0b5ed7'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
