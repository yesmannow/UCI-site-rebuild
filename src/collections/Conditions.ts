import type { CollectionConfig } from 'payload'

export const Conditions: CollectionConfig = {
  slug: 'conditions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    description:
      'Medical conditions treated at UrgentCare Indy. Each one creates an SEO-friendly page.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      index: true,
      admin: { description: 'The brand / site this condition belongs to.' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: { description: 'e.g. "Strep Throat", "Sprained Ankle"' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'commonSymptoms',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description:
          'Symptoms patients search for (powers the QuickSearch component).',
      },
      fields: [
        {
          name: 'symptom',
          type: 'text',
          required: true,
          maxLength: 200,
        },
      ],
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description: 'Services used to diagnose/treat this condition.',
      },
    },
  ],
  timestamps: true,
}

/* ── TypeScript helpers ─────────────────────────────────────────────── */

export interface ConditionSymptom {
  symptom: string
  id?: string
}

export interface Condition {
  id: string
  tenant: string | { id: string; name: string; slug: string }
  title: string
  slug: string
  commonSymptoms: ConditionSymptom[]
  relatedServices?: string[] | Array<{ id: string; title: string }>
  createdAt: string
  updatedAt: string
}
