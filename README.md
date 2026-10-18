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

## Admin — editing Work & Products

The site ships with a built-in content editor for the two collections the client
updates most often: **Work We Deliver** (projects) and **Products & Materials**.

**Open it:** click the discreet `Admin` link in the footer, or go straight to
`#admin`.

**Default passphrase:** `G28!Emerald$Turnkey#2026`

From the panel you can add, edit, reorder and delete entries, then hit
**View site** to see the change live.

### Image links — Google Drive, Dropbox and direct URLs

Paste any of these and they just work:

| You paste | What gets stored |
| --- | --- |
| `https://drive.google.com/file/d/<ID>/view?usp=drive_link` | `https://drive.google.com/thumbnail?id=<ID>&sz=w1600` |
| `https://drive.google.com/open?id=<ID>` | same conversion |
| `https://www.dropbox.com/s/…?dl=0` | `…?raw=1` |
| `https://images.example.com/photo.jpg` | used as-is |

A Drive **share** link points at a viewer page, not an image, so a browser can
never render it directly — the link is rewritten automatically as you paste it,
and again whenever saved content is read, so older links self-heal.

**Two things must be true for a Drive image to show:**

1. The file is shared as **“Anyone with the link”** — otherwise it stays blank.
2. You paste the **share link**, not the file's preview URL from the browser bar
   after opening it in Drive (both work, but the share link is the reliable one).

If a link still won't load, the picker shows a **“Can't load”** badge on the
preview so you can see the problem before saving. Uploading the file directly is
always the most reliable option.

### Adding images from your device

Both editors take images straight off your computer — no hosting needed:

- **Cover image** (projects) and **Product photo** (materials): click
  *Upload from device*, or paste a URL instead.
- **Gallery** (projects): *+ Add images* accepts several files at once. Each
  project's gallery is what shows in its popup. Reorder with the arrows,
  remove with the ×.

Uploads are **resized to 1500px wide and re-compressed to JPEG** in the browser
before being stored, so a 5 MB phone photo becomes roughly 150–300 KB. The admin
bar shows a running **storage meter** — browsers cap `localStorage` at about
5 MB, so expect room for roughly 15–25 photos. Export before you get close.

### How it stores data — read this

This is a static site with no backend, so:

- Edits are saved to **`localStorage` in that one browser**. They are **not**
  shared with other visitors or other devices.
- **Export / Import** moves content between machines — export a
  `g28-content.json`, import it elsewhere. Use Export as your backup.
- **Reset** discards all edits and restores the built-in defaults.

**If you need edits to appear for every visitor**, export the JSON from the admin
panel and send it over — the defaults in `src/App.jsx` can then be updated so the
content ships with the site.

### If the page ever shows a blank screen

The most common cause is saved content from the admin panel that no longer
matches the layout — for example after importing a file with the wrong shape,
or data saved by an older version of the editor.

This is now handled in three layers, so it cannot take the page down:

1. **Every stored record is sanitised** before it reaches a component. A missing
   field, a wrong type, a `null` entry or a non-array collection all fall back
   to safe defaults.
2. **An error boundary wraps the app.** If anything still throws, you get a
   branded recovery screen showing the actual error, with **Reload** and
   **Reset saved content & reload** buttons — never a white page.
3. **The stylesheet is injected into `<head>` before React mounts**, so the dark
   theme survives even a total render failure.

To clear saved content manually, run this in the browser console and reload:

```js
localStorage.removeItem('g28.content.v1'); location.reload()
```

### Security

The passphrase is checked in the browser, which means it is a **content-editing
gate, not real authentication** — anyone who reads the JavaScript bundle can see
the check. It's appropriate for letting the client tweak their own copy without a
CMS, and it keeps casual visitors out. Do not put anything confidential behind it.

### Changing the passphrase

Open the admin panel and click **Passphrase** in the top bar. Enter the current
passphrase, then the new one twice. A strength meter rates it as you type
(minimum 12 characters). **Use default instead** reverts to the built-in one.

The hash is stored in that browser only, so each device keeps its own
passphrase. To change the shipped default for everyone, replace
`DEFAULT_PASS_HASH` in `src/App.jsx` with the djb2 hash of your new passphrase:

```bash
python3 -c "
def djb2(s):
    h=5381
    for c in s: h=((h<<5)+h)^ord(c); h&=0xFFFFFFFF
    return format(h,'x')
print(djb2('YourNewPassphrase'))"
```

---

## Sections

1. Floating glass navbar (with hanging objects + Founder's Story badge)
2. Hero — headline reveal, split-frame showcase, pendant lamp, KPI counters, service ticker
3. Client trust marquee
4. Our Process — **8-step** sticky stacking cards with auto-highlighting step pills
5. Our Values — 3-column bento with cursor spotlight + tilt
6. **Scope of Work** — tabbed bento (Commercial & Corporate / Residential) of spotlight tilt cards with full checklists
7. **Industries We Work With** — 8-sector interactive bento grid
8. **Materials & Products We Use** — 7 material swatch cards + dealer speciality tags (admin-editable).
    Each card opens a **product detail popup** with specifications, description
    and supplying brands.
9. **Brands We Deal With** — 11 custom stylised logo marks + infinite brand marquee
10. Work That Delivers Results — 5-pillar filterable case studies (admin-editable).
    Clicking any card opens a **project popup** with its full image gallery,
    arrow-key navigation, thumbnails and a full-screen lightbox.
11. Transparent Execution Packages — conic gold shimmer + slot-machine price roll
12. FAQ — category tabs + accordions
13. **The Vinayaga Group Legacy** — 3-company architectural showcase
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
