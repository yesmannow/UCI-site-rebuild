import { promises as fs } from 'node:fs'
import path from 'node:path'

import { searchMedicalImages } from '../src/lib/pexels.js'

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'stock-images')
const CREDITS_FILE = path.join(OUTPUT_DIR, 'credits.json')

const getPreferredSrc = (photo: { src?: { original?: string; large?: string; large2x?: string } }) => {
  return photo.src?.original ?? photo.src?.large ?? photo.src?.large2x
}

const loadCredits = async () => {
  try {
    const raw = await fs.readFile(CREDITS_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const writeCredits = async (credits: unknown[]) => {
  await fs.writeFile(CREDITS_FILE, `${JSON.stringify(credits, null, 2)}\n`, 'utf8')
}

const downloadImage = async (url: string, targetPath: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Image download failed: ${response.status}`)
  }
  const buffer = Buffer.from(await response.arrayBuffer())
  await fs.writeFile(targetPath, buffer)
}

const main = async () => {
  const query = process.argv.slice(2).join(' ').trim()
  if (!query) {
    console.error('Usage: npm run fetch-images -- "modern urgent care waiting room"')
    process.exit(1)
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  const photos = await searchMedicalImages(query)
  const first = photos[0]

  if (!first) {
    console.error('No results found for query.')
    process.exit(1)
  }

  const srcUrl = getPreferredSrc(first)
  if (!srcUrl) {
    console.error('No suitable image size found for the top result.')
    process.exit(1)
  }

  const extension = path.extname(new URL(srcUrl).pathname) || '.jpg'
  const fileName = `pexels-${first.id}${extension}`
  const targetPath = path.join(OUTPUT_DIR, fileName)

  await downloadImage(srcUrl, targetPath)

  const credits = await loadCredits()
  credits.push({
    id: first.id,
    query,
    photographer: first.photographer,
    photographer_url: first.photographer_url,
    pexels_url: first.url,
    file: `stock-images/${fileName}`,
    downloadedAt: new Date().toISOString(),
  })

  await writeCredits(credits)

  console.log(`Downloaded: ${fileName}`)
}

try {
  await main()
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
