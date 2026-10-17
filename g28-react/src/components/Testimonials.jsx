import Marquee from './ui/Marquee'
import { Reveal } from './ui/primitives'
import { testimonials } from '../data/content'

export default function Testimonials() {
  const rowA = testimonials.items.slice(0, 3)
  const rowB = testimonials.items.slice(3)

  return (
    <section className="py-6 sm:py-8">
      <div className="shell">
        <div className="relative overflow-hidden rounded-card bg-ink px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 top-1/3 h-[460px] w-[460px] rounded-full bg-gold/15 blur-[140px]"
          />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-end">
            <Reveal>
              <h2 className="font-display font-bold tracking-[-0.02em] text-cream">
                <span className="block text-[26px] leading-[1.1] text-muted-soft sm:text-[32px]">
                  {testimonials.headingTop}
                </span>
                <span className="block text-[34px] leading-[1.08] sm:text-[40px] lg:text-[48px]">
                  {testimonials.headingBottom}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="body-txt max-w-[460px] text-muted-soft lg:pb-2">{testimonials.body}</p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* two opposing marquee rows of testimonial cards */}
      <div className="mt-6 flex flex-col gap-4">
        <Marquee speed={52} pauseOnHover>
          <div className="flex">
            {rowA.map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        </Marquee>

        <Marquee speed={58} reverse pauseOnHover>
          <div className="flex">
            {rowB.map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  )
}

function Card({ t }) {
  return (
    <figure className="mx-2 flex w-[320px] shrink-0 flex-col justify-between gap-8 rounded-tile bg-ink-card p-7 sm:w-[420px] sm:p-8 lg:w-[560px]">
      <blockquote className="font-display text-[19px] font-medium leading-[1.45] text-cream/90 sm:text-[22px]">
        “{t.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 font-display text-[15px] font-bold text-gold">
          {t.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </span>
        <span>
          <span className="block text-[15px] font-semibold text-cream">{t.name}</span>
          <span className="block text-[13px] font-medium text-muted-soft">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
