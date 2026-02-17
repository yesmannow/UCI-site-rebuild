import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import type { Metadata } from 'next'

import { getPayload } from 'payload'
import config from '@payload-config'

import { BlockRenderer } from '@/components/BlockRenderer'
import { getClinicStatus } from '@/app/actions/getClinicStatus'
import { getConditions } from '@/app/actions/getConditions'
import { getTenant } from '@/lib/getTenant'
import type { PageDoc } from '@/collections/Pages'
import type { Tenant } from '@/collections/Tenants'

/* ── ISR: revalidate every 60 s so "Wait Times" stay fresh ──────────── */
export const revalidate = 60

/* ── Params type ────────────────────────────────────────────────────── */

type Params = Readonly<Promise<{ slug: string }>>

/* ── Tenant resolver (reads x-tenant-host set by middleware) ─────────── */

async function resolveTenant(): Promise<Tenant | null> {
  const headersList = await headers()
  const host = headersList.get('x-tenant-host') ?? 'localhost'
  return getTenant(host)
}

/* ── Data fetcher ───────────────────────────────────────────────────── */

async function getPage(slug: string, tenantId: string): Promise<PageDoc | null> {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
      tenant: { equals: tenantId },
    },
    limit: 1,
    depth: 2, // populate relationships (services, media)
  })

  return (docs[0] as unknown as PageDoc) ?? null
}

/* ── Static params for SSG ──────────────────────────────────────────── */

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    limit: 100,
    depth: 0,
  })

  return docs.map((doc) => ({
    slug: (doc as unknown as PageDoc).slug,
  }))
}

/* ── Dynamic metadata ───────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params
  const tenant = await resolveTenant()
  if (!tenant) return {}

  const page = await getPage(slug, tenant.id)

  if (!page) return {}

  return {
    title: `${page.title} | ${tenant.name}`,
    description: page.metaDescription ?? undefined,
  }
}

/* ── Page component ─────────────────────────────────────────────────── */

export default async function DynamicPage({
  params,
}: Readonly<{
  params: Params
}>) {
  const { slug } = await params
  const tenant = await resolveTenant()
  if (!tenant) notFound()

  const page = await getPage(slug, tenant.id)

  if (!page) notFound()

  /* Fetch live clinic status + conditions in parallel for HeroBlock */
  const hasHero = page.blocks.some((b) => b.blockType === 'hero')
  const [clinicStatus, conditions] = hasHero
    ? await Promise.all([getClinicStatus(tenant.id), getConditions(tenant.id)])
    : [undefined, undefined]

  return (
    <BlockRenderer
      blocks={page.blocks}
      waitTime={clinicStatus?.currentWaitTime}
      isOpen={clinicStatus?.isOpen}
      conditions={conditions}
    />
  )
}
