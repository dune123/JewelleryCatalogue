import raw from './photos.generated.json'
import { site } from '../config/site'

export type PhotoStyle = 'white-background' | 'grey-background' | 'with-model' | 'creative'

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
 */
export interface PieceDraft {
  id: string
  name?: string
  price?: number
  salePrice?: number
  description?: string
  featured?: boolean
  /** Shown in the small slider under the hero. */
  topSeller?: boolean
  caption?: string
  photoStyle?: PhotoStyle
}

export const pieces: PieceDraft[] = [
  { id: 'IMG_0613', name: 'Piece 01', photoStyle: 'with-model' },
  { id: 'IMG_0614', name: 'Piece 02', photoStyle: 'with-model' },
  { id: 'IMG_0615', name: 'Piece 03', photoStyle: 'with-model' },
  { id: 'IMG_0616', name: 'Piece 04', photoStyle: 'with-model' },
  { id: 'IMG_0618', name: 'Piece 05', photoStyle: 'with-model' },
  { id: 'IMG_0619', name: 'Piece 06', photoStyle: 'with-model' },
  { id: 'IMG_0620', name: 'Piece 07', photoStyle: 'with-model' },
  { id: 'IMG_0621', name: 'Piece 08', photoStyle: 'with-model' },
  { id: 'IMG_0622', name: 'Piece 09', photoStyle: 'with-model' },
  { id: 'IMG_0623', name: 'Piece 10', photoStyle: 'with-model' },
  { id: 'IMG_0624', name: 'Piece 11', photoStyle: 'creative', featured: true },
  { id: 'IMG_0625', name: 'Piece 12', photoStyle: 'creative' },
  { id: 'IMG_0626', name: 'Piece 13', photoStyle: 'creative' },
  { id: 'IMG_0627', name: 'Piece 14', photoStyle: 'creative' },
  { id: 'IMG_0628', name: 'Piece 15', photoStyle: 'creative' },
  { id: 'IMG_0629', name: 'Piece 16', photoStyle: 'white-background' },
  { id: 'IMG_0630', name: 'Piece 17', photoStyle: 'with-model' },
  { id: 'IMG_0631', name: 'Piece 18', photoStyle: 'creative' },
  { id: 'IMG_0632', name: 'Piece 19', photoStyle: 'creative' },
  { id: 'IMG_0633', name: 'Piece 20', photoStyle: 'creative' },
  { id: 'IMG_0634', name: 'Piece 21', photoStyle: 'creative' },
  { id: 'IMG_0635', name: 'Piece 22', photoStyle: 'creative', featured: true },
  { id: 'IMG_0636', name: 'Piece 23', photoStyle: 'with-model' },
  { id: 'IMG_0637', name: 'Piece 24', photoStyle: 'creative' },
  { id: 'IMG_0638', name: 'Piece 25', photoStyle: 'creative' },
  { id: 'IMG_0639', name: 'Piece 26', photoStyle: 'creative' },
  { id: 'IMG_0640', name: 'Piece 27', photoStyle: 'creative', featured: true },
  { id: 'IMG_0641', name: 'Piece 28', photoStyle: 'creative' },
  { id: 'IMG_0642', name: 'Piece 29', photoStyle: 'creative' },
  { id: 'IMG_0643', name: 'Piece 30', photoStyle: 'creative' },
  { id: 'IMG_0644', name: 'Piece 31', photoStyle: 'creative' },
  { id: 'IMG_0645', name: 'Piece 32', photoStyle: 'creative' },
  { id: 'IMG_0646', name: 'Piece 33', photoStyle: 'creative' },
  { id: 'IMG_0647', name: 'Piece 34', photoStyle: 'creative', featured: true },
  { id: 'IMG_0648', name: 'Piece 35', photoStyle: 'creative', featured: true },
  { id: 'IMG_0649', name: 'Piece 36', photoStyle: 'creative' },
  { id: 'IMG_0650', name: 'Piece 37', photoStyle: 'creative' },
  { id: 'IMG_0651', name: 'Piece 38', photoStyle: 'creative' },
  { id: 'IMG_0652', name: 'Piece 39', photoStyle: 'creative' },
  { id: 'IMG_0653', name: 'Piece 40', photoStyle: 'creative' },
  { id: 'IMG_0654', name: 'Piece 41', photoStyle: 'creative' },
  { id: 'IMG_0655', name: 'Piece 42', photoStyle: 'creative' },
  { id: 'IMG_0657', name: 'Piece 43', photoStyle: 'with-model' },
  { id: 'IMG_0658', name: 'Piece 44', photoStyle: 'with-model' },
  { id: 'IMG_0659', name: 'Piece 45', photoStyle: 'with-model' },
  { id: 'IMG_0660', name: 'Piece 46', photoStyle: 'with-model' },
  { id: 'IMG_0661', name: 'Piece 47', photoStyle: 'with-model' },
  { id: 'IMG_0662', name: 'Piece 48', photoStyle: 'with-model' },
  { id: 'IMG_0664', name: 'Piece 49', photoStyle: 'with-model' },
  { id: 'IMG_0665', name: 'Piece 50', photoStyle: 'with-model' },
  { id: 'IMG_0666', name: 'Piece 51', photoStyle: 'with-model' },
  { id: 'IMG_0667', name: 'Piece 52', photoStyle: 'with-model' },
  { id: 'IMG_0668', name: 'Piece 53', photoStyle: 'with-model' },
  { id: 'IMG_0669', name: 'Piece 54', photoStyle: 'with-model' },
  { id: 'IMG_0670', name: 'Piece 55', photoStyle: 'with-model' },
  { id: 'IMG_0671', name: 'Piece 56', photoStyle: 'with-model' },
  { id: 'IMG_0672', name: 'Piece 57', photoStyle: 'creative' },
  { id: 'IMG_0673', name: 'Piece 58', photoStyle: 'creative' },
  { id: 'IMG_0674', name: 'Piece 59', photoStyle: 'creative' },
  { id: 'IMG_0675', name: 'Piece 60', photoStyle: 'creative' },
  { id: 'IMG_0676', name: 'Piece 61', photoStyle: 'creative' },
  { id: 'IMG_0677', name: 'Piece 62', photoStyle: 'creative' },
  { id: 'IMG_0678', name: 'Piece 63', photoStyle: 'creative' },
  { id: 'IMG_0679', name: 'Piece 64', photoStyle: 'creative' },
  { id: 'IMG_0680', name: 'Piece 65', photoStyle: 'creative' },
  { id: 'IMG_0681', name: 'Piece 66', photoStyle: 'creative' },
  { id: 'IMG_0682', name: 'Piece 67', photoStyle: 'creative' },
  { id: 'IMG_0683', name: 'Piece 68', photoStyle: 'creative' },
  { id: 'IMG_0684', name: 'Piece 69', photoStyle: 'creative' },
  { id: 'IMG_0685', name: 'Piece 70', photoStyle: 'creative' },
  { id: 'IMG_0686', name: 'Piece 71', photoStyle: 'creative' },
  { id: 'IMG_0703', name: 'Piece 72', photoStyle: 'creative' },
  { id: 'IMG_0704', name: 'Piece 73', photoStyle: 'creative' },
  { id: 'IMG_0706', name: 'Piece 74', photoStyle: 'creative' },
  { id: 'IMG_0707', name: 'Piece 75', photoStyle: 'creative' },
  { id: 'IMG_0708', name: 'Piece 76', photoStyle: 'creative' },
  { id: 'IMG_0709', name: 'Piece 77', photoStyle: 'creative' },
  { id: 'IMG_0710', name: 'Piece 78', photoStyle: 'creative' },
  { id: 'IMG_0711', name: 'Piece 79', photoStyle: 'creative', topSeller: true, caption: 'Fish artefacts' },
  { id: 'IMG_0712', name: 'Piece 80', photoStyle: 'creative' },
  { id: 'IMG_0713', name: 'Piece 81', photoStyle: 'creative' },
  { id: 'IMG_0714', name: 'Piece 82', photoStyle: 'creative' },
  { id: 'IMG_0715', name: 'Piece 83', photoStyle: 'creative' },
  { id: 'IMG_0716', name: 'Piece 84', photoStyle: 'creative' },
  { id: 'IMG_0717', name: 'Piece 85', photoStyle: 'creative', topSeller: true, caption: 'Fish, tortoise, elephant and key' },
  { id: 'IMG_0718', name: 'Piece 86', photoStyle: 'creative', topSeller: true, caption: 'Fish set' },
  { id: 'IMG_0719', name: 'Piece 87', photoStyle: 'creative' },
  { id: 'IMG_0720', name: 'Piece 88', photoStyle: 'creative' },
  { id: 'IMG_0721', name: 'Piece 89', photoStyle: 'creative', topSeller: true, caption: 'Silver fish' },
  { id: 'IMG_0724', name: 'Piece 90', photoStyle: 'creative' },
  { id: 'IMG_0725', name: 'Piece 91', photoStyle: 'creative' },
  { id: 'IMG_0726', name: 'Piece 92', photoStyle: 'creative' },
  { id: 'IMG_0727', name: 'Piece 93', photoStyle: 'creative' },
  { id: 'IMG_0728', name: 'Piece 94', photoStyle: 'creative' },
  { id: 'IMG_0729', name: 'Piece 95', photoStyle: 'creative' },
  { id: 'IMG_0730', name: 'Piece 96', photoStyle: 'creative' },
  { id: 'IMG_0731', name: 'Piece 97', photoStyle: 'creative' },
  { id: 'IMG_0732', name: 'Piece 98', photoStyle: 'creative' },
  { id: 'IMG_0733', name: 'Piece 99', photoStyle: 'creative' },
  { id: 'IMG_0734', name: 'Piece 100', photoStyle: 'creative' },
  { id: 'IMG_0735', name: 'Piece 101', photoStyle: 'creative' },
  { id: 'IMG_0736', name: 'Piece 102', photoStyle: 'creative' },
  { id: 'IMG_0737', name: 'Piece 103', photoStyle: 'creative' },
  { id: 'IMG_0738', name: 'Piece 104', photoStyle: 'creative' },
  { id: 'IMG_0739', name: 'Piece 105', photoStyle: 'creative' },
  { id: 'IMG_0740', name: 'Piece 106', photoStyle: 'creative' },
  { id: 'IMG_0741', name: 'Piece 107', photoStyle: 'creative' },
  { id: 'IMG_0742', name: 'Piece 108', photoStyle: 'creative' },
  { id: 'IMG_0743', name: 'Piece 109', photoStyle: 'creative' },
  { id: 'IMG_0744', name: 'Piece 110', photoStyle: 'creative' },
  { id: 'IMG_0745', name: 'Piece 111', photoStyle: 'creative' },
  { id: 'IMG_0746', name: 'Piece 112', photoStyle: 'creative' },
  { id: 'IMG_0747', name: 'Piece 113', photoStyle: 'creative' },
  { id: 'IMG_0748', name: 'Piece 114', photoStyle: 'creative' },
  { id: 'IMG_0749', name: 'Piece 115', photoStyle: 'creative' },
  { id: 'IMG_0750', name: 'Piece 116', photoStyle: 'creative' },
  { id: 'IMG_0751', name: 'Piece 117', photoStyle: 'creative' },
  { id: 'IMG_0752', name: 'Piece 118', photoStyle: 'creative' },
  { id: 'IMG_0753', name: 'Piece 119', photoStyle: 'creative' },
  { id: 'IMG_0754', name: 'Piece 120', photoStyle: 'creative' },
  { id: 'IMG_0755', name: 'Piece 121', photoStyle: 'creative' },
]

