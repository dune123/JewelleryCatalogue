import raw from './photos.generated.json'
import { site } from '../config/site'

export const categories = ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Other'] as const
export type Category = (typeof categories)[number]
export type PhotoStyle = 'white-background' | 'grey-background' | 'with-model' | 'creative'
export const collectionFilters = ['All', ...categories] as const
export type CollectionFilter = (typeof collectionFilters)[number]

export interface GeneratedSource {
  width: number
  height: number
  webp: string
  jpeg: string
}

export interface GeneratedPhoto {
  id: string
  filename: string
  width: number
  height: number
  aspectRatio: number
  blurDataUrl: string
  sources: GeneratedSource[]
  srcset: { webp: string; jpeg: string }
}

/**
 * Hand-editable catalogue. Match `id` to the photograph filename (without extension).
 * Leave `price` unset to show "Enquire for price". Set `salePrice` below `price` to show a sale badge.
 * `featured` pieces are used in the hero and the About photograph, and are left out of the lookbook.
 *
 * The current photographs are idols, coins, and gift pieces rather than worn jewellery,
 * so they are filed under Other until you recategorise them.
 */
export interface PieceDraft {
  id: string
  name?: string
  category?: Category
  price?: number
  salePrice?: number
  description?: string
  featured?: boolean
  photoStyle?: PhotoStyle
}

export const pieces: PieceDraft[] = [
  { id: 'IMG_0613', name: 'Piece 01', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0614', name: 'Piece 02', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0615', name: 'Piece 03', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0616', name: 'Piece 04', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0618', name: 'Piece 05', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0619', name: 'Piece 06', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0620', name: 'Piece 07', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0621', name: 'Piece 08', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0622', name: 'Piece 09', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0623', name: 'Piece 10', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0624', name: 'Piece 11', category: 'Other', photoStyle: 'creative', featured: true },
  { id: 'IMG_0625', name: 'Piece 12', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0626', name: 'Piece 13', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0627', name: 'Piece 14', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0628', name: 'Piece 15', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0629', name: 'Piece 16', category: 'Other', photoStyle: 'white-background' },
  { id: 'IMG_0630', name: 'Piece 17', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0631', name: 'Piece 18', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0632', name: 'Piece 19', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0633', name: 'Piece 20', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0634', name: 'Piece 21', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0635', name: 'Piece 22', category: 'Other', photoStyle: 'creative', featured: true },
  { id: 'IMG_0636', name: 'Piece 23', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0637', name: 'Piece 24', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0638', name: 'Piece 25', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0639', name: 'Piece 26', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0640', name: 'Piece 27', category: 'Other', photoStyle: 'creative', featured: true },
  { id: 'IMG_0641', name: 'Piece 28', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0642', name: 'Piece 29', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0643', name: 'Piece 30', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0644', name: 'Piece 31', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0645', name: 'Piece 32', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0646', name: 'Piece 33', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0647', name: 'Piece 34', category: 'Other', photoStyle: 'creative', featured: true },
  { id: 'IMG_0648', name: 'Piece 35', category: 'Other', photoStyle: 'creative', featured: true },
  { id: 'IMG_0649', name: 'Piece 36', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0650', name: 'Piece 37', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0651', name: 'Piece 38', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0652', name: 'Piece 39', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0653', name: 'Piece 40', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0654', name: 'Piece 41', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0655', name: 'Piece 42', category: 'Other', photoStyle: 'creative' },
  { id: 'IMG_0657', name: 'Piece 43', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0658', name: 'Piece 44', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0659', name: 'Piece 45', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0660', name: 'Piece 46', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0661', name: 'Piece 47', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0662', name: 'Piece 48', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0664', name: 'Piece 49', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0665', name: 'Piece 50', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0666', name: 'Piece 51', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0667', name: 'Piece 52', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0668', name: 'Piece 53', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0669', name: 'Piece 54', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0670', name: 'Piece 55', category: 'Other', photoStyle: 'with-model' },
  { id: 'IMG_0671', name: 'Piece 56', category: 'Other', photoStyle: 'with-model' },
]

export interface CatalogItem {
  id: string
  name: string
  category: Category
  price?: number
  salePrice?: number
  description?: string
  featured: boolean
  photoStyle: PhotoStyle
  alt: string
  width: number
  height: number
  aspectRatio: number
  blurDataUrl: string
  sources: GeneratedSource[]
  srcset: { webp: string; jpeg: string }
  onSale: boolean
}

const manifest = raw as { photos?: GeneratedPhoto[] }
const photos = manifest.photos ?? []
const drafts = new Map(pieces.map((piece) => [piece.id, piece]))

export const catalog: CatalogItem[] = photos.map((photo) => {
  const draft = drafts.get(photo.id)
  const name = draft?.name?.trim() || `Piece ${photo.id.replace(/^IMG_/, '')}`
  const category = draft?.category ?? 'Other'
  const price = draft?.price
  const salePrice = draft?.salePrice
  const onSale = price != null && salePrice != null && salePrice < price

  return {
    id: photo.id,
    name,
    category,
    price,
    salePrice: onSale ? salePrice : undefined,
    description: draft?.description?.trim() || undefined,
    featured: Boolean(draft?.featured),
    photoStyle: draft?.photoStyle ?? 'creative',
    alt: `${name}, ${category.toLowerCase()} — ${site.name}`,
    width: photo.width,
    height: photo.height,
    aspectRatio: photo.aspectRatio,
    blurDataUrl: photo.blurDataUrl,
    sources: photo.sources,
    srcset: photo.srcset,
    onSale,
  }
})

export const featuredItems = catalog.filter((item) => item.featured)
export const heroItems = featuredItems.length > 0 ? featuredItems : catalog.slice(0, 4)
export const lookbookItems = catalog.filter((item) => !item.featured)

export function priceLabel(item: CatalogItem) {
  return item.price == null ? site.enquireForPrice : undefined
}
