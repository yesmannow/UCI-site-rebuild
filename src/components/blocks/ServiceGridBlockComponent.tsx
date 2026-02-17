import Link from 'next/link'

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { LucideIcon } from '@/components/LucideIcon'
import type { ServiceGridBlockData } from '@/collections/Pages'

interface Props {
  block: ServiceGridBlockData
}

export function ServiceGridBlockComponent({ block }: Props) {
  // Services can be IDs (strings) or populated objects
  const services = block.services.filter(
    (s): s is { id: string; title: string; slug: string; icon: string } =>
      typeof s === 'object',
  )

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
