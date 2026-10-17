import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal, EASE } from './ui/primitives'
import { faq } from '../data/content'

export default function Faq() {
  const [cat, setCat] = useState('General')
  const [open, setOpen] = useState(0)

  const items = useMemo(() => faq.items.filter((i) => i.cat === cat), [cat])

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <h2 className="h-section text-ink">{faq.heading}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="body-txt mt-6 max-w-[380px] text-muted">{faq.body}</p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-9 flex flex-wrap gap-2">
                {faq.categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCat(c)
                      setOpen(0)
                    }}
                    className={`rounded-pill px-5 py-2.5 text-[13px] font-semibold transition-colors duration-500 ease-smooth ${
                      cat === c
                        ? 'bg-ink text-cream'
                        : 'bg-ink/[0.06] text-ink/60 hover:bg-ink/10 hover:text-ink'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col">
            {items.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q} className="border-t border-ink/[0.1] last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="h-sub max-w-[520px] text-ink">{item.q}</span>
                    <span
                      className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-smooth ${
                        isOpen ? 'rotate-45 border-gold bg-gold text-ink' : 'border-ink/15 text-ink/60'
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="body-txt max-w-[560px] pb-7 pr-4 text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
