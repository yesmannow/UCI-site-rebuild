'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { Condition } from '@/collections/Conditions'

export interface ConditionOption {
  id: string
  title: string
  symptoms: string[]
}

/**
 * Returns conditions with their symptoms for the triage dropdown,
 * filtered by tenant.
 */
export async function getConditions(tenantId: string): Promise<ConditionOption[]> {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'conditions',
    where: { tenant: { equals: tenantId } },
    limit: 200,
    depth: 0,
    sort: 'title',
  })

  return (docs as unknown as Condition[]).map((c) => ({
    id: c.id,
    title: c.title,
    symptoms: c.commonSymptoms.map((s) => s.symptom),
  }))
}
