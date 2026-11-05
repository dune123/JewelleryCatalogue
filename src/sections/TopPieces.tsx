import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { PhotoImage } from '../components/PhotoImage'
import { SaveButton } from '../components/SaveButton'
import { site } from '../config/site'
import { topSellers, type CatalogItem } from '../data/catalog'

type TopPiecesProps = {
  onOpen: (items: CatalogItem[], index: number) => void
}

export function TopPieces({ onOpen }: TopPiecesProps) {
  const reduce = useReducedMotion()
  const scroller = useRef<HTMLDivElement>(null)
  const paused = useRef(false)
  const [canScroll, setCanScroll] = useState(false)
  const [active, setActive] = useState(0)

  function readIndex(el: HTMLDivElement) {
    const card = el.querySelector('article')
    const amount = (card?.getBoundingClientRect().width ?? el.clientWidth) + 16
    return Math.max(0, Math.min(topSellers.length - 1, Math.round(el.scrollLeft / amount)))
  }

  function goTo(index: number) {
    const el = scroller.current
    const card = el?.querySelector('article')
    if (!el || !card) return
    const amount = card.getBoundingClientRect().width + 16
    el.scrollTo({ left: amount * index, behavior: reduce ? 'auto' : 'smooth' })
  }

  function step(direction: 1 | -1) {
    const el = scroller.current
    if (!el) return
    const card = el.querySelector('article')
    const gap = 16
    const amount = (card?.getBoundingClientRect().width ?? el.clientWidth) + gap
    const max = el.scrollWidth - el.clientWidth
    const next = el.scrollLeft + direction * amount
    const left = next > max + 4 ? 0 : next < -4 ? max : next
    el.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' })
  }

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const update = () => setCanScroll(el.scrollWidth - el.clientWidth > 8)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduce || !canScroll) return
    const timer = window.setInterval(() => {
      if (!paused.current) step(1)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [reduce, canScroll])

  if (topSellers.length === 0) return null

  return (
    <section id="top-pieces" aria-roledescription="carousel" aria-label={site.topPieces.title} className="py-12 sm:py-16">
      <div className="shell">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-label text-[0.7rem] font-medium uppercase tracking-[0.34em] text-eyebrow">{site.topPieces.eyebrow}</p>
            <span className="mt-4 block h-px w-12" style={{ backgroundImage: 'var(--gradient-gold)' }} />
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-normal leading-tight">{site.topPieces.title}</h2>
            <p className="mt-3 text-sm text-muted">{site.topPieces.intro}</p>
          </div>
          {canScroll ? (
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous top piece"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--line)] transition-colors duration-300 hover:bg-fg/5"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next top piece"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--line)] transition-colors duration-300 hover:bg-fg/5"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
              </button>
            </div>
          ) : null}
        </div>

        <div
          ref={scroller}
          onMouseEnter={() => {
            paused.current = true
          }}
          onMouseLeave={() => {
            paused.current = false
          }}
          onFocusCapture={() => {
            paused.current = true
          }}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) paused.current = false
          }}
          onScroll={(event) => setActive(readIndex(event.currentTarget))}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {topSellers.map((item, index) => (
            <article key={item.id} className="group w-[78%] shrink-0 snap-start sm:w-[calc((100%-2rem)/3)]">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => onOpen(topSellers, index)}
                  className="block w-full text-left"
                  aria-label={`View ${item.caption ?? item.name}`}
                >
                  <div className="card-media relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[var(--shadow)]">
                    <PhotoImage item={item} fill sizes="(min-width: 768px) 30vw, 78vw" />
                  </div>
                </button>
                <SaveButton item={item} floating className="absolute right-3 top-3 z-10" />
              </div>
              <div className="mt-4">
                <p className="font-label text-[0.68rem] uppercase tracking-[0.18em] text-eyebrow">{item.caption}</p>
                <h3 className="mt-1 font-display text-xl font-normal">{item.name}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {topSellers.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.caption ?? item.name}`}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => goTo(index)}
              className={`h-1 rounded-full transition-[width,background-color] duration-300 ${index === active ? 'w-7 bg-fg' : 'w-2 bg-fg/25'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
