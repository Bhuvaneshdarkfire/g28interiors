import { useState } from 'react'
import { Phone, Mail, MapPin, UserRound, Send, Check } from 'lucide-react'
import { Reveal, Pill, ArrowLink } from './ui/primitives'
import { contact, form, brand } from '../data/content'

export default function Contact() {
  const [state, setState] = useState({ status: 'idle', name: '' })

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const phone = String(data.get('phone') || '').trim()

    if (!name || !phone) {
      setState({ status: 'error', name })
      return
    }

    const text =
      `New Project Inquiry — G28 Interiors\n` +
      `Name: ${name}\n` +
      `Company / Project Type: ${data.get('company') || '—'}\n` +
      `Approx. Sq. Ft.: ${data.get('sqft') || '—'}\n` +
      `Phone: ${phone}\n` +
      `Message: ${data.get('message') || '—'}`

    setState({ status: 'sent', name })
    e.currentTarget.reset()
    window.open(`${contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  return (
    <section id="contact" className="py-6 sm:py-8">
      <div className="shell">
        <div className="relative overflow-hidden rounded-card bg-ink px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
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
            className="pointer-events-none absolute -bottom-40 -left-32 h-[460px] w-[460px] rounded-full bg-gold/15 blur-[140px]"
          />

          <div className="relative grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            {/* details */}
            <div>
              <Reveal>
                <Pill tone="darkGhost" className="mb-6">
                  Get in touch
                </Pill>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="h-section text-cream">
                  Let&apos;s build your
                  <br />
                  <span className="text-gold">workspace.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="body-txt mt-6 max-w-[420px] text-muted-soft">
                  Share your space, your headcount and your timeline. We&apos;ll come back with a
                  concept direction and a transparent turnkey quotation.
                </p>
              </Reveal>

              <div className="mt-10 flex flex-col gap-7">
                <Reveal delay={0.16}>
                  <a href={`tel:${contact.phoneLinks[0]}`} className="group flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/15 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-soft">
                        Phone
                      </span>
                      <span className="mt-1.5 block text-[16px] font-semibold text-cream transition-colors group-hover:text-gold">
                        {contact.phones[0]}
                      </span>
                      <span className="block text-[16px] font-semibold text-cream/60">
                        {contact.phones[1]}
                      </span>
                    </span>
                  </a>
                </Reveal>

                <Reveal delay={0.2}>
                  <a href={`mailto:${contact.email}`} className="group flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/15 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-soft">
                        Email
                      </span>
                      <span className="mt-1.5 block break-all text-[16px] font-semibold text-cream transition-colors group-hover:text-gold">
                        {contact.email}
                      </span>
                    </span>
                  </a>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/15 text-gold">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-soft">
                        Studio Address
                      </span>
                      <span className="mt-1.5 block max-w-[300px] text-[15px] font-medium leading-relaxed text-cream/75">
                        {contact.address}
                      </span>
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.28}>
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/15 text-gold">
                      <UserRound className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-soft">
                        Founder
                      </span>
                      <span className="mt-1.5 block font-display text-[20px] font-semibold text-cream">
                        {contact.founder}
                      </span>
                      <span className="block text-[13px] font-medium text-muted">
                        {contact.founderRole}
                      </span>
                    </span>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.32}>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <ArrowLink href={contact.whatsapp} tone="accent">
                    Chat on WhatsApp
                  </ArrowLink>
                  <span className="text-[14px] font-medium text-muted-soft">{brand.tagline}</span>
                </div>
              </Reveal>
            </div>

            {/* form */}
            <Reveal delay={0.1}>
              <div className="rounded-card border border-cream/[0.1] bg-ink-soft/70 p-6 sm:p-9">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-[26px] font-semibold text-cream">
                      {form.heading}
                    </h3>
                    <p className="mt-2 text-[13px] font-medium text-muted-soft">{form.note}</p>
                  </div>
                  <span className="hidden h-11 w-11 place-items-center rounded-full border border-gold/35 text-gold sm:grid">
                    <Send className="h-4 w-4" />
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6" noValidate>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {form.fields.slice(0, 2).map((f) => (
                      <Field key={f.name} {...f} />
                    ))}
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {form.fields.slice(2).map((f) => (
                      <Field key={f.name} {...f} />
                    ))}
                  </div>

                  <label className="block">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold/80">
                      {form.message.label}
                    </span>
                    <textarea
                      name={form.message.name}
                      rows={3}
                      placeholder={form.message.placeholder}
                      className="mt-2 w-full resize-none border-0 border-b border-cream/20 bg-transparent px-0.5 py-3 text-[15px] font-medium text-cream outline-none transition-colors duration-300 placeholder:text-cream/30 focus:border-gold"
                    />
                  </label>

                  <button type="submit" className="btn-accent mt-1 w-full justify-center">
                    {form.submit}
                  </button>

                  {state.status !== 'idle' && (
                    <p
                      className={`flex items-center justify-center gap-2 text-center text-[13px] font-medium ${
                        state.status === 'error' ? 'text-gold-light' : 'text-cream/70'
                      }`}
                    >
                      {state.status === 'error' ? (
                        'Please share your name and phone number so we can reach you.'
                      ) : (
                        <>
                          <Check className="h-4 w-4 text-gold" />
                          Thank you, {state.name}. Opening WhatsApp so we can respond immediately…
                        </>
                      )}
                    </p>
                  )}
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ name, label, type, placeholder, required }) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold/80">
        {label}
        {required && ' *'}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border-0 border-b border-cream/20 bg-transparent px-0.5 py-3 text-[15px] font-medium text-cream outline-none transition-colors duration-300 placeholder:text-cream/30 focus:border-gold"
      />
    </label>
  )
}
