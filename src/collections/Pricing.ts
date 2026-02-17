import type { CollectionConfig } from 'payload'

export const Pricing: CollectionConfig = {
  slug: 'pricing',
  admin: {
    useAsTitle: 'levelName',
    defaultColumns: ['levelName', 'price', 'tenant'],
    description: 'Service pricing tiers and packages offered by each tenant.',
  },
  access: {
    read: () => true,
  },
  fields: [
    /* ── Tenant ──────────────────────────────────────────────────── */
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      index: true,
      admin: { description: 'The brand / site this pricing tier belongs to.' },
    },

    /* ── Pricing Tier Identity ───────────────────────────────────────── */
    {
      name: 'levelName',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: { description: 'Tier name (e.g., "Basic", "Standard", "Premium").' },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: { description: 'Price in USD (e.g., 99.99).' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 500,
      admin: { description: 'Brief description of what this tier includes.' },
    },

    /* ── Site Type ───────────────────────────────────────────────────── */
    {
      name: 'siteType',
      type: 'select',
      required: true,
      options: [
        { label: 'Urgent Care', value: 'Urgent' },
        { label: 'Primary Care', value: 'Primary' },
      ],
      admin: { description: 'Which clinic type this pricing applies to.' },
    },

    /* ── Included Services ─────────────────────────────────────────────── */
    {
      name: 'includes',
      type: 'array',
      required: false,
      admin: {
        description: 'List of services/features included in this pricing tier.',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          maxLength: 200,
          admin: { description: 'e.g., "Basic consultation", "Lab work".' },
        },
      ],
    },
  ],

  timestamps: true,
}

/* ── TypeScript helpers ─────────────────────────────────────────────── */

export type SiteType = 'Urgent' | 'Primary'

export interface PricingTier {
  id: string
  tenant: string | { id: string; name: string; slug: string }
  levelName: string
  price: number
  description: string
  siteType: SiteType
  includes?: Array<{ item: string }> | null
  createdAt: string
  updatedAt: string
}
