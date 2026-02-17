import type { CollectionConfig } from 'payload'

export const Insurances: CollectionConfig = {
  slug: 'insurances',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'planType'],
    description: 'Insurance plans accepted at UrgentCare Indy locations.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: { description: 'e.g. "Anthem Blue Cross Blue Shield"' },
    },
    {
      name: 'planType',
      type: 'select',
      options: [
        { label: 'PPO', value: 'PPO' },
        { label: 'HMO', value: 'HMO' },
        { label: 'EPO', value: 'EPO' },
        { label: 'Medicaid', value: 'Medicaid' },
        { label: 'Medicare', value: 'Medicare' },
        { label: 'Other', value: 'Other' },
      ],
    },
  ],
  timestamps: true,
}

export interface Insurance {
  id: string
  name: string
  planType?: 'PPO' | 'HMO' | 'EPO' | 'Medicaid' | 'Medicare' | 'Other'
  createdAt: string
  updatedAt: string
}
