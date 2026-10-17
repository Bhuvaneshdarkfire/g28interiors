import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView, useReducedMotion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

/* ---------------------------------------------------------------------------
   Reveal — the reference design's default entrance: fade + rise, once only.
--------------------------------------------------------------------------- */
export function Reveal({ children, delay = 0, y = 28, duration = 0.75, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}

/* Stagger container — children use <RevealItem/> */
export function RevealGroup({ children, className = '', stagger = 0.09, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '', y = 30 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
      }}
    >
      {children}
    </motion.div>
  )
}

/* ---------------------------------------------------------------------------
   Counter — animated stat numbers
--------------------------------------------------------------------------- */
export function Counter({ to, suffix = '', prefix = '', duration = 1.9, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setVal(v)
    })
    return () => controls.stop()
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(val).toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

/* ---------------------------------------------------------------------------
   Pills / buttons
--------------------------------------------------------------------------- */
export function Pill({ children, tone = 'ghost', className = '' }) {
  const tones = {
    ghost: 'bg-ink/[0.06] text-ink',
    darkGhost: 'bg-white/[0.14] text-cream',
    accent: 'bg-gold text-ink',
    light: 'bg-white text-ink',
    outline: 'border border-ink/15 text-ink'
  }
  return <span className={`pill ${tones[tone] || tones.ghost} ${className}`}>{children}</span>
}

/* Link with an arrow that slides on hover — used throughout the reference */
export function ArrowLink({ children, href = '#', tone = 'accent', className = '', onClick }) {
  const tones = {
    accent: 'text-gold',
    ink: 'text-ink',
    light: 'text-cream'
  }
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 text-[15px] font-semibold leading-none ${tones[tone]} ${className}`}
    >
      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-500 ease-smooth group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-full block transition-transform duration-500 ease-smooth group-hover:-translate-y-full"
        >
          {children}
        </span>
      </span>
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-smooth group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

/* ---------------------------------------------------------------------------
   Section heading — mirrors the reference rhythm
   (eyebrow → 48px title → muted paragraph, left aligned)
--------------------------------------------------------------------------- */
export function SectionHead({ eyebrow, title, body, tone = 'light', align = 'left', className = '', children }) {
  const dark = tone === 'dark'
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : ''} ${className}`}>
      {eyebrow && (
        <Reveal>
          <Pill tone={dark ? 'darkGhost' : 'ghost'} className="mb-6">
            {eyebrow}
          </Pill>
        </Reveal>
      )}
      {title && (
        <Reveal delay={0.06}>
          <h2 className={`h-section text-balance2 ${dark ? 'text-cream' : 'text-ink'}`}>{title}</h2>
        </Reveal>
      )}
      {body && (
        <Reveal delay={0.12}>
          <p
            className={`body-txt mt-6 max-w-prose2 ${dark ? 'text-muted-soft' : 'text-muted'}`}
          >
            {body}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  )
}
