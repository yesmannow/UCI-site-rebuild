import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'isOpen', 'currentWaitTime'],
    description:
      'Each tenant represents a separate brand / site (e.g. UrgentCare Indy, PrimaryCare Indy).',
  },
  access: {
    read: () => true,
  },
  fields: [
    /* ── Identity ───────────────────────────────────────────────────── */
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: { description: 'Brand name shown in the UI (e.g. "UrgentCare Indy").' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'Machine-readable key (e.g. "urgent-care", "primary-care"). Used in routing & headers.',
      },
    },

    /* ── Domains ────────────────────────────────────────────────────── */
    {
      name: 'domains',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description:
          'Hostnames that map to this tenant (e.g. "urgentcareindy.com", "localhost").',
      },
      fields: [
        {
          name: 'domain',
          type: 'text',
          required: true,
          maxLength: 253,
        },
      ],
    },

    /* ── Branding ───────────────────────────────────────────────────── */
    {
      name: 'theme',
      type: 'select',
      required: true,
      defaultValue: 'teal-orange',
      options: [
        { label: 'Teal & Orange', value: 'teal-orange' },
        { label: 'Navy & Gold', value: 'navy-gold' },
      ],
      admin: { description: 'Controls CSS theme tokens on the front-end.' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Brand logo displayed in the Navbar.' },
    },

    /* ── Clinic Status (migrated from ClinicStatus global) ──────────── */
    {
      name: 'currentWaitTime',
      type: 'number',
      required: true,
      defaultValue: 15,
      min: 0,
      admin: {
        description: 'Estimated wait in minutes. Shown in the Hero block.',
      },
    },
    {
      name: 'isOpen',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uncheck when the clinic is closed or on holidays.',
      },
    },
    {
      name: 'acceptedInsurances',
      type: 'relationship',
      relationTo: 'insurances',
      hasMany: true,
      admin: {
        description: 'Insurance plans currently accepted by this tenant.',
      },
    },
  ],
  timestamps: true,
}

/* ── TypeScript helpers ─────────────────────────────────────────────── */

export type TenantTheme = 'teal-orange' | 'navy-gold'

export interface TenantDomain {
  domain: string
  id?: string
}

export interface Tenant {
  id: string
  name: string
  slug: string
  domains: TenantDomain[]
  theme: TenantTheme
  logo?: string | { id: string; url: string; alt: string }
  currentWaitTime: number
  isOpen: boolean
  acceptedInsurances?: string[] | Array<{ id: string; name: string }>
  createdAt: string
  updatedAt: string
}
