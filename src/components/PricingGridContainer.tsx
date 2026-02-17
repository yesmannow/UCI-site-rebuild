import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Tenant } from '@/collections/Tenants'
import { PricingGrid } from '@/components/PricingGrid'

interface PricingGridContainerProps {
  readonly tenant: Tenant
}

export async function PricingGridContainer({ tenant }: PricingGridContainerProps) {
  const payload = await getPayload({ config })

  // Fetch pricing tiers for this tenant, filtered by siteType
  // For now, we fetch both types - the component can filter if needed
  const { docs: pricingDocs } = await payload.find({
    collection: 'pricing',
    where: {
      tenant: { equals: tenant.id },
    },
    limit: 100,
  })

  if (!pricingDocs || pricingDocs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-muted-foreground px-6 py-12 text-center">
        <p className="text-muted-foreground">No pricing tiers available yet.</p>
      </div>
    )
  }

  return <PricingGrid pricing={pricingDocs as any} theme={tenant.theme} tenantSlug={tenant.slug} />
}
