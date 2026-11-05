import { site } from '../config/site'

export function formatPrice(amount: number) {
  const formatted = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)
  return `${site.currency}${formatted}`
}
