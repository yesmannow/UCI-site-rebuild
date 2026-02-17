import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description: 'Uploaded images and files.',
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
