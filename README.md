# Prince Jewellery

A single-page catalogue for Prince Jewellery. There is no checkout. Each piece can be saved in this browser and enquired about by WhatsApp, or by email if no WhatsApp number is set.

## Develop

```bash
npm install
npm run dev
```

Open the local URL Vite prints. `npm run build` type-checks and writes a static site to `dist`. `npm run preview` serves that build.

## Add photographs

1. Drop `.heic`, `.jpg`, `.jpeg`, or `.png` files into `jewelleryPhotos`. That folder is gitignored and is never modified by the script.
2. Run:

```bash
npm run images
```

The script writes three widths (480, 960, and 1600) as WebP and JPEG into `public/images/gallery/`, strips EXIF (including location), and updates `src/data/photos.generated.json`. It skips files that are already converted. New photographs appear on the site as soon as you add a matching entry in `src/data/catalog.ts`, or automatically as an unnamed piece if you do not.

On this machine `sharp` cannot decode the iPhone HEIC files (HEVC is not built into the installed libvips), so the script converts them with macOS `sips` first and then resizes with `sharp`. JPEG and PNG files go straight through `sharp`.

Commit `public/images/gallery` and `src/data/photos.generated.json` before deploying. The original photographs are not on the server.

`npm run images -- --sheet` writes labelled contact sheets to `tmp/sheets` so you can review a batch. That folder is gitignored.

## Saved pieces

Save on a card, in the lookbook, or in the lightbox. The header bookmark opens the selection. Each saved piece stores its number, name, and image path in that browser’s local storage under the key `prince-cart`. Nothing is sent to a server. Clearing the browser’s site data removes the list.

## Edit names, prices, and categories

Open `src/data/catalog.ts` and edit the `pieces` array. Match `id` to the filename without its extension (`IMG_0613.HEIC` → `IMG_0613`).

- `name` — shown on the card, in the lightbox, and in the enquiry message
- `category` — `Necklaces`, `Earrings`, `Rings`, `Bracelets`, or `Other`
- `price` — optional number. Leave it out to show “Enquire for price”
- `salePrice` — optional. When it is lower than `price`, the card shows a Sale badge
- `description` — optional sentence in the lightbox
- `featured` — used in the hero and the About photograph, and left out of the lookbook
- `photoStyle` — `white-background`, `grey-background`, `with-model`, or `creative`

The photographs currently in the folder are idols, coins, and gift pieces, so they are filed under Other. Change the category when you know where a piece belongs.

## Change the tagline and contact details

Edit `src/config/site.ts`. The name, tagline, currency, about copy, phone, email, WhatsApp number, address, and social links all come from that file. Search for `TODO` and replace the placeholders.

WhatsApp needs digits only, in international format, with no `+` or spaces (`9198XXXXXXXX`). If `whatsappNumber` is empty, Enquire and the contact form use email instead.

The browser tab title and social preview text are filled from the same file when Vite builds `index.html`.

## Swap in the real logo

The placeholder mark and wordmark live in `src/assets/logo/Logo.tsx`. To replace them, add SVG files to that folder. No other code changes are needed.

| File | Used for |
| --- | --- |
| `symbol.svg` | Symbol on its own, and the repeating pattern |
| `horizontal.svg` | Header lockup, including the wordmark |
| `vertical.svg` | Hero and footer lockup |
| `symbol-on-light.svg`, `horizontal-on-light.svg`, `vertical-on-light.svg` | Dark ink, for light backgrounds |
| `symbol-on-dark.svg`, `horizontal-on-dark.svg`, `vertical-on-dark.svg` | Light ink, for dark backgrounds |

Theme-specific files win over the plain file. If only `symbol.svg` is present, the built-in wordmark stays and the symbol is replaced. Give the artwork its own clear space inside the SVG. Do not outline, stretch, or crop it in the component.

## Deploy

The site is a static Vite build.

**Vercel:** import the repository, leave the framework preset as Vite, and use build command `npm run build` with output directory `dist`.

**Netlify:** build command `npm run build`, publish directory `dist`.

Set the live URL in `site.url` before you deploy so the Open Graph tags point at the real domain. Generated images must be in the repository, because `jewelleryPhotos` is not uploaded.
