import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Tenant } from '@/collections/Tenants'

/**
 * Resolves a Tenant document from a hostname.
 *
 * The lookup matches against the `domains` array stored on each
 * Tenant document. Results are cached per-request via React `cache()`
 * so multiple calls in the same RSC render tree share a single DB hit.
 *
 * @param hostname - The host header value (e.g. "urgentcareindy.com" or "localhost")
 * @returns The matching Tenant, or `null` if none matched.
 */
export const getTenant = cache(async (hostname: string): Promise<Tenant | null> => {
  const payload = await getPayload({ config })

  // Strip port number if present (e.g. "localhost:3000" → "localhost")
  const host = hostname.split(':')[0]

  const { docs } = await payload.find({
    collection: 'tenants',
    where: {
      'domains.domain': { equals: host },
    },
    limit: 1,
    depth: 1, // populate logo + acceptedInsurances one level
  })

  return (docs[0] as unknown as Tenant) ?? null
})

/**
 * Resolves a Tenant by its slug (used when the middleware has already
 * identified the tenant and passes the slug via header).
 */
export const getTenantBySlug = cache(async (slug: string): Promise<Tenant | null> => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  return (docs[0] as unknown as Tenant) ?? null
})
