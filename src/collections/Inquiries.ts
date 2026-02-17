import type { CollectionConfig } from 'payload'
import { validateEmail } from '@/lib/validation'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'status'],
    description: 'Leads & patient inquiries from web forms.',
  },
  access: {
    read: () => true, // tighten once auth is wired up
  },
  fields: [
    /* ── Tenant ──────────────────────────────────────────────── */
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      index: true,
      admin: { description: 'The brand / site this inquiry originated from.' },
    },

    /* ── Identity ───────────────────────────────────────────────── */
    {
      name: 'firstName',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      validate: validateEmail,
    },

    /* ── Marketing ──────────────────────────────────────────────── */
    {
      name: 'marketingConsent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'If checked the contact will be synced to Mailchimp via the afterChange hook.',
      },
    },

    /* ── Pipeline Status ────────────────────────────────────────── */
    {
      name: 'status',
      type: 'select',
      defaultValue: 'Lead',
      required: true,
      options: [
        { label: 'Lead', value: 'Lead' },
        { label: 'Intake Started', value: 'IntakeStarted' },
        { label: 'Synced to EMR', value: 'SyncedToEMR' },
      ],
    },
  ],

  timestamps: true,
}

/* ── TypeScript helpers (available after `generate:types`) ──────────── */

export type InquiryStatus = 'Lead' | 'IntakeStarted' | 'SyncedToEMR'

export interface Inquiry {
  id: string
  tenant: string | { id: string; name: string; slug: string }
  firstName: string
  lastName: string
  email: string
  marketingConsent: boolean
  status: InquiryStatus
  createdAt: string
  updatedAt: string
}
