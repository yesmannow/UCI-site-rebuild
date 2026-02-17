import Link from 'next/link'
import { Clock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { QuickSearch } from '@/components/QuickSearch'
import type { HeroBlockData } from '@/collections/Pages'
import type { ConditionOption } from '@/app/actions/getConditions'

interface Props {
  block: HeroBlockData
  /** Live wait time in minutes (fetched from Tenant document) */
  waitTime?: number
  /** Whether the clinic is currently open */
  isOpen?: boolean
  /** Conditions for the QuickSearch overlay (if provided, search is rendered) */
  conditions?: ConditionOption[]
}

export function HeroBlockComponent({ block, waitTime, isOpen, conditions }: Props) {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {block.title}
      </h1>

      {block.subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {block.subtitle}
        </p>
      )}

      {block.showWaitTime && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">
          <Clock className="h-4 w-4" aria-hidden />
          {isOpen === false ? (
            <span className="font-bold">Currently Closed</span>
          ) : (
            <>
              Current wait: <span className="font-bold">~{waitTime ?? 15} min</span>
            </>
          )}
        </div>
      )}

      {/* QuickSearch – only when conditions are provided */}
      {conditions && conditions.length > 0 && (
        <div className="mt-8">
          <QuickSearch conditions={conditions} />
        </div>
      )}

      {block.ctaLabel && (
        <div className="mt-8">
          <Button variant="accent" size="lg" asChild>
            <Link href="/book">{block.ctaLabel}</Link>
          </Button>
        </div>
      )}
    </section>
  )
}
