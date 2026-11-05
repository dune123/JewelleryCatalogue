import { ArrowUpRight } from 'lucide-react'
import { site } from '../config/site'
import { enquireHref } from '../lib/enquiry'
import { cn } from '../lib/cn'

type EnquireButtonProps = {
  name: string
  className?: string
  inverse?: boolean
}

export function EnquireButton({ name, className, inverse = false }: EnquireButtonProps) {
  const href = enquireHref(name)
  if (!href) return null
  const external = href.startsWith('http')

  return (
    <a
      href={href}
      className={cn(
        'btn-shimmer inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 font-label text-[0.68rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300',
        inverse
          ? 'text-ivory shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--ivory)_45%,transparent)] hover:bg-ivory/10'
          : 'text-fg shadow-[inset_0_0_0_1px_var(--line)] hover:bg-fg/5',
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {site.enquireLabel}
      <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
    </a>
  )
}
