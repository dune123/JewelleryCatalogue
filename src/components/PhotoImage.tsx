import { useRef, useState } from 'react'
import type { CatalogItem } from '../data/catalog'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/cn'

type PhotoImageProps = {
  item: CatalogItem
  sizes?: string
  priority?: boolean
  alt?: string
  className?: string
  /** Fill the positioned parent instead of reserving the photograph's own ratio. */
  fill?: boolean
}

export function PhotoImage({
  item,
  sizes = '(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 48vw',
  priority = false,
  alt,
  className,
  fill = false,
}: PhotoImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, rootMargin: '500px 0px' })
  const [loaded, setLoaded] = useState(false)
  const show = priority || inView
  const fallback = item.sources[0]?.jpeg

  return (
    <div
      ref={ref}
      className={cn('overflow-hidden bg-card', fill ? 'absolute inset-0 h-full w-full' : 'relative w-full', className)}
      style={fill ? undefined : { aspectRatio: item.aspectRatio }}
    >
      <img
        src={item.blurDataUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-105 object-cover blur-xl"
      />
      {show && fallback ? (
        <picture>
          <source type="image/webp" srcSet={item.srcset.webp} sizes={sizes} />
          <source type="image/jpeg" srcSet={item.srcset.jpeg} sizes={sizes} />
          <img
            src={fallback}
            alt={alt ?? item.alt}
            width={item.width}
            height={item.height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
              loaded ? 'opacity-100' : 'opacity-0',
            )}
          />
        </picture>
      ) : null}
    </div>
  )
}
