import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { Clock } from 'lucide-react'

import { getConditions } from '@/app/actions/getConditions'
import { getTenant } from '@/lib/getTenant'
import { IntakeForm } from '@/components/intake'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Save Your Spot',
  description:
    'Book your visit in minutes. Complete a quick intake form and skip the wait.',
}

export const revalidate = 60 // ISR – refresh conditions list every 60s

export default async function BookPage() {
  const headersList = await headers()
  const host = headersList.get('x-tenant-host') ?? 'localhost'
  const tenant = await getTenant(host)

  if (!tenant) notFound()

  const conditions = await getConditions(tenant.id)

  return (
    <section className="mx-auto max-w-xl px-4 py-12">
      {/* Page header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
          <Clock className="h-6 w-6 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Save Your Spot</h1>
        <p className="mt-2 text-muted-foreground">
          Complete your intake in 3 quick steps and skip the waiting room.
        </p>
      </div>

      {/* Form card */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Intake</CardTitle>
          <CardDescription>
            All fields are required unless marked optional. Your information is
            encrypted and protected under HIPAA.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IntakeForm conditions={conditions} tenantId={tenant.id} />
        </CardContent>
      </Card>
    </section>
  )
}
