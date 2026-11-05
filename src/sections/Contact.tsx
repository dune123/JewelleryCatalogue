import { MapPin, Phone } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { site } from '../config/site'
import { phoneHref } from '../lib/enquiry'

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="shell max-w-xl">
        <Reveal>
          <p className="font-label text-[0.7rem] font-medium uppercase tracking-[0.34em] text-eyebrow">{site.contact.eyebrow}</p>
          <span className="mt-4 block h-px w-12" style={{ backgroundImage: 'var(--gradient-gold)' }} />
          <h2 className="mt-5 font-display text-[clamp(2.05rem,4.4vw,3.45rem)] font-normal leading-[1.12]">{site.contact.title}</h2>

          <ul className="mt-10 space-y-5">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.25} aria-hidden="true" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.25} aria-hidden="true" />
              <p>
                {site.phones.map((phone, index) => {
                  const href = phoneHref(phone.number)
                  const next = site.phones[index + 1]
                  const showLabel = Boolean(phone.label) && phone.label !== next?.label
                  return (
                    <span key={phone.number}>
                      {index > 0 ? ', ' : null}
                      {href ? (
                        <a href={href} className="link-underline">
                          {phone.number}
                        </a>
                      ) : (
                        phone.number
                      )}
                      {showLabel ? <span> ({phone.label})</span> : null}
                    </span>
                  )
                })}
              </p>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
