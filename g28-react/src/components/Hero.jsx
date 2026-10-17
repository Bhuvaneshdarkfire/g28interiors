import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Marquee from './ui/Marquee'
import LetterReveal from './ui/LetterReveal'
import { ArrowLink, Pill, EASE } from './ui/primitives'
import { hero, brand } from '../data/content'

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative pt-24 sm:pt-28">
      {/* ------------------------------ ticker ------------------------------ */}
      <Marquee speed={34} mask={false} className="border-y border-ink/[0.08] bg-cream py-3">
        <div className="flex items-center">
          {[...hero.places, brand.short, brand.tagline.toUpperCase(), ...hero.places].map((t, i) => (
            <span key={i} className="flex items-center">
              <span
                className={`px-6 font-display text-[24px] font-bold tracking-[-0.01em] sm:text-[32px] ${
                  i === 0 ? 'text-gold-deep' : 'text-ink'
                }`}
              >
                {t}
              </span>
              <span className="text-[20px] font-bold text-ink/25">•</span>
            </span>
          ))}
        </div>
      </Marquee>

      {/* ------------------------------- hero ------------------------------- */}
      <div className="shell pt-6 sm:pt-8">
        <div className="relative overflow-hidden rounded-card bg-ink px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          {/* subtle gold architectural backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='190' height='220'><g fill='none' stroke='%23E6C675' stroke-width='1'><path d='M95 20 L175 66 L95 112 L15 66 Z'/><path d='M95 20 L95 112'/><path d='M15 66 L15 158 L95 204 L175 158 L175 66'/><path d='M95 112 L95 204'/></g></svg>\")"
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-gold/20 blur-[130px]"
          />

          {/* top row: stats + headline */}
          <div className="relative grid gap-10 md:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)] md:items-start md:gap-10 lg:gap-14">
            <motion.div
              className="flex flex-col gap-6 md:pt-2"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
            >
              {hero.stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={{
                    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 22 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
                  }}
                  className="border-l border-gold/30 pl-4"
                >
                  <div className="font-display text-[24px] font-bold leading-none text-cream">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[15px] font-medium text-muted-soft">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <h1 className="font-display font-bold tracking-[-0.035em] text-cream">
              {hero.headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={`block text-[46px] leading-[0.96] sm:text-[72px] lg:text-[92px] xl:text-[112px] ${
                      i === 1 ? 'text-gold' : ''
                    }`}
                    initial={reduce ? false : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* description + cta */}
          <div className="relative mt-12 grid gap-8 border-t border-cream/10 pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <motion.p
              className="body-txt max-w-[520px] text-muted-soft"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            >
              {hero.body}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-6"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-[16px] font-semibold text-gold"
              >
                <span className="relative overflow-hidden">
                  <span className="block transition-transform duration-500 ease-smooth group-hover:-translate-y-full">
                    {hero.cta}
                  </span>
                  <span
                    aria-hidden
                    className="absolute left-0 top-full block transition-transform duration-500 ease-smooth group-hover:-translate-y-full"
                  >
                    {hero.cta}
                  </span>
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* feature pills */}
          <motion.div
            className="relative mt-9 flex flex-wrap gap-2.5"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.72 } } }}
          >
            {hero.pills.map((p) => (
              <motion.div
                key={p}
                variants={{
                  hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
                }}
              >
                <Pill tone="darkGhost">{p}</Pill>
              </motion.div>
            ))}
          </motion.div>

          {/* service marquee — "/" separated, exactly like the reference */}
          <div className="relative mt-12 -mx-6 border-y border-cream/10 py-4 sm:-mx-10 lg:-mx-14">
            <Marquee speed={30}>
              <div className="flex items-center">
                {[...hero.marquee, ...hero.marquee].map((t, i) => (
                  <span key={i} className="flex items-center whitespace-nowrap">
                    <span className="px-3 text-[15px] font-semibold text-gold">/</span>
                    <span className="px-3 text-[15px] font-semibold tracking-[0.04em] text-muted-ink">
                      {t}
                    </span>
                  </span>
                ))}
              </div>
            </Marquee>
          </div>

          {/* places + manifesto */}
          <div className="relative mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-2">
              {hero.places.map((p) => (
                <span
                  key={p}
                  className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted-soft"
                >
                  {p}
                </span>
              ))}
            </div>

            <LetterReveal
              text={hero.manifesto}
              className="font-display text-[22px] font-semibold leading-[1.4] tracking-[-0.01em] sm:text-[26px] lg:text-[28px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
