import { useEffect, useState, type RefObject } from 'react'

type UseInViewOptions = {
  once?: boolean
  rootMargin?: string
  threshold?: number
}

export function useInView<T extends Element>(ref: RefObject<T | null>, options: UseInViewOptions = {}) {
  const { once = true, rootMargin = '0px', threshold = 0.01 } = options
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (once && inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
          return
        }
        if (!once) setInView(false)
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, once, rootMargin, threshold, inView])

  return inView
}
