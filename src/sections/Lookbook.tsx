import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { BrandPattern } from '../components/BrandPattern'
import { SaveButton } from '../components/SaveButton'
import { PhotoImage } from '../components/PhotoImage'
import { SectionHeading } from '../components/SectionHeading'
import { site } from '../config/site'
import { lookbookItems, type CatalogItem } from '../data/catalog'

const BATCH = 12

type LookbookProps = {
  onOpen: (items: CatalogItem[], index: number) => void
}

export function Lookbook({ onOpen }: LookbookProps) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(BATCH)
  const visible = lookbookItems.slice(0, count)

  if (lookbookItems.length === 0) return null

  return (
    <section id="lookbook" className="relative overflow-hidden py-24 sm:py-32">
      <BrandPattern size={120} />
      <div className="shell relative">
        <SectionHeading eyebrow={site.lookbook.eyebrow} title={site.lookbook.title} intro={site.lookbook.intro} />
        <div className="mt-12 columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
          {visible.map((item, index) => (
            <div key={item.id} className="relative mb-3 break-inside-avoid md:mb-4">
            <SaveButton item={item} floating className="absolute right-3 top-3 z-10" />
            <motion.button
              type="button"
              onClick={() => onOpen(lookbookItems, lookbookItems.findIndex((entry) => entry.id === item.id))}
              className="group block w-full text-left"
              aria-label={`View ${item.name}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -5% 0px' }}
              transition={{ duration: reduce ? 0.2 : 0.6, delay: reduce ? 0 : (index % 4) * 0.05 }}
            >
              <span className="card-media block overflow-hidden rounded-[24px] shadow-[var(--shadow)]">
                <PhotoImage item={item} sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw" />
              </span>
              <span className="mt-3 block font-display text-lg">{item.name}</span>
            </motion.button>
            </div>
          ))}
        </div>
        {count < lookbookItems.length ? (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setCount((value) => value + BATCH)}
              className="btn-shimmer inline-flex min-h-11 items-center justify-center rounded-full bg-fg px-8 font-label text-[0.7rem] font-medium uppercase tracking-[0.2em] text-bg"
            >
              View more
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
