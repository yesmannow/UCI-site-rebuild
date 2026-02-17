import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { Navbar } from '@/components/Navbar'
import { getTenant } from '@/lib/getTenant'

import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'UrgentCare Indy',
  description:
    'Walk-in urgent care clinics across Indianapolis. Save your spot online and skip the wait.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get headers and extract hostname from middleware
  const headersList = await headers()
  const hostname = headersList.get('x-tenant-host') || 'localhost'

  // Pass the hostname to getTenant
  const tenant = await getTenant(hostname)
  const themeClass =
    tenant?.theme === 'navy-gold' ? 'tenant-primary-care' : 'tenant-urgent-care'
  const navbarTenant = tenant
    ? {
        slug: tenant.slug,
        logo: typeof tenant.logo === 'string' ? tenant.logo : tenant.logo?.url ?? '/logo.svg',
        currentWaitTime: tenant.currentWaitTime ? `${tenant.currentWaitTime} min` : undefined,
      }
    : null

  return (
    <html lang="en">
      <body className={`${themeClass} antialiased`}>
        {navbarTenant ? <Navbar tenant={navbarTenant} /> : null}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  )
}
