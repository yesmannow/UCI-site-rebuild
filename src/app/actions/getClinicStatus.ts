'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { Tenant } from '@/collections/Tenants'

export interface ClinicStatusResult {
  currentWaitTime: number
  isOpen: boolean
}

/**
 * Fetches the current clinic status (wait time, open/closed)
 * from the Tenant document.
 */
export async function getClinicStatus(tenantId: string): Promise<ClinicStatusResult> {
  const payload = await getPayload({ config })

  const tenant = (await payload.findByID({
    collection: 'tenants',
    id: tenantId,
    depth: 0,
  })) as unknown as Tenant

  return {
    currentWaitTime: tenant.currentWaitTime ?? 15,
    isOpen: tenant.isOpen ?? true,
  }
}
