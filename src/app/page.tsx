import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

import { getTenant } from '@/lib/getTenant'
import { BlockRenderer } from '@/components/BlockRenderer'
import { getClinicStatus } from '@/app/actions/getClinicStatus'
import { getConditions } from '@/app/actions/getConditions'
import type { PageDoc } from '@/collections/Pages'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const headersList = await headers()
  const host = headersList.get('x-tenant-host') ?? 'localhost'
  const tenant = await getTenant(host)

  if (!tenant) {
    notFound()
  }

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
      tenant: { equals: tenant.id },
    },
    limit: 1,
    depth: 2,
  })

  const page = (docs[0] as unknown as PageDoc) ?? null
  if (!page) notFound()

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
      tenantId={tenant.id}
      tenantSlug={tenant.slug}
    />
  )
}
