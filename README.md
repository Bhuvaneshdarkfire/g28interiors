# G28 INTERIORS

Website work for **G28 Interiors** — Interior Execution • Turnkey Solutions, Coimbatore.

Premium office & corporate interior works, turnkey commercial fit-outs, workspace
strategy and bespoke residential interiors.

---

## What's in this repo

Three iterations of the site live side by side. They share one design system.

| Folder | What it is | Stack |
| --- | --- | --- |
| `g28-single-app/` | **The production site.** One self-contained `App.jsx` with every section, component and animation. | React 18 · Vite · Tailwind · Framer Motion |
| `g28-react/` | Modular React build — the same design split into per-section component files. | React 18 · Vite · Tailwind · Framer Motion |
| `index.html` | Original standalone static site (no build step, CDNs only). | HTML · Tailwind CDN · GSAP |

`g28-single-app/` is the one to deploy unless you specifically want the component-file
structure of `g28-react/`.

---

## Quick start

```bash
cd g28-single-app
npm install
npm run dev      # http://localhost:5174
npm run build    # -> dist/
npm run preview  # serve the built bundle
```

The modular version runs the same way from `g28-react/` (port 5173).

The static `index.html` needs no build — just open it in a browser.

---

## Design system

| Role | Value |
| --- | --- |
| Primary dark (emerald) | `#08251C` |
| Deepest emerald | `#051812` |
| Card on dark | `#0D3528` |
| Warm ivory | `#FAF6F0` |
| Secondary light card | `#F2ECE1` |
| Accent gold | `#D49B35` → `#E6C675` |
| Muted text on dark | `#B8B2A6` |
| Muted text on light | `#5F6B64` |

**Type** — Cormorant Garamond (display serif) · Plus Jakarta Sans (UI / body)

**Radii** — 24px cards · 30px dark cards · 20px inner panels · full pills

### Signature motifs

- **Pendant lamp** — an SVG roofline with a hanging lamp on a real damped-pendulum
  simulation (`usePendulum`). It reacts to pointer movement, and its light beam is a
  cone filled with a *vertical* gradient so it falls off with distance. Click it to
  toggle the site-wide ambient lighting.
- **Diagonal gold slashes** — every dark↔light section transition uses a `clip-path`
  triangle with a 2px gold SVG line (`vector-effect: non-scaling-stroke`).
- **Isometric wireframe** — a repeating 3D cube tile at 6% opacity behind the dark sections.
- **Hanging navbar objects** — a mini lamp, a plumb bob and a key ring dangle from the
  navbar, each on its own pendulum with a different response factor.
- **Spotlight tilt cards** — cursor-tracking gold radial spotlight + 3D micro-tilt (±4°),
  used on the KPI, Values and Packages cards.

---

## Sections

1. Floating glass navbar (with hanging objects + Founder's Story badge)
2. Hero — headline reveal, split-frame showcase, pendant lamp, KPI counters, service ticker
3. Client trust marquee
4. Our Process — **8-step** sticky stacking cards with auto-highlighting step pills
5. Our Values — 3-column bento with cursor spotlight + tilt
6. **Scope of Work** — tabbed bento (Commercial & Corporate / Residential) of spotlight tilt cards with full checklists
7. **Industries We Work With** — 8-sector interactive bento grid
8. **Materials & Products We Use** — 7 material swatch cards + dealer speciality tags
9. **The Vinayaga Group Legacy** — 3-company architectural showcase
10. **Brands We Deal With** — 11 custom stylised logo marks + infinite brand marquee
11. Work That Delivers Results — 5-pillar filterable case studies with magnetic gold badge
12. Transparent Execution Packages — conic gold shimmer + slot-machine price roll
13. FAQ — category tabs + accordions
14. Get In Touch — split-diagonal banner, inquiry form, footer

### Founder's Story page

A dedicated full-page view (routed via `#founder`, shareable and back-button friendly)
covering Goutham Arivalagan's narrative, the four pillars the material-dealership
foundation gives clients, and the three group companies.

---

## Brand positioning

G28 Interiors is positioned as the **turnkey interior execution and design arm of the
Vinayaga Group** — backed by Vinayaga Traders and Vinayaga Aluminium Company.

The differentiator is **direct material dealership**: because the group supplies
aluminium profiles, gypsum, fibre cement boards, ceiling sections and grid systems,
G28 delivers material authenticity and factory-direct pricing that a pure contractor
cannot match.

**Note:** the scope is deliberately interior execution only. There are no civil, MEP or
HVAC claims anywhere in the site — the capability story is built on in-house interior
execution, partitions, false ceilings, joinery, metal works and finish.

---

## Contact

**Goutham Arivalagan** — Founder & Interior Consultant

- +91 90802 04473 · +91 97900 75736
- g28interiors@gmail.com
- No. 1, Ramaiya Nagar, Trichy Main Road, Pappampatti Pirivu, Coimbatore – 641402

---

## Deploying

Any static host works. Build `g28-single-app` and upload `dist/`:

```bash
cd g28-single-app && npm run build
```

For GitHub Pages, Netlify or Vercel, set the project root to `g28-single-app` and the
publish directory to `dist`.
