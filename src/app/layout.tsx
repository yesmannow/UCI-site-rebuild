import type { Metadata } from 'next'

import { Navbar } from '@/components/Navbar'
import { getTenant } from '@/lib/getTenant'

import './globals.css'

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
  const tenant = await getTenant()

  return (
    <html lang="en">
      <body data-theme={tenant.theme}>
        <Navbar tenant={tenant} />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  )
}
