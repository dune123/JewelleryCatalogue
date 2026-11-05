import { site } from '../config/site'

export function enquireMessage(pieceName?: string) {
  if (!pieceName) {
    return `Hello ${site.name}, I would like to enquire about a piece from the catalogue.`
  }
  return `Hello ${site.name}, I would like to enquire about ${pieceName}.`
}

export function whatsappDigits() {
  return site.whatsappNumber.replace(/\D/g, '')
}

export function whatsappHref(message: string) {
  const digits = whatsappDigits()
  if (!digits) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function mailtoHref(subject: string, body: string) {
  if (!site.email.trim()) return null
  const params = new URLSearchParams({ subject, body })
  return `mailto:${site.email}?${params.toString()}`
}

export function phoneHref(number: string) {
  const digits = number.replace(/\D/g, '')
  return digits ? `tel:+91${digits}` : null
}

/** WhatsApp when a number is set, otherwise email. */
export function enquireHref(pieceName: string) {
  const message = enquireMessage(pieceName)
  return whatsappHref(message) ?? mailtoHref(`Enquiry: ${pieceName}`, message)
}
