import type { Block } from 'payload'

export const ServiceGridBlock: Block = {
  slug: 'serviceGrid',
  labels: { singular: 'Service Grid', plural: 'Service Grids' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Our Services',
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select the services to display in this grid.',
      },
    },
  ],
}
