import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react'
import Marquee from './ui/Marquee'
import Logo from './ui/Logo'
import { Reveal } from './ui/primitives'
import { closing, footer, contact, brand, nav } from '../data/content'

export default function Closing() {
  return (
    <section className="pb-6 pt-14 sm:pt-16">
      <div className="shell">
        <div className="relative overflow-hidden rounded-card bg-ink">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='190' height='220'><g fill='none' stroke='%23E6C675' stroke-width='1'><path d='M95 20 L175 66 L95 112 L15 66 Z'/><path d='M95 20 L95 112'/><path d='M15 66 L15 158 L95 204 L175 158 L175 66'/><path d='M95 112 L95 204'/></g></svg>\")"
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold/20 blur-[150px]"
          />

          {/* CTA */}
          <div className="relative px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
            <Reveal>
              <h2 className="mx-auto max-w-[900px] font-display text-[34px] font-bold leading-[1.06] tracking-[-0.03em] text-cream sm:text-[48px] lg:text-[72px]">
                {closing.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-txt mx-auto mt-6 max-w-[440px] text-muted-soft">{closing.body}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a href="#contact" className="btn-accent">
                  {closing.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href={`tel:${contact.phoneLinks[0]}`} className="btn border border-cream/20 text-cream hover:bg-cream/10">
                  <Phone className="h-4 w-4 text-gold" />
                  {contact.phones[0]}
                </a>
              </div>
            </Reveal>
          </div>

          {/* marquee divider */}
          <div className="relative border-y border-cream/10 py-4">
            <Marquee speed={44}>
              <div className="flex items-center">
                {[...Array(2)].flatMap(() => [
                  brand.name,
                  brand.tagline.toUpperCase(),
                  'COIMBATORE',
                  'SINCE ' + brand.founded
                ]).map((t, i) => (
                  <span key={i} className="flex items-center whitespace-nowrap">
                    <span className="px-6 font-display text-[18px] font-bold tracking-[0.02em] text-cream/35">
                      {t}
                    </span>
                    <span className="text-gold">✦</span>
                  </span>
                ))}
              </div>
            </Marquee>
          </div>

          {/* footer */}
          <div className="relative px-6 py-14 sm:px-10 sm:py-16 lg:px-14">
            <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
              <div>
                <Logo tone="light" />
                <p className="body-txt mt-6 max-w-[320px] text-muted-soft">{footer.blurb}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {footer.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-pill border border-cream/15 px-4 py-2.5 text-[12px] font-semibold text-cream/70 transition-colors duration-500 hover:border-gold hover:text-gold"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {footer.columns.map((col) => (
                <div key={col.title}>
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.24em] text-gold/80">
                    {col.title}
                  </h3>
                  <ul className="mt-6 flex flex-col gap-3.5">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className="text-[15px] font-medium text-cream/60 transition-colors duration-300 hover:text-gold"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.24em] text-gold/80">
                  Studio
                </h3>
                <ul className="mt-6 flex flex-col gap-5">
                  <li className="flex gap-3 text-[14px] leading-relaxed text-cream/60">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {contact.address}
                  </li>
                  {contact.phones.map((p, i) => (
                    <li key={p} className="flex gap-3">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <a
                        href={`tel:${contact.phoneLinks[i]}`}
                        className="text-[14px] font-medium text-cream/60 transition-colors hover:text-gold"
                      >
                        {p}
                      </a>
                    </li>
                  ))}
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="break-all text-[14px] font-medium text-cream/60 transition-colors hover:text-gold"
                    >
                      {contact.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-cream/15 to-transparent" />

            <div className="mt-7 flex flex-col items-center justify-between gap-4 text-[13px] font-medium text-cream/55 sm:flex-row">
              <p>
                © {brand.year} {brand.name}. All rights reserved.
              </p>
              <p className="text-center sm:text-right">
                {contact.founder} · {contact.founderRole} · {brand.city}, Tamil Nadu
              </p>
            </div>

            <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-start">
              {nav.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cream/50 transition-colors hover:text-gold"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}
