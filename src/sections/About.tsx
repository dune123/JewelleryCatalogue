import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { BrandPattern } from '../components/BrandPattern'
import { PhotoImage } from '../components/PhotoImage'
import { Reveal } from '../components/Reveal'
import { site } from '../config/site'
import { heroItems } from '../data/catalog'

export function About() {
  const reduce = useReducedMotion()
  const frame = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? '0%' : '6%', reduce ? '0%' : '-6%'])
  const portrait = heroItems[1] ?? heroItems[0]

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <BrandPattern />
      <div className="shell relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal>
          <p className="font-label text-[0.7rem] font-medium uppercase tracking-[0.34em] text-eyebrow">{site.about.eyebrow}</p>
          <span className="mt-4 block h-px w-12" style={{ backgroundImage: 'var(--gradient-gold)' }} />
          <h2 className="mt-5 font-display text-[clamp(2.05rem,4.4vw,3.45rem)] font-normal leading-[1.12]">{site.about.title}</h2>
          <div className="mt-6 space-y-5 text-muted">
            {site.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {portrait ? (
          <div ref={frame} className="relative">
            <div className="relative overflow-hidden rounded-[24px] shadow-[var(--shadow)]" style={{ aspectRatio: portrait.aspectRatio }}>
              <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] h-[116%]">
                <PhotoImage item={portrait} fill sizes="(min-width: 1024px) 46vw, 92vw" />
              </motion.div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
