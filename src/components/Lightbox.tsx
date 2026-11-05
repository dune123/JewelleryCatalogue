import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { CatalogItem } from '../data/catalog'
import { EnquireButton } from './EnquireButton'
import { SaveButton } from './SaveButton'
import { Price } from './Price'

export type LightboxState = {
  items: CatalogItem[]
  index: number
}

type LightboxProps = {
  items: CatalogItem[]
  index: number
  onClose: () => void
  onIndex: (index: number) => void
}

function fullSource(item: CatalogItem) {
  return item.sources.at(-1) ?? item.sources[0]
}

export function Lightbox({ items, index, onClose, onIndex }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(index)
  const lengthRef = useRef(items.length)
  const [loaded, setLoaded] = useState(false)
  const item = items[index]
  const touchStart = useRef<number | null>(null)
  indexRef.current = index
  lengthRef.current = items.length

  useEffect(() => {
    setLoaded(false)
  }, [item?.id])

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusable = () =>
      Array.from(dialog?.querySelectorAll<HTMLElement>('a, button') ?? []).filter((node) => !node.hasAttribute('disabled'))

    const frame = window.requestAnimationFrame(() => focusable()[0]?.focus())

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onIndex((indexRef.current + 1) % lengthRef.current)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onIndex((indexRef.current - 1 + lengthRef.current) % lengthRef.current)
      }
      if (event.key !== 'Tab') return
      const nodes = focusable()
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previous?.focus()
    }
  }, [onClose, onIndex])

  useEffect(() => {
    const links: HTMLLinkElement[] = []
    for (const offset of [-1, 0, 1]) {
      const neighbour = items[(index + offset + items.length) % items.length]
      const source = neighbour ? fullSource(neighbour) : undefined
      if (!source) continue
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = source.webp
      document.head.appendChild(link)
      links.push(link)
    }
    return () => {
      for (const link of links) link.remove()
    }
  }, [index, items])

  if (!item) return null
  const source = fullSource(item)
  if (!source) return null

  const showPrevious = () => onIndex((index - 1 + items.length) % items.length)
  const showNext = () => onIndex((index + 1) % items.length)

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 text-ivory"
    >
      <div className="pad-safe flex items-center justify-between gap-4 py-4">
        <p className="font-label text-[0.68rem] uppercase tracking-[0.22em] text-ivory/80">
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photograph"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--ivory)_40%,transparent)]"
        >
          <X className="h-5 w-5" strokeWidth={1.25} />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16"
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse' && event.button !== 0) return
          touchStart.current = event.clientX
        }}
        onPointerUp={(event) => {
          if (touchStart.current == null) return
          const delta = event.clientX - touchStart.current
          touchStart.current = null
          if (delta > 48) showPrevious()
          else if (delta < -48) showNext()
        }}
      >
        <img
          key={source.webp}
          src={source.webp}
          alt={item.alt}
          width={source.width}
          height={source.height}
          onLoad={() => setLoaded(true)}
          className={`max-h-[68svh] w-auto max-w-full rounded-[24px] object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous photograph"
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--ivory)_35%,transparent)] sm:left-5"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next photograph"
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--ivory)_35%,transparent)] sm:right-5"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </>
        ) : null}
      </div>

      <div className="pad-safe mx-auto flex w-full max-w-3xl flex-col items-start gap-4 py-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-normal">{item.name}</h2>
          {item.description ? <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/80">{item.description}</p> : null}
          <div className="mt-3">
            <Price item={item} inverse />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto">
          <EnquireButton name={item.name} inverse />
          <SaveButton item={item} inverse />
        </div>
      </div>
      <p className="sr-only">Use the left and right arrow keys to move between photographs. Press escape to close.</p>
    </div>
  )
}
