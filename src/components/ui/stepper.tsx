import * as React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

/* ── Types ──────────────────────────────────────────────────────────── */

export interface Step {
  /** Unique key (e.g. 'contact', 'demographics', 'complaint') */
  id: string
  /** Human-readable label shown below the circle */
  label: string
}

export interface StepperProps {
  steps: Step[]
  /** Zero-based index of the currently active step */
  activeStep: number
  className?: string
}

/* ── Component ──────────────────────────────────────────────────────── */

export function Stepper({ steps, activeStep, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn('w-full', className)}>
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < activeStep
          const isCurrent = index === activeStep

          return (
            <li key={step.id} className="flex flex-1 flex-col items-center gap-2 relative">
              {/* ── Connector line ───────────────────────────── */}
              {index > 0 && (
                <div
                  className={cn(
                    'absolute top-4 -left-1/2 w-full h-0.5',
                    isCompleted ? 'bg-primary-500' : 'bg-border',
                  )}
                  aria-hidden
                />
              )}

              {/* ── Circle ──────────────────────────────────── */}
              <div
                className={cn(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                  isCompleted &&
                    'border-primary-500 bg-primary-500 text-white',
                  isCurrent &&
                    'border-primary-500 bg-white text-primary-500',
                  !isCompleted &&
                    !isCurrent &&
                    'border-border bg-white text-muted-foreground',
                )}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : (
                  index + 1
                )}
              </div>

              {/* ── Label ───────────────────────────────────── */}
              <span
                className={cn(
                  'text-xs font-medium',
                  isCurrent ? 'text-primary-500' : 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
