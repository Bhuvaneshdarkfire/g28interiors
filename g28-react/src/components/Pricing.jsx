import { useState } from 'react'
import { Check } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from './ui/primitives'
import { pricing } from '../data/content'

export default function Pricing() {
  const [mode, setMode] = useState('monthly')

  return (
    <section id="pricing" className="py-20 sm:py-24 lg:py-28">
      <div className="shell">
        {/* head + toggle */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[620px]">
            <Reveal>
              <h2 className="h-section text-ink">{pricing.heading}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="body-txt mt-6 text-muted">{pricing.body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="inline-flex items-center gap-1 rounded-pill border border-ink/[0.1] bg-cream-card p-1.5">
              {[
                { key: 'monthly', label: pricing.toggle.monthly },
                { key: 'yearly', label: pricing.toggle.yearly }
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setMode(opt.key)}
                  className={`relative rounded-pill px-5 py-2.5 text-[13px] font-semibold transition-colors duration-500 ease-smooth ${
                    mode === opt.key ? 'text-cream' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {mode === opt.key && (
                    <span className="absolute inset-0 rounded-pill bg-ink" />
                  )}
                  <span className="relative flex items-center gap-2">
                    {opt.label}
                    {opt.key === 'yearly' && (
                      <span className="rounded-pill bg-gold px-2 py-0.5 text-[10px] font-bold text-ink">
                        {pricing.toggle.save}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* plans */}
        <RevealGroup className="mt-14 grid gap-4 sm:mt-16 lg:grid-cols-3" stagger={0.1}>
          {pricing.plans.map((plan) => (
            <RevealItem key={plan.name} className="h-full">
              <div
                className={`flex h-full flex-col rounded-card p-2 transition-transform duration-500 ease-smooth hover:-translate-y-1.5 ${
                  plan.popular ? 'bg-ink' : 'bg-white'
                }`}
              >
                {/* inner panel */}
                <div
                  className={`flex min-h-[240px] flex-col justify-between rounded-panel p-6 ${
                    plan.popular ? 'bg-ink-card' : 'bg-cream-dim'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        className={`font-display text-[24px] font-semibold ${
                          plan.popular ? 'text-cream' : 'text-ink'
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`mt-1.5 text-[13px] font-medium ${
                          plan.popular ? 'text-muted-soft' : 'text-muted'
                        }`}
                      >
                        {plan.note}
                      </p>
                    </div>
                    {plan.popular && (
                      <span className="rounded-pill bg-gold px-3 py-1.5 text-[11px] font-bold text-ink">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="mt-8">
                    <div className="flex items-end gap-1.5">
                      <span
                        className={`font-display text-[40px] font-bold leading-none ${
                          plan.popular ? 'text-cream' : 'text-ink'
                        }`}
                      >
                        ₹{plan.price[mode]}
                      </span>
                      <span
                        className={`pb-1 text-[14px] font-medium ${
                          plan.popular ? 'text-muted-soft' : 'text-muted'
                        }`}
                      >
                        {plan.unit}
                      </span>
                    </div>

                    <a
                      href="#contact"
                      className={`mt-6 inline-flex w-full items-center justify-center rounded-pill px-6 py-3.5 text-[14px] font-semibold transition-colors duration-500 ${
                        plan.popular
                          ? 'bg-gold text-ink hover:bg-gold-light'
                          : 'bg-ink text-cream hover:bg-ink-soft'
                      }`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </div>

                {/* features */}
                <div className="flex flex-1 flex-col p-5">
                  <p
                    className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${
                      plan.popular ? 'text-muted-soft' : 'text-muted'
                    }`}
                  >
                    Features
                  </p>
                  <ul className="mt-5 flex flex-1 flex-col gap-3.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span
                          className={`text-[14px] font-medium leading-[1.5] ${
                            plan.popular ? 'text-cream/75' : 'text-ink/75'
                          }`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
