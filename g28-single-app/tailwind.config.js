/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      /* App.jsx uses literal hex values (bg-[#08251C]) so it renders with zero
         config. These tokens are provided as a convenience for extending it. */
      colors: {
        emerald: { DEFAULT: '#08251C', deep: '#051812', card: '#0D3528' },
        ivory: { DEFAULT: '#FAF6F0', card: '#F2ECE1' },
        gold: { DEFAULT: '#D49B35', light: '#E6C675' },
        muted: { DEFAULT: '#B8B2A6' }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
