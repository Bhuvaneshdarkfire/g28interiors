/** @type {import('tailwindcss').Config} */

/**
 * DESIGN TOKENS
 * ----------------------------------------------------------------------------
 * Reverse-engineered 1:1 from the reference layout:
 *   base surface   #f3efe8 (warm cream)   -> here: cream
 *   dark surface   #0a0a0a                 -> here: ink  (G28 deep forest)
 *   accent         #ff4c39 (orange-red)    -> here: gold (G28 champagne gold)
 *   radii          24px cards / 30px dark cards / 20px inner panels / 1000px pills
 *   type scale     112 / 72 / 48 / 38 / 32 / 28 / 24 / 20 / 18 / 16 / 14 / 12
 * Every value below is overridable from `src/theme.js`.
 */

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* --- surfaces --- */
        cream: {
          DEFAULT: '#F5F0E8', // page background (ref: #f3efe8)
          card: '#FBF8F3', // soft card (ref: #fbfaf9)
          white: '#FFFFFF',
          dim: '#EAE3D6' // inner panels
        },
        ink: {
          DEFAULT: '#08251C', // dark sections (ref: #0a0a0a)
          deep: '#051812',
          card: '#12382D', // dark cards (ref: #262626 / #171717)
          soft: '#0C3128'
        },
        /* --- brand accent --- */
        gold: {
          DEFAULT: '#D49B35', // use on DARK surfaces (6.3:1 on ink)
          light: '#E6C675',
          pale: '#F2E2BE',
          dark: '#A87724',
          deep: '#8F6218' // use on LIGHT surfaces (4.9:1 on cream)
        },
        /* --- text --- */
        muted: {
          DEFAULT: '#57655F', // 5.4:1 on cream / 4.8:1 on cream-dim  (ref: #737373)
          soft: '#98A6A0', // 6.4:1 on ink — for DARK surfaces (ref: #a1a1a1)
          ink: '#4A5751' // 6.8:1 on cream-card (ref: #525252)
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif']
      },
      fontSize: {
        /* exact reference scale */
        '11': ['11px', { lineHeight: '1.4' }],
        '12': ['12px', { lineHeight: '1.5' }],
        '14': ['14px', { lineHeight: '1.5' }],
        '16': ['16px', { lineHeight: '1.55' }],
        '18': ['18px', { lineHeight: '1.5' }],
        '20': ['20px', { lineHeight: '1.4' }],
        '24': ['24px', { lineHeight: '1.3' }],
        '28': ['28px', { lineHeight: '1.25' }],
        '32': ['32px', { lineHeight: '1.2' }],
        '38': ['38px', { lineHeight: '1.15' }],
        '48': ['48px', { lineHeight: '1.1' }],
        '72': ['72px', { lineHeight: '1.05' }],
        '112': ['112px', { lineHeight: '0.94' }]
      },
      borderRadius: {
        card: '24px',
        panel: '20px',
        tile: '30px',
        sm2: '16px',
        pill: '1000px'
      },
      maxWidth: {
        shell: '1400px',
        prose2: '620px'
      },
      spacing: {
        gutter: 'clamp(20px, 5vw, 80px)'
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.22,1,.36,1)'
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        },
        marqueeRev: {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' }
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        marquee: 'marquee var(--speed,40s) linear infinite',
        'marquee-rev': 'marqueeRev var(--speed,40s) linear infinite',
        floaty: 'floaty 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
