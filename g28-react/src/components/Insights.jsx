import { ArrowUpRight } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem, ArrowLink } from './ui/primitives'
import { insights } from '../data/content'

export default function Insights() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[620px]">
            <Reveal>
              <h2 className="h-section text-ink">{insights.heading}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="body-txt mt-6 text-muted">{insights.body}</p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <ArrowLink href="#work" tone="ink" className="lg:pb-2">
              {insights.cta}
            </ArrowLink>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-4 sm:mt-16 lg:grid-cols-3" stagger={0.1}>
          {insights.posts.map((post) => (
            <RevealItem key={post.title} className="h-full">
              <a
                href="#work"
                className="group flex h-full flex-col rounded-card bg-white p-2 transition-transform duration-500 ease-smooth hover:-translate-y-1.5"
              >
                {/* inner image panel (reference: 20px radius panel inside a 24px card) */}
                <div className="relative min-h-[240px] overflow-hidden rounded-panel">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.07]"
                  />
                  <span className="absolute left-4 top-4 rounded-pill bg-cream/90 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-ink backdrop-blur">
                    {post.cat}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[22px] font-semibold leading-[1.25] text-ink">
                    {post.title}
                  </h3>
                  <p className="small-txt mt-3 flex-1 text-muted">{post.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-gold-deep">
                    View Article
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
