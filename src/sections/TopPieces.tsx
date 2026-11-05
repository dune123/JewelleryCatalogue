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
  const activeRef = useRef(0)
  const [canScroll, setCanScroll] = useState(false)
  const [active, setActive] = useState(0)
  const [stops, setStops] = useState(1)

  function cards(el: HTMLDivElement) {
    return [...el.querySelectorAll<HTMLElement>(':scope > article')]
  }

  function stopPositions(el: HTMLDivElement) {
    const slides = cards(el)
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth)
    const positions = [0]
    for (let index = 1; index < slides.length; index += 1) {
      const left = Math.min(slides[index].offsetLeft, maxScroll)
      if (left <= positions[positions.length - 1] + 1) continue
      positions.push(left)
      if (left >= maxScroll - 1) break
    }
    return positions
  }

  function nearestStop(el: HTMLDivElement) {
    const positions = stopPositions(el)
    let best = 0
    let bestDistance = Number.POSITIVE_INFINITY
    positions.forEach((left, index) => {
      const distance = Math.abs(left - el.scrollLeft)
      if (distance < bestDistance) {
        best = index
        bestDistance = distance
      }
    })
    return best
  }

  function scrollToIndex(index: number) {
    const el = scroller.current
    if (!el) return
    const positions = stopPositions(el)
    const count = positions.length
    const next = ((index % count) + count) % count
    activeRef.current = next
    setActive(next)
    setStops(count)
    el.scrollTo({ left: positions[next], behavior: 'auto' })
  }

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const update = () => {
      const positions = stopPositions(el)
      setCanScroll(el.scrollWidth - el.clientWidth > 8)
      setStops(positions.length)
      if (activeRef.current > positions.length - 1) {
        activeRef.current = positions.length - 1
        setActive(positions.length - 1)
        el.scrollTo({ left: positions[positions.length - 1], behavior: 'auto' })
      }
    }
    const onScrollEnd = () => {
      const positions = stopPositions(el)
      const index = nearestStop(el)
      activeRef.current = index
      setActive(index)
      setStops(positions.length)
      if (Math.abs(el.scrollLeft - positions[index]) > 2) {
        el.scrollTo({ left: positions[index], behavior: 'auto' })
      }
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    el.addEventListener('scrollend', onScrollEnd)
    return () => {
      observer.disconnect()
      el.removeEventListener('scrollend', onScrollEnd)
    }
  }, [])

  useEffect(() => {
    if (reduce || !canScroll) return
    const timer = window.setInterval(() => {
      if (!paused.current) scrollToIndex(activeRef.current + 1)
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
                onClick={() => scrollToIndex(activeRef.current - 1)}
                aria-label="Previous top piece"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--line)] transition-colors duration-300 hover:bg-fg/5"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(activeRef.current + 1)}
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
          className="relative mt-8 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {topSellers.map((item, index) => (
            <article key={item.id} className="group w-full min-w-0 shrink-0 sm:w-[calc((100%-2rem)/3)]">
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
                <p className="font-label text-[0.68rem] uppercase leading-relaxed tracking-[0.18em] text-eyebrow">{item.caption}</p>
                <h3 className="mt-1 font-display text-xl font-normal">{item.name}</h3>
              </div>
            </article>
          ))}
        </div>

        {stops > 1 ? (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: stops }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show ${topSellers[index]?.caption ?? topSellers[index]?.name ?? `group ${index + 1}`}`}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => scrollToIndex(index)}
                className={`h-1 rounded-full transition-[width,background-color] duration-300 ${index === active ? 'w-7 bg-fg' : 'w-2 bg-fg/25'}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
