import { site } from '../config/site'
import type { CatalogItem } from '../data/catalog'
import { formatPrice } from '../lib/format'

export function Price({ item, inverse = false }: { item: CatalogItem; inverse?: boolean }) {
  const quiet = inverse ? 'text-ivory/75' : 'text-muted'
  const main = inverse ? 'text-ivory' : 'text-fg'

  if (item.onSale && item.salePrice != null && item.price != null) {
    return (
      <p className={`font-price text-[1.35rem] leading-none tracking-[0.04em] ${main}`}>
        <span>{formatPrice(item.salePrice)}</span>
        <span className={`ml-2 text-[1.05rem] line-through ${quiet}`}>{formatPrice(item.price)}</span>
      </p>
    )
  }

  if (item.price != null) {
    return <p className={`font-price text-[1.35rem] leading-none tracking-[0.04em] ${main}`}>{formatPrice(item.price)}</p>
  }

  return <p className={`font-price text-[1.15rem] leading-none tracking-[0.08em] ${quiet}`}>{site.enquireForPrice}</p>
}
