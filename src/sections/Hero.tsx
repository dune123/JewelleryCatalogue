import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Logo, Mark } from '../assets/logo/Logo'
import { site } from '../config/site'
import { heroItems } from '../data/catalog'
import { PhotoImage } from '../components/PhotoImage'

export function Hero() {
  const reduce = useReducedMotion()
  const frame = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%'])
  const [index, setIndex] = useState(0)
  const items = heroItems

  useEffect(() => {
    if (reduce || items.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [items.length, reduce])

  const current = items[index]

  return (
    <section ref={frame} id="top" className="relative h-[100svh] overflow-hidden bg-night text-ivory">
      <motion.div style={{ y }} aria-hidden="true" className="absolute inset-x-0 -top-[8%] h-[116%]">
        {items.map((item, itemIndex) => {
          const nearby = items.length < 2 || itemIndex === index || itemIndex === (index + 1) % items.length
          if (!nearby) return null
          return (
            <div
              key={item.id}
              className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
              style={{ opacity: itemIndex === index ? 1 : 0 }}
            >
              <PhotoImage
                item={item}
                fill
                priority={itemIndex === 0}
                sizes="100vw"
                alt=""
              />
            </div>
          )
        })}
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink/88 via-ink/58 to-transparent" />

      <Mark className="pointer-events-none absolute left-1/2 top-1/2 h-[42vh] w-[42vh] -translate-x-1/2 -translate-y-[58%] opacity-[0.07]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center">
        <h1 className="[text-shadow:0_12px_28px_rgba(32,33,35,0.45)]">
          <Logo variant="vertical" tone="light" className="[--logo-size:clamp(2.35rem,4.6vw,3.5rem)]" />
        </h1>
        <p className="mt-6 max-w-md font-label text-[0.72rem] font-medium uppercase tracking-[0.38em] text-ivory sm:text-[0.78rem]">
          {site.tagline}
        </p>
        <a
          href="#collections"
          className="btn-shimmer mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-ivory px-8 font-label text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--antique-gold)_70%,transparent)]"
        >
          {site.heroCta}
        </a>
        <a href="#about" className="on-photo mt-6 flex h-12 items-end justify-center text-ivory">
          <span className="sr-only">Scroll to the house story</span>
          <span className="scroll-cue block h-10 w-px" style={{ backgroundImage: 'var(--gradient-gold)' }} />
        </a>
      </div>

      <p className="sr-only" aria-live="polite">
        {current ? current.alt : `${site.name} catalogue`}
      </p>
    </section>
  )
}
