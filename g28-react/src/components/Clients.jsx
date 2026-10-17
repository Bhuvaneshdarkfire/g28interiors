import Marquee from './ui/Marquee'
import { SectionHead } from './ui/primitives'
import { clients } from '../data/content'

export default function Clients() {
  return (
    <section id="about" className="relative py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <SectionHead title={clients.heading} />
          <p className="body-txt max-w-[520px] text-muted lg:pb-2">{clients.body}</p>
        </div>
      </div>

      <div className="mt-12 sm:mt-14">
        <Marquee speed={38} pauseOnHover>
          <div className="flex items-center">
            {clients.logos.map((name) => (
              <div
                key={name}
                className="mx-2.5 flex h-[86px] min-w-[210px] items-center justify-center rounded-card border border-ink/[0.07] bg-cream-card px-8 transition-colors duration-500 hover:border-ink/20"
              >
                <span className="font-display text-[18px] font-bold uppercase tracking-[0.16em] text-muted-ink">
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
