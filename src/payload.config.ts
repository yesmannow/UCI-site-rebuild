import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Tenants } from '@/collections/Tenants'
import { Inquiries } from '@/collections/Inquiries'
import { MedicalIntakes } from '@/collections/MedicalIntakes'
import { Services } from '@/collections/Services'
import { Pricing } from '@/collections/Pricing'
import { Providers } from '@/collections/Providers'
import { Pages } from '@/collections/Pages'
import { Media } from '@/collections/Media'
import { Conditions } from '@/collections/Conditions'
import { Insurances } from '@/collections/Insurances'
import { Users } from '@/collections/Users'
import { About } from '@/globals/About'

export default buildConfig({
  /* ── Collections ──────────────────────────────────────────────────── */
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Tenants,
    Inquiries,
    MedicalIntakes,
    Services,
    Pricing,
    Providers,
    Pages,
    Media,
    Conditions,
    Insurances,
  ],

  /* ── Globals ──────────────────────────────────────────────────────── */
  globals: [About],

  /* ── Editor ───────────────────────────────────────────────────────── */
  editor: lexicalEditor(),

  /* ── Database ─────────────────────────────────────────────────────── */
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? '',
    },
  }),

  /* ── Secret ───────────────────────────────────────────────────────── */
  secret: process.env.PAYLOAD_SECRET ?? 'CHANGE-ME-IN-ENV',

  typescript: {
    outputFile: 'src/payload-types.ts',
  },
})
