import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { EnquireButton } from '../components/EnquireButton'
import { SaveButton } from '../components/SaveButton'
import { PhotoImage } from '../components/PhotoImage'
import { Price } from '../components/Price'
import { SectionHeading } from '../components/SectionHeading'
import { site } from '../config/site'
import { catalog, type CatalogItem } from '../data/catalog'

const BATCH = 12

type CollectionsProps = {
  onOpen: (items: CatalogItem[], index: number) => void
}

export function Collections({ onOpen }: CollectionsProps) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(BATCH)
  const visible = catalog.slice(0, count)

  return (
    <section id="collections" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading eyebrow={site.collections.eyebrow} title={site.collections.title} intro={site.collections.intro} />

        <p className="mt-10 font-label text-[0.68rem] uppercase tracking-[0.18em] text-muted" aria-live="polite">
          {catalog.length === 0 ? 'Nothing in this edit yet' : `${Math.min(count, catalog.length)} of ${catalog.length}`}
        </p>

        {visible.length === 0 ? (
          <p className="mt-16 max-w-md text-muted">
            {catalog.length === 0
              ? 'Photographs will appear here after they are added to jewelleryPhotos and the image script is run.'
              : 'No pieces in this collection yet.'}
          </p>
        ) : (
          <motion.div layout className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-y-12 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map((item) => (
                <motion.article
                  layout
                  key={item.id}
                  data-style={item.photoStyle}
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => onOpen(catalog, catalog.findIndex((entry) => entry.id === item.id))}
                    className="block text-left"
                    aria-label={`View ${item.name}`}
                  >
                    <div className="card-media relative overflow-hidden rounded-[24px] shadow-[var(--shadow)]">
                      <PhotoImage item={item} />
                      {item.onSale ? (
                        <span className="absolute left-3 top-3 bg-bronzed px-2.5 py-1 font-price text-sm uppercase tracking-[0.14em] text-ivory">
                          Sale
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-4 font-display text-[clamp(1.05rem,1.4vw,1.35rem)] font-normal leading-tight">{item.name}</h3>
                  </button>
                  <div className="mt-2">
                    <Price item={item} />
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    <EnquireButton name={item.name} />
                    <SaveButton item={item} />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {count < catalog.length ? (
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
