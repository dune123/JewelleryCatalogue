import { X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { site } from '../config/site'
import { useCart } from '../hooks/useCart'
import { mailtoHref, whatsappHref } from '../lib/enquiry'

function selectionMessage(lines: string[]) {
  return `Hello ${site.name}, I would like to enquire about these pieces:\n${lines.join('\n')}`
}

export function CartDrawer() {
  const { items, isOpen, closeCart, remove, clear } = useCart()
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previous = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusable = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a, button') ?? []).filter((node) => !node.hasAttribute('disabled'))

    const frame = window.requestAnimationFrame(() => focusable()[0]?.focus())

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart()
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
  }, [isOpen, closeCart])

  const lines = items.map((item) => `${item.number} — ${item.name}`)
  const message = selectionMessage(lines)
  const enquire = whatsappHref(message) ?? mailtoHref(`Enquiry: ${lines.join(', ')}`, message)

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            type="button"
            aria-label="Close saved pieces"
            className="absolute inset-0 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.35 }}
            onClick={closeCart}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Saved pieces"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-bg text-fg shadow-[var(--shadow)]"
            initial={{ x: reduce ? 0 : 28, opacity: reduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduce ? 0 : 28, opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pad-safe flex items-center justify-between gap-4 border-b border-fg/10 py-4">
              <div>
                <p className="font-label text-[0.68rem] uppercase tracking-[0.22em] text-eyebrow">Your selection</p>
                <h2 className="mt-1 font-display text-3xl font-normal">Saved pieces</h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close saved pieces"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--line)]"
              >
                <X className="h-5 w-5" strokeWidth={1.25} />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="pad-safe py-10 text-muted">
                Nothing saved yet. Save a piece from the collection and it will stay in this browser.
              </p>
            ) : (
              <ul className="min-h-0 flex-1 space-y-4 overflow-y-auto px-[max(1.25rem,env(safe-area-inset-left))] py-6 pr-[max(1.25rem,env(safe-area-inset-right))]">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt=""
                      width={72}
                      height={96}
                      className="h-24 w-[4.5rem] rounded-2xl bg-card object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-price text-2xl leading-none tracking-[0.06em]">{item.number}</p>
                      <p className="mt-1 truncate font-display text-xl">{item.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      className="inline-flex min-h-11 items-center px-2 font-label text-[0.68rem] uppercase tracking-[0.16em] text-muted"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {items.length > 0 ? (
              <div className="pad-safe space-y-3 border-t border-fg/10 py-4">
                <p className="text-sm text-muted">Saved on this browser only. Enquire when you are ready.</p>
                {enquire ? (
                  <a
                    href={enquire}
                    {...(enquire.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="btn-shimmer inline-flex min-h-11 w-full items-center justify-center rounded-full bg-fg px-6 font-label text-[0.7rem] font-medium uppercase tracking-[0.18em] text-bg"
                  >
                    Enquire about these pieces
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full font-label text-[0.7rem] font-medium uppercase tracking-[0.18em] shadow-[inset_0_0_0_1px_var(--line)]"
                >
                  Clear selection
                </button>
              </div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
