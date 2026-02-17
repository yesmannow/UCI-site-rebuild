import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { DollarSign } from 'lucide-react'

import { getTenant } from '@/lib/getTenant'
import { PricingGridContainer } from '@/components/PricingGridContainer'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'View our transparent pricing tiers for urgent care and primary care services.',
}

export const revalidate = 300 // ISR – refresh pricing every 5 minutes

export default async function PricingPage() {
  const headersList = await headers()
  const host = headersList.get('x-tenant-host') ?? 'localhost'
  const tenant = await getTenant(host)

  if (!tenant) notFound()

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* Page header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
          <DollarSign className="h-6 w-6 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Simple, Transparent Pricing</h1>
        <p className="mt-2 text-muted-foreground">
          Choose the service tier that works best for you. All prices include a licensed medical
          evaluation.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="mb-8">
        <PricingGridContainer tenant={tenant} />
      </div>

      {/* FAQ or additional info */}
      <div className="mt-12 rounded-lg border border-muted bg-muted/20 px-6 py-8">
        <h3 className="font-semibold mb-4">Questions about pricing?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Our pricing is straightforward—what you see is what you pay. We accept most major
          insurance plans, and patients can opt to pay out-of-pocket for any service.
        </p>
        <p className="text-sm text-muted-foreground">
          For insurance verification or special accommodations, contact us directly.
        </p>
      </div>
    </section>
  )
}
