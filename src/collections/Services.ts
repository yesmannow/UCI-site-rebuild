import type { CollectionConfig } from 'payload'

/**
 * Curated list of Lucide icon names that make sense for urgent-care services.
 * Editors pick one from the dropdown; the front-end renders it dynamically.
 */
const LUCIDE_ICON_OPTIONS = [
  { label: 'Stethoscope', value: 'Stethoscope' },
  { label: 'Heart Pulse', value: 'HeartPulse' },
  { label: 'Thermometer', value: 'Thermometer' },
  { label: 'Syringe', value: 'Syringe' },
  { label: 'Pill', value: 'Pill' },
  { label: 'Baby', value: 'Baby' },
  { label: 'Bone', value: 'Bone' },
  { label: 'Scan Line', value: 'ScanLine' },
  { label: 'Activity', value: 'Activity' },
  { label: 'Microscope', value: 'Microscope' },
  { label: 'Ear', value: 'Ear' },
  { label: 'Eye', value: 'Eye' },
  { label: 'Brain', value: 'Brain' },
  { label: 'Hand', value: 'Hand' },
  { label: 'Shield Check', value: 'ShieldCheck' },
  { label: 'Clock', value: 'Clock' },
  { label: 'Clipboard List', value: 'ClipboardList' },
  { label: 'Zap', value: 'Zap' },
] as const

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'icon'],
    description: 'Medical services offered across all locations.',
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
      admin: { description: 'The brand / site this service belongs to.' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 120,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe identifier (e.g. "x-rays"). Auto-generated later via hook.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [...LUCIDE_ICON_OPTIONS],
      admin: {
        description: 'Lucide React icon rendered on the front-end.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Urgent Care', value: 'Urgent' },
        { label: 'Primary Care', value: 'Primary' },
        { label: 'Pulmonary', value: 'Pulmonary' },
        { label: 'Cardiology', value: 'Cardiology' },
        { label: 'Orthopedics', value: 'Orthopedics' },
        { label: 'Dermatology', value: 'Dermatology' },
        { label: 'Mental Health', value: 'MentalHealth' },
        { label: 'Physical Therapy', value: 'PhysicalTherapy' },
      ],
      admin: {
        description: 'Service category for filtering and organization.',
      },
    },
    {
      name: 'priceLevel',
      type: 'relationship',
      relationTo: 'pricing',
      required: false,
      admin: {
        description: 'Associated pricing tier for this service.',
      },
    },
  ],
  timestamps: true,
}

/* ── TypeScript helpers ─────────────────────────────────────────────── */

export type ServiceIconName = (typeof LUCIDE_ICON_OPTIONS)[number]['value']

export type ServiceCategory =
  | 'Urgent'
  | 'Primary'
  | 'Pulmonary'
  | 'Cardiology'
  | 'Orthopedics'
  | 'Dermatology'
  | 'MentalHealth'
  | 'PhysicalTherapy'

export interface Service {
  id: string
  tenant: string | { id: string; name: string; slug: string }
  title: string
  slug: string
  description: unknown // Rich text JSON from Payload
  icon: ServiceIconName
  category: ServiceCategory
  priceLevel?: string | { id: string; levelName: string } | null
  createdAt: string
  updatedAt: string
}
