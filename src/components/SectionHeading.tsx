import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  intro?: string
}

export function SectionHeading({ eyebrow, title, intro }: SectionHeadingProps) {
  return (
    <Reveal className="max-w-2xl">
      <p className="font-label text-[0.7rem] font-medium uppercase tracking-[0.34em] text-eyebrow">{eyebrow}</p>
      <span className="mt-4 block h-px w-12" style={{ backgroundImage: 'var(--gradient-gold)' }} />
      <h2 className="mt-5 font-display text-[clamp(2.05rem,4.4vw,3.45rem)] font-normal leading-[1.12]">{title}</h2>
      {intro ? <p className="mt-5 max-w-xl text-muted">{intro}</p> : null}
    </Reveal>
  )
}
