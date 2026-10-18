/* ==========================================================================
   G28 INTERIORS — Interior Execution • Turnkey Solutions
   --------------------------------------------------------------------------
   A single-file, production-ready React application.

   LAYOUT DNA      → mirrors the marketinglab.framer.ai agency layout
                     (ticker → hero → KPI bento → clients → process → values →
                      numbered services → case studies → packages → FAQ → contact)
   VISUAL IDENTITY → G28 Interiors: deep forest emerald, warm ivory,
                     champagne gold, serif display type, diagonal gold slashes,
                     isometric wireframe art and a pendant-lamp motif.

   DEPENDENCIES    → react, framer-motion, lucide-react, tailwindcss
   FONTS           → injected at runtime (Cormorant Garamond + Plus Jakarta Sans)
   STYLING         → Tailwind arbitrary values + a scoped global stylesheet,
                     so it renders with ZERO custom tailwind config.
   ========================================================================== */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion'
import {
  Archive,
  Armchair,
  ArrowRight,
  ArrowUpRight,
  Award,
  BedDouble,
  Blinds,
  Boxes,
  Briefcase,
  Building2,
  Check,
  ChefHat,
  Clock,
  Columns3,
  DoorOpen,
  Factory,
  Flower2,
  Frame,
  Gem,
  GraduationCap,
  Hammer,
  HardHat,
  Home,
  Lamp,
  Landmark,
  Layers,
  LayoutGrid,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  PanelsTopLeft,
  Phone,
  PhoneCall,
  Plus,
  Quote,
  Ruler,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Sofa,
  Sparkles,
  SquareStack,
  Stethoscope,
  Store,
  Table,
  UtensilsCrossed,
  Users,
  Warehouse,
  Wrench,
  X
} from 'lucide-react'

/* ==========================================================================
   1. THEME TOKENS
   ========================================================================== */

const T = {
  deep: '#051812', // deepest emerald — page / hero background
  ink: '#08251C', // primary dark surface
  card: '#0D3528', // card surface on dark
  ivory: '#FAF6F0', // light section surface
  ivory2: '#F2ECE1', // secondary light card surface
  gold: '#D49B35',
  goldLight: '#E6C675',
  goldDeep: '#8F6218', // gold tuned for AA contrast on ivory
  muted: '#B8B2A6', // muted body copy on dark
  mutedLight: '#5F6B64' // muted body copy on ivory
}

/* motion presets ---------------------------------------------------------- */
const SPRING = { type: 'spring', stiffness: 100, damping: 20 }
const EASE = [0.22, 1, 0.36, 1]
const VIEWPORT = { once: true, margin: '-80px' }

/* ==========================================================================
   2. GLOBAL STYLESHEET  (fonts, keyframes, base resets)
   ========================================================================== */

export const GLOBAL_CSS = `
:root{
  --g28-deep:${T.deep};
  --g28-ink:${T.ink};
  --g28-card:${T.card};
  --g28-ivory:${T.ivory};
  --g28-ivory2:${T.ivory2};
  --g28-gold:${T.gold};
  --g28-gold-light:${T.goldLight};
  --g28-muted:${T.muted};
}
*{ -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
html{ scroll-behavior:smooth; position:relative; }
body{
  margin:0;
  background:var(--g28-deep);
  color:var(--g28-ivory);
  font-family:'Plus Jakarta Sans','Inter',system-ui,-apple-system,sans-serif;
  overflow-x:clip; /* clip (not hidden) so body never becomes a scroll container */
}
::selection{ background:var(--g28-gold); color:var(--g28-deep); }
::-webkit-scrollbar{ width:10px; }
::-webkit-scrollbar-track{ background:var(--g28-deep); }
::-webkit-scrollbar-thumb{ background:var(--g28-ink); border-radius:99px; }
::-webkit-scrollbar-thumb:hover{ background:var(--g28-gold); }

.g28-serif{ font-family:'Cormorant Garamond','Playfair Display',Georgia,serif; }
.g28-sans{ font-family:'Plus Jakarta Sans','Inter',system-ui,sans-serif; }

/* --- gold gradient text --- */
.g28-gold-text{
  background:linear-gradient(100deg,#A87724 0%,#D49B35 26%,#F2E2BE 50%,#E6C675 74%,#A87724 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}

/* --- infinite marquee --- */
@keyframes g28-marquee{ from{ transform:translate3d(0,0,0); } to{ transform:translate3d(-50%,0,0); } }
.g28-track{ display:flex; width:max-content; animation:g28-marquee var(--speed,40s) linear infinite; will-change:transform; }
.g28-track-rev{ animation-direction:reverse; }
.g28-track:hover{ animation-play-state:paused; }
.g28-fade-x{
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);
  mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);
}

/* --- lamp glow pulse --- */
@keyframes g28-pulse{
  0%{ transform:scale(1); opacity:.55; }
  100%{ transform:scale(2.1); opacity:0; }
}
.g28-pulse::after{
  content:''; position:absolute; inset:0; border-radius:9999px;
  background:rgba(212,155,53,.45); animation:g28-pulse 2.6s cubic-bezier(.3,.7,.4,1) infinite; z-index:-1;
}

/* --- lamp sway --- */
@keyframes g28-sway{
  0%,100%{ transform:rotate(0deg); }
  25%{ transform:rotate(2.4deg); }
  75%{ transform:rotate(-2.4deg); }
}
.g28-sway{ transform-origin:50% 0%; animation:g28-sway 6.5s ease-in-out infinite; }

/* --- hover-reveal underline --- */
.g28-underline{ position:relative; }
.g28-underline::after{
  content:''; position:absolute; left:0; bottom:-5px; height:1px; width:0;
  background:linear-gradient(90deg,var(--g28-gold),var(--g28-gold-light));
  transition:width .5s cubic-bezier(.22,1,.36,1);
}
.g28-underline:hover::after{ width:100%; }

/* --- image hover --- */
.g28-zoom img{ transition:transform 1.2s cubic-bezier(.22,1,.36,1); }
.g28-zoom:hover img{ transform:scale(1.07); }

/* --- form fields --- */
.g28-field{
  width:100%; background:transparent; border:0; border-bottom:1px solid rgba(250,246,240,.22);
  padding:14px 2px; color:var(--g28-ivory); font-size:15px; font-weight:500; outline:none;
  transition:border-color .35s ease;
}
.g28-field::placeholder{ color:rgba(250,246,240,.34); }
.g28-field:focus{ border-color:var(--g28-gold); }
.g28-field option{ color:#08251C; }

/* --- dust motes drifting through the lamp beam --- */
@keyframes g28-mote{
  0%{ transform: translate3d(0,0,0) scale(0.7); opacity:0; }
  25%{ opacity:1; }
  100%{ transform: translate3d(9px,-46px,0) scale(1.15); opacity:0; }
}
.g28-mote{ animation: g28-mote 6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }

/* --- decorative watermark numerals (pseudo-element: invisible to a11y tree,
       and CSS-transition driven so they never depend on the frame loop) --- */
.g28-watermark{
  position:absolute; top:1.6rem; right:1.4rem;
  pointer-events:none; user-select:none;
}
.g28-watermark::after{
  content: attr(data-num);
  display:block;
  font-family:'Cormorant Garamond','Playfair Display',Georgia,serif;
  font-weight:700; font-size:48px; line-height:1;
  color:rgba(8,37,28,0.12);
  transition: transform .55s cubic-bezier(.22,1,.36,1), color .55s ease;
}
.group:hover .g28-watermark::after{
  transform: translateY(-8px);
  color: rgba(212,155,53,0.5);
}
@media (min-width: 640px){ .g28-watermark::after{ font-size:64px; } }

@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{ animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; }
  html{ scroll-behavior:auto; }
}
`

/* ==========================================================================
   3. DATA  —  all copy, imagery and contact details live here
   ========================================================================== */

const BRAND = {
  name: 'G28 INTERIORS',
  tagline: 'Interior Execution • Turnkey Solutions',
  year: '2026',
  city: 'Coimbatore',
  group: 'The Vinayaga Group'
}

const CONTACT = {
  founder: 'Goutham Arivalagan',
  founderRole: 'Founder & Interior Consultant',
  phones: ['+91 9080204473', '+91 97900 75736'],
  tel: ['+919080204473', '+919790075736'],
  email: 'g28interiors@gmail.com',
  address: 'No. 1, Ramaiya Nagar, Trichy Main Road, Pappampatti Pirivu, Coimbatore – 641402',
  whatsapp: 'https://wa.me/919080204473'
}

/* Founder's Story link carries a gold badge in the navbar */
const NAV = [
  { label: 'Services', href: '#services', tier: 1 },
  { label: 'Scope of Work', short: 'Scope', href: '#scope', tier: 1 },
  { label: 'Process', href: '#process', tier: 1 },
  { label: 'Projects', href: '#portfolio', tier: 1 },
  { label: 'Materials & Brands', short: 'Materials', href: '#materials', tier: 2 },
  { label: 'Group Companies', short: 'Group', href: '#group', tier: 2 },
  { label: 'Founder\u2019s Story', short: 'Founder', view: 'founder', badge: true, tier: 1 },
  { label: 'Contact', href: '#contact', tier: 1 }
]

const IMG = {
  heroA: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
  heroB: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
  office1: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80',
  office2: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80',
  suite1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
  suite2: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80',
  lounge: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80',
  residence: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
  retail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80',
  cafe: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80',
  industrial: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80',
  factory: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1400&q=80',
  kitchen: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1400&q=80',
  villa: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
  meeting: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=1400&q=80',
  team: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80',
  office3: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
  cafe2: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1400&q=80',
  restaurant: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=80'
}

const HERO = {
  badge: '©2026  •  PREMIER INTERIOR EXECUTION AGENCY  •  COIMBATORE',
  headline: [
    'Workspace Interiors &',
    'Turnkey Solutions —',
    'Crafted to Elevate Your',
    'Corporate Identity.'
  ],
  sub:
    "We don't do generic spaces. Every corporate office, executive suite, retail store, industrial unit and residence we touch gets an architectural layout built from scratch and executed with turnkey precision.",
  primaryCta: 'Start Your Project',
  secondaryCta: 'View Our Portfolio',
  lampOn: 'Ambient lighting on',
  lampOff: 'Ambient lighting off',
  kpis: [
    { value: 100, suffix: '%', label: 'Turnkey Execution Precision', sub: 'Concept to key handover' },
    { value: 150, suffix: 'K+', label: 'Sq. Ft. Transformed', sub: 'Across every sector we serve' },
    { text: 'On-Time', label: 'Guaranteed Handover', sub: 'Locked programme dates' }
  ],
  /* floating badge over the hero showcase */
  showcaseBadge: {
    line1: 'IN-HOUSE EXECUTION',
    line2: 'Turnkey Interior Specialists',
    foot: 'DIRECT MATERIAL SOURCING • Backed by Vinayaga Group'
  },
  marquee: [
    'CORPORATE INTERIORS',
    'TURNKEY EXECUTION',
    'FALSE CEILING & PARTITIONS',
    'MODULAR WORKSTATIONS',
    'RETAIL & SHOWROOMS',
    'INDUSTRIAL FIT-OUTS',
    'MODULAR KITCHENS',
    'DESIGNER METAL WORKS'
  ]
}

const CLIENTS = {
  heading: 'Our Clients',
  sub: 'Trusted across corporate offices, retail flagships, industrial units, healthcare, hospitality and luxury residences.',
  list: [
    'APEX TECHNOLOGIES',
    'VANGUARD CAPITAL',
    'NOVA IT PARK',
    'CREST DEVELOPERS',
    'MERIDIAN LABS',
    'AURA RETAIL',
    'HARBOUR HOSPITALITY',
    'SIGMA CONSULTING',
    'ORBIT HEALTHCARE',
    'LUMEN STUDIOS'
  ]
}

/* --------------------------------------------------------------------------
   THE 8-STEP TURNKEY PROCESS
-------------------------------------------------------------------------- */
const PROCESS = {
  heading: 'Our Process',
  sub: 'A disciplined eight-step execution framework that removes guesswork and delivers turnkey perfection on the promised date.',
  steps: [
    {
      no: '01',
      icon: Ruler,
      title: 'Site Inspection',
      body:
        'We walk the site with you and capture detailed laser measurements, assess structural conditions, service routing and daylight before anything is drawn.',
      points: ['Laser measurement survey', 'Structural assessment', 'Space & service evaluation']
    },
    {
      no: '02',
      icon: LayoutGrid,
      title: 'Space Planning',
      body:
        'Ergonomic 2D layouts, workflow zoning and 3D visualisation — so you approve exactly how the finished space will look and feel before execution begins.',
      points: ['Ergonomic 2D layouts', 'Workflow & zoning study', '3D visual conceptualisation']
    },
    {
      no: '03',
      icon: Package,
      title: 'Quotation',
      body:
        'A transparent, itemised Bill of Quantities with exact material specifications, brands and quantities — no lump sums, no vague line items.',
      points: ['Itemised BOQ', 'Exact material specifications', 'Brand & finish schedule']
    },
    {
      no: '04',
      icon: Gem,
      title: 'Price Discussion',
      body:
        'Collaborative value engineering. We adjust materials and detailing with you until the specification matches your exact budget without cheapening the result.',
      points: ['Value engineering', 'Material customisation', 'Budget alignment']
    },
    {
      no: '05',
      icon: ShieldCheck,
      title: 'Payments',
      body:
        'A clear, milestone-linked payment structure tied to verified progress on site, with zero hidden costs and nothing payable outside the agreed schedule.',
      points: ['Milestone-linked structure', 'Zero hidden costs', 'Documented approvals']
    },
    {
      no: '06',
      icon: Hammer,
      title: 'Execution',
      body:
        'Precision on-site fabrication and installation — false ceiling, partitions, woodwork, metal works, flooring, lighting and every finishing trade, under one accountable team.',
      points: ['On-site fabrication', 'False ceiling & partitions', 'Woodwork & metal works']
    },
    {
      no: '07',
      icon: Award,
      title: 'Project Completion',
      body:
        'A rigorous quality inspection, deep clean, lighting calibration and joint snag walkthrough — followed by an on-time turnkey handover.',
      points: ['Quality inspection', 'Deep cleaning & lighting checks', 'On-time handover']
    },
    {
      no: '08',
      icon: PhoneCall,
      title: 'Post-Completion Services',
      body:
        'Dedicated after-handover support, maintenance assistance and warranty care. Our relationship starts at handover, it does not end there.',
      points: ['After-handover support', 'Maintenance assistance', 'Warranty care']
    }
  ]
}

const VALUES = {
  heading: 'Our Values',
  sub: 'We fuel bold architectural visions, driving them forward with disciplined execution.',
  items: [
    {
      icon: Ruler,
      title: 'Precision Execution',
      body:
        'We measure twice and build once. Every dimension is verified on site, every drawing is buildable, and every finish is checked against the approved sample before it is installed. The result is a floor that matches the render — line for line.'
    },
    {
      icon: Users,
      title: 'Collaborative Transparency',
      body:
        'Your architects, facility managers and vendors are partners, not obstacles. We share the programme, the BOQ and the site reports openly, so there are no surprises and no blame games between drawing and delivery.'
    },
    {
      icon: Gem,
      title: 'Uncompromising Material Integrity',
      body:
        'Because we are backed by our own building-material dealerships, every board, profile and section on your site is factory-sourced and traceable. Genuine material, honest pricing, no silent substitutions.'
    }
  ]
}

/* --------------------------------------------------------------------------
   SCOPE OF WORKS — tabbed bento of spotlight tilt cards
-------------------------------------------------------------------------- */
const SCOPE = {
  heading: 'Scope of Work',
  sub: 'Every specialised execution capability we deliver in-house — from a single partition to a complete turnkey fit-out.',
  tabs: [
    {
      key: 'corporate',
      label: 'Commercial & Corporate',
      icon: Building2,
      intro: 'Entrances, cabins, ceilings, workstations and furniture — engineered for how teams actually work.',
      items: [
        {
          icon: DoorOpen,
          title: 'Entrance & Other Partitions',
          body: 'Glass, aluminium, gypsum and acoustic partition systems that define zones without closing the space in.',
          points: ['Toughened & fluted glass', 'Slim aluminium profiles', 'Gypsum dry-wall partitions', 'Acoustic privacy systems']
        },
        {
          icon: Briefcase,
          title: 'Executive Cabins',
          body: 'Bespoke director suites and acoustic privacy cabins detailed in veneer, fluted glass and fabric panels.',
          points: ['Director & MD suites', 'Acoustic privacy cabins', 'Bespoke joinery & storage', 'Integrated AV routing']
        },
        {
          icon: Blinds,
          title: 'False Ceiling',
          body: 'Grid ceilings, gypsum designer ceilings, acoustic baffles and aluminium false ceiling sections.',
          points: ['Grid & T-grid ceilings', 'Gypsum designer ceilings', 'Acoustic baffles', 'Aluminium ceiling sections']
        },
        {
          icon: LayoutGrid,
          title: 'Work Stations',
          body: 'Modular linear and cluster workstations with integrated cable management and ergonomic clearances.',
          points: ['Linear & cluster layouts', 'Integrated cable management', 'Ergonomic clearances', 'Screen & pedestal units']
        },
        {
          icon: SquareStack,
          title: 'Floor Mat & Flooring',
          body: 'Commercial carpeting, vinyl, anti-skid and designer floor mats specified for heavy footfall.',
          points: ['Commercial carpet tiles', 'Vinyl & LVT flooring', 'Anti-skid surfaces', 'Designer floor mats']
        },
        {
          icon: Store,
          title: 'Display Area',
          body: 'Custom illuminated retail and showroom product display units built around sightlines and lighting.',
          points: ['Illuminated display units', 'Sightline planning', 'Product wall systems', 'Brand lighting design']
        },
        {
          icon: Archive,
          title: 'Racks and Storages',
          body: 'Heavy-duty commercial shelving, compactors and filing storage engineered for load and longevity.',
          points: ['Heavy-duty shelving', 'Compactor & filing systems', 'Utility & archive storage', 'Load-rated fabrication']
        },
        {
          icon: Armchair,
          title: 'Furnitures',
          body: 'Ergonomic seating, reception desks, conference tables and lounge furniture — sourced and installed.',
          points: ['Ergonomic seating', 'Reception & conference tables', 'Lounge & breakout furniture', 'Complete installation']
        }
      ]
    },
    {
      key: 'residential',
      label: 'Residential',
      icon: Home,
      intro: 'Kitchens, wardrobes, ceilings, metal work and decor — detailed to villa standard.',
      items: [
        {
          icon: ChefHat,
          title: 'Modular Kitchen',
          body: 'Ergonomic layouts using marine ply, PVC or aluminium profiles with soft-close hardware throughout.',
          points: ['Ergonomic work triangles', 'Marine ply / PVC / aluminium', 'Soft-close hardware', 'Tall units & appliance housing']
        },
        {
          icon: Columns3,
          title: 'Partitions',
          body: 'Living-dining dividers, CNC screens, glass and metal partitions that shape the plan elegantly.',
          points: ['Living-dining dividers', 'CNC-cut screens', 'Glass & metal partitions', 'Sliding & folding systems']
        },
        {
          icon: Blinds,
          title: 'False Ceiling',
          body: 'Cove lighting gypsum ceilings, wooden rafters and PVC ceiling designs for every room.',
          points: ['Cove lighting gypsum', 'Wooden rafter ceilings', 'PVC ceiling designs', 'Perimeter & recessed lighting']
        },
        {
          icon: DoorOpen,
          title: 'Wardrobe & All Other Closets',
          body: 'Walk-in closets, sliding and hinged wardrobes, loft and utility storage built to your exact inventory.',
          points: ['Walk-in closets', 'Sliding & hinged wardrobes', 'Loft storage', 'Utility & pooja units']
        },
        {
          icon: Layers,
          title: 'Metal Stairs',
          body: 'Custom fabricated structural and architectural indoor and outdoor metal staircases.',
          points: ['Structural metal stairs', 'Architectural spiral & straight', 'Indoor & outdoor rated', 'Custom tread & railing']
        },
        {
          icon: PanelsTopLeft,
          title: 'Glass Railing',
          body: 'Toughened glass balustrades with stainless steel or aluminium profiles for stairs, balconies and terraces.',
          points: ['Toughened glass balustrades', 'SS & aluminium profiles', 'Balcony & terrace railing', 'Staircase glass railing']
        },
        {
          icon: Frame,
          title: 'Pergola and Elevation',
          body: 'Exterior architectural pergolas, facade cladding and elevation works that transform the frontage.',
          points: ['Architectural pergolas', 'Facade cladding', 'Elevation & entrance design', 'Weather-rated finishes']
        },
        {
          icon: Sofa,
          title: 'Furnitures',
          body: 'Custom cots, TV units, crockery units, sofa frames and dining sets built to the millimetre.',
          points: ['Custom cots & headboards', 'TV & crockery units', 'Sofa frames', 'Dining & centre tables']
        },
        {
          icon: Lamp,
          title: 'Buy and Fix Decors',
          body: 'Curated lighting fixtures, wall art, mirrors and artifacts — delivered and fully installed.',
          points: ['Curated lighting fixtures', 'Wall art & mirrors', 'Artifacts & accessories', 'Complete installation']
        },
        {
          icon: Gem,
          title: 'Designer Metal Works',
          body: 'Bespoke PVD-coated metal arches, frames, gates and decorative architectural metal art.',
          points: ['PVD-coated arches & frames', 'Designer gates', 'Decorative metal art', 'Custom architectural metal']
        }
      ]
    }
  ]
}

/* --------------------------------------------------------------------------
   INDUSTRIES WE WORK WITH — 8 sectors
-------------------------------------------------------------------------- */
const INDUSTRIES = {
  heading: 'Industries We Work With',
  sub: 'Eight core sectors, one execution standard. Every environment has its own compliance, durability and hygiene demands — we build for them.',
  items: [
    {
      icon: GraduationCap,
      title: 'Educational Institutes',
      body: 'Schools, colleges and training centres — smart classrooms, laboratories, libraries and durable, low-maintenance circulation areas.',
      tags: ['Smart Classrooms', 'Labs', 'Libraries']
    },
    {
      icon: Stethoscope,
      title: 'Hospitals & Healthcare',
      body: 'Clinics, diagnostics and hospitals built around hygienic surfaces, easy-clean false ceilings and calm, legible reception zones.',
      tags: ['Hygienic Ceilings', 'Reception Zones', 'Diagnostics']
    },
    {
      icon: UtensilsCrossed,
      title: 'Restaurants & Cafes',
      body: 'Theme interiors with acoustic ceilings, pergolas and custom seating engineered for footfall, comfort and ambience.',
      tags: ['Theme Interiors', 'Acoustic Ceilings', 'Pergolas']
    },
    {
      icon: ShoppingBag,
      title: 'Retail Stores & Showrooms',
      body: 'High-impact display areas, entrance partitions and lighting that make product look expensive and draw people in.',
      tags: ['Display Areas', 'Entrance Partitions', 'Lighting']
    },
    {
      icon: Factory,
      title: 'Production Industries',
      body: 'Industrial cabins, durable fibre cement partitions, heavy-duty racks and storages built for plant-floor conditions.',
      tags: ['Industrial Cabins', 'Fibre Cement Partitions', 'Racks & Storages']
    },
    {
      icon: Briefcase,
      title: 'Service Sectors',
      body: 'IT offices, banks, consultancies and corporate workspaces planned for density, acoustics and brand presence.',
      tags: ['IT Offices', 'Banks', 'Consultancies']
    },
    {
      icon: Scissors,
      title: 'Parlors & Salons',
      body: 'Luxury mirrors, ambient lighting, reception counters and styling stations designed around the customer journey.',
      tags: ['Luxury Mirrors', 'Ambient Lighting', 'Styling Stations']
    },
    {
      icon: Home,
      title: 'Residentials',
      body: 'Villas and apartments — modular kitchens, wardrobes, metal staircases and full exterior elevations.',
      tags: ['Villas', 'Modular Kitchens', 'Metal Elevations']
    }
  ]
}

