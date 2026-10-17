import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal, EASE } from './ui/primitives'
import { values } from '../data/content'

export default function Values() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <h2 className="h-section text-ink">{values.heading}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="body-txt mt-6 max-w-[400px] text-muted">{values.body}</p>
            </Reveal>
          </div>

          <div className="flex flex-col">
            {values.items.map((item, i) => {
              const isOpen = open === i
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="border-t border-ink/[0.1] last:border-b">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-6 py-7 text-left"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="text-[13px] font-semibold text-gold-deep">
                          0{i + 1}
                        </span>
                        <span className="h-card text-ink">{item.title}</span>
                      </span>
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-smooth ${
                          isOpen
                            ? 'rotate-45 border-gold bg-gold text-ink'
                            : 'border-ink/15 text-ink/60'
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
                          transition={{ duration: 0.5, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="body-txt max-w-[620px] pb-8 pr-4 text-muted">
                            {item.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
