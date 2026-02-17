export type PexelsPhotoSrc = {
  readonly original?: string
  readonly large?: string
  readonly large2x?: string
}

export type PexelsPhoto = {
  readonly id: number
  readonly url: string
  readonly photographer: string
  readonly photographer_url: string
  readonly src: PexelsPhotoSrc
}

const PEXELS_BASE_URL = 'https://api.pexels.com/v1/search'

const getApiKey = () => {
  const apiKey = process.env.PEXELS_API_KEY
  if (!apiKey) {
    throw new Error('Missing PEXELS_API_KEY in environment.')
  }
  return apiKey
}

export const searchMedicalImages = async (query: string): Promise<PexelsPhoto[]> => {
  const apiKey = getApiKey()
  const params = new URLSearchParams({
    query,
    orientation: 'landscape',
    per_page: '10',
  })
  const response = await fetch(`${PEXELS_BASE_URL}?${params.toString()}`, {
    headers: {
      Authorization: apiKey,
    },
  })

  if (!response.ok) {
    throw new Error(`Pexels request failed: ${response.status}`)
  }

  const data = (await response.json()) as { photos?: PexelsPhoto[] }
  const photos = data.photos ?? []

  return photos.filter((photo) => !!photo.src?.original || !!photo.src?.large)
}
