/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        dark: {
          bg: '#0a0f1d',
          card: '#111827',
          surface: '#1f2937',
          border: '#374151'
        },
        accent: {
          gold: '#f59e0b',
          cyan: '#06b6d4',
          emerald: '#10b981'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(20, 184, 166, 0.3)',
        'glow-lg': '0 0 40px -10px rgba(20, 184, 166, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
