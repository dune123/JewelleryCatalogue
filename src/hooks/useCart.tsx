import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { catalog, type CatalogItem } from '../data/catalog'

const STORAGE_KEY = 'prince-cart'

export type SavedPiece = {
  id: string
  number: string
  name: string
  image: string
}

type CartContextValue = {
  items: SavedPiece[]
  count: number
  isOpen: boolean
  has: (id: string) => boolean
  toggle: (item: CatalogItem) => void
  remove: (id: string) => void
  clear: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function pieceNumber(item: CatalogItem) {
  const match = item.name.match(/(\d+)\s*$/)
  return match?.[1] ?? item.id.replace(/^IMG_/, '')
}

export function toSavedPiece(item: CatalogItem): SavedPiece {
  return {
    id: item.id,
    number: pieceNumber(item),
    name: item.name,
    image: item.sources[0]?.webp ?? item.sources[0]?.jpeg ?? '',
  }
}

function isSavedPiece(value: unknown): value is SavedPiece {
  if (!value || typeof value !== 'object') return false
  const piece = value as Partial<SavedPiece>
  return typeof piece.id === 'string' && typeof piece.number === 'string' && typeof piece.name === 'string' && typeof piece.image === 'string'
}

export function readCart(): SavedPiece[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isSavedPiece)
  } catch {
    return []
  }
}

function writeCart(items: SavedPiece[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Private mode can refuse storage. The selection still works until refresh.
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SavedPiece[]>(readCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    writeCart(items)
  }, [items])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setItems(readCart())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    setItems((current) => {
      let changed = false
      const next = current.map((entry) => {
        const live = catalog.find((item) => item.id === entry.id)
        if (!live) return entry
        const fresh = toSavedPiece(live)
        if (fresh.number !== entry.number || fresh.name !== entry.name || fresh.image !== entry.image) {
          changed = true
          return fresh
        }
        return entry
      })
      return changed ? next : current
    })
  }, [])

  const has = useCallback((id: string) => items.some((item) => item.id === id), [items])

  const toggle = useCallback((item: CatalogItem) => {
    setItems((current) => {
      if (current.some((entry) => entry.id === item.id)) return current.filter((entry) => entry.id !== item.id)
      return [...current, toSavedPiece(item)]
    })
  }, [])

  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ items, count: items.length, isOpen, has, toggle, remove, clear, openCart, closeCart }),
    [items, isOpen, has, toggle, remove, clear, openCart, closeCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used within CartProvider')
  return value
}
