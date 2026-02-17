'use client'

import * as React from 'react'
import { Search, ArrowRight } from 'lucide-react'
import Link from 'next/link'

import type { ConditionOption } from '@/app/actions/getConditions'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface QuickSearchProps {
  readonly conditions: ConditionOption[]
  readonly className?: string
}

/**
 * Hero-embedded symptom search.
 * Patients type a symptom and see matching conditions with a direct
 * link to the booking page.
 */
export function QuickSearch({ conditions, className }: QuickSearchProps) {
  const [query, setQuery] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const filtered = React.useMemo(() => {
    if (!query || query.length < 2) return []
    const q = query.toLowerCase()
    return conditions
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.symptoms.some((s) => s.toLowerCase().includes(q)),
      )
      .slice(0, 6)
  }, [conditions, query])

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={wrapperRef} className={cn('relative mx-auto max-w-md', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          placeholder="Search symptoms (e.g. sore throat, fever)…"
          className="pl-9 pr-4"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => query.length >= 2 && setOpen(true)}
          aria-label="Search symptoms"
          aria-expanded={open && filtered.length > 0}
          aria-autocomplete="list"
        />
      </div>

      {open && filtered.length > 0 && (
        <ul
          className="absolute z-20 mt-1 w-full max-h-64 overflow-auto rounded-md border border-border bg-popover shadow-lg"
        >
          {filtered.map((c) => (
            <li key={c.id}>
              <Link
                href={`/book?condition=${c.id}`}
                className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-muted transition-colors focus:outline-none focus:bg-muted"
                onClick={() => setOpen(false)}
              >
                <div>
                  <span className="font-medium">{c.title}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {c.symptoms.slice(0, 2).join(', ')}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {open && query.length >= 2 && filtered.length === 0 && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-border bg-popover px-4 py-3 text-sm text-muted-foreground shadow-lg">
          No matching conditions. You can still{' '}
          <Link href="/book" className="font-medium text-primary-500 underline">
            book a visit
          </Link>
          .
        </div>
      )}
    </div>
  )
}
