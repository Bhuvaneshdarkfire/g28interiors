import { ArrowUpRight } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from './ui/primitives'
import { work } from '../data/content'

export default function Work() {
  return (
    <section id="work" className="py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
          <Reveal>
            <h2 className="h-section text-ink">{work.heading}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="body-txt max-w-[480px] text-muted lg:pb-2">{work.body}</p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-4 sm:mt-16 lg:grid-cols-2" stagger={0.1}>
          {work.projects.map((p) => (
            <RevealItem key={p.name}>
              <a
                href="#contact"
                className="group flex h-full flex-col overflow-hidden rounded-card bg-cream-card transition-colors duration-500 hover:bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.client}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <span className="absolute right-5 top-5 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-cream/95 text-ink opacity-0 backdrop-blur transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[26px] font-semibold text-ink sm:text-[32px]">
                      {p.name}
                    </h3>
                    <span className="text-[13px] font-semibold text-muted">{p.client}</span>
                  </div>

                  <p className="body-txt mt-4 flex-1 text-muted">{p.body}</p>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-ink/[0.08] pt-6">
                    <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-ink">
                      {p.service}
                    </span>
                    <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-gold-deep">
                      See the Work
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
