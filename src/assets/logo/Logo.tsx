import { site } from '../../config/site'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/cn'

export type LogoVariant = 'horizontal' | 'vertical' | 'symbol'
export type LogoTone = 'theme' | 'light' | 'dark'

type LogoProps = {
  variant?: LogoVariant
  /** light = ivory ink for dark backgrounds. dark = soft-black ink. theme follows the active theme. */
  tone?: LogoTone
  className?: string
  /** Hide the wordmark from the accessibility tree when a parent already names the link. */
  decorative?: boolean
}

const logoFiles = import.meta.glob('./*.{svg,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function findFile(name: string) {
  const target = name.toLowerCase()
  const match = Object.entries(logoFiles).find(([file]) => file.split('/').pop()?.toLowerCase() === target)
  return match?.[1] ?? null
}

function inkFor(tone: LogoTone, theme: 'light' | 'dark') {
  if (tone === 'light') return 'light' as const
  if (tone === 'dark') return 'dark' as const
  return theme === 'dark' ? ('light' as const) : ('dark' as const)
}

function symbolUrl(ink: 'light' | 'dark') {
  return findFile(ink === 'light' ? 'symbol-on-dark.svg' : 'symbol-on-light.svg') ?? findFile('symbol.svg')
}

function variantUrl(variant: LogoVariant, ink: 'light' | 'dark') {
  return (
    findFile(ink === 'light' ? `${variant}-on-dark.svg` : `${variant}-on-light.svg`) ??
    findFile(`${variant}.svg`)
  )
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 27.5L23.2 16.8L32 24.2L40.8 16.8L48 27.5"
        stroke="var(--antique-gold)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M15 27.5H49" stroke="var(--antique-gold)" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M32 31.2L47.2 41.2L32 55.2L16.8 41.2Z"
        stroke="var(--antique-gold)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M32 31.2V55.2" stroke="var(--antique-gold)" strokeWidth="0.95" strokeLinecap="round" />
    </svg>
  )
}

function SymbolMark({ ink, className }: { ink: 'light' | 'dark'; className?: string }) {
  const url = symbolUrl(ink)
  if (!url) return <Mark className={className} />
  return <img src={url} alt="" className={cn('object-contain', className)} />
}

function Wordmark({ align }: { align: 'start' | 'center' }) {
  return (
    <span className={cn('flex flex-col leading-none', align === 'center' && 'items-center text-center')}>
      <span className="whitespace-nowrap font-display font-normal tracking-[0.28em] [padding-inline-start:0.28em]">
        {site.wordmark}
      </span>
      <span className="mt-[0.42em] whitespace-nowrap font-label text-[0.34em] font-medium uppercase tracking-[0.42em] [padding-inline-start:0.42em]">
        {site.categoryLine}
      </span>
    </span>
  )
}

export function Logo({ variant = 'horizontal', tone = 'theme', className, decorative = false }: LogoProps) {
  const { theme } = useTheme()
  const ink = inkFor(tone, theme)
  const file = variant === 'symbol' ? symbolUrl(ink) : variantUrl(variant, ink)

  const content = file ? (
    <img
      src={file}
      alt={decorative ? '' : site.name}
      className={cn('h-full w-auto max-w-none object-contain', className)}
    />
  ) : variant === 'symbol' ? (
    <SymbolMark ink={ink} className={cn('h-10 w-10', className)} />
  ) : variant === 'vertical' ? (
    <span className={cn('inline-flex flex-col items-center gap-[0.45em] text-[length:var(--logo-size,clamp(2.55rem,6vw,4.4rem))] text-current', className)}>
      <SymbolMark ink={ink} className="h-[0.82em] w-[0.82em]" />
      <Wordmark align="center" />
    </span>
  ) : (
    <span className={cn('inline-flex items-center gap-[0.7em] text-[1.28rem] text-current', className)}>
      <SymbolMark ink={ink} className="h-[2.15em] w-[2.15em] shrink-0" />
      <Wordmark align="start" />
    </span>
  )

  if (decorative) return <span aria-hidden="true">{content}</span>
  return content
}
