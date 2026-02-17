import type { CollectionConfig } from 'payload'

export const Providers: CollectionConfig = {
  slug: 'providers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'specialty', 'tenant'],
    description: 'Clinical staff and providers. Includes profiles for "Meet the Team" content.',
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
      admin: { description: 'The brand / site this provider belongs to.' },
    },

    /* ── Provider Identity ─────────────────────────────────────────── */
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: { description: 'Full name (e.g., "Dr. Jane Smith").' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: { description: 'Credentials/title (e.g., "MD", "NP", "PA-C", "RN").' },
    },
    {
      name: 'specialty',
      type: 'text',
      required: true,
      maxLength: 150,
      admin: {
        description: 'Area of expertise (e.g., "Family Medicine", "Urgent Care", "Pediatrics").',
      },
    },

    /* ── Bio & Media ──────────────────────────────────────────────── */
    {
      name: 'bio',
      type: 'textarea',
      required: false,
      maxLength: 1000,
      admin: { description: 'Biographical summary for the "Meet the Team" section.' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: false,
      admin: {
        description:
          'URL to a short video (YouTube, Vimeo, etc.) for "Meet the Team" shorts.',
      },
    },
    {
      name: 'headshot',
      type: 'relationship',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Professional headshot for the team page.',
      },
    },
  ],

  timestamps: true,
}

/* ── TypeScript helpers ─────────────────────────────────────────────── */

export interface Provider {
  id: string
  tenant: string | { id: string; name: string; slug: string }
  name: string
  title: string
  specialty: string
  bio?: string | null
  videoUrl?: string | null
  headshot?: string | { id: string; alt: string; url?: string } | null
  createdAt: string
  updatedAt: string
}
