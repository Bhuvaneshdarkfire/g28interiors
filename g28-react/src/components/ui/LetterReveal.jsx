import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/* ---------------------------------------------------------------------------
   LetterReveal — the reference design's signature paragraph effect:
   words light up from 18% → 100% opacity as the block scrolls through view.
--------------------------------------------------------------------------- */
export default function LetterReveal({ text, className = '', tone = 'dark' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.5']
  })

  const words = text.split(' ')

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )
  }

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1.6) / words.length)]}
          tone={tone}
        >
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({ progress, range, children, tone }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <span className="mr-[0.26em] inline-block">
      <motion.span
        style={{ opacity }}
        className={tone === 'dark' ? 'text-cream' : 'text-ink'}
      >
        {children}
      </motion.span>
    </span>
  )
}
