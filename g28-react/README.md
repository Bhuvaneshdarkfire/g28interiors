# G28 INTERIORS — React Site

A production-ready **React + Vite + Tailwind CSS** rebuild of the reference marketing-site
layout (`marketinglab.framer.ai`), re-skinned for **G28 Interiors — Interior Execution • Turnkey Solutions**.

The layout, spacing rhythm, type scale, corner radii, component patterns and animation
behaviour are a faithful 1:1 match. Only the brand layer (colour, copy, imagery) is G28's.

---

## Quick start

```bash
cd g28-react
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle -> dist/
npm run preview    # serve the built bundle
```

> Built and verified with Node 20 + Vite 5.

---

## Design system

Extracted from the reference site and mapped onto G28's palette.

| Role | Reference | G28 (this build) |
| --- | --- | --- |
| Base surface | `#f3efe8` warm cream | `cream` `#F5F0E8` |
| Soft card | `#fbfaf9` | `cream-card` `#FBF8F3` |
| Inner panel | `#f3efe8` | `cream-dim` `#EAE3D6` |
| Dark section | `#0a0a0a` | `ink` `#08251C` (deep forest emerald) |
| Dark card | `#262626` / `#171717` | `ink-card` `#12382D` |
| Accent | `#ff4c39` orange-red | `gold` `#D49B35` (champagne) |
| Accent on light | — | `gold-deep` `#8F6218` (4.9:1 AA) |
| Muted text (light bg) | `#737373` | `muted` `#57655F` (5.4:1 AA) |
| Muted text (dark bg) | `#a1a1a1` | `muted-soft` `#98A6A0` (6.4:1 AA) |

**Radii** — `card` 24px · `tile` 30px · `panel` 20px · `sm2` 16px · `pill` 1000px
**Type scale** — 112 / 72 / 48 / 38 / 32 / 28 / 24 / 20 / 18 / 16 / 14 / 12 (Urbanist's exact scale)
**Weights** — 600 / 700 for headings, 500 for body, 600 for links & buttons

### Typeface

The reference uses **Urbanist**. This build ships with **Plus Jakarta Sans** (G28's brand sans,
structurally near-identical). Both are loaded — switch with one line in `src/index.css`:

```css
:root {
  --font-sans: 'Urbanist';     /* pixel-identical to the reference */
  --font-display: 'Urbanist';
}
```

---

## Section order (mirrors the reference)

1. **Header** — minimal fixed bar, logo left, pill CTA + dark menu button, full-screen overlay nav
2. **Ticker** — oversized bold marquee strip above the hero
3. **Hero** — dark card: stats stack · 112px display headline · description · arrow CTA ·
   feature pills · `/`-separated service marquee · places list · scroll-linked word-reveal manifesto
4. **Clients** — heading + infinite logo marquee
5. **Process** — dark card, sticky heading, 4 numbered steps with a scroll-progress rail
6. **Values** — accordion list (3 items)
7. **Services** — 4 alternating numbered service rows with images and stats
8. **Work** — 2-column case-study cards with hover scale + gold caption
9. **Testimonials** — dark, two opposing marquee rows of quote cards
10. **Pricing** — toggle + 3 plans (white shells, inner panels, dark "Popular" card)
11. **FAQ** — category pills + animated accordion
12. **Insights** — 3 article cards
13. **Contact** — dark split: details + inquiry form (hands off to WhatsApp)
14. **Closing + Footer** — big CTA, marquee divider, footer columns, contact block
15. **WhatsApp FAB** + gold scroll-progress bar

---

## Project structure

```
g28-react/
├── index.html                 # fonts + meta
├── tailwind.config.js         # design tokens (colours, radii, type scale, keyframes)
├── postcss.config.js
├── vite.config.js
├── public/robots.txt
└── src/
    ├── main.jsx
    ├── App.jsx                # section composition + scroll progress
    ├── index.css              # base layer, component classes (.shell .btn .pill …)
    ├── data/content.js        # ← ALL copy, images and contact details live here
    └── components/
        ├── Header.jsx  Hero.jsx  Clients.jsx  Process.jsx  Values.jsx
        ├── Services.jsx  Work.jsx  Testimonials.jsx  Pricing.jsx
        ├── Faq.jsx  Insights.jsx  Contact.jsx  Closing.jsx  WhatsAppFab.jsx
        └── ui/
            ├── primitives.jsx   # Reveal, RevealGroup, Counter, Pill, ArrowLink, SectionHead
            ├── Marquee.jsx      # infinite CSS marquee
            ├── LetterReveal.jsx # scroll-linked word-by-word reveal
            └── Logo.jsx         # G28 roof + pendant-lamp mark
```

### Editing content

Everything user-facing is in **`src/data/content.js`** — brand, contact details, nav, hero,
services, projects, testimonials, pricing, FAQ, insights, footer and form fields.

### Swapping the palette

Colours are defined once in **`tailwind.config.js`** under `theme.extend.colors`.
To return to the reference's near-black + orange scheme, change three values:

```js
ink:   { DEFAULT: '#0a0a0a', deep: '#000000', card: '#262626', soft: '#171717' },
gold:  { DEFAULT: '#ff4c39', light: '#ff6a58', deep: '#d4300e', ... },
cream: { DEFAULT: '#f3efe8', card: '#fbfaf9', dim: '#eae0cf' }
```

---

## Animations

All motion uses **Framer Motion** (the same engine the reference is built on) — `whileInView`
reveals with stagger, scroll-linked `useScroll`/`useTransform` for the word reveal and the
process rail, spring-driven scroll progress, and CSS keyframes for the marquees.
`prefers-reduced-motion` is respected globally.

---

## Quality

Verified against the production bundle:

| Audit | Score |
| --- | --- |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

Zero console errors. No horizontal overflow. All interactive elements
(overlay menu, values accordion, FAQ categories, pricing toggle, inquiry form) tested.
