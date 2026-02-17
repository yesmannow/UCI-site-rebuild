import type { Block } from 'payload'

export const MediaContentBlock: Block = {
  slug: 'mediaContent',
  labels: { singular: 'Media + Content', plural: 'Media + Content' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: { description: 'Which side the image appears on.' },
    },
    {
      name: 'richText',
      type: 'richText',
      required: true,
    },
  ],
}
