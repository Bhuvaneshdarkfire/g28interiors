import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import Logo from './ui/Logo'
import { ArrowLink, EASE } from './ui/primitives'
import { nav, contact, brand } from '../data/content'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth ${
          scrolled ? 'py-2' : 'py-3.5'
        }`}
      >
        <div className="shell">
          <div
            className={`flex items-center justify-between rounded-pill px-4 py-2.5 transition-all duration-500 ease-smooth sm:px-5 ${
              scrolled
                ? 'border border-ink/[0.07] bg-cream/85 shadow-[0_18px_40px_-28px_rgba(8,37,28,.5)] backdrop-blur-xl'
                : 'border border-transparent bg-transparent'
            }`}
          >
            <a href="#top" className="shrink-0">
              <Logo compact={scrolled} />
            </a>

            {/* desktop links */}
            <nav className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative text-[15px] font-semibold text-ink/75 transition-colors duration-300 hover:text-gold-deep"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-smooth group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${contact.phoneLinks[0]}`}
                className="hidden items-center gap-2 text-[14px] font-semibold text-ink/70 transition-colors hover:text-ink xl:flex"
              >
                <Phone className="h-3.5 w-3.5 text-gold" />
                {contact.phones[0]}
              </a>

              <a href="#contact" className="btn-accent hidden !px-6 !py-3 !text-[13px] sm:inline-flex">
                Book Consultation
              </a>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="grid h-10 w-10 place-items-center rounded-[10px] bg-ink text-cream transition-colors duration-300 hover:bg-ink-soft"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- overlay menu ---------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="flex h-full flex-col">
              <div className="shell flex items-center justify-between py-5">
                <Logo tone="light" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-[10px] border border-cream/20 text-cream transition-colors duration-300 hover:bg-cream/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="shell grid flex-1 content-center gap-14 pb-10 lg:grid-cols-[1.2fr_0.8fr]">
                <nav className="flex flex-col">
                  {nav.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, y: 34 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.08 + i * 0.06, ease: EASE }}
                      className="group flex items-baseline justify-between border-b border-cream/10 py-4 text-cream transition-colors hover:text-gold"
                    >
                      <span className="font-display text-[34px] font-bold leading-none sm:text-[48px]">
                        {item.label}
                      </span>
                      <span className="text-[12px] font-semibold text-cream/30">
                        0{i + 1}
                      </span>
                    </motion.a>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                  className="flex flex-col gap-6 lg:pl-10"
                >
                  <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-cream/35">
                    {brand.tagline}
                  </p>
                  <a
                    href={`tel:${contact.phoneLinks[0]}`}
                    className="flex items-start gap-3 text-cream/75 transition-colors hover:text-gold"
                  >
                    <Phone className="mt-0.5 h-4 w-4 text-gold" />
                    <span className="text-[15px] font-semibold">
                      {contact.phones[0]}
                      <br />
                      {contact.phones[1]}
                    </span>
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-3 text-cream/75 transition-colors hover:text-gold"
                  >
                    <Mail className="mt-0.5 h-4 w-4 text-gold" />
                    <span className="text-[15px] font-semibold">{contact.email}</span>
                  </a>
                  <p className="flex items-start gap-3 text-cream/50">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="text-[14px] leading-relaxed">{contact.address}</span>
                  </p>
                  <ArrowLink href={contact.whatsapp} tone="accent" className="mt-2">
                    Chat on WhatsApp
                  </ArrowLink>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
