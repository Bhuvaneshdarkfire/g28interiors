import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem, Pill } from './ui/primitives'
import { process } from '../data/content'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.7', 'end 0.7']
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="process" className="py-6 sm:py-8">
      <div className="shell">
        <div className="relative overflow-hidden rounded-card bg-ink px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='190' height='220'><g fill='none' stroke='%23E6C675' stroke-width='1'><path d='M95 20 L175 66 L95 112 L15 66 Z'/><path d='M95 20 L95 112'/><path d='M15 66 L15 158 L95 204 L175 158 L175 66'/><path d='M95 112 L95 204'/></g></svg>\")"
            }}
          />

          <div className="relative grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            {/* sticky heading */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <Pill tone="darkGhost" className="mb-6">
                  How we work
                </Pill>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="h-section text-cream">{process.heading}</h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="body-txt mt-6 max-w-[420px] text-muted-soft">{process.body}</p>
              </Reveal>
            </div>

            {/* steps */}
            <div ref={ref} className="relative">
              {/* progress rail */}
              <div className="absolute left-[13px] top-2 hidden h-[calc(100%-1rem)] w-px bg-cream/10 sm:block">
                <motion.div
                  className="h-full w-full origin-top bg-gradient-to-b from-gold to-gold-light"
                  style={{ scaleY: lineScale }}
                />
              </div>

              <RevealGroup className="flex flex-col gap-4">
                {process.steps.map((step) => (
                  <RevealItem key={step.no}>
                    <div className="group relative rounded-card border border-cream/[0.08] bg-ink-soft/60 p-7 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-gold/40 sm:pl-16">
                      {/* node */}
                      <span className="absolute left-0 top-8 hidden h-[27px] w-[27px] -translate-x-[13px] place-items-center rounded-full border border-gold/40 bg-ink sm:grid">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-500 group-hover:scale-150" />
                      </span>

                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <h3 className="font-display text-[26px] font-semibold text-cream sm:text-[32px]">
                            {step.title}
                          </h3>
                          <p className="body-txt mt-3 max-w-[460px] text-muted-soft">{step.body}</p>

                          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
                            {step.points.map((pt) => (
                              <li
                                key={pt}
                                className="flex items-center gap-2 text-[14px] font-medium text-muted-soft"
                              >
                                <Check className="h-3.5 w-3.5 text-gold" />
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <span
                          aria-hidden="true"
                          className="font-display text-[44px] font-bold leading-none text-cream/20 transition-colors duration-500 group-hover:text-gold/50 sm:text-[72px]"
                        >
                          {step.no}
                        </span>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
