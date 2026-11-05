import { Bookmark, Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '../assets/logo/Logo'
import { site } from '../config/site'
import { useCart } from '../hooks/useCart'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { href: '#top-pieces', label: 'Dhanteras special' },
  { href: '#collections', label: 'Collections' },
  { href: '#lookbook', label: 'Lookbook' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const solid = scrolled || open
  const { count, openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const menu = menuRef.current
    const focusable = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>('a, button') ?? []).filter((node) => !node.hasAttribute('disabled'))

    focusable()[0]?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
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
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previous?.focus()
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${
        solid ? 'bg-bg/90 text-fg shadow-[0_1px_0_var(--line)] backdrop-blur-md' : 'bg-transparent text-ivory'
      }`}
    >
      <div className="pad-safe relative z-50 mx-auto flex h-[var(--header-h)] max-w-[1440px] items-center justify-between gap-4">
        <a href="#top" aria-label={site.name} className={`rounded-sm ${solid ? '' : 'on-photo'}`}>
          <span className="hidden min-[400px]:inline-flex">
            <Logo variant="horizontal" tone={solid ? 'theme' : 'light'} decorative />
          </span>
          <span className="inline-flex min-[400px]:hidden">
            <Logo variant="symbol" decorative className="h-10 w-10" />
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 min-[900px]:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`link-underline font-label text-[0.7rem] font-medium uppercase tracking-[0.22em] ${solid ? '' : 'on-photo'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              openCart()
            }}
            aria-label={count === 0 ? 'Saved pieces' : `Saved pieces, ${count}`}
            className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--line)] ${solid ? '' : 'on-photo'}`}
          >
            <Bookmark className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.25} fill={count > 0 ? 'currentColor' : 'none'} />
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-fg px-1 font-price text-sm leading-none text-bg">
                {count}
              </span>
            ) : null}
          </button>
          <ThemeToggle />
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--line)] min-[900px]:hidden ${solid ? '' : 'on-photo'}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.25} /> : <Menu className="h-5 w-5" strokeWidth={1.25} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg text-fg min-[900px]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-[var(--header-h)]" />
            <nav aria-label="Mobile" className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center font-display text-[clamp(2.2rem,8vw,3rem)] leading-none"
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: reduce ? 0 : 0.08 * index }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
