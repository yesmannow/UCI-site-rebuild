'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X, Clock } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

/* ── Navigation links ───────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/locations', label: 'Locations' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
] as const

/* ── Component ──────────────────────────────────────────────────────── */

export function Navbar({ tenant }: { tenant: { logo: string; slug: string; currentWaitTime?: string } }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Brand ──────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <img src={tenant.logo} alt="Tenant Logo" className="h-8 w-auto" />
        </Link>

        {/* ── Desktop nav ────────────────────────────────────── */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── CTA + hamburger ────────────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Conditional WaitTime widget */}
          {tenant.slug === 'urgent-care' && tenant.currentWaitTime && (
            <div className="text-sm text-muted-foreground">
              Current Wait Time: {tenant.currentWaitTime}
            </div>
          )}

          <Button variant="accent" size="sm" asChild>
            <Link href="/save-your-spot" className="gap-1.5">
              <Clock className="h-4 w-4" aria-hidden />
              Save Your Spot
            </Link>
          </Button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <div
        className={cn(
          'overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden',
          mobileOpen ? 'max-h-64' : 'max-h-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary-500"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