/* --------------------------------------------------------------------------
   MATERIALS & PRODUCTS WE USE
-------------------------------------------------------------------------- */
const MATERIALS = {
  heading: 'Materials & Products We Use',
  sub: 'We are not a middleman. Because we run our own material dealerships, every specification below is sourced direct from the factory — genuine, traceable and priced without a layer of markup.',
  items: [
    {
      icon: Layers,
      name: 'Aluminium',
      image: null,
      specs: ['Heavy-duty & slim profiles', 'Powder-coated / anodised', 'Partition, ceiling & window systems'],
      body: 'Heavy-duty and slim architectural aluminium profiles for partitions, ceilings, railings and window systems.',
      swatch: 'linear-gradient(135deg,#D8DDE2 0%,#F2F5F7 28%,#A8B0B8 55%,#E4E9ED 78%,#B4BCC4 100%)',
      tone: '#3A444C'
    },
    {
      icon: Boxes,
      name: 'Plywood',
      image: null,
      specs: ['Commercial & BWR / BWP', 'Marine-grade for wet areas', '18mm / 12mm / 6mm stock'],
      body: 'Commercial and BWR / BWP marine-grade plywood for wet areas, wardrobes, kitchens and heavy structural joinery.',
      swatch: 'linear-gradient(135deg,#C9A06A 0%,#E0BE8B 30%,#A97C46 62%,#D3AC79 100%)',
      tone: '#5A3E1E'
    },
    {
      icon: Frame,
      name: 'Wood',
      image: null,
      specs: ['Seasoned & kiln-dried', 'Natural veneers', 'Solid timber for feature work'],
      body: 'Seasoned timber and natural wood veneers for bespoke furniture, panelling and feature detailing.',
      swatch: 'linear-gradient(135deg,#8A5A32 0%,#B07B47 32%,#5F3A1E 66%,#9A6738 100%)',
      tone: '#3A2110'
    },
    {
      icon: SquareStack,
      name: 'MDF',
      image: null,
      specs: ['Moisture-resistant (HMR)', 'HDHMR for high-density work', 'Paint & laminate finish'],
      body: 'High-density moisture-resistant MDF and HDHMR boards for precision-machined, paint-finish joinery.',
      swatch: 'linear-gradient(135deg,#E8DCC6 0%,#F5EEDD 34%,#CDBEA1 68%,#EDE3CE 100%)',
      tone: '#6B5B3E'
    },
    {
      icon: PanelsTopLeft,
      name: 'Gypsum',
      image: null,
      specs: ['Boards & plastering systems', 'Seamless designer ceilings', 'Dry-wall partition cores'],
      body: 'Premium gypsum boards and plastering systems for seamless designer ceilings and dry-wall partitions.',
      swatch: 'linear-gradient(135deg,#F2F0EC 0%,#FFFFFF 34%,#DCD8D1 68%,#F6F4F1 100%)',
      tone: '#5E5A52'
    },
    {
      icon: Blinds,
      name: 'Glass',
      image: null,
      specs: ['Toughened / laminated', 'Frosted, fluted & acoustic', 'Railing & partition grades'],
      body: 'Toughened, frosted, fluted and acoustic glass panels for partitions, railings, cabins and facades.',
      swatch: 'linear-gradient(135deg,#BFD8DC 0%,#E4F1F3 32%,#93B4BA 66%,#D2E6EA 100%)',
      tone: '#2C4A50'
    },
    {
      icon: Warehouse,
      name: 'UPVC & PVC',
      image: null,
      specs: ['Waterproof windows & doors', 'PVC interior wall panels', 'Low-maintenance surfaces'],
      body: 'Waterproof UPVC windows and doors, plus PVC interior panels for wet areas and low-maintenance surfaces.',
      swatch: 'linear-gradient(135deg,#E6E8EA 0%,#FAFBFC 34%,#C6CACE 68%,#EDEFF1 100%)',
      tone: '#4A4F55'
    }
  ],
  specialtyHeading: 'Specialised Supply & Dealer Products',
  specialtySub: 'Stocked and supplied directly through our group companies — Vinayaga Traders and Vinayaga Aluminium Company.',
  specialty: [
    'Aluminium Profiles',
    'Aluminium False Ceiling Sections',
    'Fibre Cement Board',
    'Calcium Silicate Dry Walls & Ceilings',
    'Ladders',
    'Particle Board',
    'Thermocol',
    'Grid Section'
  ]
}

