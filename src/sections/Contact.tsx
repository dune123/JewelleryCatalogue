import { Mail, MapPin, Phone } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { site } from '../config/site'
import { mailtoHref, phoneHref, whatsappDigits, whatsappHref } from '../lib/enquiry'

const socials = [
  { label: 'Instagram', href: site.social.instagram, path: 'M8 3.5h8A4.5 4.5 0 0 1 20.5 8v8a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 16V8A4.5 4.5 0 0 1 8 3.5Zm8.2 1.7H8A2.8 2.8 0 0 0 5.2 8v8A2.8 2.8 0 0 0 8 18.8h8.2A2.8 2.8 0 0 0 19 16V8a2.8 2.8 0 0 0-2.8-2.8ZM12 8.1A3.9 3.9 0 1 1 8.1 12 3.9 3.9 0 0 1 12 8.1Zm0 1.6A2.3 2.3 0 1 0 14.3 12 2.3 2.3 0 0 0 12 9.7Zm4.35-2.55a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z' },
  { label: 'Facebook', href: site.social.facebook, path: 'M14.2 20.5v-7.1h2.4l.36-2.8h-2.76V8.85c0-.8.22-1.35 1.38-1.35H17V5.02A18 18 0 0 0 14.9 4.9c-2.08 0-3.5 1.27-3.5 3.6v2.1H9v2.8h2.4v7.1Z' },
  { label: 'Pinterest', href: site.social.pinterest, path: 'M12 3.5A8.5 8.5 0 0 0 8.1 19.3c-.04-.7-.08-1.78.18-2.55l1.4-5.92s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.03 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 4-.28 1.2.6 2.17 1.78 2.17 2.13 0 3.57-2.74 3.57-6 0-2.47-1.66-4.32-4.68-4.32-3.41 0-5.53 2.55-5.53 5.4 0 .98.29 1.68.74 2.22.2.24.23.34.16.62l-.27 1.05c-.09.34-.35.46-.65.34-1.5-.61-2.2-2.25-2.2-4.1 0-3.05 2.58-6.7 7.68-6.7 4.1 0 6.8 2.97 6.8 6.16 0 4.22-2.35 7.37-5.82 7.37-1.16 0-2.26-.63-2.64-1.35l-.72 2.74a8.4 8.4 0 0 0 2.66.5A8.5 8.5 0 1 0 12 3.5Z' },
  { label: 'YouTube', href: site.social.youtube, path: 'M20.6 8.2a2.5 2.5 0 0 0-1.76-1.77C17.2 6 12 6 12 6s-5.2 0-6.84.43A2.5 2.5 0 0 0 3.4 8.2 26 26 0 0 0 3 12a26 26 0 0 0 .4 3.8 2.5 2.5 0 0 0 1.76 1.77C6.8 18 12 18 12 18s5.2 0 6.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 21 12a26 26 0 0 0-.4-3.8ZM10.6 14.7V9.3L15.2 12l-4.6 2.7Z' },
]

const fieldClass =
  'min-h-11 w-full rounded-full border border-fg/15 bg-transparent px-5 text-base text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-fg/50'

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', piece: '', message: '' })
  const [error, setError] = useState('')
  const [note, setNote] = useState('')
  const call = phoneHref()

  function compose() {
    return [
      `Name: ${form.name.trim()}`,
      form.phone.trim() ? `Phone: ${form.phone.trim()}` : '',
      form.piece.trim() ? `Piece: ${form.piece.trim()}` : '',
      '',
      form.message.trim(),
    ]
      .filter((line, index, all) => line !== '' || all[index - 1] !== '')
      .join('\n')
  }

  function openEnquiry(kind: 'whatsapp' | 'email') {
    if (!form.name.trim() || !form.message.trim()) {
      setError('Please add your name and a short message.')
      setNote('')
      return
    }
    setError('')
    const body = compose()
    if (kind === 'whatsapp') {
      const href = whatsappHref(body)
      if (!href) {
        setError('Add a WhatsApp number in the site config to use this path.')
        return
      }
      window.open(href, '_blank', 'noopener,noreferrer')
      setNote('Continue the conversation in WhatsApp.')
      return
    }
    const href = mailtoHref(`Enquiry for ${site.name}`, body)
    if (!href) {
      setError('Add an email address in the site config to use this path.')
      return
    }
    window.location.href = href
    setNote('Your email app should open with this enquiry.')
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    openEnquiry(whatsappDigits() ? 'whatsapp' : 'email')
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="shell grid gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal>
          <p className="font-label text-[0.7rem] font-medium uppercase tracking-[0.34em] text-eyebrow">{site.contact.eyebrow}</p>
          <span className="mt-4 block h-px w-12" style={{ backgroundImage: 'var(--gradient-gold)' }} />
          <h2 className="mt-5 font-display text-[clamp(2.05rem,4.4vw,3.45rem)] font-normal leading-[1.12]">{site.contact.title}</h2>
          <p className="mt-5 max-w-md text-muted">{site.contact.intro}</p>

          <ul className="mt-10 space-y-5">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.25} aria-hidden="true" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.25} aria-hidden="true" />
              {call ? (
                <a href={call} className="link-underline">
                  {site.phone}
                </a>
              ) : (
                <span>{site.phone}</span>
              )}
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.25} aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="link-underline break-all">
                {site.email}
              </a>
            </li>
          </ul>

          <ul className="mt-8 flex gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--line)]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path d={social.path} fill="currentColor" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} className="rounded-[24px] bg-card/70 p-6 sm:p-8" noValidate>
            <div className="grid gap-5">
              <label className="block">
                <span className="mb-2 block font-label text-[0.68rem] font-medium uppercase tracking-[0.18em]">Name</span>
                <input
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-label text-[0.68rem] font-medium uppercase tracking-[0.18em]">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-label text-[0.68rem] font-medium uppercase tracking-[0.18em]">Piece</span>
                <input
                  name="piece"
                  value={form.piece}
                  placeholder="Optional"
                  onChange={(event) => setForm((current) => ({ ...current, piece: event.target.value }))}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-label text-[0.68rem] font-medium uppercase tracking-[0.18em]">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  className={`${fieldClass} min-h-32 resize-y rounded-3xl py-4`}
                />
              </label>
            </div>
            {error ? (
              <p role="alert" className="mt-4 text-sm text-fg">
                {error}
              </p>
            ) : null}
            {note ? <p className="mt-4 text-sm text-muted">{note}</p> : null}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="btn-shimmer inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-fg px-6 font-label text-[0.7rem] font-medium uppercase tracking-[0.18em] text-bg"
              >
                {whatsappDigits() ? 'Send on WhatsApp' : 'Send by email'}
              </button>
              <button
                type="button"
                onClick={() => openEnquiry('email')}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-6 font-label text-[0.7rem] font-medium uppercase tracking-[0.18em] shadow-[inset_0_0_0_1px_var(--line)]"
              >
                Email instead
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
