import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Clock, MapPin, Stethoscope } from 'lucide-react'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { getTenant } from '@/lib/getTenant'

export default async function HomePage() {
  const headersList = await headers()
  const host = headersList.get('x-tenant-host') ?? 'localhost'
  const tenant = await getTenant(host)
  
  if (!tenant) {
    notFound()
  }
  
  const page = tenant.homepage

  if (!page) {
    notFound()
  }

  return (
    <div className="space-y-12">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {page.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {page.description}
        </p>
      </section>

      {/* ── Feature cards ───────────────────────────────────────── */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: Clock,
            title: 'Real-Time Wait Times',
            description: 'See live wait times before you leave the house.',
          },
          {
            icon: Stethoscope,
            title: 'Expert Providers',
            description: 'Board-certified physicians & nurse practitioners.',
          },
          {
            icon: MapPin,
            title: 'Multiple Locations',
            description: 'Convenient clinics throughout the Indy metro area.',
          },
        ].map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className="h-8 w-8 text-primary-500" aria-hidden />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </section>
    </div>
  )
}
