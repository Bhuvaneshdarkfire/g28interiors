import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, ArrowLink, EASE } from './ui/primitives'
import { services } from '../data/content'

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 lg:py-28">
      <div className="shell">
        {/* head */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
          <Reveal>
            <h2 className="h-section text-ink">{services.heading}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="body-txt max-w-[460px] text-muted lg:pb-2">{services.body}</p>
          </Reveal>
        </div>

        {/* service rows */}
        <div className="mt-14 flex flex-col gap-4 sm:mt-16">
          {services.items.map((s, i) => (
            <Reveal key={s.no} delay={0.04}>
              <article
                className={`group grid items-stretch gap-0 overflow-hidden rounded-card bg-cream-card transition-colors duration-500 hover:bg-white lg:grid-cols-2 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* media */}
                <div className="relative min-h-[260px] overflow-hidden lg:min-h-[420px]">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
                  <span className="absolute left-6 top-6 rounded-pill bg-cream/90 px-4 py-2 text-[12px] font-semibold text-ink backdrop-blur">
                    {s.no} · {s.type}
                  </span>
                </div>

                {/* content */}
                <div className="flex flex-col justify-between gap-8 p-7 sm:p-10 lg:p-12">
                  <div>
                    <motion.h3
                      className="h-card text-ink"
                      initial={{ opacity: 0.001 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      {s.title}
                    </motion.h3>
                    <p className="body-txt mt-5 max-w-[440px] text-muted">{s.body}</p>

                    <ul className="mt-8 flex flex-col gap-3">
                      {s.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-[15px] font-medium text-ink/70"
                        >
                          <span className="h-1 w-1 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-6 border-t border-ink/[0.08] pt-7">
                    <div>
                      <div className="font-display text-[28px] font-bold leading-none text-ink">
                        {s.stat.value}
                      </div>
                      <div className="mt-1.5 text-[13px] font-medium text-muted">
                        {s.stat.label}
                      </div>
                    </div>

                    <a
                      href="#contact"
                      className="group/btn inline-flex items-center gap-2.5 text-[15px] font-semibold text-gold-deep"
                    >
                      Start your project
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 transition-colors duration-500 group-hover/btn:bg-gold group-hover/btn:text-ink">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
