import { MapPin, Phone } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { site } from '../config/site'
import { phoneHref } from '../lib/enquiry'

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <p className="font-label text-[0.7rem] font-medium uppercase tracking-[0.34em] text-eyebrow">{site.contact.eyebrow}</p>
          <span className="mt-4 block h-px w-12" style={{ backgroundImage: 'var(--gradient-gold)' }} />
          <h2 className="mt-5 font-display text-[clamp(2.05rem,4.4vw,3.45rem)] font-normal leading-[1.12]">{site.contact.title}</h2>

          <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-card/70 p-6 sm:p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--line)]">
                <MapPin className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
              </span>
              <p className="mt-5 text-pretty leading-relaxed">{site.address}</p>
            </div>
            <div className="rounded-[24px] bg-card/70 p-6 sm:p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--line)]">
                <Phone className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
              </span>
              <ul className="mt-5">
              {site.phones.map((phone) => {
                const href = phoneHref(phone.number)
                return (
                  <li key={phone.number} className="border-t border-fg/10 first:border-t-0">
                    {href ? (
                      <a href={href} className="link-underline inline-flex min-h-11 items-center">
                        {phone.number}
                        {phone.label ? <span className="ml-2 text-muted">({phone.label})</span> : null}
                      </a>
                    ) : (
                      <span className="inline-flex min-h-11 items-center">
                        {phone.number}
                        {phone.label ? <span className="ml-2 text-muted">({phone.label})</span> : null}
                      </span>
                    )}
                  </li>
                )
              })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
