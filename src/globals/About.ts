import { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'Mission & Values',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
    },
    {
      name: 'mission',
      type: 'textarea',
      required: true,
      label: 'Mission Statement',
    },
    {
      name: 'values',
      type: 'array',
      label: 'Core Values',
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Value Name',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
      ],
    },
  ],
}
