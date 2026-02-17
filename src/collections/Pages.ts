import type { CollectionConfig } from 'payload'
import {
  HeroBlock,
  ServiceGridBlock,
  MediaContentBlock,
  FAQBlock,
} from '@/blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    description: 'Dynamic pages built with content blocks.',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    /* ── Tenant ───────────────────────────────────────────────────────── */
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      index: true,
      admin: { description: 'The brand / site this page belongs to.' },
    },

    /* ── Meta ────────────────────────────────────────────────────────── */
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 200,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path segment (e.g. "about-us"). Must be unique.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 320,
      admin: { description: 'SEO meta description.' },
    },

    /* ── Page Builder Blocks ─────────────────────────────────────────── */
    {
      name: 'blocks',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [HeroBlock, ServiceGridBlock, MediaContentBlock, FAQBlock],
    },
  ],
  timestamps: true,
}

/* ── TypeScript helpers ─────────────────────────────────────────────── */

export interface PageDoc {
  id: string
  tenant: string | { id: string; name: string; slug: string }
  title: string
  slug: string
  metaDescription?: string
  blocks: PageBlock[]
  createdAt: string
  updatedAt: string
}

export type PageBlock = HeroBlockData | ServiceGridBlockData | MediaContentBlockData | FAQBlockData

export interface HeroBlockData {
  blockType: 'hero'
  id?: string
  title: string
  subtitle?: string
  ctaLabel?: string
  showWaitTime?: boolean
}

export interface ServiceGridBlockData {
  blockType: 'serviceGrid'
  id?: string
  heading?: string
  services:
    | string[]
    | Array<{
        id: string
        title: string
        slug: string
        icon: string
        tenant?: string | { id: string }
      }>
}

export interface MediaContentBlockData {
  blockType: 'mediaContent'
  id?: string
  image: string | { url: string; alt: string }
  imagePosition: 'left' | 'right'
  richText: unknown
}

export interface FAQBlockData {
  blockType: 'faq'
  id?: string
  heading?: string
  items: Array<{ question: string; answer: string }>
}
