import type { CollectionConfig } from 'payload'

import { searchMedicalImages } from '@/lib/pexels'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description: 'Uploaded images and files.',
  },
  hooks: {
    afterRead: [
      async ({ doc }) => {
        if (doc?.filename) {
          return doc
        }

        const query = doc?.alt || 'medical clinic'
        const results = await searchMedicalImages(query)
        const suggestion = results[0] ?? null

        return {
          ...doc,
          suggestedPexels: suggestion,
        }
      },
    ],
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*'],
    staticDir: 'media',
    disableLocalStorage: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Descriptive alt text for accessibility (WCAG 2.1).' },
    },
  ],
}
