/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0C0C0C',
        surface: '#11161D',
        'surface-subtle': '#161D28',
        'surface-border': '#1E2733',
        main: '#D7E2EA',
        mint: '#5EEAD4',
        amber: '#F5C26B',
        rose: '#FB7185',
        periwinkle: '#8AA2FF',
      },
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'cursor-blink': 'blink 1.1s infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.92)' },
        }
      }
    },
  },
  plugins: [],
}