/* --------------------------------------------------------------------------
   BRANDS WE DEAL WITH — 11 custom stylised logo marks
-------------------------------------------------------------------------- */
const BRANDS = {
  heading: 'Brands We Deal With',
  badge: 'Direct Dealership & Authentic Supply',
  sub:
    'Backed by Vinayaga Traders and Vinayaga Aluminium Company, every project is built using 100% genuine, factory-sourced boards, profiles and ceiling systems.',
  marquee: [
    'GYPROC SAINT-GOBAIN',
    'KNAUF',
    'GLOBE TECH',
    'VNEXT BY VISAKA',
    'RAMCO HICEM',
    'RAMCO HILUX',
    'ECOPRO',
    'SONALI',
    'EITI',
    'BAYDEE',
    'UNICELL'
  ],
  items: [
    {
      name: 'Gyproc Saint-Gobain',
      category: 'Gypsum & Plasterboard Systems',
      render: () => (
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-10 items-center justify-center">
            <div className="flex h-12 gap-1">
              <span className="h-full w-1.5 rounded-[2px] bg-[#7A7D82]" />
              <span className="h-full w-1.5 rounded-[2px] bg-[#7A7D82]" />
              <span className="h-full w-1.5 rounded-[2px] bg-[#7A7D82]" />
            </div>
            <div className="absolute -left-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#1E4C8A] text-[8px] font-bold text-white">
              &#127760;
            </div>
          </div>
          <div className="text-left leading-none">
            <div className="text-2xl font-extrabold italic tracking-tight text-[#1E4C8A]">Gyproc</div>
            <div className="mt-0.5 text-[9px] font-bold tracking-[0.18em] text-neutral-800">SAINT-GOBAIN</div>
          </div>
        </div>
      )
    },
    {
      name: 'Knauf Ceiling Solutions',
      category: 'Acoustic & Mineral Fibre Ceilings',
      render: () => (
        <div className="text-left leading-none">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black uppercase tracking-tighter text-[#2276B4]">KNAUF</span>
            <span className="text-xl font-extrabold uppercase italic tracking-tight text-[#58595B]">CEILING</span>
          </div>
          <div className="text-right text-xs font-medium italic text-[#58595B]">Solutions</div>
        </div>
      )
    },
    {
      name: 'Globe Tech',
      category: 'Architectural & Interior Systems',
      render: () => (
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-10">
            <div className="absolute left-0 top-2 h-5 w-6 -skew-x-12 rounded-[2px] bg-[#8AB8A8]" />
            <div className="absolute left-1.5 top-1 h-5 w-6 -skew-x-12 rounded-[2px] bg-[#1D3549]" />
            <div className="absolute left-3 top-0 h-5 w-6 -skew-x-12 rounded-[2px] bg-[#4D9B78]" />
          </div>
          <span className="text-lg font-black tracking-wider text-[#1D3549]">GLOBE TECH</span>
        </div>
      )
    },
    {
      name: 'Vnext by Visaka',
      category: 'Eco-Friendly Fibre Cement Boards',
      render: () => (
        <div className="flex flex-col items-center leading-none">
          <div className="flex items-end">
            <span className="-mb-1 text-2xl font-black text-[#D95B26]">&#10004;</span>
            <span className="text-xl font-light tracking-tight text-neutral-900">
              <strong className="font-extrabold">V</strong>next
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 border-b border-t border-neutral-800 px-1.5 py-0.5 text-[9px] font-black tracking-wider text-neutral-900">
            <span className="text-[#C8232C]">&#9650;</span> by VISAKA
          </div>
        </div>
      )
    },
    {
      name: 'Ramco Hicem',
      category: 'Fibre Cement Boards',
      render: () => (
        <div className="flex flex-col items-start leading-none">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-[8px] font-black tracking-wider text-[#262262]">RAMCO</span>
              <div className="mt-0.5 grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <span key={i} className="h-1 w-2 rounded-[1px] bg-[#669933]" />
                ))}
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight text-[#322C7A]">HICEM</span>
          </div>
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#322C7A]">Fibre Cement Board</span>
        </div>
      )
    },
    {
      name: 'Ramco Hilux',
      category: 'Calcium Silicate Dry Walls & Ceilings',
      render: () => (
        <div className="flex flex-col items-start leading-none">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-[8px] font-black tracking-wider text-[#1B3664]">RAMCO</span>
              <div className="mt-0.5 grid grid-cols-4 gap-0.5">
                {[...Array(12)].map((_, i) => (
                  <span key={i} className="h-1 w-1.5 bg-[#1B3664]" />
                ))}
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight text-[#D4441C]">HILUX</span>
          </div>
          <span className="mt-1 text-[8px] font-bold tracking-wider text-[#D4441C]">
            CALCIUM SILICATE <span className="font-semibold text-neutral-800">Dry Walls &amp; Ceilings</span>
          </span>
        </div>
      )
    },
    {
      name: 'EcoPro',
      category: 'Multi-Use Fibre Cement Boards',
      render: () => (
        <div className="flex items-center gap-2.5">
          <div className="rounded-[2px] bg-[#182032] px-2.5 py-1.5 text-left font-mono text-xs font-bold leading-tight tracking-widest text-white">
            <div>ECO</div>
            <div>PRO</div>
          </div>
          <div className="text-left text-[9px] font-extrabold uppercase leading-tight tracking-wider text-[#182032]">
            <div>Multi-Use Fibre</div>
            <div>Cement Boards</div>
          </div>
        </div>
      )
    },
    {
      name: 'Sonali',
      category: 'Aluminium & Interior Hardware',
      render: () => (
        <div className="text-center">
          <div className="text-xl font-black uppercase tracking-[0.2em] text-[#08251C]">SONALI</div>
          <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#D49B35]">Premium Profiles</div>
        </div>
      )
    },
    {
      name: 'Eiti',
      category: 'Architectural Interior Solutions',
      render: () => (
        <div className="text-center">
          <div className="g28-serif text-2xl font-bold uppercase tracking-[0.22em] text-[#08251C]">EITI</div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-600">Interior Systems</div>
        </div>
      )
    },
    {
      name: 'Baydee',
      category: 'uPVC Profiles & Systems',
      render: () => (
        <div className="text-center">
          <div className="text-xl font-black uppercase tracking-[0.18em] text-[#1A4B8C]">BAYDEE</div>
          <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-600">uPVC Systems</div>
        </div>
      )
    },
    {
      name: 'Unicell',
      category: 'Ceiling & Partition Grids',
      render: () => (
        <div className="text-center">
          <div className="text-xl font-extrabold uppercase tracking-[0.16em] text-[#08251C]">UNICELL</div>
          <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D49B35]">Ceiling Grids</div>
        </div>
      )
    }
  ]
}

/* --------------------------------------------------------------------------
   THE VINAYAGA GROUP LEGACY
-------------------------------------------------------------------------- */
const GROUP = {
  heading: 'The Vinayaga Group Legacy',
  sub: 'G28 Interiors is not a standalone contractor. It is the turnkey execution arm of a family ecosystem that has supplied Coimbatore with building materials and aluminium systems for decades — which is exactly why our pricing and material authenticity are hard to match.',
  companies: [
    {
      icon: Store,
      name: 'Vinayaga Traders',
      role: 'Material Dealership',
      body:
        'Premier wholesale and retail dealers in false ceiling materials, fibre cement boards, particle boards, ladders, thermocol and grid sections.',
      points: ['False ceiling materials', 'Fibre cement & particle boards', 'Ladders, thermocol & grid sections'],
      accent: '#D49B35'
    },
    {
      icon: Layers,
      name: 'Vinayaga Aluminium Company',
      role: 'Aluminium Systems',
      body:
        'Specialists in architectural aluminium profiles, aluminium false ceiling sections, partition systems and hardware.',
      points: ['Architectural aluminium profiles', 'Aluminium false ceiling sections', 'Partition systems & hardware'],
      accent: '#E6C675'
    },
    {
      icon: Building2,
      name: 'G28 Interiors',
      role: 'Turnkey Execution & Design',
      body:
        'The turnkey interior execution and design arm — transforming residential, commercial, industrial and corporate spaces from concept to post-completion care.',
      points: ['Turnkey interior execution', 'Design & 3D visualisation', 'Post-completion care'],
      accent: '#D49B35'
    }
  ]
}

/* --------------------------------------------------------------------------
   FOUNDER'S STORY
-------------------------------------------------------------------------- */
const FOUNDER = {
  eyebrow: 'Founder\u2019s Story',
  heading: 'From building materials\nto complete interiors.',
  name: CONTACT.founder,
  role: 'Founder & Interior Consultant, G28 Interiors',
  quote:
    'We grew up around boards, profiles and ceiling sections. That is why we can promise material authenticity and factory-direct pricing that most interior firms simply cannot.',
  paragraphs: [
    'G28 Interiors was not started from a blank page. It was born out of a strong foundation in building materials and aluminium supply — built over decades through Vinayaga Traders and Vinayaga Aluminium Company in Coimbatore.',
    'Those two businesses taught us the fundamentals the hard way: what a genuine board feels like, which profile actually holds its line after five years, and how much of a project cost is pure middleman margin. We spent years supplying these materials to builders, contractors and other interior firms across the region.',
    'The turning point was simple. We kept watching beautifully drawn interiors get compromised on site — specifications quietly swapped, timelines slipping, and clients left to chase contractors. We had the material knowledge, the dealership relationships and the fabrication capability. What was missing was a firm that would take single-point accountability for the whole thing.',
    'So we built one. G28 Interiors is that turnkey interior execution and design arm — and it exists specifically so that material authenticity, factory-direct pricing and zero-compromise execution can sit inside one contract.',
    'Today we execute residential, commercial, industrial and corporate interiors across Coimbatore and beyond — from a single partition or a modular kitchen, to a complete corporate floorplate handed over on a locked date.'
  ],
  pillars: [
    { icon: ShieldCheck, title: 'Material Authenticity', body: 'Every board and profile is factory-sourced through our own dealerships — traceable, genuine, guaranteed.' },
    { icon: Gem, title: 'Factory-Direct Pricing', body: 'No middleman layer on materials, which means more of your budget goes into the space itself.' },
    { icon: Hammer, title: 'In-House Execution', body: 'Our own fabrication and installation teams. One accountable crew from first fix to final finish.' },
    { icon: Award, title: 'Turnkey Accountability', body: 'One contract, one point of contact, one promised handover date — across every sector we serve.' }
  ],
  stats: [
    { value: '3', label: 'Group Companies', sub: 'One ecosystem' },
    { value: '100', suffix: '%', label: 'Genuine Materials', sub: 'Factory-sourced' },
    { value: '8', label: 'Step Turnkey Process', sub: 'Concept to care' }
  ],
  cta: 'Book Consultation with Goutham',
  back: 'Back to Main Site'
}

/* --------------------------------------------------------------------------
   PROJECTS — 5 pillars
-------------------------------------------------------------------------- */
const PROJECTS = {
  heading: 'Work That Delivers Results',
  sub: 'A closer look at how we solve spatial problems, lift performance and hand over measurable outcomes — across every sector we serve.',
  filters: [
    { key: 'all', label: 'All — Turnkey Interiors' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'commercial', label: 'Commercial' },
    { key: 'industrial', label: 'Industrial' },
    { key: 'residential', label: 'Residential' }
  ],
  items: [
    {
      name: 'Apex Tech Hub',
      client: 'IT Corporate Office',
      service: 'Full Turnkey Corporate Fit-Out',
      area: '12,500 Sq. Ft.',
      cat: 'corporate',
      body:
        'A 320-seat technology floor delivered as a single turnkey contract — acoustic zoning for engineering pods, a glass-walled war room and a reception that reads as brand architecture.',
      image: IMG.office1,
      gallery: [IMG.office1, IMG.office3, IMG.meeting, IMG.lounge, IMG.office2]
    },
    {
      name: 'Vanguard Executive Suites',
      client: 'Financial Advisory Firm',
      service: 'Executive Cabins & Boardrooms',
      area: '4,200 Sq. Ft.',
      cat: 'corporate',
      body:
        'Nine partner cabins and two boardrooms detailed in walnut veneer, fluted glass and acoustic fabric — engineered so a confidential call never leaves the room.',
      image: IMG.suite1,
      gallery: [IMG.suite1, IMG.suite2, IMG.meeting, IMG.lounge]
    },
    {
      name: 'Aura Flagship Studio',
      client: 'Retail Showroom',
      service: 'Display Areas & Entrance Partitions',
      area: '6,800 Sq. Ft.',
      cat: 'commercial',
      body:
        'A double-height retail flagship where we rebuilt the lighting grid, sightlines and circulation so every product wall performs from the moment you walk in.',
      image: IMG.retail,
      gallery: [IMG.retail, IMG.lounge, IMG.office2, IMG.suite2]
    },
    {
      name: 'Harbour Café & Bistro',
      client: 'Hospitality',
      service: 'Theme Interiors & Acoustic Ceilings',
      area: '3,100 Sq. Ft.',
      cat: 'commercial',
      body:
        'A café interior built around acoustic baffle ceilings, custom banquette seating and a pergola-covered terrace that extended the usable floor by a third.',
      image: IMG.cafe,
      gallery: [IMG.cafe, IMG.cafe2, IMG.restaurant, IMG.lounge]
    },
    {
      name: 'Vertex Production Works',
      client: 'Manufacturing Plant',
      service: 'Industrial Cabins & Racks',
      area: '9,400 Sq. Ft.',
      cat: 'industrial',
      body:
        'Plant-floor offices, control cabins and heavy-duty racking in fibre cement and powder-coated steel — specified for dust, vibration and continuous shift use.',
      image: IMG.industrial,
      gallery: [IMG.industrial, IMG.factory, IMG.office2, IMG.office3]
    },
    {
      name: 'Orbit Industrial Partitions',
      client: 'Production Industry',
      service: 'Fibre Cement Partitions & Storage',
      area: '7,200 Sq. Ft.',
      cat: 'industrial',
      body:
        'Durable fibre cement partitions dividing production bays from inspection zones, with load-rated storage and a fully sealed ceiling grid.',
      image: IMG.factory,
      gallery: [IMG.factory, IMG.industrial, IMG.team, IMG.lounge]
    },
    {
      name: 'The Crest Residence',
      client: 'Private Luxury Villa',
      service: 'Bespoke Turnkey Interiors',
      area: '5,400 Sq. Ft.',
      cat: 'residential',
      body:
        'A four-bedroom villa executed end to end — modular kitchen, walk-in wardrobes, a home theatre and imported stone detailing, handed over ahead of schedule.',
      image: IMG.residence,
      gallery: [IMG.residence, IMG.villa, IMG.kitchen, IMG.suite1]
    },
    {
      name: 'Meridian Villa',
      client: 'Private Residence',
      service: 'Metal Stairs, Pergola & Elevation',
      area: '4,600 Sq. Ft.',
      cat: 'residential',
      body:
        'A bespoke metal staircase with toughened glass railing, an architectural pergola and a full facade elevation that changed the entire street presence.',
      image: IMG.villa,
      gallery: [IMG.villa, IMG.residence, IMG.kitchen, IMG.office2]
    }
  ]
}

/* --------------------------------------------------------------------------
   PACKAGES — transparent execution packages
-------------------------------------------------------------------------- */
const PACKAGES = {
  heading: 'Transparent Execution Packages',
  sub:
    'Clear scope, itemised BOQ, no hidden costs. Switch between a corporate fit-out and a full turnkey suite to compare exactly what is included.',
  toggle: { a: 'Corporate Fit-Out', b: 'Full Turnkey Suite' },
  plans: [
    {
      name: 'Essential Workspace',
      note: 'Ideal for startups & compact offices',
      price: { a: '1,850', b: '2,450' },
      unit: '/sq.ft',
      cta: 'Request a Quote',
      features: {
        a: ['Space planning & layout drawings', 'Modular workstations', 'False ceiling & lighting grid', 'Flooring & painting', 'Basic electrical & data points'],
        b: ['Everything in Corporate Fit-Out', 'Reception & lounge detailing', 'Meeting room acoustics', 'Custom storage & filing', 'Dedicated site supervision']
      }
    },
    {
      name: 'Executive Turnkey',
      note: 'Ideal for growing enterprises',
      price: { a: '2,650', b: '3,350' },
      unit: '/sq.ft',
      cta: 'Request a Quote',
      popular: true,
      features: {
        a: ['Complete turnkey execution', 'Custom executive cabins', 'Acoustic conference rooms', 'Photoreal 3D visualisation', 'Itemised BOQ & schedule'],
        b: ['Everything in Corporate Fit-Out', 'Glass & acoustic partitions', 'Boardroom AV & integration', 'Cafeteria & breakout zones', 'Dedicated project manager']
      }
    },
    {
      name: 'Bespoke Headquarters',
      note: 'Ideal for large floorplates & HQs',
      price: { a: '3,900', b: '4,750' },
      unit: '/sq.ft',
      cta: 'Request a Quote',
      features: {
        a: ['Unlimited scope & zones', 'Premium imported finishes', 'Designer gypsum ceilings', 'Custom furniture programme', 'Snagging, QC & warranty pack'],
        b: ['Everything in Corporate Fit-Out', 'Workplace automation & access', 'Landscape & facade coordination', 'Brand experience design', 'Post-completion support plan']
      }
    }
  ]
}

/* --------------------------------------------------------------------------
   FAQ — category tabs + accordions
-------------------------------------------------------------------------- */
const FAQ = {
  heading: 'Frequently Asked Question',
  sub: 'Straight answers on turnkey execution, timelines, budgets, materials and what happens after handover.',
  categories: ['General', 'Execution', 'Materials & Pricing', 'Handover & Support'],
  items: [
    {
      cat: 'General',
      q: 'What exactly does "turnkey interior execution" mean at G28?',
      a:
        'It means you sign one contract and deal with one team from the first site inspection to the day you receive the keys. We handle space planning, 3D visualisation, false ceiling, partitions, flooring, painting, electrical points, networking, custom joinery, furniture and final snagging — with a single point of accountability.'
    },
    {
      cat: 'General',
      q: 'Do you work outside Coimbatore?',
      a:
        'Yes. Coimbatore is our base and where our core teams operate, but we regularly execute projects across Tamil Nadu and into neighbouring states. For outstation sites we mobilise a dedicated site team and build a local logistics plan into the BOQ.'
    },
    {
      cat: 'Execution',
      q: 'How long does a complete turnkey interior take?',
      a:
        'A 3,000–6,000 sq.ft. office typically runs 8–10 weeks from approved drawings. A 10,000–20,000 sq.ft. floorplate runs 12–16 weeks. Residential villas usually run 12–20 weeks depending on metal work and joinery scope. We lock the programme into the contract and share weekly progress reports.'
    },
    {
      cat: 'Execution',
      q: 'Who actually executes the work on site?',
      a:
        'Our own in-house teams. We do not sub-contract the core scope out to unknown parties — the same crew handles false ceiling, partitions, woodwork, metal works and installation, under a dedicated site engineer. That is what keeps quality consistent and accountability in one place.'
    },
    {
      cat: 'Materials & Pricing',
      q: 'Why are your material prices better than other interior firms?',
      a:
        'Because we are backed by our own dealerships — Vinayaga Traders and Vinayaga Aluminium Company. Boards, profiles, ceiling sections and grid systems come to your site directly from the factory through our own supply chain, so there is no middleman margin layered on top of your project cost.'
    },
    {
      cat: 'Materials & Pricing',
      q: 'How do you prevent budget overruns during execution?',
      a:
        'You approve an itemised BOQ before work starts, listing exact brands, specifications and quantities. Any variation is priced and approved in writing before it is executed. The final invoice reconciles against the approved scope, not against a moving target.'
    },
    {
      cat: 'Handover & Support',
      q: 'What happens at handover?',
      a:
        'We run a joint snagging walkthrough with your team, rectify every item on the checklist, calibrate the lighting, deep-clean the site and hand over a documentation pack containing as-built drawings, warranty certificates and material guarantee records.'
    },
    {
      cat: 'Handover & Support',
      q: 'Is there support after we move in?',
      a:
        'Yes — it is step eight of our process. Every project carries a written workmanship warranty, and our team stays reachable for servicing, adjustments and future phases of expansion. Many clients return to us two or three years later for their next space.'
    }
  ]
}

const FORM = {
  heading: 'Project Inquiry',
  note: 'Share your space and we will respond within 24 working hours.',
  fields: [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your full name', required: true },
    { name: 'company', label: 'Company / Project Type', type: 'text', placeholder: 'e.g. Corporate Office' },
    { name: 'sqft', label: 'Approx. Sq. Ft.', type: 'text', placeholder: 'e.g. 4,500' },
    { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 00000 00000', required: true }
  ],
  message: { label: 'Message', placeholder: 'Tell us about the space, scope and timeline…' },
  submit: 'Submit Inquiry'
}

const FOOTER = {
  blurb:
    'G28 Interiors is the turnkey interior execution and design arm of the Vinayaga Group — delivering residential, commercial, industrial and corporate interiors across Coimbatore and beyond.',
  columns: [
    {
      title: 'Explore',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'Scope of Work', href: '#scope' },
        { label: 'Process', href: '#process' },
        { label: 'Projects', href: '#portfolio' },
        { label: 'Packages', href: '#packages' },
        { label: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Capability',
      links: [
        { label: 'Corporate Interiors', href: '#scope' },
        { label: 'Commercial Fit-Outs', href: '#scope' },
        { label: 'Industrial Interiors', href: '#industries' },
        { label: 'Residential Interiors', href: '#scope' },
        { label: 'Materials & Brands', href: '#materials' },
        { label: 'Group Companies', href: '#group' }
      ]
    }
  ],
  socials: [
    { label: 'WhatsApp', href: CONTACT.whatsapp },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Facebook', href: 'https://facebook.com' }
  ]
}

/* ==========================================================================
   4. SHARED SVG MOTIFS
   ========================================================================== */

/* isometric cube wireframe tile ------------------------------------------- */
const isoPattern = (stroke = '%23E6C675') =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='190' height='220'><g fill='none' stroke='${stroke}' stroke-width='1' stroke-linejoin='round'><path d='M95 20 L175 66 L95 112 L15 66 Z'/><path d='M95 20 L95 112'/><path d='M15 66 L15 158 L95 204 L175 158 L175 66'/><path d='M95 112 L95 204'/><path d='M52 44 L132 90 L132 150'/></g></svg>")`

/* ---------------------------------------------------------------------------
   G28 ROOF — the brand mark: angular gold roofline (short left cap → apex →
   right slope → vertical drop) with a pendant lamp hanging from the apex.
   Matches the identity exactly.
--------------------------------------------------------------------------- */
function G28Roof({ className = '', style, strokeWidth = 6, glow = true }) {
  return (
    <svg viewBox="0 0 100 130" fill="none" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id="g28RoofGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A87724" />
          <stop offset="38%" stopColor="#D49B35" />
          <stop offset="68%" stopColor="#F2E2BE" />
          <stop offset="100%" stopColor="#D49B35" />
        </linearGradient>
        <radialGradient id="g28RoofGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF6E2" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#E6C675" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D49B35" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* roofline */}
      <path
        d="M6 9 L24 9 L94 45 L94 122"
        stroke="url(#g28RoofGold)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* pendant cord from the apex */}
      <line x1="24" y1="9" x2="24" y2="58" stroke="#D49B35" strokeWidth={strokeWidth * 0.4} />

      {/* shade */}
      <path d="M10 60 L38 60 L44 78 L4 78 Z" fill="url(#g28RoofGold)" />
      <path d="M10 60 L38 60 L39 65 L9 65 Z" fill="#051812" opacity="0.28" />

      {/* bulb + warm glow */}
      {glow && <circle cx="24" cy="84" r="15" fill="url(#g28RoofGlow)" opacity="0.85" />}
      <circle cx="24" cy="84" r="4.4" fill="#F2E2BE" />
    </svg>
  )
}

/* square app-icon version of the mark (used where a tile is needed) -------- */
function G28Mark({ className = 'h-9 w-9', tone = 'dark' }) {
  const dark = tone === 'dark'
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-[22%] ${className}`}
      style={{ background: dark ? '#08251C' : '#FAF6F0' }}
    >
      <G28Roof className="h-[82%] w-[82%]" strokeWidth={7} />
    </span>
  )
}

/* full lockup — G28 with the roof over the "2" and — I N T E R I O R S — below */
function G28Logo({ tone = 'light', className = '', size = 30, showTagline = false }) {
  const cream = tone === 'light'
  const roofW = size * 0.94
  const roofH = roofW * 1.3
  const ruleW = size * 0.34
  const subSize = Math.max(8, Math.round(size * 0.3))

  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <span className="relative inline-block" style={{ fontSize: `${size}px` }}>
        <span
          className={`g28-serif block font-bold leading-[0.76] tracking-[0.01em] ${
            cream ? 'g28-gold-text' : 'text-[#08251C]'
          }`}
        >
          G28
        </span>
        <G28Roof
          className="pointer-events-none absolute"
          style={{ left: '57%', top: '-0.66em', width: `${roofW}px`, height: `${roofH}px` }}
          strokeWidth={5.5}
        />
      </span>

      <span className="mt-[5px] flex items-center gap-[6px]" style={{ fontSize: `${subSize}px` }}>
        <span className="block h-px" style={{ width: `${ruleW}px`, background: cream ? '#D49B35' : '#8F6218', opacity: 0.75 }} />
        <span
          className={`font-bold uppercase leading-none tracking-[0.3em] ${cream ? 'text-[#D49B35]' : 'text-[#8F6218]'}`}
        >
          Interiors
        </span>
        <span className="block h-px" style={{ width: `${ruleW}px`, background: cream ? '#D49B35' : '#8F6218', opacity: 0.75 }} />
      </span>

      {showTagline && (
        <span
          className={`mt-[6px] font-medium leading-none ${cream ? 'text-[#FAF6F0]/60' : 'text-[#5F6B64]'}`}
          style={{ fontSize: `${Math.max(8, Math.round(size * 0.28))}px` }}
        >
          Interior Execution &bull; Turnkey Solutions
        </span>
      )}
    </span>
  )
}

/* gold wireframe furniture line-art (armchair · plant · lamp) -------------- */
function WireframeFurniture({ className = '' }) {
  return (
    <svg viewBox="0 0 460 460" fill="none" className={className} aria-hidden="true">
      <g stroke="#E6C675" strokeWidth="1.15" fill="none" strokeLinecap="round">
        {/* rug */}
        <ellipse cx="230" cy="400" rx="170" ry="30" strokeDasharray="6 6" opacity=".55" />
        {/* armchair */}
        <path d="M96 268 H330" />
        <path d="M96 268 V328 H330 V268" />
        <path d="M96 328 L72 362 H354 L330 328" />
        <path d="M140 268 V222 H286 V268" />
        <path d="M140 222 L118 190 H308 L286 222" />
        <path d="M188 268 V328 M262 268 V328" />
        <path d="M96 296 H330" opacity=".5" />
        {/* cushion */}
        <path d="M150 232 H276 L262 262 H164 Z" opacity=".7" />
        {/* side table */}
        <path d="M356 352 H438 L420 410 H374 Z" />
        <ellipse cx="397" cy="348" rx="41" ry="11" />
        {/* pendant lamp */}
        <path d="M40 60 H150" />
        <path d="M95 60 V148" />
        <path d="M66 152 H124 L136 196 H54 Z" />
        <circle cx="95" cy="208" r="7" />
        <path d="M60 224 H130" opacity=".45" />
        <path d="M74 238 H116" opacity=".3" />
        {/* plant */}
        <path d="M404 300 H452 L446 362 H410 Z" />
        <path d="M428 300 V246" />
        <path d="M428 268 C404 258 396 234 404 214 C424 224 432 248 428 268 Z" />
        <path d="M428 282 C452 274 462 250 456 230 C434 238 424 260 428 282 Z" />
        <path d="M428 240 C418 220 424 198 440 190 C444 210 440 230 428 240 Z" opacity=".7" />
      </g>
    </svg>
  )
}

/* ==========================================================================
   5. ANIMATION PRIMITIVES
   ========================================================================== */

function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </Comp>
  )
}

function Stagger({ children, className = '', delay = 0, step = 0.08, y = 28 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } }}
    >
      {React.Children.map(children, (child) =>
        child ? (
          <motion.div
            variants={{
              hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
              show: { opacity: 1, y: 0, transition: SPRING }
            }}
          >
            {child}
          </motion.div>
        ) : null
      )}
    </motion.div>
  )
}

/* animated stat number ----------------------------------------------------- */
function Counter({ to, suffix = '', prefix = '', duration = 1.9, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }
    let raf
    let start
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / (duration * 1000))
      setValue(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(value).toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

/* infinite marquee --------------------------------------------------------- */
function Marquee({ children, speed = 40, reverse = false, fade = true, className = '' }) {
  return (
    <div className={`${fade ? 'g28-fade-x' : ''} overflow-hidden ${className}`}>
      <div className={`g28-track ${reverse ? 'g28-track-rev' : ''}`} style={{ '--speed': `${speed}s` }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ---------- Framer-style button text roll ---------- */
const BTN_TONES = {
  gold: 'bg-gradient-to-r from-[#A87724] via-[#D49B35] to-[#E6C675] text-[#051812] hover:from-[#E6C675] hover:via-[#F2E2BE] hover:to-[#E6C675]',
  ink: 'bg-[#08251C] text-[#FAF6F0] hover:bg-[#0D3528]',
  ivory: 'bg-[#FAF6F0] text-[#08251C] hover:bg-white',
  ghostDark: 'border border-[#FAF6F0]/25 text-[#FAF6F0] hover:border-[#D49B35] hover:text-[#E6C675]',
  ghostLight: 'border border-[#08251C]/20 text-[#08251C] hover:border-[#08251C]/60'
}

function RollButton({ children, href = '#', tone = 'gold', className = '', onClick, type, as = 'a', icon = ArrowUpRight, ariaLabel }) {
  const Comp = as === 'button' ? motion.button : motion.a
  const extra = as === 'button' ? { type: type || 'button' } : { href }
  return (
    <Comp
      {...extra}
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING}
      className={`group inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] transition-colors duration-500 ${BTN_TONES[tone]} ${className}`}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-full block transition-transform duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full"
        >
          {children}
        </span>
      </span>
      {icon ? (
        <span className="relative block overflow-hidden">
          {React.createElement(icon, {
            className: 'h-3.5 w-3.5 shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
          })}
        </span>
      ) : null}
    </Comp>
  )
}

/* text-only roll link ------------------------------------------------------ */
function RollLink({ children, href = '#', className = '', tone = 'gold' }) {
  const colors = { gold: 'text-[#D49B35]', goldDeep: 'text-[#8F6218]', ink: 'text-[#08251C]', light: 'text-[#FAF6F0]' }
  return (
    <a href={href} className={`group inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.14em] ${colors[tone]} ${className}`}>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-full block transition-transform duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full"
        >
          {children}
        </span>
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

/* small uppercase tag ------------------------------------------------------ */
function Tag({ children, tone = 'dark', className = '' }) {
  const tones = {
    dark: 'bg-[#FAF6F0]/10 text-[#FAF6F0]/85 border-[#D49B35]/25',
    light: 'bg-[#08251C]/[0.06] text-[#08251C]/75 border-[#08251C]/10',
    gold: 'bg-[#D49B35]/15 text-[#D49B35] border-[#D49B35]/30'
  }
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

/* diagonal gold slash divider ----------------------------------------------
   `from` = colour of the section above, `to` = colour of the section below.
   Both halves are painted so the join is seamless regardless of page bg.   */
function Slash({ from = T.deep, to = T.ivory }) {
  const lightBelow = to === T.ivory || to === T.ivory2
  const clip = lightBelow
    ? 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' // fills BELOW the diagonal
    : 'polygon(0 0, 100% 0, 0 100%)' // fills ABOVE the diagonal
  return (
    <div aria-hidden="true" className="relative h-[6vw] min-h-[46px] w-full" style={{ background: from }}>
      <div className="absolute inset-0" style={{ background: to, clipPath: clip }} />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="0" y1="100" x2="100" y2="0" stroke={T.gold} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

/* Contact → Footer slash.
   The contact banner ends on a near-vertical diagonal at 38%, so this divider
   starts at 38% and lands on a full-width dark edge for a seamless join.   */
function FooterSlash() {
  return (
    <div aria-hidden="true" className="relative h-[7vw] min-h-[52px] w-full" style={{ background: T.ivory }}>
      <div className="absolute inset-0 bg-[#051812]" style={{ clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 100%)' }} />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="38" y1="0" x2="0" y2="100" stroke={T.gold} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

/* section heading block ---------------------------------------------------- */
function SectionHead({ tag, title, sub, tone = 'dark', align = 'left', className = '' }) {
  const dark = tone === 'dark'
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-[760px] text-center' : ''} ${className}`}>
      {tag && (
        <Reveal>
          <Tag tone={dark ? 'dark' : 'light'}>{tag}</Tag>
        </Reveal>
      )}
      {title && (
        <Reveal delay={0.06}>
          <h2
            className={`g28-serif mt-6 text-[34px] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[42px] lg:text-[52px] ${
              dark ? 'text-[#FAF6F0]' : 'text-[#08251C]'
            }`}
          >
            {title}
          </h2>
        </Reveal>
      )}
      {sub && (
        <Reveal delay={0.12}>
          <p className={`mt-5 max-w-[560px] text-[15px] font-medium leading-[1.65] ${dark ? 'text-[#B8B2A6]' : 'text-[#5F6B64]'}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* ==========================================================================
   5b. SPOTLIGHT + 3D TILT CARD
   Shared shell for the Hero KPI cards, Our Values cards and Packages cards.
   · cursor-tracking gold radial spotlight (useMotionTemplate, no re-renders)
   · 3D perspective micro-tilt (±4°) driven by springs
   · cursor-following border glow + animated top gold accent line
   ========================================================================== */

const jump = (mv, v) => {
  if (!mv) return
  if (typeof mv.jump === 'function') mv.jump(v)
  else mv.set(v)
}

function SpotlightTiltCard({
  children,
  className = '',
  radius = 'rounded-2xl',
  dark = true,
  maxTilt = 4,
  glow = 400,
  topLine = true,
  lift = 6,
  ...rest
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const px = useMotionValue(-999)
  const py = useMotionValue(-999)

  /* spring the normalised pointer position, then map it to degrees —
     the most stable way to drive a 3D tilt from the cursor */
  const smx = useSpring(mx, { stiffness: 260, damping: 20 })
  const smy = useSpring(my, { stiffness: 260, damping: 20 })
  const rotateX = useTransform(smy, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(smx, [0, 1], [-maxTilt, maxTilt])

  const spotlight = useMotionTemplate`radial-gradient(${glow}px circle at ${px}px ${py}px, ${
    dark ? 'rgba(212,155,53,0.17)' : 'rgba(212,155,53,0.14)'
  }, transparent 70%)`

  const borderGlow = useMotionTemplate`radial-gradient(300px circle at ${px}px ${py}px, rgba(230,198,117,0.95), transparent 70%)`

  function handleMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    px.set(x)
    py.set(y)
    if (reduce) return
    mx.set(x / r.width)
    my.set(y / r.height)
  }

  function handleLeave() {
    setHovered(false)
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 900
      }}
      whileHover={reduce ? undefined : { y: -lift }}
      transition={{ y: { duration: 0.35, ease: EASE } }}
      className={`group relative overflow-hidden ${radius} ${className}`}
      {...rest}
    >
      {/* cursor-tracking gold spotlight */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-10 ${radius}`}
        style={{ background: spotlight }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />

      {/* brighter border glow that hugs the cursor */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-20 ${radius}`}
        style={{
          padding: '1px',
          background: borderGlow,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
        animate={{ opacity: hovered ? 0.9 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />

      {/* animated top gold accent line */}
      {topLine && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 z-30 h-[2px] origin-left bg-gradient-to-r from-[#D49B35] via-[#E6C675] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        />
      )}

      <div className="relative z-[15] flex h-full flex-col">
        {typeof children === 'function' ? children({ hovered }) : children}
      </div>
    </motion.div>
  )
}

/* ==========================================================================
   5c. PENDULUM PHYSICS  —  shared pointer-impulse bus + damped pendulum
   One global listener broadcasts the horizontal pointer delta; every hanging
   object subscribes with its own response factor, so the group swings
   organically instead of in lockstep.
   ========================================================================== */

const impulseBus = new Set()

function usePointerImpulse() {
  useEffect(() => {
    let lastX = null
    const onMove = (e) => {
      const dx = lastX === null ? 0 : e.clientX - lastX
      lastX = e.clientX
      if (!dx || !impulseBus.size) return
      impulseBus.forEach((fn) => fn(dx))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}

/**
 * Damped pendulum. Pointer movement kicks angular velocity; "gravity"
 * (stiffness) pulls it back to rest and damping bleeds the energy off.
 * Returns a degrees MotionValue ready to drop into a rotate transform.
 */
function usePendulum({ response = 1, stiffness = 46, damping = 3.1, max = 11 } = {}) {
  const angle = useMotionValue(0)
  const vel = useRef(0)
  const reduce = useReducedMotion()

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const dt = Math.min(delta, 34) / 1000
    const a = angle.get()
    vel.current += (-stiffness * a - damping * vel.current) * dt
    let next = a + vel.current * dt
    if (next > max) {
      next = max
      vel.current *= 0.35
    } else if (next < -max) {
      next = -max
      vel.current *= 0.35
    }
    angle.set(next)
  })

  useEffect(() => {
    if (reduce) return
    const fn = (dx) => {
      vel.current += dx * response * 0.055
    }
    impulseBus.add(fn)
    return () => impulseBus.delete(fn)
  }, [response, reduce])

  return angle
}

/* ==========================================================================
   6. INTERACTIVE PENDANT LAMP
   The beam is a cone filled with a VERTICAL linear gradient (so it falls off
   with distance instead of reading as a glowing box), layered three deep for
   soft edges, and it rotates with the shade so the light always points where
   the lamp points.
   ========================================================================== */

const LAMP_MOTES = [
  { x: 150, y: 300, r: 1.6, o: 0.55 },
  { x: 196, y: 330, r: 1.1, o: 0.4 },
  { x: 172, y: 356, r: 1.9, o: 0.5 },
  { x: 214, y: 288, r: 1.2, o: 0.35 },
  { x: 136, y: 344, r: 1.4, o: 0.45 },
  { x: 188, y: 392, r: 1, o: 0.3 },
  { x: 160, y: 262, r: 1.3, o: 0.4 }
]

function PendantLamp({ on, onToggle, className = '', compact = false }) {
  const reduce = useReducedMotion()
  const angle = usePendulum({ response: compact ? 0.7 : 1.15, stiffness: 46, damping: 3.1, max: compact ? 8 : 10 })

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={on ? 'Turn off ambient lighting' : 'Turn on ambient lighting'}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING}
      className={`group cursor-pointer bg-transparent p-0 ${className}`}
    >
      <svg viewBox={compact ? '0 0 360 300' : '0 0 360 470'} fill="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="lampGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A87724" />
            <stop offset="40%" stopColor="#D49B35" />
            <stop offset="70%" stopColor="#F2E2BE" />
            <stop offset="100%" stopColor="#D49B35" />
          </linearGradient>

          {/* BEAM — vertical falloff, mapped to the cone's own bounding box */}
          <linearGradient id="beamFall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF6E2" stopOpacity="0.58" />
            <stop offset="16%" stopColor="#F2E2BE" stopOpacity="0.3" />
            <stop offset="46%" stopColor="#E6C675" stopOpacity="0.13" />
            <stop offset="76%" stopColor="#D49B35" stopOpacity="0.045" />
            <stop offset="100%" stopColor="#D49B35" stopOpacity="0" />
          </linearGradient>

          {/* light pool where the beam meets a surface — radial is correct here */}
          <radialGradient id="poolGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F2E2BE" stopOpacity="0.42" />
            <stop offset="52%" stopColor="#E6C675" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#D49B35" stopOpacity="0" />
          </radialGradient>

          {/* tight bulb halo */}
          <radialGradient id="bulbHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF6E2" stopOpacity="0.95" />
            <stop offset="38%" stopColor="#E6C675" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#D49B35" stopOpacity="0" />
          </radialGradient>

          <filter id="beamSoft" x="-45%" y="-12%" width="190%" height="130%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="beamSoft2" x="-30%" y="-8%" width="160%" height="120%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* roofline (static) */}
        <path d="M18 86 L180 12 L342 86" stroke="url(#lampGold)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M56 102 L180 44 L304 102" stroke="#D49B35" strokeWidth="1" opacity="0.32" />
        <line x1="70" y1="94" x2="70" y2="112" stroke="#D49B35" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="94" x2="290" y2="112" stroke="#D49B35" strokeWidth="1" opacity="0.5" />

        {/* everything below hangs from the roof apex and swings as one pendulum */}
        <motion.g
          style={
            reduce
              ? undefined
              : { rotate: angle, transformOrigin: '180px 12px', transformBox: 'view-box' }
          }
        >
          {/* cord */}
          <line x1="180" y1="12" x2="180" y2="196" stroke="#D49B35" strokeWidth="1.6" />

          {/* --- light: three nested cones + pool, all pointing down the cord --- */}
          {!compact && (
            <g style={{ opacity: on ? 1 : 0, transition: 'opacity 900ms cubic-bezier(.22,1,.36,1)' }}>
              <path d="M112 250 L248 250 L330 452 L30 452 Z" fill="url(#beamFall)" filter="url(#beamSoft)" />
              <path d="M132 250 L228 250 L292 452 L68 452 Z" fill="url(#beamFall)" filter="url(#beamSoft2)" opacity="0.85" />
              <path d="M156 250 L204 250 L226 452 L134 452 Z" fill="url(#beamFall)" opacity="0.6" />
              <ellipse cx="180" cy="446" rx="156" ry="30" fill="url(#poolGrad)" />
            </g>
          )}

          {/* ceiling rose */}
          <ellipse cx="180" cy="200" rx="16" ry="5" fill="#E6C675" opacity="0.3" />

          {/* shade */}
          <path d="M152 202 L208 202 L224 252 L136 252 Z" fill="url(#lampGold)" />
          <path d="M152 202 L208 202 L212 214 L148 214 Z" fill="#051812" opacity="0.32" />
          <path d="M136 252 L224 252 L224 256 L136 256 Z" fill="#051812" opacity="0.22" />

          {/* bulb + tight halo */}
          <circle cx="180" cy="262" r="7" fill="#F2E2BE" style={{ opacity: on ? 1 : 0.42, transition: 'opacity 700ms ease' }} />
          <circle cx="180" cy="262" r="46" fill="url(#bulbHalo)" style={{ opacity: on ? 0.95 : 0.18, transition: 'opacity 900ms ease' }} />

          {/* dust motes drifting in the beam */}
          {!compact &&
            on &&
            LAMP_MOTES.map((m, i) => (
              <circle
                key={i}
                cx={m.x}
                cy={m.y}
                r={m.r}
                fill="#F2E2BE"
                opacity={m.o}
                className="g28-mote"
                style={{ animationDelay: `${i * 0.8}s`, animationDuration: `${5.5 + (i % 4)}s` }}
              />
            ))}
        </motion.g>
      </svg>

      <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D49B35]/35 bg-[#051812]/85 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#E6C675] opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
        {on ? 'Lights on' : 'Lights off'}
      </span>
    </motion.button>
  )
}

/* ==========================================================================
   6b. OBJECTS HANGING FROM THE NAVBAR
   Each one is a real pendulum: pointer movement sets them swinging, and each
   has its own response factor so the group never moves in lockstep.
   ========================================================================== */

function HangingLamp({ on, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={on ? 'Turn off ambient lighting' : 'Turn on ambient lighting'}
      className="group pointer-events-auto relative block"
    >
      <svg viewBox="0 0 44 96" fill="none" className="h-[62px] w-8 overflow-visible">
        <defs>
          <linearGradient id="navBrass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A87724" />
            <stop offset="45%" stopColor="#D49B35" />
            <stop offset="72%" stopColor="#F2E2BE" />
            <stop offset="100%" stopColor="#D49B35" />
          </linearGradient>
          <radialGradient id="navBulb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF6E2" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#E6C675" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D49B35" stopOpacity="0" />
          </radialGradient>
        </defs>

        <line x1="22" y1="0" x2="22" y2="42" stroke="#D49B35" strokeWidth="1.1" />
        <ellipse cx="22" cy="44" rx="7" ry="2" fill="#E6C675" opacity="0.4" />
        <path d="M10 46 L34 46 L39 66 L5 66 Z" fill="url(#navBrass)" />
        <path d="M10 46 L34 46 L35 52 L9 52 Z" fill="#051812" opacity="0.3" />
        <circle cx="22" cy="72" r="3.6" fill="#F2E2BE" style={{ opacity: on ? 1 : 0.4, transition: 'opacity 600ms ease' }} />
        <circle cx="22" cy="72" r="17" fill="url(#navBulb)" style={{ opacity: on ? 0.95 : 0, transition: 'opacity 700ms ease' }} />
      </svg>

      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D49B35]/40 bg-[#051812]/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E6C675] opacity-0 backdrop-blur transition-opacity duration-400 group-hover:opacity-100">
        {on ? 'Lights on' : 'Lights off'}
      </span>
    </button>
  )
}

function PlumbBob() {
  const [spin, setSpin] = useState(false)
  return (
    <div
      onMouseEnter={() => setSpin(true)}
      onMouseLeave={() => setSpin(false)}
      className="group pointer-events-auto relative cursor-pointer"
      title="Precision execution"
    >
      <svg viewBox="0 0 44 104" fill="none" className="h-[62px] w-8 overflow-visible">
        <defs>
          <linearGradient id="plumbBrass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8F6218" />
            <stop offset="45%" stopColor="#D49B35" />
            <stop offset="75%" stopColor="#F2E2BE" />
            <stop offset="100%" stopColor="#A87724" />
          </linearGradient>
        </defs>
        <line x1="22" y1="0" x2="22" y2="40" stroke="#D49B35" strokeWidth="1.1" />
        <circle cx="22" cy="43" r="3" fill="#E6C675" />
        <motion.g
          animate={{ rotate: spin ? 360 : 0 }}
          transition={{ duration: 1.15, ease: [0.45, 0, 0.25, 1] }}
          style={{ transformOrigin: '22px 46px', transformBox: 'view-box' }}
        >
          <path d="M22 46 L33 72 L22 96 L11 72 Z" fill="url(#plumbBrass)" />
          <path d="M22 46 L33 72 L22 72 Z" fill="#F2E2BE" opacity="0.45" />
          <path d="M22 72 L11 72 L22 96 Z" fill="#051812" opacity="0.22" />
        </motion.g>
      </svg>

      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D49B35]/40 bg-[#051812]/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E6C675] opacity-0 backdrop-blur transition-opacity duration-400 group-hover:opacity-100">
        Precision
      </span>
    </div>
  )
}

function KeyRing() {
  const [jingle, setJingle] = useState(0)
  return (
    <div
      onMouseEnter={() => setJingle((n) => n + 1)}
      className="group pointer-events-auto relative cursor-pointer"
      title="Turnkey handover"
    >
      <svg viewBox="0 0 48 104" fill="none" className="h-[62px] w-9 overflow-visible">
        <defs>
          <linearGradient id="keyBrass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A87724" />
            <stop offset="50%" stopColor="#D49B35" />
            <stop offset="100%" stopColor="#F2E2BE" />
          </linearGradient>
        </defs>
        <line x1="24" y1="0" x2="24" y2="26" stroke="#D49B35" strokeWidth="1.1" />

        {/* the ring */}
        <circle cx="24" cy="32" r="6" fill="none" stroke="#E6C675" strokeWidth="1.6" />

        {/* keys — jingle on hover */}
        <motion.g
          key={jingle}
          animate={jingle ? { rotate: [0, 11, -8, 5, -2, 0] } : { rotate: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ transformOrigin: '24px 38px', transformBox: 'view-box' }}
        >
          <path d="M24 38 L24 78" stroke="#D49B35" strokeWidth="1.7" />
          <circle cx="24" cy="84" r="6" fill="none" stroke="#E6C675" strokeWidth="1.7" />
          <path d="M24 38 L37 66" stroke="#D49B35" strokeWidth="1.5" />
          <rect x="33" y="66" width="9" height="13" rx="1.6" fill="url(#keyBrass)" />
          <path d="M24 38 L11 62" stroke="#D49B35" strokeWidth="1.5" />
          <circle cx="11" cy="67" r="4.6" fill="none" stroke="#E6C675" strokeWidth="1.5" />
        </motion.g>
      </svg>

      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D49B35]/40 bg-[#051812]/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E6C675] opacity-0 backdrop-blur transition-opacity duration-400 group-hover:opacity-100">
        Turnkey handover
      </span>
    </div>
  )
}

/* ==========================================================================
   7. NAVBAR
   ========================================================================== */

function Navbar({ lampOn, toggleLamp, view, onNavigate }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /* three pendulums with different response + damping so the hanging objects
     swing as a loose group rather than a rigid bar */
  const navSwayA = usePendulum({ response: 1.5, stiffness: 52, damping: 2.6, max: 15 })
  const navSwayB = usePendulum({ response: 1.1, stiffness: 40, damping: 2.2, max: 18 })
  const navSwayC = usePendulum({ response: 0.85, stiffness: 34, damping: 1.9, max: 20 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6">
          <div
            className={`relative flex items-center gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 lg:px-7 ${
              scrolled
                ? 'border border-[#D49B35]/25 bg-[#051812]/85 shadow-[0_24px_60px_-34px_rgba(0,0,0,.95)] backdrop-blur-xl'
                : 'border border-transparent bg-transparent'
            }`}
          >
            {/* ---------- objects hanging from the bar ----------
                Real pendulums: they react to pointer movement and each has its
                own response factor so they never swing in lockstep. */}
            <motion.div
              className="pointer-events-none absolute left-4 top-full hidden xl:block"
              style={{ rotate: navSwayA, transformOrigin: '50% 0%' }}
            >
              <HangingLamp on={lampOn} onToggle={toggleLamp} />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute right-24 top-full hidden xl:block"
              style={{ rotate: navSwayB, transformOrigin: '50% 0%' }}
            >
              <PlumbBob />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute right-10 top-full hidden xl:block"
              style={{ rotate: navSwayC, transformOrigin: '50% 0%' }}
            >
              <KeyRing />
            </motion.div>

            <a href="#top" className="shrink-0" onClick={() => onNavigate && onNavigate('main')}>
              <G28Logo size={scrolled ? 24 : 27} />
            </a>

            <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-9">
              {NAV.map((item) => {
                const isFounder = item.view === 'founder'
                const cls = `g28-underline relative whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 xl:text-[12.5px] ${
                  isFounder ? 'text-[#E6C675]' : 'text-[#FAF6F0]/70 hover:text-[#E6C675]'
                } ${item.tier === 2 ? 'hidden xl:inline-block' : ''}`
                return isFounder ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onNavigate && onNavigate('founder')}
                    className={`${cls} inline-flex items-center gap-2`}
                  >
                    {item.short || item.label}
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#D49B35] to-[#E6C675] px-2 py-[3px] text-[8px] font-bold leading-none tracking-[0.12em] text-[#051812]">
                      STORY
                    </span>
                  </button>
                ) : (
                  <a key={item.label} href={item.href} className={cls}>
                    {item.short || item.label}
                  </a>
                )
              })}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
              <a
                href={`tel:${CONTACT.tel[0]}`}
                className="hidden items-center gap-2 whitespace-nowrap text-[13px] font-semibold text-[#FAF6F0]/65 transition-colors hover:text-[#E6C675] 2xl:flex"
              >
                <Phone className="h-3.5 w-3.5 text-[#D49B35]" />
                {CONTACT.phones[0]}
              </a>

              <RollButton href="#contact" tone="gold" className="hidden !px-6 !py-3 sm:inline-flex" icon={null}>
                Start Your Project
              </RollButton>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#D49B35]/35 text-[#E6C675] transition-colors duration-300 hover:bg-[#D49B35] hover:text-[#051812] lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#051812]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="flex h-full flex-col">
              <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-5">
                <G28Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#FAF6F0]/20 text-[#FAF6F0] transition-colors hover:bg-[#FAF6F0]/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mx-auto grid w-full max-w-[1400px] flex-1 content-center gap-12 px-6 pb-12">
                <nav className="flex flex-col">
                  {NAV.map((item, i) => {
                    const isFounder = item.view === 'founder'
                    const handle = () => {
                      setOpen(false)
                      if (isFounder && onNavigate) onNavigate('founder')
                    }
                    return (
                      <motion.a
                        key={item.label}
                        href={isFounder ? '#founder' : item.href}
                        onClick={handle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...SPRING, delay: 0.06 + i * 0.05 }}
                        className={`group flex items-baseline justify-between border-b border-[#FAF6F0]/10 py-4 transition-colors ${
                          isFounder ? 'text-[#E6C675]' : 'text-[#FAF6F0] hover:text-[#E6C675]'
                        }`}
                      >
                        <span className="g28-serif flex items-center gap-3 text-[30px] font-bold leading-none sm:text-[40px]">
                          {item.label}
                          {isFounder && (
                            <span className="rounded-full bg-gradient-to-r from-[#D49B35] to-[#E6C675] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#051812]">
                              Story
                            </span>
                          )}
                        </span>
                        <span className="text-[12px] font-bold text-[#FAF6F0]/45">0{i + 1}</span>
                      </motion.a>
                    )
                  })}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...SPRING, delay: 0.34 }}
                  className="flex flex-col gap-5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF6F0]/55">{BRAND.tagline}</p>
                  <a href={`tel:${CONTACT.tel[0]}`} className="flex items-start gap-3 text-[#FAF6F0]/75 hover:text-[#E6C675]">
                    <Phone className="mt-0.5 h-4 w-4 text-[#D49B35]" />
                    <span className="text-[15px] font-semibold">
                      {CONTACT.phones[0]}
                      <br />
                      {CONTACT.phones[1]}
                    </span>
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 text-[#FAF6F0]/75 hover:text-[#E6C675]">
                    <Mail className="mt-0.5 h-4 w-4 text-[#D49B35]" />
                    <span className="break-all text-[15px] font-semibold">{CONTACT.email}</span>
                  </a>
                  <p className="flex items-start gap-3 text-[#FAF6F0]/50">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D49B35]" />
                    <span className="text-[14px] leading-relaxed">{CONTACT.address}</span>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ==========================================================================
   8. HERO  —  headline · split-frame showcase + lamp · KPI bento · ticker
   ========================================================================== */

function Hero({ lampOn, toggleLamp }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-[#051812] pt-32 pb-0 sm:pt-36">
      {/* isometric wireframe backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: isoPattern() }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,155,53,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,155,53,.5) 1px, transparent 1px)',
          backgroundSize: '92px 92px',
          opacity: 0.05,
          maskImage: 'radial-gradient(ellipse at 65% 30%, #000 8%, transparent 74%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 65% 30%, #000 8%, transparent 74%)'
        }}
      />

      {/* ambient spotlight — driven by the lamp toggle */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: lampOn ? 1 : 0.18 }}
        transition={{ duration: 1.1, ease: EASE }}
        style={{ background: 'radial-gradient(900px 620px at 76% 8%, rgba(230,198,117,.22), transparent 66%)' }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        {/* badge */}
        <Reveal>
          <Tag tone="gold" className="mb-9">
            <Sparkles className="h-3 w-3" />
            {HERO.badge}
          </Tag>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
          {/* ---------------- left: headline ---------------- */}
          <div>
            <h1 className="g28-serif font-bold tracking-[-0.03em] text-[#FAF6F0]">
              {HERO.headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={`block text-[38px] leading-[1.02] sm:text-[52px] lg:text-[60px] xl:text-[68px] ${
                      i === 1 ? 'g28-gold-text' : ''
                    }`}
                    initial={reduce ? false : { y: '112%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.05, delay: 0.12 + i * 0.1, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-8 max-w-[540px] text-[15px] font-medium leading-[1.7] text-[#B8B2A6] sm:text-[16px]"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.55 }}
            >
              {HERO.sub}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.68 }}
            >
              <RollButton href="#contact" tone="gold">
                {HERO.primaryCta}
              </RollButton>
              <RollButton href="#portfolio" tone="ghostDark">
                {HERO.secondaryCta}
              </RollButton>
            </motion.div>

            <motion.div
              className="mt-10 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF6F0]/60"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${lampOn ? 'bg-[#E6C675]' : 'bg-[#FAF6F0]/25'}`} />
              {lampOn ? HERO.lampOn : HERO.lampOff} — tap the lamp
            </motion.div>
          </div>

          {/* ---------------- right: split-frame showcase + lamp ---------------- */}
          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING, delay: 0.4 }}
          >
            <PendantLamp on={lampOn} onToggle={toggleLamp} className="absolute -top-12 left-1/2 z-20 h-[380px] -translate-x-1/2 sm:h-[460px]" />

            <div className="relative grid grid-cols-2 gap-3 pt-44 sm:pt-56">
              <div className="relative overflow-hidden rounded-[3px] border border-[#D49B35]/20">
                <motion.img
                  src={IMG.heroA}
                  alt="Premium corporate office interior executed by G28 Interiors"
                  style={{ y: imgY }}
                  className="h-[36vh] w-full object-cover sm:h-[44vh]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051812] via-transparent to-transparent" />
              </div>

              <div className="relative mt-10 overflow-hidden rounded-[3px] border border-[#D49B35]/20">
                <motion.img
                  src={IMG.heroB}
                  alt="Executive cabin and collaborative workspace detail"
                  style={{ y: imgY }}
                  className="h-[36vh] w-full object-cover sm:h-[44vh]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051812] via-transparent to-transparent" />
              </div>
            </div>

            {/* spotlight overlay on the frames */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              animate={{ opacity: lampOn ? 1 : 0 }}
              transition={{ duration: 1, ease: EASE }}
              style={{ background: 'radial-gradient(circle at 50% 6%, rgba(230,198,117,.4), transparent 58%)' }}
            />

            {/* floating capability badge */}
            <div className="absolute -left-3 bottom-6 z-20 max-w-[300px] rounded-2xl border border-[#D49B35]/30 bg-[#051812]/88 px-5 py-4 backdrop-blur-md sm:left-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#D49B35]" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E6C675]">
                    {HERO.showcaseBadge.line1}
                  </div>
                  <div className="mt-0.5 text-[12px] font-semibold text-[#FAF6F0]/90">
                    {HERO.showcaseBadge.line2}
                  </div>
                  <div className="mt-2 border-t border-[#FAF6F0]/12 pt-2 text-[9.5px] font-bold uppercase leading-[1.5] tracking-[0.1em] text-[#B8B2A6]">
                    {HERO.showcaseBadge.foot}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---------------- KPI bento bar ---------------- */}
        <Stagger className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-3" delay={0.2} step={0.1}>
          {HERO.kpis.map((kpi) => (
            <SpotlightTiltCard
              key={kpi.label}
              dark
              radius="rounded-2xl"
              className="h-full border border-[#FAF6F0]/[0.08] bg-[#0D3528]/55 p-7 sm:p-8"
            >
              {({ hovered }) => (
                <>
                  <div className="g28-serif text-[44px] font-bold leading-none text-[#FAF6F0] sm:text-[56px]">
                    {kpi.text ? (
                      <span className="g28-gold-text">{kpi.text}</span>
                    ) : (
                      <Counter to={kpi.value} suffix={kpi.suffix} className="g28-gold-text" />
                    )}
                  </div>
                  <div className="mt-4 text-[13px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/85">{kpi.label}</div>
                  <div className="mt-1.5 flex-1 text-[12px] font-medium text-[#B8B2A6]">{kpi.sub}</div>

                  {/* gold rail that draws on hover */}
                  <div className="relative mt-6 h-px w-full bg-[#FAF6F0]/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-[#D49B35] to-[#E6C675]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hovered ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{ width: '100%' }}
                    />
                  </div>
                </>
              )}
            </SpotlightTiltCard>
          ))}
        </Stagger>
      </div>

      {/* ---------------- infinite service ticker ---------------- */}
      <div className="relative mt-16 border-y border-[#FAF6F0]/10 bg-[#051812] py-4">
        <Marquee speed={32}>
          <div className="flex items-center">
            {HERO.marquee.map((item) => (
              <span key={item} className="flex items-center whitespace-nowrap">
                <span className="px-4 text-[15px] font-bold text-[#D49B35]">/</span>
                <span className="px-4 text-[14px] font-bold uppercase tracking-[0.16em] text-[#FAF6F0]/60">{item}</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  )
}

/* ==========================================================================
   9. CLIENTS
   ========================================================================== */

function Clients() {
  return (
    <section className="relative overflow-hidden bg-[#08251C] py-20 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: isoPattern() }} />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHead title={CLIENTS.heading} />
          <Reveal delay={0.1}>
            <p className="max-w-[560px] text-[15px] font-medium leading-[1.65] text-[#B8B2A6] lg:pb-2">{CLIENTS.sub}</p>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-14">
        <Marquee speed={46}>
          <div className="flex items-center">
            {CLIENTS.list.map((name) => (
              <div
                key={name}
                className="group mx-2.5 flex h-[92px] min-w-[230px] items-center justify-center rounded-2xl border border-[#FAF6F0]/[0.08] bg-[#0D3528]/40 px-8 transition-all duration-500 hover:border-[#D49B35]/50 hover:bg-[#0D3528]/80"
              >
                <span className="g28-serif text-[17px] font-bold uppercase tracking-[0.18em] text-[#FAF6F0]/55 transition-colors duration-500 group-hover:text-[#E6C675]">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  )
}

/* ==========================================================================
   10. PROCESS  —  warm ivory with diagonal gold entry
   ========================================================================== */

/* ---------- sticky stacking process card ---------- */
function StackCard({ step, index, total, progress, cardRef }) {
  const isLast = index === total - 1
  const start = isLast ? 1.2 : index / total
  const end = isLast ? 1.6 : (index + 1) / total

  const scale = useTransform(progress, [start, end], [1, 0.93])
  const y = useTransform(progress, [start, end], [0, -14])
  const opacity = useTransform(progress, [start, end], [1, 0.66])
  const boxShadow = useTransform(
    progress,
    [start, end],
    ['0px 18px 44px -34px rgba(8,37,28,0.42)', '0px 60px 96px -40px rgba(8,37,28,0.66)']
  )

  const Icon = step.icon

  return (
    <div
      ref={cardRef}
      className={`sticky ${isLast ? '' : 'mb-[13vh]'}`}
      style={{ top: `calc(5.5rem + ${index * 22}px)`, zIndex: index + 1 }}
    >
      <motion.article
        style={{ scale, y, opacity, boxShadow }}
        className="group relative overflow-hidden rounded-2xl border border-[#08251C]/[0.08] bg-[#F2ECE1] p-6 transition-colors duration-500 hover:border-[#D49B35]/50 hover:bg-white sm:p-8 sm:pl-[78px]"
      >
        <span className="absolute left-0 top-8 hidden h-[38px] w-[38px] place-items-center rounded-full border border-[#D49B35]/45 bg-[#FAF6F0] sm:grid">
          <Icon className="h-4 w-4 text-[#8F6218]" />
        </span>

        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[560px]">
            <div className="flex items-center gap-3 sm:hidden">
              <Icon className="h-4 w-4 text-[#8F6218]" />
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8F6218]">{step.no}</span>
            </div>
            <h3 className="g28-serif mt-2 text-[24px] font-bold leading-tight text-[#08251C] sm:mt-0 sm:text-[30px]">
              {step.title}
            </h3>
            <p className="mt-3.5 text-[14px] font-medium leading-[1.7] text-[#5F6B64]">{step.body}</p>

            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
              {step.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[13px] font-semibold text-[#08251C]/70">
                  <Check className="h-3.5 w-3.5 text-[#8F6218]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <span className="g28-watermark" data-num={step.no} />
        </div>
      </motion.article>
    </div>
  )
}

function Process() {
  const [active, setActive] = useState(0)
  const stackRef = useRef(null)
  const cardRefs = useRef([])
  const total = PROCESS.steps.length

  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start 30%', 'end 80%'] })

  /* Exact active-step detection: a card becomes "active" the moment its sticky
     wrapper reaches its own sticky offset, so the highlighted pill always
     matches the card sitting on top of the stack. Runs on scroll, on resize and
     on every scroll-progress tick so it can never fall out of sync. */
  const measure = useCallback(() => {
    let idx = 0
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      const stickTop = 88 + i * 22
      if (el.getBoundingClientRect().top <= stickTop + 6) idx = i
    })
    setActive((prev) => (prev === idx ? prev : idx))
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  useMotionValueEvent(scrollYProgress, 'change', measure)

  function goTo(i) {
    const el = cardRefs.current[i]
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - (88 + i * 22)
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section id="process" className="scroll-mt-24 bg-[#FAF6F0] pt-24 pb-24 sm:pt-28 sm:pb-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          {/* sticky head + auto-highlighting step pills */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead tag="How we work" title={PROCESS.heading} sub={PROCESS.sub} tone="light" />

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-2.5">
                {PROCESS.steps.map((step, i) => {
                  const isActive = active === i
                  return (
                    <button
                      key={step.no}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive}
                      className={`group flex items-center gap-4 rounded-full border px-4 py-3 text-left transition-all duration-500 ${
                        isActive
                          ? 'border-[#D49B35]/60 bg-[#08251C] shadow-[0_20px_40px_-26px_rgba(8,37,28,.85)]'
                          : 'border-[#08251C]/10 hover:border-[#D49B35]/45 hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <span className={`g28-serif text-[17px] font-bold leading-none transition-colors duration-500 ${isActive ? 'text-[#E6C675]' : 'text-[#8F6218]/65'}`}>
                        {step.no}
                      </span>
                      <span className={`text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-500 ${isActive ? 'text-[#FAF6F0]' : 'text-[#5F6B64]'}`}>
                        {step.title}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="proc-active-dot"
                          transition={SPRING}
                          className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[#E6C675]"
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </Reveal>
          </div>

          {/* sticky stacking cards */}
          <div ref={stackRef} className="relative">
            {PROCESS.steps.map((step, i) => (
              <StackCard
                key={step.no}
                step={step}
                index={i}
                total={total}
                progress={scrollYProgress}
                cardRef={(el) => (cardRefs.current[i] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   11. VALUES  —  3-column bento grid
   ========================================================================== */

function Values() {
  return (
    <section id="values" className="scroll-mt-24 bg-[#FAF6F0] pb-24 sm:pb-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead tag="What drives us" title={VALUES.heading} tone="light" className="max-w-[620px]" />
          <Reveal delay={0.1}>
            <p className="max-w-[420px] text-[15px] font-medium leading-[1.65] text-[#5F6B64] lg:pb-2">{VALUES.sub}</p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-4 lg:grid-cols-3" step={0.1}>
          {VALUES.items.map((v, i) => {
            const Icon = v.icon
            return (
              <SpotlightTiltCard
                key={v.title}
                dark={false}
                radius="rounded-2xl"
                className="h-full border border-[#08251C]/[0.07] bg-[#F2ECE1] p-8 sm:p-9"
              >
                {({ hovered }) => (
                  <>
                    <div className="flex items-start justify-between">
                      <motion.span
                        className="grid h-14 w-14 place-items-center rounded-full border border-[#D49B35]/40"
                        animate={{ backgroundColor: hovered ? '#D49B35' : '#FAF6F0' }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        <Icon className={`h-5 w-5 transition-colors duration-500 ${hovered ? 'text-[#051812]' : 'text-[#8F6218]'}`} />
                      </motion.span>

                      {/* floating metallic watermark numeral (pseudo-element) */}
                      <span className="g28-watermark" data-num={`0${i + 1}`} />
                    </div>

                    <h3 className="g28-serif mt-8 text-[26px] font-bold leading-tight text-[#08251C] sm:text-[28px]">{v.title}</h3>
                    <p className="mt-4 flex-1 text-[14px] font-medium leading-[1.75] text-[#5F6B64]">{v.body}</p>

                    <div className="relative mt-8 h-px w-full bg-[#08251C]/10">
                      <motion.div
                        className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#D49B35] via-[#E6C675] to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hovered ? 1 : 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                      />
                    </div>

                    <span className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8F6218]">
                      <Award className="h-3.5 w-3.5" />
                      G28 Standard
                    </span>
                  </>
                )}
              </SpotlightTiltCard>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

/* ==========================================================================
   12. SCOPE OF WORKS  —  tabbed bento of spotlight tilt cards
   ========================================================================== */

function ScopeOfWork() {
  const [tab, setTab] = useState(SCOPE.tabs[0].key)
  const active = SCOPE.tabs.find((t) => t.key === tab) || SCOPE.tabs[0]
  const ActiveIcon = active.icon

  return (
    <section id="scope" className="relative scroll-mt-24 overflow-hidden bg-[#051812] py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: isoPattern() }} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[#D49B35]/10 blur-[150px]" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead tag="What we offer / Scope" title={SCOPE.heading} sub={SCOPE.sub} className="max-w-[620px]" />
          <Reveal delay={0.1}>
            <RollButton href="#contact" tone="gold" className="lg:mb-2">
              Start Your Project
            </RollButton>
          </Reveal>
        </div>

        {/* ---------------- tabs ---------------- */}
        <Reveal delay={0.14}>
          <div className="mt-11 inline-flex flex-wrap items-center gap-1 rounded-full border border-[#FAF6F0]/12 bg-[#0D3528]/50 p-1.5">
            {SCOPE.tabs.map((t) => {
              const Icon = t.icon
              const isActive = t.key === tab
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`relative inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-500 ${
                    isActive ? 'text-[#051812]' : 'text-[#FAF6F0]/65 hover:text-[#E6C675]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="scope-pill"
                      transition={SPRING}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D49B35] to-[#E6C675]"
                    />
                  )}
                  <Icon className="relative h-3.5 w-3.5" />
                  <span className="relative">{t.label}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* ---------------- panel ---------------- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#D49B35]/25 bg-[#0D3528]/40 p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D49B35]/40 text-[#E6C675]">
                <ActiveIcon className="h-4 w-4" />
              </span>
              <div>
                <h3 className="g28-serif text-[22px] font-bold text-[#FAF6F0]">{active.label}</h3>
                <p className="mt-1.5 max-w-[640px] text-[14px] font-medium leading-[1.7] text-[#B8B2A6]">{active.intro}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {active.items.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...SPRING, delay: 0.04 * i }}
                  >
                    <SpotlightTiltCard
                      dark
                      radius="rounded-2xl"
                      glow={360}
                      lift={5}
                      className="h-full border border-[#FAF6F0]/[0.08] bg-[#0D3528]/55 p-6"
                    >
                      {({ hovered }) => (
                        <>
                          <span className="grid h-12 w-12 place-items-center rounded-full border border-[#D49B35]/40 bg-[#051812]/60 transition-colors duration-500">
                            <Icon className={`h-5 w-5 transition-colors duration-500 ${hovered ? 'text-[#E6C675]' : 'text-[#D49B35]'}`} />
                          </span>

                          <h4 className="g28-serif mt-5 text-[20px] font-bold leading-tight text-[#FAF6F0]">{item.title}</h4>
                          <p className="mt-2.5 text-[13px] font-medium leading-[1.65] text-[#B8B2A6]">{item.body}</p>

                          <div className="relative mt-5 h-px w-full bg-[#FAF6F0]/10">
                            <motion.div
                              className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#D49B35] to-[#E6C675]"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: hovered ? 1 : 0 }}
                              transition={{ duration: 0.5, ease: EASE }}
                            />
                          </div>

                          <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                            {item.points.map((pt) => (
                              <li key={pt} className="flex items-start gap-2.5 text-[12px] font-medium leading-[1.5] text-[#FAF6F0]/70">
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D49B35]" />
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </SpotlightTiltCard>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ==========================================================================
   12b. INDUSTRIES WE WORK WITH  —  8-card interactive bento
   ========================================================================== */

function Industries() {
  return (
    <section id="industries" className="relative scroll-mt-24 overflow-hidden bg-[#08251C] py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: isoPattern() }} />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <SectionHead tag="Sectors we serve" title={INDUSTRIES.heading} sub={INDUSTRIES.sub} align="center" />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.07}>
          {INDUSTRIES.items.map((ind) => {
            const Icon = ind.icon
            return (
              <SpotlightTiltCard
                key={ind.title}
                dark
                radius="rounded-2xl"
                glow={340}
                lift={6}
                className="h-full border border-[#FAF6F0]/[0.08] bg-[#0D3528]/55 p-6"
              >
                {({ hovered }) => (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-[#D49B35]/40 bg-[#051812]/60">
                        <Icon className={`h-5 w-5 transition-colors duration-500 ${hovered ? 'text-[#E6C675]' : 'text-[#D49B35]'}`} />
                      </span>
                      <span aria-hidden="true" className="g28-serif text-[34px] font-bold leading-none text-[#FAF6F0]/10">
                        {String(INDUSTRIES.items.indexOf(ind) + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="g28-serif mt-5 text-[19px] font-bold leading-tight text-[#FAF6F0]">{ind.title}</h3>
                    <p className="mt-2.5 flex-1 text-[12.5px] font-medium leading-[1.65] text-[#B8B2A6]">{ind.body}</p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {ind.tags.map((tg) => (
                        <span key={tg} className="rounded-full border border-[#D49B35]/25 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#E6C675]/80">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </SpotlightTiltCard>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

/* ==========================================================================
   12c. MATERIALS & PRODUCTS WE USE  —  swatches + dealer specialties
   ========================================================================== */

function Materials({ items = MATERIALS.items, onOpen }) {
  return (
    <section id="materials" className="relative scroll-mt-24 overflow-hidden bg-[#FAF6F0] py-24 sm:py-28">
      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead tag="Materials & Products" title={MATERIALS.heading} sub={MATERIALS.sub} tone="light" className="max-w-[680px]" />
        </div>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" step={0.06}>
          {items.map((m) => {
            const Icon = resolveIcon(m.iconName || m.icon)
            return (
              <SpotlightTiltCard
                key={m.name}
                dark={false}
                radius="rounded-2xl"
                glow={340}
                lift={5}
                role="button"
                tabIndex={0}
                onClick={() => onOpen && onOpen(m)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onOpen && onOpen(m)
                  }
                }}
                className="h-full cursor-pointer overflow-hidden border border-[#08251C]/[0.07] bg-[#F2ECE1]"
              >
                {({ hovered }) => (
                  <>
                    {/* material swatch */}
                    <div className="relative h-[92px] w-full" style={{ background: m.swatch }}>
                      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.45)_0%,transparent_38%,rgba(0,0,0,.14)_100%)]" />
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#F2ECE1] to-transparent" />
                      <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/45 bg-white/25 backdrop-blur">
                        <Icon className="h-4 w-4" style={{ color: m.tone }} />
                      </span>
                      <span
                        className="absolute right-4 top-4 h-2 w-2 rounded-full transition-transform duration-500"
                        style={{ background: m.tone, transform: hovered ? 'scale(1.6)' : 'scale(1)' }}
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="g28-serif text-[20px] font-bold text-[#08251C]">{m.name}</h3>
                      <p className="mt-2.5 flex-1 text-[13px] font-medium leading-[1.65] text-[#5F6B64]">{m.body}</p>

                      <div className="relative mt-5 h-px w-full bg-[#08251C]/10">
                        <motion.div
                          className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#D49B35] to-[#E6C675]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: hovered ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                        />
                      </div>
                      <span className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8F6218]">Factory sourced</span>
                    </div>
                  </>
                )}
              </SpotlightTiltCard>
            )
          })}
        </Stagger>

        {/* specialised dealer supply */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-[#08251C]/[0.08] bg-[#F2ECE1] p-8 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[520px]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D49B35]/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F6218]">
                  <Package className="h-3 w-3" />
                  Dealer Specialities
                </span>
                <h3 className="g28-serif mt-5 text-[26px] font-bold leading-tight text-[#08251C] sm:text-[30px]">
                  {MATERIALS.specialtyHeading}
                </h3>
                <p className="mt-3 text-[14px] font-medium leading-[1.7] text-[#5F6B64]">{MATERIALS.specialtySub}</p>
              </div>

              <div className="flex flex-wrap gap-2 lg:max-w-[520px] lg:justify-end">
                {MATERIALS.specialty.map((sp, i) => (
                  <motion.span
                    key={sp}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={VIEWPORT}
                    transition={{ ...SPRING, delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                    className="rounded-full border border-[#08251C]/12 bg-[#FAF6F0] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#08251C]/75 transition-colors duration-400 hover:border-[#D49B35] hover:text-[#8F6218]"
                  >
                    {sp}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==========================================================================
   12d. BRANDS WE DEAL WITH  —  custom stylised logo marks
   ========================================================================== */

function Brands() {
  return (
    <section id="brands" className="relative scroll-mt-24 overflow-hidden bg-[#08251C] py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: isoPattern() }} />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[#D49B35]/10 blur-[150px]" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[620px]">
            <Reveal>
              <Tag tone="gold">
                <Sparkles className="h-3 w-3" />
                {BRANDS.badge}
              </Tag>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="g28-serif mt-6 text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-[#FAF6F0] sm:text-[42px] lg:text-[52px]">
                {BRANDS.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-[460px] text-[15px] font-medium leading-[1.65] text-[#B8B2A6] lg:pb-2">{BRANDS.sub}</p>
          </Reveal>
        </div>
      </div>

      {/* infinite brand name marquee */}
      <div className="relative mt-12 border-y border-[#FAF6F0]/10 py-5">
        <Marquee speed={40}>
          <div className="flex items-center">
            {BRANDS.marquee.map((b) => (
              <span key={b} className="flex items-center whitespace-nowrap">
                <span className="px-6 text-[13px] font-bold uppercase tracking-[0.2em] text-[#FAF6F0]/45">{b}</span>
                <span className="text-[#D49B35]">&#10022;</span>
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      {/* logo grid */}
      <div className="relative mx-auto mt-14 w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" step={0.05}>
          {BRANDS.items.map((brand) => (
            <SpotlightTiltCard
              key={brand.name}
              dark={false}
              radius="rounded-2xl"
              glow={320}
              lift={6}
              className="min-h-[152px] bg-white"
            >
              {({ hovered }) => (
                <div className="flex h-full flex-col justify-between p-6">
                  <div className="flex flex-1 items-center justify-center py-2">{brand.render()}</div>
                  <div className="flex items-center justify-between gap-3 border-t border-neutral-100 pt-3">
                    <span className="truncate text-[11px] text-neutral-500">{brand.category}</span>
                    <motion.span
                      className="shrink-0 text-[11px] font-bold text-[#D49B35]"
                      initial={false}
                      animate={{ opacity: hovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      &#10003; Genuine
                    </motion.span>
                  </div>
                </div>
              )}
            </SpotlightTiltCard>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ==========================================================================
   12e. GROUP OF COMPANIES  —  the Vinayaga Group legacy
   ========================================================================== */

function GroupCompanies() {
  return (
    <section id="group" className="relative scroll-mt-24 overflow-hidden bg-[#F2ECE1] py-24 sm:py-28">
      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <SectionHead tag="The ecosystem behind us" title={GROUP.heading} sub={GROUP.sub} tone="light" align="center" />

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-3" step={0.1}>
          {GROUP.companies.map((c, i) => {
            const Icon = c.icon
            return (
              <SpotlightTiltCard
                key={c.name}
                dark={i === 2}
                radius="rounded-2xl"
                glow={400}
                lift={7}
                className={`h-full border p-8 ${
                  i === 2 ? 'border-[#D49B35]/45 bg-[#08251C]' : 'border-[#08251C]/[0.08] bg-[#F2ECE1]'
                }`}
              >
                {({ hovered }) => (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-14 w-14 place-items-center rounded-full border transition-colors duration-500 ${
                          i === 2 ? 'border-[#D49B35]/45 bg-[#0D3528]' : 'border-[#D49B35]/40 bg-[#FAF6F0]'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${i === 2 ? 'text-[#E6C675]' : 'text-[#8F6218]'}`} />
                      </span>
                      <span
                        className="rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em]"
                        style={{ background: `${c.accent}22`, color: i === 2 ? '#E6C675' : '#8F6218' }}
                      >
                        {c.role}
                      </span>
                    </div>

                    <h3 className={`g28-serif mt-7 text-[26px] font-bold leading-tight ${i === 2 ? 'text-[#FAF6F0]' : 'text-[#08251C]'}`}>
                      {c.name}
                    </h3>
                    <p className={`mt-3.5 flex-1 text-[13.5px] font-medium leading-[1.75] ${i === 2 ? 'text-[#B8B2A6]' : 'text-[#5F6B64]'}`}>
                      {c.body}
                    </p>

                    <div className="relative mt-6 h-px w-full" style={{ background: i === 2 ? 'rgba(250,246,240,.12)' : 'rgba(8,37,28,.1)' }}>
                      <motion.div
                        className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#D49B35] to-[#E6C675]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hovered ? 1 : 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                      />
                    </div>

                    <ul className="mt-5 flex flex-col gap-2.5">
                      {c.points.map((p) => (
                        <li
                          key={p}
                          className={`flex items-start gap-2.5 text-[12.5px] font-medium leading-[1.55] ${i === 2 ? 'text-[#FAF6F0]/75' : 'text-[#08251C]/75'}`}
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D49B35]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </SpotlightTiltCard>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

/* ==========================================================================
   13. PROJECTS  —  filterable editorial case studies
   ========================================================================== */

/* ---------- portfolio card: clip reveal + magnetic gold badge ----------
   forwardRef is required: AnimatePresence mode="popLayout" must be able to
   attach a ref to its direct child in order to measure it.                */
const ProjectCard = React.forwardRef(function ProjectCard({ project, onOpen }, ref) {
  const reduce = useReducedMotion()
  const mediaRef = useRef(null)
  const [hover, setHover] = useState(false)

  const bx = useMotionValue(0)
  const by = useMotionValue(0)
  const sbx = useSpring(bx, { stiffness: 220, damping: 20, mass: 0.5 })
  const sby = useSpring(by, { stiffness: 220, damping: 20, mass: 0.5 })

  function handleMove(e) {
    const el = mediaRef.current
    if (!el || reduce) return
    const r = el.getBoundingClientRect()
    bx.set((e.clientX - (r.left + r.width / 2)) * 0.36)
    by.set((e.clientY - (r.top + r.height / 2)) * 0.36)
  }

  function handleLeave() {
    setHover(false)
    bx.set(0)
    by.set(0)
  }

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={() => onOpen && onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen && onOpen(project)
        }
      }}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={SPRING}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleLeave}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#08251C]/[0.07] bg-[#F2ECE1] transition-colors duration-500 hover:bg-white"
    >
      {/* media — clip-mask reveal on scroll + smooth zoom */}
      <motion.div
        ref={mediaRef}
        onMouseMove={handleMove}
        className="relative aspect-[16/10] overflow-hidden"
        initial={reduce ? false : { clipPath: 'inset(12% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={VIEWPORT}
        transition={{ duration: 0.95, ease: EASE }}
      >
        <img
          src={project.image}
          alt={`${project.name} — ${project.client}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051812]/75 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />

        <span className="absolute left-5 top-5 rounded-full border border-[#D49B35]/40 bg-[#051812]/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E6C675] backdrop-blur">
          {project.area}
        </span>

        {/* magnetic circular gold badge */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <motion.span
            style={{ x: sbx, y: sby }}
            animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.62 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="grid h-[116px] w-[116px] place-items-center rounded-full border border-[#F2E2BE]/70 bg-[#D49B35]/95 shadow-[0_34px_66px_-26px_rgba(212,155,53,.85)] backdrop-blur"
          >
            <span className="text-center text-[10px] font-bold uppercase leading-[1.45] tracking-[0.14em] text-[#051812]">
              View
              <br />
              Project
              <ArrowUpRight className="mx-auto mt-1 h-3.5 w-3.5" />
            </span>
          </motion.span>
        </div>
      </motion.div>

      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="g28-serif text-[26px] font-bold leading-tight text-[#08251C] sm:text-[30px]">{project.name}</h3>
          <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.14em] text-[#8F6218]">{project.client}</span>
        </div>

        <p className="mt-4 flex-1 text-[14px] font-medium leading-[1.75] text-[#5F6B64]">{project.body}</p>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#08251C]/[0.08] pt-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5F6B64]">{project.service}</span>

          <span className="relative inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8F6218]">
            View Project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
            <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-[#D49B35] to-[#E6C675] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
          </span>
        </div>
      </div>
    </motion.div>
  )
})

function Projects({ items = PROJECTS.items, onOpen }) {
  const [filter, setFilter] = useState('all')

  const visible = useMemo(
    () => items.filter((p) => filter === 'all' || p.cat === filter),
    [filter, items]
  )

  return (
    <section id="portfolio" className="scroll-mt-24 bg-[#FAF6F0] py-24 sm:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead tag="Selected work" title={PROJECTS.heading} sub={PROJECTS.sub} tone="light" className="max-w-[620px]" />
        </div>

        {/* filter tabs */}
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {PROJECTS.filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`relative rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-500 ${
                  filter === f.key ? 'text-[#FAF6F0]' : 'text-[#08251C]/70 hover:text-[#08251C]'
                }`}
              >
                {filter === f.key && (
                  <motion.span layoutId="pf-pill" className="absolute inset-0 rounded-full bg-[#08251C]" transition={SPRING} />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* cards */}
        <motion.div layout className="mt-10 grid gap-4 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.name} project={p} onOpen={onOpen} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/* ==========================================================================
   14. PACKAGES  —  estimator toggle + 3 tiers
   ========================================================================== */

/* ---------- package card: conic gold shimmer + slot-machine price ---------- */
const CONIC_GOLD =
  'conic-gradient(from 0deg, rgba(212,155,53,0) 0deg, rgba(212,155,53,0) 38deg, #A87724 68deg, #E6C675 86deg, #F2E2BE 96deg, #E6C675 106deg, #A87724 124deg, rgba(212,155,53,0) 154deg, rgba(212,155,53,0) 360deg)'

function PackageCard({ plan, mode }) {
  const popular = !!plan.popular

  return (
    <div className={`relative h-full rounded-[20px] ${popular ? 'p-[1.5px]' : ''}`}>
      {/* rotating conic gold border shimmer — featured card only */}
      {popular && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[220%] w-[220%]"
            style={{ x: '-50%', y: '-50%', background: CONIC_GOLD }}
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      <SpotlightTiltCard
        dark={popular}
        radius={popular ? 'rounded-[18.5px]' : 'rounded-2xl'}
        className={`relative z-10 h-full p-2 ${popular ? 'bg-[#08251C]' : 'bg-[#FAF6F0]'}`}
        topLine={!popular}
      >
        <div className={`flex min-h-[230px] flex-col justify-between rounded-[14px] p-6 ${popular ? 'bg-[#0D3528]' : 'bg-[#F2ECE1]'}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className={`g28-serif text-[24px] font-bold ${popular ? 'text-[#FAF6F0]' : 'text-[#08251C]'}`}>{plan.name}</h3>
              <p className={`mt-1.5 text-[12px] font-medium ${popular ? 'text-[#B8B2A6]' : 'text-[#5F6B64]'}`}>{plan.note}</p>
            </div>
            {popular && (
              <span className="shrink-0 rounded-full bg-gradient-to-r from-[#D49B35] to-[#E6C675] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#051812]">
                Popular
              </span>
            )}
          </div>

          <div className="mt-8">
            <div className="flex items-end gap-1.5">
              {/* slot-machine price roll */}
              <span className="relative block h-[42px] overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={mode}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.42, ease: EASE }}
                    className={`g28-serif absolute left-0 top-0 whitespace-nowrap text-[40px] font-bold leading-none ${
                      popular ? 'text-[#FAF6F0]' : 'text-[#08251C]'
                    }`}
                  >
                    ₹{plan.price[mode]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className={`pb-1 text-[13px] font-semibold ${popular ? 'text-[#B8B2A6]' : 'text-[#5F6B64]'}`}>{plan.unit}</span>
            </div>

            <RollButton
              href="#contact"
              tone={popular ? 'gold' : 'ink'}
              className="mt-6 w-full justify-center"
              icon={ArrowRight}
            >
              {plan.cta}
            </RollButton>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className={`text-[10px] font-bold uppercase tracking-[0.24em] ${popular ? 'text-[#D49B35]' : 'text-[#8F6218]'}`}>
            What&apos;s included
          </p>

          {/* checklist re-staggers on every toggle */}
          <motion.ul
            key={mode}
            className="mt-5 flex flex-1 flex-col gap-3.5"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.14 } } }}
          >
            {plan.features[mode].map((f) => (
              <motion.li
                key={f}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: SPRING }
                }}
                className="flex items-start gap-3"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D49B35]" />
                <span className={`text-[13px] font-medium leading-[1.55] ${popular ? 'text-[#FAF6F0]/75' : 'text-[#08251C]/75'}`}>
                  {f}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </SpotlightTiltCard>
    </div>
  )
}

function Packages() {
  const [mode, setMode] = useState('a')

  return (
    <section id="packages" className="scroll-mt-24 bg-[#F2ECE1] py-24 sm:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead tag="Transparent pricing" title={PACKAGES.heading} sub={PACKAGES.sub} tone="light" className="max-w-[640px]" />

          <Reveal delay={0.14}>
            <div className="inline-flex items-center gap-1 rounded-full border border-[#08251C]/10 bg-[#FAF6F0] p-1.5">
              {[
                { key: 'a', label: PACKAGES.toggle.a },
                { key: 'b', label: PACKAGES.toggle.b }
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setMode(opt.key)}
                  className={`relative rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-500 ${
                    mode === opt.key ? 'text-[#FAF6F0]' : 'text-[#08251C]/70 hover:text-[#08251C]'
                  }`}
                >
                  {mode === opt.key && (
                    <motion.span layoutId="pkg-pill" className="absolute inset-0 rounded-full bg-[#08251C]" transition={SPRING} />
                  )}
                  <span className="relative">{opt.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid items-stretch gap-4 lg:grid-cols-3" step={0.1}>
          {PACKAGES.plans.map((plan) => (
            <PackageCard key={plan.name} plan={plan} mode={mode} />
          ))}
        </Stagger>

        <Reveal delay={0.16}>
          <p className="mt-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5F6B64]">
            <Clock className="h-4 w-4 text-[#8F6218]" />
            Indicative rates — final pricing follows the itemised BOQ after the space audit.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ==========================================================================
   15. FAQ  —  category tabs + smooth accordions
   ========================================================================== */

function Faq() {
  const [cat, setCat] = useState(FAQ.categories[0])
  const [open, setOpen] = useState(0)

  const items = useMemo(() => FAQ.items.filter((i) => i.cat === cat), [cat])

  return (
    <section className="bg-[#FAF6F0] py-24 sm:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead tag="Answers" title={FAQ.heading} sub={FAQ.sub} tone="light" />

            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap gap-2">
                {FAQ.categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCat(c)
                      setOpen(0)
                    }}
                    className={`relative rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-500 ${
                      cat === c ? 'text-[#FAF6F0]' : 'text-[#08251C]/70 hover:text-[#08251C]'
                    }`}
                  >
                    {cat === c && (
                      <motion.span layoutId="faq-pill" className="absolute inset-0 rounded-full bg-[#08251C]" transition={SPRING} />
                    )}
                    <span className="relative">{c}</span>
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-10 flex items-center gap-4 rounded-2xl border border-[#08251C]/[0.08] bg-[#F2ECE1] p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#08251C]">
                  <MessageCircle className="h-4 w-4 text-[#E6C675]" />
                </span>
                <div>
                  <div className="text-[13px] font-bold text-[#08251C]">Still have a question?</div>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[12px] font-semibold text-[#8F6218] underline decoration-[#D49B35]/40 underline-offset-4">
                    Talk to our team on WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {items.map((item, i) => {
                  const isOpen = open === i
                  return (
                    <div key={item.q} className="border-t border-[#08251C]/[0.1] last:border-b">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span className={`g28-serif text-[20px] font-bold leading-snug transition-colors duration-500 sm:text-[23px] ${isOpen ? 'text-[#8F6218]' : 'text-[#08251C]'}`}>
                          {item.q}
                        </span>
                        <span
                          className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                            isOpen ? 'rotate-45 border-[#D49B35] bg-[#D49B35] text-[#051812]' : 'border-[#08251C]/15 text-[#08251C]/55'
                          }`}
                        >
                          <Plus className="h-4 w-4" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-[600px] pb-7 pr-4 text-[14px] font-medium leading-[1.8] text-[#5F6B64]">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   16. CONTACT  —  split-diagonal banner (flyer / business-card style)
   ========================================================================== */

function Contact({ lampOn, toggleLamp }) {
  const [state, setState] = useState({ status: 'idle', name: '' })

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const phone = String(data.get('phone') || '').trim()

    if (!name || !phone) {
      setState({ status: 'error', name })
      return
    }

    const text =
      `New Project Inquiry — G28 Interiors\n` +
      `Name: ${name}\n` +
      `Company / Project Type: ${data.get('company') || '—'}\n` +
      `Approx. Sq. Ft.: ${data.get('sqft') || '—'}\n` +
      `Phone: ${phone}\n` +
      `Message: ${data.get('message') || '—'}`

    setState({ status: 'sent', name })
    e.currentTarget.reset()
    window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-[#FAF6F0]">
      {/* diagonal emerald panel (desktop) */}
      <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
        <div
          className="absolute inset-y-0 right-0 w-[62%]"
          style={{ clipPath: 'polygon(6.5% 0, 100% 0, 100% 100%, 0 100%)', background: 'linear-gradient(152deg,#0D3528 0%, #051812 72%)' }}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="42" y1="0" x2="38" y2="100" stroke={T.gold} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: isoPattern() }} />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1400px] gap-14 px-5 py-24 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 lg:px-10 lg:py-28">
        {/* ---------------- left: ivory details ---------------- */}
        <div>
          <Reveal>
            <Tag tone="light">Get In Touch</Tag>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="g28-serif mt-7 text-[46px] font-bold leading-[0.98] tracking-[-0.03em] sm:text-[62px] lg:text-[72px]">
              <span className="block text-[#08251C]">Get In</span>
              <span className="g28-gold-text block">Touch</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.26em] text-[#8F6218]">
              For Interior Execution &amp; Turnkey Solutions
            </p>
          </Reveal>

          <div className="mt-11 flex flex-col gap-7">
            <Reveal delay={0.16}>
              <a href={`tel:${CONTACT.tel[0]}`} className="group flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#08251C]/15 transition-colors duration-500 group-hover:border-[#D49B35] group-hover:bg-[#D49B35]">
                  <Phone className="h-4 w-4 text-[#08251C] transition-colors duration-500 group-hover:text-[#051812]" />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.26em] text-[#5F6B64]">Phone</span>
                  <span className="mt-1.5 block text-[17px] font-bold text-[#08251C] transition-colors group-hover:text-[#8F6218]">
                    {CONTACT.phones[0]}
                  </span>
                  <span className="block text-[17px] font-bold text-[#08251C]/60">{CONTACT.phones[1]}</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.2}>
              <a href={`mailto:${CONTACT.email}`} className="group flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#08251C]/15 transition-colors duration-500 group-hover:border-[#D49B35] group-hover:bg-[#D49B35]">
                  <Mail className="h-4 w-4 text-[#08251C] transition-colors duration-500 group-hover:text-[#051812]" />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.26em] text-[#5F6B64]">Email</span>
                  <span className="mt-1.5 block break-all text-[17px] font-bold text-[#08251C] transition-colors group-hover:text-[#8F6218]">
                    {CONTACT.email}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#08251C]/15">
                  <MapPin className="h-4 w-4 text-[#08251C]" />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.26em] text-[#5F6B64]">Office Address</span>
                  <span className="mt-1.5 block max-w-[300px] text-[14px] font-medium leading-[1.7] text-[#08251C]/75">
                    {CONTACT.address}
                  </span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#08251C]/15">
                  <Users className="h-4 w-4 text-[#08251C]" />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.26em] text-[#5F6B64]">Founder</span>
                  <span className="mt-1.5 block g28-serif text-[22px] font-bold text-[#08251C]">{CONTACT.founder}</span>
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8F6218]">{CONTACT.founderRole}</span>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.32}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <RollButton href={CONTACT.whatsapp} tone="ink" icon={MessageCircle}>
                Chat on WhatsApp
              </RollButton>
              <RollLink href="#packages" tone="goldDeep">
                Compare Packages
              </RollLink>
            </div>
          </Reveal>
        </div>

        {/* ---------------- right: form + wireframe art ---------------- */}
        <div className="relative">
          <WireframeFurniture className="pointer-events-none absolute -right-6 -top-10 hidden h-[420px] w-[420px] opacity-[0.16] lg:block" />

          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-[#08251C]/[0.08] bg-[#08251C] p-6 sm:p-9 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="g28-serif text-[28px] font-bold text-[#FAF6F0]">{FORM.heading}</h3>
                  <p className="mt-2 text-[13px] font-medium text-[#B8B2A6]">{FORM.note}</p>
                </div>
                <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-[#D49B35]/35 sm:grid">
                  <ArrowUpRight className="h-4 w-4 text-[#D49B35]" />
                </span>
              </div>

              <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-6" noValidate>
                <div className="grid gap-6 sm:grid-cols-2">
                  {FORM.fields.slice(0, 2).map((f) => (
                    <Field key={f.name} {...f} />
                  ))}
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {FORM.fields.slice(2).map((f) => (
                    <Field key={f.name} {...f} />
                  ))}
                </div>

                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#D49B35]/85">{FORM.message.label}</span>
                  <textarea name="message" rows={3} placeholder={FORM.message.placeholder} className="g28-field mt-2 resize-none" />
                </label>

                <RollButton as="button" type="submit" tone="gold" className="mt-1 w-full justify-center" icon={ArrowRight}>
                  {FORM.submit}
                </RollButton>

                {state.status !== 'idle' && (
                  <p className={`flex items-center justify-center gap-2 text-center text-[13px] font-semibold ${state.status === 'error' ? 'text-[#E6C675]' : 'text-[#FAF6F0]/75'}`}>
                    {state.status === 'error' ? (
                      'Please share your name and phone number so we can reach you.'
                    ) : (
                      <>
                        <Check className="h-4 w-4 text-[#D49B35]" />
                        Thank you, {state.name}. Opening WhatsApp so we can respond immediately…
                      </>
                    )}
                  </p>
                )}
              </form>

              {/* lamp in the contact panel — shares the global toggle */}
              <div className="mt-10 flex items-center justify-between gap-6 border-t border-[#FAF6F0]/10 pt-8">
                <div className="flex items-center gap-4">
                  <PendantLamp on={lampOn} onToggle={toggleLamp} compact className="relative h-[140px] w-[124px] shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D49B35]">Ambient Lighting</div>
                    <div className="mt-1.5 max-w-[220px] text-[12px] font-medium leading-[1.6] text-[#B8B2A6]">
                      Tap the pendant to preview how calibrated lighting changes the mood of a finished floor.
                    </div>
                  </div>
                </div>
                <span className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-500 ${lampOn ? 'bg-[#E6C675]' : 'bg-[#FAF6F0]/25'}`} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ name, label, type, placeholder, required }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#D49B35]/85">
        {label}
        {required ? ' *' : ''}
      </span>
      <input name={name} type={type} required={required} placeholder={placeholder} className="g28-field mt-2" />
    </label>
  )
}

/* ==========================================================================
   17. FOOTER
   ========================================================================== */

function Footer({ onNavigate }) {
  return (
    <footer className="relative overflow-hidden bg-[#051812] pt-20 pb-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: isoPattern() }} />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <G28Logo />
            <p className="mt-6 max-w-[320px] text-[14px] font-medium leading-[1.75] text-[#B8B2A6]">{FOOTER.blurb}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {FOOTER.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#FAF6F0]/15 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/65 transition-colors duration-500 hover:border-[#D49B35] hover:text-[#E6C675]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#D49B35]">{col.title}</h3>
              <ul className="mt-6 flex flex-col gap-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[14px] font-medium text-[#FAF6F0]/60 transition-colors duration-300 hover:text-[#E6C675]">
                      {l.label}
                    </a>
                  </li>
                ))}
                {col.title === 'Explore' && (
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('founder')}
                      className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#E6C675] transition-colors duration-300 hover:text-[#F2E2BE]"
                    >
                      Founder&rsquo;s Story
                      <span className="rounded-full bg-gradient-to-r from-[#D49B35] to-[#E6C675] px-2 py-[3px] text-[8px] font-bold uppercase leading-none tracking-[0.12em] text-[#051812]">
                        Story
                      </span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#D49B35]">Studio</h3>
            <ul className="mt-6 flex flex-col gap-5">
              <li className="flex gap-3 text-[13px] font-medium leading-[1.7] text-[#FAF6F0]/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D49B35]" />
                {CONTACT.address}
              </li>
              {CONTACT.phones.map((p, i) => (
                <li key={p} className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D49B35]" />
                  <a href={`tel:${CONTACT.tel[i]}`} className="text-[13px] font-medium text-[#FAF6F0]/60 transition-colors hover:text-[#E6C675]">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#D49B35]" />
                <a href={`mailto:${CONTACT.email}`} className="break-all text-[13px] font-medium text-[#FAF6F0]/60 transition-colors hover:text-[#E6C675]">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-3 text-[13px] font-medium text-[#FAF6F0]/60">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D49B35]" />
                {CONTACT.founder} · {CONTACT.founderRole}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-[#FAF6F0]/15 to-transparent" />

        <div className="mt-7 flex flex-col items-center justify-between gap-4 text-[12px] font-medium text-[#FAF6F0]/55 sm:flex-row">
          <p>
            © {BRAND.year} {BRAND.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end">
            <span>
              {BRAND.tagline} · {BRAND.city}, Tamil Nadu
            </span>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('admin')}
              className="text-[12px] font-medium text-[#FAF6F0]/25 transition-colors duration-300 hover:text-[#E6C675]"
            >
              Admin
            </button>
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ==========================================================================
   18. FLOATING WHATSAPP
   ========================================================================== */

function WhatsAppFab() {
  return (
    <motion.a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with G28 Interiors on WhatsApp"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, ...SPRING }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="g28-pulse fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#08251C] shadow-[0_22px_48px_-18px_rgba(8,37,28,.95)]"
    >
      <span className="absolute inset-0 rounded-full border border-[#D49B35]/45" />
      <MessageCircle className="relative h-5 w-5 text-[#E6C675]" />
    </motion.a>
  )
}

/* ==========================================================================
   19. APP  —  composition + global ambient lighting
   ========================================================================== */

/* ==========================================================================
   19b. FOUNDER'S STORY  —  dedicated full page view
   ========================================================================== */

function FounderStory({ onBack, lampOn, toggleLamp }) {
  const reduce = useReducedMotion()

  return (
    <div className="relative min-h-screen bg-[#051812]">
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: isoPattern() }} />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: lampOn ? 1 : 0.2 }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ background: 'radial-gradient(900px 620px at 78% 4%, rgba(230,198,117,.22), transparent 66%)' }}
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
          <Reveal>
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#FAF6F0]/18 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF6F0]/70 transition-colors duration-400 hover:border-[#D49B35] hover:text-[#E6C675]"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform duration-400 group-hover:-translate-x-1" />
              {FOUNDER.back}
            </button>
          </Reveal>

          <div className="mt-12 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <Reveal delay={0.05}>
                <Tag tone="gold">
                  <Sparkles className="h-3 w-3" />
                  {FOUNDER.eyebrow}
                </Tag>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="g28-serif mt-7 text-[38px] font-bold leading-[1.04] tracking-[-0.03em] text-[#FAF6F0] sm:text-[52px] lg:text-[62px]">
                  {FOUNDER.heading.split('\n').map((line, i) => (
                    <span key={line} className="block overflow-hidden pb-[0.06em]">
                      <motion.span
                        className={`block ${i === 1 ? 'g28-gold-text' : ''}`}
                        initial={reduce ? false : { y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.15 + i * 0.1, ease: EASE }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-10 border-l-2 border-[#D49B35]/50 pl-6">
                  <p className="g28-serif text-[20px] font-semibold italic leading-[1.5] text-[#E6C675] sm:text-[24px]">
                    &ldquo;{FOUNDER.quote}&rdquo;
                  </p>
                  <div className="mt-5">
                    <div className="text-[15px] font-bold text-[#FAF6F0]">{FOUNDER.name}</div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B8B2A6]">{FOUNDER.role}</div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <RollButton href="#contact" tone="gold" onClick={onBack}>
                    {FOUNDER.cta}
                  </RollButton>
                  <RollButton href={CONTACT.whatsapp} tone="ghostDark" icon={MessageCircle}>
                    WhatsApp
                  </RollButton>
                </div>
              </Reveal>
            </div>

            {/* stats column */}
            <div className="flex flex-col gap-4">
              {FOUNDER.stats.map((s, i) => (
                <Reveal key={s.label} delay={0.15 + i * 0.08}>
                  <div className="rounded-2xl border border-[#FAF6F0]/[0.08] bg-[#0D3528]/55 p-7">
                    <div className="g28-serif text-[40px] font-bold leading-none text-[#E6C675]">
                      {s.suffix ? <Counter to={Number(s.value)} suffix={s.suffix} /> : s.value}
                    </div>
                    <div className="mt-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/85">{s.label}</div>
                    <div className="mt-1 text-[11px] font-medium text-[#B8B2A6]">{s.sub}</div>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.4}>
                <div className="flex items-center gap-4 rounded-2xl border border-[#D49B35]/30 bg-[#0D3528]/70 p-5">
                  <PendantLamp on={lampOn} onToggle={toggleLamp} compact className="relative h-[110px] w-[96px] shrink-0" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]">Ambient Lighting</div>
                    <div className="mt-1.5 text-[12px] font-medium leading-[1.6] text-[#B8B2A6]">
                      Tap the pendant to preview how calibrated lighting changes a finished floor.
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- narrative ---------------- */}
      <section className="relative bg-[#FAF6F0] py-20 sm:py-28">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.32fr_0.68fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <Tag tone="light">The Narrative</Tag>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="g28-serif mt-6 text-[30px] font-bold leading-[1.1] text-[#08251C] sm:text-[36px]">
                  Built on materials,
                  <br />
                  <span className="text-[#8F6218]">not on drawings alone.</span>
                </h2>
              </Reveal>
            </div>

            <div className="flex flex-col gap-6">
              {FOUNDER.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="max-w-[680px] text-[15px] font-medium leading-[1.85] text-[#5F6B64] sm:text-[16px]">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- pillars ---------------- */}
      <section className="relative bg-[#FAF6F0] pb-24 sm:pb-28">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
          <Reveal>
            <h2 className="g28-serif text-[30px] font-bold leading-tight text-[#08251C] sm:text-[38px]">
              What that foundation gives you
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.08}>
            {FOUNDER.pillars.map((p) => {
              const Icon = p.icon
              return (
                <SpotlightTiltCard
                  key={p.title}
                  dark={false}
                  radius="rounded-2xl"
                  glow={340}
                  lift={6}
                  className="h-full border border-[#08251C]/[0.07] bg-[#F2ECE1] p-7"
                >
                  {({ hovered }) => (
                    <>
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-[#D49B35]/40 bg-[#FAF6F0]">
                        <Icon className={`h-5 w-5 transition-colors duration-500 ${hovered ? 'text-[#D49B35]' : 'text-[#8F6218]'}`} />
                      </span>
                      <h3 className="g28-serif mt-6 text-[21px] font-bold leading-tight text-[#08251C]">{p.title}</h3>
                      <p className="mt-3 flex-1 text-[13px] font-medium leading-[1.7] text-[#5F6B64]">{p.body}</p>
                      <div className="relative mt-6 h-px w-full bg-[#08251C]/10">
                        <motion.div
                          className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#D49B35] to-[#E6C675]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: hovered ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                        />
                      </div>
                    </>
                  )}
                </SpotlightTiltCard>
              )
            })}
          </Stagger>
        </div>
      </section>

      {/* ---------------- group heritage strip ---------------- */}
      <section className="relative bg-[#08251C] py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: isoPattern() }} />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead tag="The Group" title="One family, three companies." sub={GROUP.sub} className="max-w-[620px]" />
            <Reveal delay={0.1}>
              <RollButton href="#group" tone="gold" onClick={onBack}>
                See Group Companies
              </RollButton>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid gap-4 lg:grid-cols-3" step={0.1}>
            {GROUP.companies.map((c) => {
              const Icon = c.icon
              return (
                <SpotlightTiltCard
                  key={c.name}
                  dark
                  radius="rounded-2xl"
                  glow={380}
                  lift={6}
                  className="h-full border border-[#FAF6F0]/[0.08] bg-[#0D3528]/55 p-7"
                >
                  {({ hovered }) => (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid h-12 w-12 place-items-center rounded-full border border-[#D49B35]/40 bg-[#051812]/60">
                          <Icon className={`h-5 w-5 transition-colors duration-500 ${hovered ? 'text-[#E6C675]' : 'text-[#D49B35]'}`} />
                        </span>
                        <span className="rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#E6C675]" style={{ background: `${c.accent}22` }}>
                          {c.role}
                        </span>
                      </div>
                      <h3 className="g28-serif mt-6 text-[22px] font-bold leading-tight text-[#FAF6F0]">{c.name}</h3>
                      <p className="mt-3 flex-1 text-[13px] font-medium leading-[1.7] text-[#B8B2A6]">{c.body}</p>
                    </>
                  )}
                </SpotlightTiltCard>
              )
            })}
          </Stagger>
        </div>
      </section>

      {/* ---------------- closing cta ---------------- */}
      <section className="relative overflow-hidden bg-[#051812] py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#D49B35]/18 blur-[150px]" />
        <div className="relative mx-auto max-w-[900px] px-5 text-center sm:px-6">
          <Reveal>
            <h2 className="g28-serif text-[32px] font-bold leading-[1.08] tracking-[-0.02em] text-[#FAF6F0] sm:text-[44px]">
              Let&apos;s build something that actually works.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[460px] text-[15px] font-medium leading-[1.7] text-[#B8B2A6]">
              Speak directly with {FOUNDER.name} about your space, your budget and your timeline.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <RollButton href="#contact" tone="gold" onClick={onBack}>
                {FOUNDER.cta}
              </RollButton>
              <RollButton href="#top" tone="ghostDark" onClick={onBack} icon={ArrowRight}>
                {FOUNDER.back}
              </RollButton>
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] font-medium text-[#B8B2A6]">
              <a href={`tel:${CONTACT.tel[0]}`} className="inline-flex items-center gap-2 transition-colors hover:text-[#E6C675]">
                <Phone className="h-3.5 w-3.5 text-[#D49B35]" />
                {CONTACT.phones[0]}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-[#E6C675]">
                <Mail className="h-3.5 w-3.5 text-[#D49B35]" />
                {CONTACT.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

/* ==========================================================================
   21. IMAGE HELPERS + DETAIL MODALS
   ========================================================================== */

/* Resize + compress a picked file so it can live in localStorage.
   Photos straight off a phone are 4–8 MB; this brings them to ~150–300 KB. */
function fileToDataUrl(file, maxW = 1500, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Not an image'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not decode image'))
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width)
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(img.width * scale))
        canvas.height = Math.max(1, Math.round(img.height * scale))
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

/* rough localStorage usage so the admin can see how much room is left */
function storageUsed() {
  try {
    let bytes = 0
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      bytes += (k.length + (localStorage.getItem(k) || '').length) * 2
    }
    return bytes
  } catch {
    return 0
  }
}
const fmtBytes = (b) => (b > 1024 * 1024 ? (b / (1024 * 1024)).toFixed(1) + ' MB' : Math.round(b / 1024) + ' KB')

const galleryOf = (p) => (p && p.gallery && p.gallery.length ? p.gallery : p && p.image ? [p.image] : [])

/* --------------------------------------------------------------------------
   IMAGE URL NORMALISER
   Share links from Drive/Dropbox point at a viewer page, not an image, so an
   <img> tag can never render them. This rewrites the common share formats into
   direct-image URLs. Applied on read (so existing saved links self-heal) and
   as you paste.
--------------------------------------------------------------------------- */
function normalizeImageUrl(raw) {
  const url = String(raw == null ? '' : raw).trim()
  if (!url) return ''

  // Google Drive:  /file/d/<id>/view  ·  open?id=<id>  ·  uc?id=<id>  ·  ?id=<id>
  if (/(drive|docs)\.google\.com/.test(url)) {
    const m =
      url.match(/\/file\/d\/([A-Za-z0-9_-]{10,})/) ||
      url.match(/\/d\/([A-Za-z0-9_-]{10,})/) ||
      url.match(/[?&]id=([A-Za-z0-9_-]{10,})/)
    if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1600`
  }

  // Dropbox: swap the download flag for the raw file
  if (/dropbox\.com/.test(url)) {
    return url.replace(/([?&])dl=[01]/, '$1raw=1').replace(/([?&])raw=1/, '$1raw=1')
  }

  return url
}

const isDriveShareLink = (u) => /(drive|docs)\.google\.com/.test(String(u || ''))

/* previews an image URL and reports whether it actually resolves */
function ImagePreview({ src, className = '', alt = '' }) {
  const [state, setState] = useState('idle')

  useEffect(() => {
    setState(src ? 'loading' : 'idle')
  }, [src])

  if (!src) {
    return (
      <span className={`grid place-items-center rounded-lg border border-dashed border-[#FAF6F0]/20 text-[9px] uppercase tracking-widest text-[#FAF6F0]/35 ${className}`}>
        None
      </span>
    )
  }

  return (
    <span className={`relative block overflow-hidden rounded-lg border border-[#FAF6F0]/12 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onLoad={() => setState('ok')}
        onError={() => setState('failed')}
      />
      {state === 'failed' && (
        <span className="absolute inset-0 grid place-items-center bg-[#051812]/92 px-2 text-center text-[9px] font-bold uppercase leading-tight tracking-widest text-[#E6C675]">
          Can&apos;t load
        </span>
      )}
      {state === 'loading' && (
        <span className="absolute inset-0 grid place-items-center bg-[#051812]/70 text-[9px] uppercase tracking-widest text-[#FAF6F0]/50">
          …
        </span>
      )}
    </span>
  )
}

/* --------------------------------------------------------------------------
   shared modal shell
--------------------------------------------------------------------------- */
function Modal({ children, onClose, className = '' }) {
  /* keep the latest handler in a ref so the effect runs once on mount and
     cleans up once on unmount — otherwise the body scroll lock is restored
     against a stale value on every re-render */
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-[#051812]/88 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99 }}
        transition={SPRING}
        className={`relative my-auto w-full rounded-2xl border border-[#D49B35]/25 bg-[#08251C] shadow-[0_60px_120px_-40px_rgba(0,0,0,.95)] ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/* --------------------------------------------------------------------------
   PROJECT MODAL — every image of a single project
--------------------------------------------------------------------------- */
function ProjectModal({ project, onClose }) {
  const gallery = galleryOf(project)
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const go = useCallback(
    (dir) => setActive((i) => (gallery.length ? (i + dir + gallery.length) % gallery.length : 0)),
    [gallery.length]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const catLabel = (PROJECT_CATS.find((c) => c.key === project.cat) || {}).label || project.cat

  return (
    <Modal onClose={onClose} className="max-w-[1180px]">
      {/* bar */}
      <div className="sticky top-0 z-10 flex items-center gap-4 rounded-t-2xl border-b border-[#FAF6F0]/10 bg-[#08251C]/95 px-5 py-4 backdrop-blur-xl sm:px-7">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="g28-serif truncate text-[20px] font-bold text-[#FAF6F0] sm:text-[24px]">{project.name}</h2>
            <span className="rounded-full border border-[#D49B35]/35 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#E6C675]">
              {catLabel}
            </span>
          </div>
          <p className="mt-1 truncate text-[12.5px] font-medium text-[#B8B2A6]">
            {project.client} &middot; {project.area}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#FAF6F0]/20 text-[#FAF6F0]/70 transition-colors hover:border-[#D49B35] hover:text-[#E6C675]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
        {/* ---------------- gallery ---------------- */}
        <div className="p-4 sm:p-6">
          {gallery.length ? (
            <>
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="group relative block w-full overflow-hidden rounded-xl border border-[#FAF6F0]/10"
                aria-label="Open full size"
              >
                <img
                  src={gallery[active]}
                  alt={`${project.name} — image ${active + 1}`}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-[#D49B35]/40 bg-[#051812]/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#E6C675] backdrop-blur">
                  {active + 1} / {gallery.length}
                </span>
                <span className="pointer-events-none absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-[#FAF6F0]/90 text-[#08251C] opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>

                {gallery.length > 1 && (
                  <>
                    <span
                      role="button"
                      tabIndex={-1}
                      onClick={(e) => {
                        e.stopPropagation()
                        go(-1)
                      }}
                      className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#FAF6F0]/25 bg-[#051812]/70 text-[#FAF6F0] backdrop-blur transition-colors hover:border-[#D49B35] hover:text-[#E6C675]"
                    >
                      <ArrowRight className="h-4 w-4 rotate-180" />
                    </span>
                    <span
                      role="button"
                      tabIndex={-1}
                      onClick={(e) => {
                        e.stopPropagation()
                        go(1)
                      }}
                      className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#FAF6F0]/25 bg-[#051812]/70 text-[#FAF6F0] backdrop-blur transition-colors hover:border-[#D49B35] hover:text-[#E6C675]"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </>
                )}
              </button>

              {/* thumbnails */}
              {gallery.length > 1 && (
                <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                  {gallery.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Image ${i + 1}`}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-all duration-400 ${
                        i === active ? 'border-[#D49B35] opacity-100' : 'border-[#FAF6F0]/12 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="grid aspect-[16/10] w-full place-items-center rounded-xl border border-[#FAF6F0]/10 text-[13px] text-[#FAF6F0]/40">
              No images added yet
            </div>
          )}
        </div>

        {/* ---------------- details ---------------- */}
        <div className="border-t border-[#FAF6F0]/10 p-5 sm:p-7 lg:border-l lg:border-t-0">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">Client</div>
              <div className="mt-1.5 text-[14px] font-semibold text-[#FAF6F0]">{project.client}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">Area</div>
              <div className="mt-1.5 text-[14px] font-semibold text-[#FAF6F0]">{project.area}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">Scope delivered</div>
            <div className="mt-1.5 text-[14px] font-semibold text-[#FAF6F0]">{project.service}</div>
          </div>

          <div className="mt-6 h-px w-full bg-gradient-to-r from-[#D49B35]/50 to-transparent" />

          <p className="mt-6 text-[14px] font-medium leading-[1.8] text-[#B8B2A6]">{project.body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <RollButton href="#contact" tone="gold" onClick={onClose} className="!px-6 !py-3">
              Start a project like this
            </RollButton>
            <RollButton href={CONTACT.whatsapp} tone="ghostDark" icon={MessageCircle} className="!px-6 !py-3">
              WhatsApp
            </RollButton>
          </div>
        </div>
      </div>

      {/* ---------------- full-screen lightbox ---------------- */}
      <AnimatePresence>
        {lightbox && gallery.length > 0 && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-[#051812]/97 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <img src={gallery[active]} alt="" className="max-h-[88vh] max-w-full rounded-lg object-contain" />
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-[#D49B35]/40 bg-[#051812]/85 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-[#E6C675]">
              {active + 1} / {gallery.length}
            </span>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-[#FAF6F0]/25 text-[#FAF6F0] transition-colors hover:border-[#D49B35] hover:text-[#E6C675]"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  )
}

/* --------------------------------------------------------------------------
   MATERIAL / PRODUCT MODAL
--------------------------------------------------------------------------- */
function MaterialModal({ material, onClose }) {
  const Icon = resolveIcon(material.iconName || material.icon)
  const specs = material.specs || []

  return (
    <Modal onClose={onClose} className="max-w-[900px]">
      <div className="sticky top-0 z-10 flex items-center gap-4 rounded-t-2xl border-b border-[#FAF6F0]/10 bg-[#08251C]/95 px-5 py-4 backdrop-blur-xl sm:px-7">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D49B35]/40 bg-[#051812]/60">
          <Icon className="h-4.5 w-4.5 text-[#E6C675]" />
        </span>
        <div className="min-w-0">
          <h2 className="g28-serif truncate text-[20px] font-bold text-[#FAF6F0] sm:text-[24px]">{material.name}</h2>
          <p className="mt-0.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#D49B35]/85">Factory sourced</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#FAF6F0]/20 text-[#FAF6F0]/70 transition-colors hover:border-[#D49B35] hover:text-[#E6C675]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-0 sm:grid-cols-[0.9fr_1.1fr]">
        <div className="p-4 sm:p-6">
          <div className="overflow-hidden rounded-xl border border-[#FAF6F0]/10">
            {material.image ? (
              <img src={material.image} alt={material.name} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="relative aspect-[4/3] w-full" style={{ background: material.swatch }}>
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.45)_0%,transparent_38%,rgba(0,0,0,.16)_100%)]" />
                <span
                  className="absolute bottom-4 left-4 h-2.5 w-2.5 rounded-full"
                  style={{ background: material.tone }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-[#FAF6F0]/10 p-5 sm:p-7 sm:border-l sm:border-t-0">
          <p className="text-[14px] font-medium leading-[1.8] text-[#B8B2A6]">{material.body}</p>

          {specs.length > 0 && (
            <>
              <div className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">Specifications</div>
              <ul className="mt-4 flex flex-col gap-3">
                {specs.map((sp) => (
                  <li key={sp} className="flex items-start gap-3 text-[13.5px] font-medium leading-[1.6] text-[#FAF6F0]/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D49B35]" />
                    {sp}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-7 h-px w-full bg-gradient-to-r from-[#D49B35]/50 to-transparent" />

          <div className="mt-6 flex flex-wrap gap-2">
            {['Saint-Gobain Gyproc', 'Knauf', 'Ramco', 'Vnext', 'EcoPro'].slice(0, 4).map((b) => (
              <span key={b} className="rounded-full border border-[#FAF6F0]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#FAF6F0]/55">
                {b}
              </span>
            ))}
          </div>

          <RollButton href="#contact" tone="gold" onClick={onClose} className="mt-7 w-full justify-center !px-6 !py-3">
            Enquire about {material.name}
          </RollButton>
        </div>
      </div>
    </Modal>
  )
}

/* ==========================================================================
   20. CONTENT STORE  —  editable copy for Work + Products
   --------------------------------------------------------------------------
   A static site has no server, so edits are held in localStorage on this
   device and layered over the defaults. Export/Import moves them between
   machines. This is a content-editing gate, not a multi-user CMS.
   ========================================================================== */

const STORE_KEY = 'g28.content.v1'
const PASS_KEY = 'g28.pass.v1'
const SESSION_KEY = 'g28.session.v1'

/* djb2 hash of the default passphrase — keeps it out of the bundle as plain text */
const DEFAULT_PASS_HASH = '733e4bb4'

const hashPass = (s) => {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = (((h << 5) + h) ^ s.charCodeAt(i)) >>> 0
  return h.toString(16)
}

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/* --------------------------------------------------------------------------
   SANITISERS
   Anything can end up in localStorage — an older schema, a hand-edited file,
   an import of the wrong JSON. Every stored record is normalised before it
   reaches a component, so bad data can never take the page down.
--------------------------------------------------------------------------- */
const CAT_KEYS = ['corporate', 'commercial', 'industrial', 'residential']
const str = (v, fallback = '') => (typeof v === 'string' ? v : v == null ? fallback : String(v))

const sanitizeProject = (p, i) => {
  if (!p || typeof p !== 'object' || Array.isArray(p)) return null
  return {
    name: str(p.name, `Project ${i + 1}`),
    client: str(p.client, 'Client'),
    service: str(p.service, 'Turnkey Interiors'),
    area: str(p.area, '—'),
    cat: CAT_KEYS.includes(p.cat) ? p.cat : 'corporate',
    body: str(p.body),
    image: normalizeImageUrl(str(p.image)),
    gallery: Array.isArray(p.gallery) ? p.gallery.filter((g) => typeof g === 'string' && g).map(normalizeImageUrl) : []
  }
}

const sanitizeMaterial = (m, i) => {
  if (!m || typeof m !== 'object' || Array.isArray(m)) return null
  return {
    name: str(m.name, `Product ${i + 1}`),
    body: str(m.body),
    swatch: str(m.swatch, 'linear-gradient(135deg,#D8DDE2,#F2F5F7 34%,#A8B0B8 68%,#E4E9ED)'),
    tone: str(m.tone, '#3A444C'),
    iconName: typeof m.iconName === 'string' && ICON_MAP[m.iconName] ? m.iconName : typeof m.icon === 'string' && ICON_MAP[m.icon] ? m.icon : 'Package',
    icon: typeof m.icon !== 'string' ? m.icon : undefined,
    image: typeof m.image === 'string' && m.image ? normalizeImageUrl(m.image) : null,
    specs: Array.isArray(m.specs) ? m.specs.filter((x) => typeof x === 'string' && x) : []
  }
}

/* only fall back to the built-in defaults when the stored value is not an
   array at all — an intentionally emptied list stays empty */
const normalizeCollection = (value, sanitize, fallback) =>
  Array.isArray(value) ? value.map(sanitize).filter(Boolean) : fallback

function useContent() {
  const [overrides, setOverrides] = useState(() => {
    const raw = readJSON(STORE_KEY, {})
    return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {}
  })

  const save = useCallback((next) => {
    setOverrides(next)
    writeJSON(STORE_KEY, next)
  }, [])

  const setCollection = useCallback(
    (key, items) => {
      const raw = readJSON(STORE_KEY, {})
      const base = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {}
      save({ ...base, [key]: items })
    },
    [save]
  )

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORE_KEY)
    } catch {}
    setOverrides({})
  }, [])

  return {
    projects: normalizeCollection(overrides.projects, sanitizeProject, PROJECTS.items),
    materials: normalizeCollection(overrides.materials, sanitizeMaterial, MATERIALS.items),
    isCustomised: Boolean(overrides.projects || overrides.materials),
    setCollection,
    reset
  }
}

/* icon registry so a stored icon *name* can be resolved back to a component */
const ICON_MAP = {
  Layers,
  Boxes,
  Frame,
  SquareStack,
  PanelsTopLeft,
  Blinds,
  Warehouse,
  Package,
  Gem,
  Ruler,
  Hammer,
  Wrench,
  Sofa,
  Table,
  Armchair,
  Lamp,
  Lightbulb,
  Building2,
  Home,
  Store
}
const resolveIcon = (icon, fallback = Package) =>
  typeof icon === 'string' ? ICON_MAP[icon] || fallback : icon || fallback

const PROJECT_CATS = [
  { key: 'corporate', label: 'Corporate' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'industrial', label: 'Industrial' },
  { key: 'residential', label: 'Residential' }
]

/* ==========================================================================
   20b. ADMIN LOGIN
   ========================================================================== */

function AdminLogin({ onAuth, onExit }) {
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setBusy(true)
    const stored = localStorage.getItem(PASS_KEY) || DEFAULT_PASS_HASH
    setTimeout(() => {
      if (hashPass(pass) === stored) {
        writeJSON(SESSION_KEY, { at: Date.now() })
        onAuth()
      } else {
        setErr('Incorrect passphrase. Try again.')
        setPass('')
      }
      setBusy(false)
    }, 220)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#051812] px-5 py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: isoPattern() }} />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[720px] -translate-x-1/2 rounded-full bg-[#D49B35]/18 blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, duration: 0.6 }}
        className="relative w-full max-w-[440px] rounded-2xl border border-[#D49B35]/25 bg-[#08251C]/80 p-8 backdrop-blur-xl sm:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <G28Logo size={30} />
          <div className="mt-7 text-[10px] font-bold uppercase tracking-[0.28em] text-[#D49B35]">Content Admin</div>
          <h1 className="g28-serif mt-3 text-[28px] font-bold leading-tight text-[#FAF6F0]">Sign in to edit</h1>
          <p className="mt-3 text-[13px] font-medium leading-[1.6] text-[#B8B2A6]">
            Manage the projects we deliver and the products we use.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 flex flex-col gap-5">
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D49B35]/85">Passphrase</span>
            <input
              type="password"
              value={pass}
              autoFocus
              onChange={(e) => {
                setPass(e.target.value)
                setErr('')
              }}
              placeholder="••••••••"
              className="g28-field mt-2"
            />
          </label>

          {err && <p className="text-[13px] font-semibold text-[#E6C675]">{err}</p>}

          <RollButton as="button" type="submit" tone="gold" className="w-full justify-center" icon={null}>
            {busy ? 'Checking…' : 'Sign In'}
          </RollButton>
        </form>

        <button
          type="button"
          onClick={onExit}
          className="mt-6 w-full text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF6F0]/45 transition-colors hover:text-[#E6C675]"
        >
          Back to site
        </button>
      </motion.div>
    </div>
  )
}

/* ==========================================================================
   20c. ADMIN PANEL
   ========================================================================== */

function AdminField({ label, value, onChange, placeholder, type = 'text', rows }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">{label}</span>
      {rows ? (
        <textarea
          rows={rows}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="g28-field mt-1.5 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="g28-field mt-1.5"
        />
      )}
    </label>
  )
}

/* --------------------------------------------------------------------------
   ADMIN IMAGE CONTROLS — pick from the device (auto-resized) or paste a URL
--------------------------------------------------------------------------- */
function ImagePicker({ label, value, onChange }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const onFile = async (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setBusy(true)
    setErr('')
    try {
      onChange(await fileToDataUrl(file))
    } catch {
      setErr('Could not read that file')
    }
    setBusy(false)
    e.target.value = ''
  }

  return (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">{label}</span>
      <div className="mt-2 flex items-start gap-3">
        <ImagePreview src={value} className="h-20 w-28 shrink-0" />

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label className="cursor-pointer rounded-full border border-[#D49B35]/45 px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#E6C675] transition-colors hover:bg-[#D49B35] hover:text-[#051812]">
            {busy ? 'Processing…' : 'Upload from device'}
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          </label>

          <input
            value={value && !String(value).startsWith('data:') ? value : ''}
            placeholder="…or paste an image URL (Drive share links work)"
            onChange={(e) => onChange(normalizeImageUrl(e.target.value))}
            className="g28-field !py-2 text-[12px]"
          />

          {isDriveShareLink(value) && (
            <span className="text-[10.5px] font-medium leading-snug text-[#B8B2A6]">
              Drive link converted to a direct image URL. Make sure the file is shared as
              <strong className="text-[#E6C675]"> “Anyone with the link”</strong>, otherwise it stays blank.
            </span>
          )}

          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="self-start text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/45 transition-colors hover:text-[#E6C675]"
            >
              Remove image
            </button>
          )}
          {err && <span className="text-[11px] font-semibold text-[#E6C675]">{err}</span>}
        </div>
      </div>
    </div>
  )
}

function GalleryEditor({ images = [], onChange }) {
  const [busy, setBusy] = useState(false)
  const [urlDraft, setUrlDraft] = useState('')

  const addFiles = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setBusy(true)
    const added = []
    for (const f of files) {
      try {
        added.push(await fileToDataUrl(f))
      } catch {}
    }
    onChange([...images, ...added])
    setBusy(false)
    e.target.value = ''
  }

  const remove = (i) => onChange(images.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= images.length) return
    const next = images.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div className="sm:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">
          Gallery — every image shown in the popup ({images.length})
        </span>
        <label className="cursor-pointer rounded-full border border-[#D49B35]/45 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#E6C675] transition-colors hover:bg-[#D49B35] hover:text-[#051812]">
          {busy ? 'Processing…' : '+ Add images'}
          <input type="file" accept="image/*" multiple onChange={addFiles} className="hidden" />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={urlDraft}
          placeholder="Paste an image URL or Drive share link, then press Add"
          onChange={(e) => setUrlDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && urlDraft.trim()) {
              e.preventDefault()
              onChange([...images, normalizeImageUrl(urlDraft)])
              setUrlDraft('')
            }
          }}
          className="g28-field !py-2 min-w-[220px] flex-1 text-[12px]"
        />
        <button
          type="button"
          onClick={() => {
            if (!urlDraft.trim()) return
            onChange([...images, normalizeImageUrl(urlDraft)])
            setUrlDraft('')
          }}
          className="rounded-full border border-[#FAF6F0]/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/70 transition-colors hover:border-[#D49B35] hover:text-[#E6C675]"
        >
          Add URL
        </button>
      </div>

      {images.length === 0 ? (
        <p className="mt-3 rounded-lg border border-dashed border-[#FAF6F0]/15 px-4 py-6 text-center text-[12px] text-[#FAF6F0]/40">
          No gallery images yet — the popup will fall back to the cover image.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => (
            <div key={`${i}-${src.slice(-16)}`} className="group relative overflow-hidden rounded-lg border border-[#FAF6F0]/12">
              <ImagePreview src={src} className="aspect-[4/3] w-full !rounded-none !border-0" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-[#051812]/85 px-2 py-1.5 backdrop-blur">
                <button type="button" onClick={() => move(i, -1)} aria-label="Move left" className="grid h-6 w-6 place-items-center rounded text-[#FAF6F0]/70 hover:text-[#E6C675]">
                  <ArrowRight className="h-3 w-3 rotate-180" />
                </button>
                <span className="text-[9px] font-bold text-[#FAF6F0]/50">{i + 1}</span>
                <button type="button" onClick={() => move(i, 1)} aria-label="Move right" className="grid h-6 w-6 place-items-center rounded text-[#FAF6F0]/70 hover:text-[#E6C675]">
                  <ArrowRight className="h-3 w-3" />
                </button>
                <button type="button" onClick={() => remove(i)} aria-label="Remove" className="grid h-6 w-6 place-items-center rounded text-[#FAF6F0]/60 hover:text-red-300">
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SpecsEditor({ specs = [], onChange }) {
  return (
    <div className="sm:col-span-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">Specifications ({specs.length})</span>
      <div className="mt-2 flex flex-col gap-2">
        {specs.map((sp, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={sp}
              onChange={(e) => {
                const next = specs.slice()
                next[i] = e.target.value
                onChange(next)
              }}
              className="g28-field !py-2 flex-1 text-[13px]"
            />
            <button
              type="button"
              onClick={() => onChange(specs.filter((_, idx) => idx !== i))}
              aria-label="Remove spec"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#FAF6F0]/15 text-[#FAF6F0]/50 transition-colors hover:border-red-400/60 hover:text-red-300"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...specs, ''])}
          className="self-start rounded-full border border-[#FAF6F0]/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/70 transition-colors hover:border-[#D49B35] hover:text-[#E6C675]"
        >
          + Add specification
        </button>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------------------
   PASSPHRASE CHANGER
   Lets the owner rotate the admin passphrase without editing code. The hash is
   stored in localStorage; the default lives in DEFAULT_PASS_HASH.
--------------------------------------------------------------------------- */
const scorePass = (p) => {
  let s = 0
  if (p.length >= 12) s++
  if (p.length >= 16) s++
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++
  if (/\d/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return Math.min(s, 4)
}
const STRENGTH = [
  { label: 'Too short', color: '#8A5A5A' },
  { label: 'Weak', color: '#B4552F' },
  { label: 'Fair', color: '#D49B35' },
  { label: 'Good', color: '#C9C25B' },
  { label: 'Strong', color: '#6FBF8B' }
]

function PassphraseChanger({ onClose }) {
  const [cur, setCur] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState(null)

  const usingCustom = Boolean(localStorage.getItem(PASS_KEY))
  const score = scorePass(next)

  const submit = (e) => {
    e.preventDefault()
    const stored = localStorage.getItem(PASS_KEY) || DEFAULT_PASS_HASH
    if (hashPass(cur) !== stored) {
      setMsg({ ok: false, t: 'Current passphrase is incorrect.' })
      return
    }
    if (next.length < 12) {
      setMsg({ ok: false, t: 'Use at least 12 characters.' })
      return
    }
    if (next !== confirm) {
      setMsg({ ok: false, t: 'The two new passphrases do not match.' })
      return
    }
    try {
      localStorage.setItem(PASS_KEY, hashPass(next))
    } catch {
      setMsg({ ok: false, t: 'Could not save — browser storage is unavailable.' })
      return
    }
    setMsg({ ok: true, t: 'Passphrase updated. Use it next time you sign in.' })
    setCur('')
    setNext('')
    setConfirm('')
  }

  const restore = () => {
    try {
      localStorage.removeItem(PASS_KEY)
    } catch {}
    setMsg({ ok: true, t: 'Reverted to the built-in default passphrase.' })
  }

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-6 sm:px-6 lg:px-10">
        <form onSubmit={submit} className="rounded-2xl border border-[#D49B35]/30 bg-[#0D3528]/60 p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="g28-serif text-[20px] font-bold text-[#FAF6F0]">Change admin passphrase</h3>
              <p className="mt-1.5 text-[12.5px] font-medium text-[#B8B2A6]">
                {usingCustom ? 'A custom passphrase is currently active.' : 'The built-in default is currently active.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#FAF6F0]/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/70 transition-colors hover:border-[#D49B35]"
            >
              Close
            </button>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">Current</span>
              <input type="password" value={cur} onChange={(e) => setCur(e.target.value)} className="g28-field mt-1.5" placeholder="••••••••" />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">New passphrase</span>
              <input type="password" value={next} onChange={(e) => setNext(e.target.value)} className="g28-field mt-1.5" placeholder="at least 12 characters" />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">Confirm new</span>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="g28-field mt-1.5" placeholder="repeat it" />
            </label>
          </div>

          {next && (
            <div className="mt-5 flex items-center gap-3">
              <div className="flex flex-1 gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 flex-1 rounded-full transition-colors duration-400"
                    style={{ background: i < score ? STRENGTH[score].color : 'rgba(250,246,240,.12)' }}
                  />
                ))}
              </div>
              <span className="w-20 text-right text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: STRENGTH[score].color }}>
                {STRENGTH[score].label}
              </span>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="submit" className="rounded-full bg-gradient-to-r from-[#D49B35] to-[#E6C675] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#051812]">
              Update passphrase
            </button>
            <button
              type="button"
              onClick={restore}
              className="rounded-full border border-[#FAF6F0]/20 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/70 transition-colors hover:border-[#D49B35]"
            >
              Use default instead
            </button>
            {msg && (
              <span className={`text-[12px] font-semibold ${msg.ok ? 'text-[#6FBF8B]' : 'text-[#E6C675]'}`}>{msg.t}</span>
            )}
          </div>

          <p className="mt-5 max-w-[720px] text-[11.5px] font-medium leading-[1.7] text-[#FAF6F0]/40">
            Stored as a hash in this browser only. Because this is a static site the check runs client-side,
            so treat it as a gate that keeps casual visitors out — not as server-grade authentication.
          </p>
        </form>
      </div>
    </motion.div>
  )
}

function AdminPanel({ content, onExit, onLogout }) {
  const [tab, setTab] = useState('work')
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState(null)
  const [note, setNote] = useState('')
  const [showPass, setShowPass] = useState(false)

  const isWork = tab === 'work'
  const items = isWork ? content.projects : content.materials

  const flash = (msg) => {
    setNote(msg)
    setTimeout(() => setNote(''), 2200)
  }

  const startEdit = (i) => {
    setEditing(i)
    setDraft({ ...items[i] })
  }
  const cancel = () => {
    setEditing(null)
    setDraft(null)
  }
  const commit = () => {
    const next = items.slice()
    next[editing] = draft
    content.setCollection(isWork ? 'projects' : 'materials', next)
    cancel()
    flash('Saved')
  }
  const remove = (i) => {
    const next = items.filter((_, idx) => idx !== i)
    content.setCollection(isWork ? 'projects' : 'materials', next)
    cancel()
    flash('Removed')
  }
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = items.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    content.setCollection(isWork ? 'projects' : 'materials', next)
  }
  const add = () => {
    const blank = isWork
      ? { name: 'New Project', client: 'Client', service: 'Turnkey Interiors', area: '0 Sq. Ft.', cat: 'corporate', body: 'Describe the project…', image: '', gallery: [] }
      : { name: 'New Material', body: 'Describe the material…', swatch: 'linear-gradient(135deg,#D8DDE2,#F2F5F7 34%,#A8B0B8 68%,#E4E9ED)', tone: '#3A444C', iconName: 'Package', image: null, specs: [] }
    const next = [...items, blank]
    content.setCollection(isWork ? 'projects' : 'materials', next)
    setEditing(next.length - 1)
    setDraft({ ...blank })
    flash('Added')
  }

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ projects: content.projects, materials: content.materials }, null, 2)], {
      type: 'application/json'
    })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'g28-content.json'
    a.click()
    URL.revokeObjectURL(a.href)
    flash('Exported g28-content.json')
  }

  const importJSON = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (Array.isArray(parsed.projects)) content.setCollection('projects', parsed.projects)
        if (Array.isArray(parsed.materials)) content.setCollection('materials', parsed.materials)
        flash('Imported')
      } catch {
        flash('That file could not be read')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="min-h-screen bg-[#051812] pb-24">
      {/* ---------------- bar ---------------- */}
      <header className="sticky top-0 z-40 border-b border-[#FAF6F0]/10 bg-[#051812]/92 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center gap-4 px-5 py-4 sm:px-6 lg:px-10">
          <G28Logo size={22} />
          <span className="rounded-full bg-gradient-to-r from-[#D49B35] to-[#E6C675] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#051812]">
            Admin
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-2.5">
            <span className="mr-1 hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/40 sm:flex">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D49B35]" />
              {fmtBytes(storageUsed())} used
            </span>
            <button onClick={exportJSON} className="rounded-full border border-[#FAF6F0]/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/75 transition-colors hover:border-[#D49B35] hover:text-[#E6C675]">
              Export
            </button>
            <label className="cursor-pointer rounded-full border border-[#FAF6F0]/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/75 transition-colors hover:border-[#D49B35] hover:text-[#E6C675]">
              Import
              <input type="file" accept="application/json" onChange={importJSON} className="hidden" />
            </label>
            <button
              onClick={() => {
                content.reset()
                flash('Reset to defaults')
              }}
              className="rounded-full border border-[#FAF6F0]/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/75 transition-colors hover:border-[#D49B35] hover:text-[#E6C675]"
            >
              Reset
            </button>
            <button
              onClick={() => setShowPass((v) => !v)}
              className={`rounded-full border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                showPass ? 'border-[#D49B35] bg-[#D49B35] text-[#051812]' : 'border-[#FAF6F0]/20 text-[#FAF6F0]/75 hover:border-[#D49B35] hover:text-[#E6C675]'
              }`}
            >
              Passphrase
            </button>
            <button onClick={onLogout} className="rounded-full border border-[#FAF6F0]/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/75 transition-colors hover:border-[#D49B35] hover:text-[#E6C675]">
              Sign out
            </button>
            <button onClick={onExit} className="rounded-full bg-gradient-to-r from-[#D49B35] to-[#E6C675] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#051812]">
              View site
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{showPass && <PassphraseChanger onClose={() => setShowPass(false)} />}</AnimatePresence>

      <div className="mx-auto w-full max-w-[1400px] px-5 pt-10 sm:px-6 lg:px-10">
        {/* ---------------- tabs ---------------- */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-1 rounded-full border border-[#FAF6F0]/12 bg-[#0D3528]/50 p-1.5">
            {[
              { key: 'work', label: 'Work We Deliver', n: content.projects.length },
              { key: 'products', label: 'Products & Materials', n: content.materials.length }
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setTab(t.key)
                  cancel()
                }}
                className={`relative rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-400 ${
                  tab === t.key ? 'text-[#051812]' : 'text-[#FAF6F0]/60 hover:text-[#E6C675]'
                }`}
              >
                {tab === t.key && (
                  <motion.span layoutId="admin-pill" transition={SPRING} className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D49B35] to-[#E6C675]" />
                )}
                <span className="relative">
                  {t.label} <span className="opacity-60">({t.n})</span>
                </span>
              </button>
            ))}
          </div>

          <button onClick={add} className="ml-auto rounded-full border border-[#D49B35]/45 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#E6C675] transition-colors hover:bg-[#D49B35] hover:text-[#051812]">
            + Add {isWork ? 'Project' : 'Product'}
          </button>
        </div>

        <AnimatePresence>
          {note && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D49B35]/40 bg-[#0D3528]/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#E6C675]"
            >
              <Check className="h-3.5 w-3.5" /> {note}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-6 max-w-[720px] text-[12.5px] font-medium leading-[1.7] text-[#B8B2A6]">
          {isWork
            ? 'These are the case studies shown in “Work That Delivers Results”. Category controls which filter tab each project appears under.'
            : 'These are the material cards in “Materials & Products We Use”. Swatch is a CSS gradient, tone is the accent colour, icon picks the glyph.'}
        </p>

        {/* ---------------- list ---------------- */}
        <div className="mt-8 flex flex-col gap-3">
          {items.map((item, i) => {
            const open = editing === i
            return (
              <div key={`${item.name}-${i}`} className={`overflow-hidden rounded-2xl border transition-colors duration-400 ${open ? 'border-[#D49B35]/50 bg-[#0D3528]/70' : 'border-[#FAF6F0]/[0.08] bg-[#08251C]/60'}`}>
                <div className="flex flex-wrap items-center gap-4 p-5">
                  {isWork ? (
                    galleryOf(item)[0] ? (
                      <img src={galleryOf(item)[0]} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                    ) : (
                      <span className="grid h-14 w-20 shrink-0 place-items-center rounded-lg border border-[#FAF6F0]/12 text-[9px] text-[#FAF6F0]/35">No image</span>
                    )
                  ) : (
                    <span className="h-14 w-20 shrink-0 rounded-lg border border-white/15" style={{ background: item.swatch }} />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="g28-serif text-[18px] font-bold text-[#FAF6F0]">{item.name}</span>
                      {isWork && (
                        <span className="rounded-full border border-[#D49B35]/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#E6C675]">
                          {item.cat}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 truncate text-[12px] font-medium text-[#B8B2A6]">
                      {isWork ? `${item.client} · ${item.area}` : item.body}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button onClick={() => move(i, -1)} aria-label="Move up" className="grid h-9 w-9 place-items-center rounded-full border border-[#FAF6F0]/15 text-[#FAF6F0]/60 transition-colors hover:border-[#D49B35] hover:text-[#E6C675]">
                      <ArrowUpRight className="h-3.5 w-3.5 -rotate-45" />
                    </button>
                    <button onClick={() => move(i, 1)} aria-label="Move down" className="grid h-9 w-9 place-items-center rounded-full border border-[#FAF6F0]/15 text-[#FAF6F0]/60 transition-colors hover:border-[#D49B35] hover:text-[#E6C675]">
                      <ArrowUpRight className="h-3.5 w-3.5 rotate-45" />
                    </button>
                    <button
                      onClick={() => (open ? cancel() : startEdit(i))}
                      className={`rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${
                        open ? 'bg-[#D49B35] text-[#051812]' : 'border border-[#FAF6F0]/15 text-[#FAF6F0]/70 hover:border-[#D49B35] hover:text-[#E6C675]'
                      }`}
                    >
                      {open ? 'Close' : 'Edit'}
                    </button>
                    <button onClick={() => remove(i)} aria-label="Delete" className="grid h-9 w-9 place-items-center rounded-full border border-[#FAF6F0]/15 text-[#FAF6F0]/50 transition-colors hover:border-red-400/60 hover:text-red-300">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {open && draft && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#FAF6F0]/10 p-5 sm:p-6">
                        {isWork ? (
                          <div className="grid gap-5 sm:grid-cols-2">
                            <AdminField label="Project name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
                            <AdminField label="Client" value={draft.client} onChange={(v) => setDraft({ ...draft, client: v })} />
                            <AdminField label="Service" value={draft.service} onChange={(v) => setDraft({ ...draft, service: v })} />
                            <AdminField label="Area" value={draft.area} onChange={(v) => setDraft({ ...draft, area: v })} />
                            <label className="block">
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">Category</span>
                              <select
                                value={draft.cat}
                                onChange={(e) => setDraft({ ...draft, cat: e.target.value })}
                                className="g28-field mt-1.5 cursor-pointer"
                              >
                                {PROJECT_CATS.map((c) => (
                                  <option key={c.key} value={c.key} className="text-[#08251C]">
                                    {c.label}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <div className="sm:col-span-2">
                              <ImagePicker label="Cover image" value={draft.image} onChange={(v) => setDraft({ ...draft, image: v })} />
                            </div>
                            <GalleryEditor images={draft.gallery || []} onChange={(v) => setDraft({ ...draft, gallery: v })} />
                            <div className="sm:col-span-2">
                              <AdminField label="Description" rows={3} value={draft.body} onChange={(v) => setDraft({ ...draft, body: v })} />
                            </div>
                          </div>
                        ) : (
                          <div className="grid gap-5 sm:grid-cols-2">
                            <AdminField label="Product name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
                            <label className="block">
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D49B35]/85">Icon</span>
                              <select
                                value={draft.iconName || 'Package'}
                                onChange={(e) => setDraft({ ...draft, iconName: e.target.value })}
                                className="g28-field mt-1.5 cursor-pointer"
                              >
                                {Object.keys(ICON_MAP).map((k) => (
                                  <option key={k} value={k} className="text-[#08251C]">
                                    {k}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <AdminField label="Swatch (CSS gradient)" value={draft.swatch} onChange={(v) => setDraft({ ...draft, swatch: v })} />
                            <AdminField label="Accent tone (hex)" value={draft.tone} onChange={(v) => setDraft({ ...draft, tone: v })} placeholder="#3A444C" />
                            <div className="sm:col-span-2">
                              <ImagePicker label="Product photo (optional — falls back to the swatch)" value={draft.image || ''} onChange={(v) => setDraft({ ...draft, image: v })} />
                            </div>
                            <SpecsEditor specs={draft.specs || []} onChange={(v) => setDraft({ ...draft, specs: v })} />
                            <div className="sm:col-span-2">
                              <AdminField label="Description" rows={3} value={draft.body} onChange={(v) => setDraft({ ...draft, body: v })} />
                            </div>
                          </div>
                        )}

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <button onClick={commit} className="rounded-full bg-gradient-to-r from-[#D49B35] to-[#E6C675] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#051812]">
                            Save changes
                          </button>
                          <button onClick={cancel} className="rounded-full border border-[#FAF6F0]/20 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F0]/70 transition-colors hover:border-[#D49B35]">
                            Cancel
                          </button>
                          {draft.image !== undefined && draft.image && (
                            <img src={draft.image} alt="" className="ml-auto h-16 w-24 rounded-lg object-cover" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   20d. ADMIN GATE  —  routes #admin to login or panel
   ========================================================================== */

function AdminArea({ content, onExit }) {
  const [authed, setAuthed] = useState(() => {
    const s = readJSON(SESSION_KEY, null)
    return Boolean(s && Date.now() - s.at < 1000 * 60 * 60 * 12)
  })

  const logout = () => {
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {}
    setAuthed(false)
  }

  if (!authed) return <AdminLogin onAuth={() => setAuthed(true)} onExit={onExit} />

  return (
    <AdminPanel
      content={content}
      onExit={onExit}
      onLogout={logout}
    />
  )
}

/* ==========================================================================
   22. ERROR BOUNDARY
   A render error must never leave a blank white page. This catches anything
   thrown below it and offers a way back — including clearing bad saved
   content, which is the most likely cause.
   ========================================================================== */

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[G28] render error', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    const clearAndReload = () => {
      try {
        localStorage.removeItem('g28.content.v1')
        localStorage.removeItem('g28.session.v1')
      } catch {}
      window.location.hash = ''
      window.location.reload()
    }

    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#051812] px-5 py-20">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[720px] -translate-x-1/2 rounded-full bg-[#D49B35]/18 blur-[150px]" />
        <div className="relative w-full max-w-[560px] rounded-2xl border border-[#D49B35]/25 bg-[#08251C]/85 p-8 text-center sm:p-10">
          <div className="flex justify-center">
            <G28Logo size={30} />
          </div>
          <h1 className="g28-serif mt-7 text-[26px] font-bold leading-tight text-[#FAF6F0]">
            Something interrupted the page
          </h1>
          <p className="mx-auto mt-4 max-w-[420px] text-[14px] font-medium leading-[1.7] text-[#B8B2A6]">
            This is usually caused by saved content from the admin panel that no longer matches
            the current layout. Reloading normally fixes it — clearing the saved content restores
            the built-in defaults.
          </p>

          <pre className="mt-6 max-h-[120px] overflow-auto rounded-lg border border-[#FAF6F0]/10 bg-[#051812]/70 p-4 text-left text-[11px] leading-[1.6] text-[#B8B2A6]">
            {String((this.state.error && this.state.error.message) || this.state.error)}
          </pre>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full border border-[#FAF6F0]/20 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FAF6F0]/80 transition-colors hover:border-[#D49B35] hover:text-[#E6C675]"
            >
              Reload
            </button>
            <button
              type="button"
              onClick={clearAndReload}
              className="rounded-full bg-gradient-to-r from-[#D49B35] to-[#E6C675] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#051812]"
            >
              Reset saved content &amp; reload
            </button>
          </div>

          <p className="mt-6 text-[11px] font-medium text-[#FAF6F0]/35">
            Your exported g28-content.json is not affected.
          </p>
        </div>
      </div>
    )
  }
}

export default function App() {
  const [lampOn, setLampOn] = useState(true)
  const toggleLamp = () => setLampOn((v) => !v)

  /* one global pointer listener feeds every hanging object's pendulum */
  usePointerImpulse()

  /* ---------------- view routing: main site / founder's story / admin ---------------- */
  const [view, setView] = useState('main')

  /* editable content: projects (work we deliver) + materials (products we use) */
  const content = useContent()

  /* detail modals */
  const [openProject, setOpenProject] = useState(null)
  const [openMaterial, setOpenMaterial] = useState(null)

  const navigate = (next) => {
    setView(next)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  /* hash routing — #founder and #admin are shareable and back-button friendly */
  useEffect(() => {
    const read = () => {
      const h = window.location.hash
      setView(h === '#founder' ? 'founder' : h === '#admin' ? 'admin' : 'main')
    }
    read()
    window.addEventListener('hashchange', read)
    return () => window.removeEventListener('hashchange', read)
  }, [])

  useEffect(() => {
    const want = view === 'founder' ? '#founder' : view === 'admin' ? '#admin' : ''
    if (window.location.hash !== want) {
      history.replaceState(null, '', want || window.location.pathname + window.location.search)
    }
  }, [view])

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  /* inject Google Fonts once */
  useEffect(() => {
    const id = 'g28-fonts'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
    document.head.appendChild(link)

    const pre1 = document.createElement('link')
    pre1.rel = 'preconnect'
    pre1.href = 'https://fonts.googleapis.com'
    const pre2 = document.createElement('link')
    pre2.rel = 'preconnect'
    pre2.href = 'https://fonts.gstatic.com'
    pre2.crossOrigin = 'anonymous'
    document.head.appendChild(pre1)
    document.head.appendChild(pre2)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#051812]">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#A87724] via-[#D49B35] to-[#E6C675]"
      />

      {/* page-wide ambient lighting — driven by the pendant lamp toggle */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[30]"
        animate={{ opacity: lampOn ? 0.6 : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          background: 'radial-gradient(1100px 680px at 82% 6%, rgba(230,198,117,.16), transparent 62%)',
          mixBlendMode: 'screen'
        }}
      />

      {view !== 'admin' && <Navbar lampOn={lampOn} toggleLamp={toggleLamp} view={view} onNavigate={navigate} />}

      {view === 'admin' ? (
        <AdminArea content={content} onExit={() => navigate('main')} />
      ) : view === 'founder' ? (
        <FounderStory onBack={() => navigate('main')} lampOn={lampOn} toggleLamp={toggleLamp} />
      ) : (
        <main>
          <Hero lampOn={lampOn} toggleLamp={toggleLamp} />

          <Clients />

          {/* dark #08251C → ivory #FAF6F0 */}
          <Slash from="#08251C" to="#FAF6F0" />
          <Process />
          <Values />

          {/* ivory → dark #051812 */}
          <Slash from="#FAF6F0" to="#051812" />
          <ScopeOfWork />

          {/* dark #051812 → dark #08251C */}
          <Industries />

          {/* dark → ivory */}
          <Slash from="#08251C" to="#FAF6F0" />
          <Materials items={content.materials} onOpen={setOpenMaterial} />

          {/* ivory → dark #051812 */}
          <Slash from="#FAF6F0" to="#051812" />
          <Brands />

          {/* dark → ivory */}
          <Slash from="#051812" to="#FAF6F0" />
          <Projects items={content.projects} onOpen={setOpenProject} />
          <Packages />
          <Faq />
          <GroupCompanies />
          <Contact lampOn={lampOn} toggleLamp={toggleLamp} />

          {/* contact banner → footer */}
          <FooterSlash />
          <Footer onNavigate={navigate} />
        </main>
      )}

      {view !== 'admin' && <WhatsAppFab />}

      {/* ---------------- detail modals ---------------- */}
      <AnimatePresence>
        {openProject && <ProjectModal key="project" project={openProject} onClose={() => setOpenProject(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {openMaterial && <MaterialModal key="material" material={openMaterial} onClose={() => setOpenMaterial(null)} />}
      </AnimatePresence>
    </div>
  )
}
