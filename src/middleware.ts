import { NextRequest, NextResponse } from 'next/server'

/**
 * Edge Middleware – runs on every request, detects the tenant from the
 * hostname and forwards `x-tenant-slug` so downstream server components
 * can resolve the current brand without another DB round-trip.
 *
 * NOTE: Because Payload requires Node.js runtime, getTenant cannot run
 * in the Edge runtime. Instead we resolve the slug from the hostname
 * using a lightweight in-memory map (or pass the raw host and let the
 * server component resolve it). Here we pass the hostname so the RSC
 * layer can call getTenant / getTenantBySlug with full Node.js access.
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? 'localhost'

  // Strip port for consistency
  const host = hostname.split(':')[0]

  const headers = new Headers(request.headers)
  headers.set('x-tenant-host', host)

  return NextResponse.next({
    request: { headers },
  })
}

export const config = {
  /*
   * Match all front-end routes but skip Payload admin, API, static assets,
   * and Next.js internals.
   */
  matcher: [String.raw`/((?!_next|api|admin|favicon\.ico|.*\..*).*)`],
}
