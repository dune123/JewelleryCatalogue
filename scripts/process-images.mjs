import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import sharp from 'sharp'

const execFileAsync = promisify(execFile)

const ROOT = process.cwd()
const INPUT_DIR = path.join(ROOT, 'jewelleryPhotos')
const OUTPUT_DIR = path.join(ROOT, 'public', 'images', 'gallery')
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'photos.generated.json')
const WIDTHS = [480, 960, 1600]
const IMAGE_EXTENSIONS = new Set(['.heic', '.jpg', '.jpeg', '.png', '.webp'])
const CONCURRENCY = 2

sharp.cache(false)
sharp.concurrency(1)

/** @type {'sharp' | 'sips' | null} */
let heicStrategy = null

function idFromFilename(filename) {
  return path.basename(filename, path.extname(filename))
}

function outputPaths(id) {
  return WIDTHS.flatMap((width) => [
    path.join(OUTPUT_DIR, `${id}-${width}.webp`),
    path.join(OUTPUT_DIR, `${id}-${width}.jpg`),
  ])
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function sharpCanDecode(filePath) {
  try {
    const probe = sharp(filePath, { failOn: 'none', unlimited: true })
    const meta = await probe.metadata()
    if (!meta.width || !meta.height) return false
    await sharp(filePath, { failOn: 'none', unlimited: true }).rotate().resize(24).toBuffer()
    return true
  } catch {
    return false
  }
}

async function loadViaSips(filePath) {
  const tmp = path.join(
    os.tmpdir(),
    `prince-jewellery-${process.pid}-${idFromFilename(filePath)}-${Date.now()}.jpg`,
  )
  await execFileAsync('sips', ['-s', 'format', 'jpeg', filePath, '--out', tmp])
  try {
    // sips usually bakes orientation into pixels. rotate() still honours any leftover EXIF.
    return await sharp(tmp, { failOn: 'none' }).rotate().toBuffer()
  } finally {
    await fs.unlink(tmp).catch(() => {})
  }
}

async function loadOrientedBuffer(filePath) {
  const ext = path.extname(filePath).toLowerCase()

  if (ext === '.heic') {
    if (!heicStrategy) {
      heicStrategy = (await sharpCanDecode(filePath)) ? 'sharp' : 'sips'
      console.log(`HEIC decoder: ${heicStrategy === 'sharp' ? 'sharp' : 'macOS sips, then sharp'}`)
    }
    if (heicStrategy === 'sips') return loadViaSips(filePath)
  }

  try {
    return await sharp(filePath, { failOn: 'none', unlimited: true }).rotate().toBuffer()
  } catch (error) {
    if (ext === '.heic') {
      console.warn(`sharp could not decode ${path.basename(filePath)}; falling back to sips`)
      heicStrategy = 'sips'
      return loadViaSips(filePath)
    }
    throw error
  }
}

async function isFresh(sourceStat, id, previous) {
  if (!previous) return false
  if (previous.sourceSize !== sourceStat.size) return false
  if (previous.sourceMtimeMs !== Math.round(sourceStat.mtimeMs)) return false
  const paths = outputPaths(id)
  const checks = await Promise.all(paths.map((filePath) => fileExists(filePath)))
  return checks.every(Boolean)
}

async function renderVariant(buffer, width) {
  const pipeline = sharp(buffer, { failOn: 'none' }).resize({
    width,
    withoutEnlargement: true,
    fit: 'inside',
  })

  const [webp, jpeg] = await Promise.all([
    pipeline
      .clone()
      .webp({ quality: 78, effort: 4, smartSubsample: true })
      .toBuffer({ resolveWithObject: true }),
    pipeline
      .clone()
      .jpeg({ quality: 80, mozjpeg: true, chromaSubsampling: '4:2:0' })
      .toBuffer({ resolveWithObject: true }),
  ])

  return { webp, jpeg }
}

async function processOne(filePath, previous) {
  const filename = path.basename(filePath)
  const id = idFromFilename(filename)
  const sourceStat = await fs.stat(filePath)

  if (await isFresh(sourceStat, id, previous)) {
    return { status: 'skipped', photo: previous }
  }

  const buffer = await loadOrientedBuffer(filePath)
  const meta = await sharp(buffer).metadata()
  if (!meta.width || !meta.height) {
    throw new Error('Could not read dimensions after orientation')
  }

  const blurBuffer = await sharp(buffer)
    .resize(20, 20, { fit: 'inside' })
    .blur(0.6)
    .webp({ quality: 20 })
    .toBuffer()

  const sources = []
  for (const width of WIDTHS) {
    const rendered = await renderVariant(buffer, width)
    const webpName = `${id}-${width}.webp`
    const jpegName = `${id}-${width}.jpg`
    await fs.writeFile(path.join(OUTPUT_DIR, webpName), rendered.webp.data)
    await fs.writeFile(path.join(OUTPUT_DIR, jpegName), rendered.jpeg.data)
    sources.push({
      width: rendered.webp.info.width,
      height: rendered.webp.info.height,
      webp: `/images/gallery/${webpName}`,
      jpeg: `/images/gallery/${jpegName}`,
    })
  }

  const srcset = {
    webp: sources.map((source) => `${source.webp} ${source.width}w`).join(', '),
    jpeg: sources.map((source) => `${source.jpeg} ${source.width}w`).join(', '),
  }

  const jpegCheck = await fs.readFile(path.join(OUTPUT_DIR, `${id}-480.jpg`))
  const hasExif = jpegCheck.includes(Buffer.from('Exif'))
  const hasGps = jpegCheck.includes(Buffer.from('GPSInfo')) || jpegCheck.includes(Buffer.from('GPSLatitude'))

  return {
    status: 'processed',
    privacy: { hasExif, hasGps },
    photo: {
      id,
      filename,
      width: meta.width,
      height: meta.height,
      aspectRatio: Number((meta.width / meta.height).toFixed(4)),
      blurDataUrl: `data:image/webp;base64,${blurBuffer.toString('base64')}`,
      sources,
      srcset,
      sourceSize: sourceStat.size,
      sourceMtimeMs: Math.round(sourceStat.mtimeMs),
    },
  }
}

async function mapPool(items, limit, mapper) {
  const results = new Array(items.length)
  let cursor = 0

  async function worker() {
    while (cursor < items.length) {
      const index = cursor
      cursor += 1
      results[index] = await mapper(items[index], index)
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return results
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true })

  let previousPhotos = []
  try {
    const existing = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf8'))
    previousPhotos = Array.isArray(existing.photos) ? existing.photos : []
  } catch {
    previousPhotos = []
  }
  const previousById = new Map(previousPhotos.map((photo) => [photo.id, photo]))

  let entries = []
  try {
    entries = await fs.readdir(INPUT_DIR)
  } catch (error) {
    console.error(`Could not read ${INPUT_DIR}`)
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  }

  const skippedNonImages = []
  const imageFiles = []
  for (const entry of entries) {
    if (entry.startsWith('.')) continue
    const ext = path.extname(entry).toLowerCase()
    if (!IMAGE_EXTENSIONS.has(ext)) {
      skippedNonImages.push(entry)
      continue
    }
    imageFiles.push(path.join(INPUT_DIR, entry))
  }
  imageFiles.sort((a, b) => path.basename(a).localeCompare(path.basename(b)))

  console.log(`Found ${imageFiles.length} image(s) in jewelleryPhotos`)
  if (skippedNonImages.length) {
    console.log(`Skipped non-image file(s): ${skippedNonImages.join(', ')}`)
  }

  const firstHeic = imageFiles.find((filePath) => path.extname(filePath).toLowerCase() === '.heic')
  if (firstHeic && !heicStrategy) {
    heicStrategy = (await sharpCanDecode(firstHeic)) ? 'sharp' : 'sips'
    console.log(`HEIC decoder: ${heicStrategy === 'sharp' ? 'sharp' : 'macOS sips, then sharp'}`)
  }

  const failures = []
  let processed = 0
  let skipped = 0
  /** @type {boolean | null} */
  let privacyOk = null

  const results = await mapPool(imageFiles, CONCURRENCY, async (filePath) => {
    const id = idFromFilename(path.basename(filePath))
    try {
      const result = await processOne(filePath, previousById.get(id))
      if (result.status === 'skipped') {
        skipped += 1
        console.log(`skip  ${id}`)
      } else {
        processed += 1
        if (privacyOk === null) privacyOk = !result.privacy.hasExif && !result.privacy.hasGps
        console.log(
          `done  ${id}  ${result.photo.width}x${result.photo.height}  exif=${result.privacy.hasExif ? 'PRESENT' : 'stripped'}`,
        )
      }
      return result.photo
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      failures.push({ id, message })
      console.error(`fail  ${id}  ${message}`)
      return null
    }
  })

  const photos = results.filter(Boolean)
  const manifest = {
    generatedAt: new Date().toISOString(),
    decoder: heicStrategy,
    count: photos.length,
    photos,
  }
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`)

  console.log('')
  console.log(`Succeeded: ${processed} converted, ${skipped} already up to date, ${photos.length} in manifest`)
  console.log(`Failed: ${failures.length}`)
  if (privacyOk === false) {
    console.log('Privacy check: EXIF or GPS markers were still present in a JPEG output')
  } else if (processed > 0) {
    console.log('Privacy check: sampled JPEG output had no EXIF or GPS markers')
  }
  if (failures.length) {
    for (const failure of failures) console.log(`  - ${failure.id}: ${failure.message}`)
    process.exitCode = 1
  }

  if (process.argv.includes('--sheet') && photos.length) {
    await writeReviewSheets(photos)
  }
}

async function writeReviewSheets(photos) {
  const dir = path.join(ROOT, 'tmp', 'sheets')
  await fs.mkdir(dir, { recursive: true })
  const cols = 3
  const rows = 3
  const thumbW = 440
  const labelH = 40
  const gap = 18
  const perSheet = cols * rows

  for (let page = 0; page < photos.length; page += perSheet) {
    const slice = photos.slice(page, page + perSheet)
    const cells = []

    for (const photo of slice) {
      const jpeg = path.join(OUTPUT_DIR, `${photo.id}-480.jpg`)
      const image = await sharp(jpeg).resize({ width: thumbW, withoutEnlargement: true }).jpeg({ quality: 72 }).toBuffer()
      const meta = await sharp(image).metadata()
      const imageH = meta.height ?? thumbW
      const label = await sharp(Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${thumbW}" height="${labelH}"><rect width="100%" height="100%" fill="#141414"/><text x="50%" y="26" fill="#f7f8f6" font-size="18" text-anchor="middle" font-family="Inter, Helvetica, sans-serif">${photo.id}</text></svg>`,
      )).png().toBuffer()
      const cell = await sharp({
        create: { width: thumbW, height: imageH + labelH, channels: 3, background: '#141414' },
      })
        .composite([
          { input: image, top: 0, left: 0 },
          { input: label, top: imageH, left: 0 },
        ])
        .jpeg({ quality: 74 })
        .toBuffer()
      cells.push({ buffer: cell, height: imageH + labelH })
    }

    const rowCount = Math.ceil(cells.length / cols)
    const rowHeights = Array.from({ length: rowCount }, (_, row) => {
      const rowCells = cells.slice(row * cols, row * cols + cols)
      return Math.max(...rowCells.map((cell) => cell.height))
    })
    const sheetW = cols * thumbW + (cols + 1) * gap
    const sheetH = rowHeights.reduce((sum, height) => sum + height, 0) + (rowCount + 1) * gap
    const composites = []
    let top = gap
    for (let row = 0; row < rowCount; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const cell = cells[row * cols + col]
        if (!cell) continue
        composites.push({ input: cell.buffer, left: gap + col * (thumbW + gap), top })
      }
      top += rowHeights[row] + gap
    }

    const sheetName = `sheet-${String(page / perSheet + 1).padStart(2, '0')}.jpg`
    await sharp({
      create: { width: sheetW, height: sheetH, channels: 3, background: '#0e0e0e' },
    })
      .composite(composites)
      .jpeg({ quality: 76 })
      .toFile(path.join(dir, sheetName))
    console.log(`sheet ${sheetName}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
