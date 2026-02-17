import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 200,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Save Your Spot',
      admin: { description: 'Button text for the primary call-to-action.' },
    },
    {
      name: 'showWaitTime',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display the live "current wait time" badge in the hero.',
      },
    },
  ],
}
