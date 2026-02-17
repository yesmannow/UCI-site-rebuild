import type { CollectionConfig } from 'payload'
import { validateZipCode } from '@/lib/validation'

export const MedicalIntakes: CollectionConfig = {
  slug: 'medical-intakes',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['inquiry', 'dateOfBirth', 'chiefComplaint'],
    description: 'Full patient intake records linked to an Inquiry.',
  },
  access: {
    read: () => true, // tighten once auth is wired up
  },
  fields: [
    /* ── Linked Inquiry ─────────────────────────────────────────── */
    {
      name: 'inquiry',
      type: 'relationship',
      relationTo: 'inquiries',
      required: true,
      hasMany: false,
      admin: {
        description: 'The Inquiry (lead) this intake belongs to.',
      },
    },

    /* ── Demographics ───────────────────────────────────────────── */
    {
      name: 'dateOfBirth',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MM/dd/yyyy',
        },
      },
    },
    {
      name: 'gender',
      type: 'select',
      required: true,
      options: [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' },
        { label: 'Undisclosed', value: 'U' },
      ],
    },

    /* ── Address (group) ────────────────────────────────────────── */
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
          maxLength: 2,
          admin: { description: 'Two-letter US state abbreviation' },
        },
        {
          name: 'zip',
          type: 'text',
          required: true,
          validate: validateZipCode,
          admin: { description: '5-digit US ZIP code' },
        },
      ],
    },

    /* ── Clinical ───────────────────────────────────────────────── */
    {
      name: 'chiefComplaint',
      type: 'textarea',
      required: true,
      maxLength: 2000,
      admin: {
        description: 'Primary reason for visit.',
      },
    },
  ],

  timestamps: true,
}

/* ── TypeScript helpers (available after `generate:types`) ──────────── */

export type Gender = 'M' | 'F' | 'U'

export interface Address {
  street: string
  city: string
  state: string
  zip: string
}

export interface MedicalIntake {
  id: string
  inquiry: string // Inquiry ID (or populated Inquiry object at runtime)
  dateOfBirth: string
  gender: Gender
  address: Address
  chiefComplaint: string
  createdAt: string
  updatedAt: string
}
