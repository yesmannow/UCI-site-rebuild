import Link from 'next/link'

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { LucideIcon } from '@/components/LucideIcon'
import type { ServiceGridBlockData } from '@/collections/Pages'

interface Props {
  readonly block: ServiceGridBlockData
  readonly tenantId?: string
}

export function ServiceGridBlockComponent({ block, tenantId }: Props) {
  // Services can be IDs (strings) or populated objects
  const services = block.services
    .filter(
      (s): s is {
        id: string
        title: string
        slug: string
        icon: string
        tenant?: string | { id: string }
      } => typeof s === 'object',
    )
    .filter((service) => {
      if (!tenantId || !service.tenant) return true
      return typeof service.tenant === 'string'
        ? service.tenant === tenantId
        : service.tenant.id === tenantId
    })

  return (
    <section className="py-12">
      {block.heading && (
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
          {block.heading}
        </h2>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link key={service.id} href={`/services/${service.slug}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <LucideIcon
                  name={service.icon}
                  className="mb-2 h-8 w-8 text-primary-500"
                  aria-hidden
                />
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription>Learn more →</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