/**
 * IMG_0687–IMG_0701 are byte-for-byte copies of IMG_0672–IMG_0686.
 * They stay in the generated manifest, and are left out of the catalogue.
 */
const omittedPhotoIds = new Set([
  'IMG_0687',
  'IMG_0688',
  'IMG_0689',
  'IMG_0690',
  'IMG_0691',
  'IMG_0692',
  'IMG_0693',
  'IMG_0694',
  'IMG_0695',
  'IMG_0696',
  'IMG_0697',
  'IMG_0698',
  'IMG_0699',
  'IMG_0700',
  'IMG_0701',
])

export interface CatalogItem {
  id: string
  name: string
  price?: number
  salePrice?: number
  description?: string
  featured: boolean
  topSeller: boolean
  caption?: string
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

export const catalog: CatalogItem[] = photos.filter((photo) => !omittedPhotoIds.has(photo.id)).map((photo) => {
  const draft = drafts.get(photo.id)
  const name = draft?.name?.trim() || `Piece ${photo.id.replace(/^IMG_/, '')}`
  const price = draft?.price
  const salePrice = draft?.salePrice
  const onSale = price != null && salePrice != null && salePrice < price

  return {
    id: photo.id,
    name,
    price,
    salePrice: onSale ? salePrice : undefined,
    description: draft?.description?.trim() || undefined,
    featured: Boolean(draft?.featured),
    topSeller: Boolean(draft?.topSeller),
    caption: draft?.caption?.trim() || undefined,
    photoStyle: draft?.photoStyle ?? 'creative',
    alt: `${name} — ${site.name}`,
    width: photo.width,
    height: photo.height,
    aspectRatio: photo.aspectRatio,
    blurDataUrl: photo.blurDataUrl,
    sources: photo.sources,
    srcset: photo.srcset,
    onSale,
  }
})

const topSellerOrder = ['IMG_0721', 'IMG_0717', 'IMG_0718', 'IMG_0711']

export const topSellers = topSellerOrder
  .map((id) => catalog.find((item) => item.id === id && item.topSeller))
  .filter((item): item is CatalogItem => Boolean(item))

export const featuredItems = catalog.filter((item) => item.featured)
export const heroItems = featuredItems.length > 0 ? featuredItems : catalog.slice(0, 4)
export const lookbookItems = catalog.filter((item) => !item.featured)

export function priceLabel(item: CatalogItem) {
  return item.price == null ? site.enquireForPrice : undefined
}
