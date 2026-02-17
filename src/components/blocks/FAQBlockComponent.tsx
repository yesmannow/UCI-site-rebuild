'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { FAQBlockData } from '@/collections/Pages'

interface Props {
  block: FAQBlockData
}

export function FAQBlockComponent({ block }: Props) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  return (
    <section className="py-12">
      {block.heading && (
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
          {block.heading}
        </h2>
      )}

      <div className="mx-auto max-w-3xl divide-y divide-border rounded-lg border border-border">
        {block.items.map((item, idx) => {
          const isOpen = openIndex === idx

          return (
            <div key={idx}>
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                {item.question}
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-muted-foreground transition-transform',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden
                />
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-[max-height] duration-300 ease-in-out',
                  isOpen ? 'max-h-96' : 'max-h-0',
                )}
              >
                <p className="px-6 pb-4 text-sm text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
