import { Bookmark } from 'lucide-react'
import type { CatalogItem } from '../data/catalog'
import { useCart } from '../hooks/useCart'
import { cn } from '../lib/cn'

type SaveButtonProps = {
  item: CatalogItem
  className?: string
  inverse?: boolean
  /** Icon only, meant to sit on a photograph. */
  floating?: boolean
}

export function SaveButton({ item, className, inverse = false, floating = false }: SaveButtonProps) {
  const { has, toggle } = useCart()
  const saved = has(item.id)

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${item.name} from saved pieces` : `Save ${item.name}`}
      onClick={() => toggle(item)}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-label text-[0.68rem] font-medium uppercase tracking-[0.2em]',
        floating ? (saved ? 'h-11 w-11 bg-ink text-ivory' : 'h-11 w-11 bg-ivory/92 text-ink backdrop-blur-md') : 'px-5',
        !floating &&
          (inverse
            ? saved
              ? 'bg-ivory text-ink'
              : 'text-ivory shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--ivory)_45%,transparent)]'
            : saved
              ? 'bg-fg text-bg'
              : 'text-fg shadow-[inset_0_0_0_1px_var(--line)]'),
        className,
      )}
    >
      <Bookmark className="h-4 w-4" strokeWidth={1.25} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
      {floating ? <span className="sr-only">{saved ? 'Saved' : 'Save'}</span> : saved ? 'Saved' : 'Save'}
    </button>
  )
}
