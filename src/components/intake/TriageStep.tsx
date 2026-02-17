'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'

import { triageSchema, type TriageFormData } from '@/lib/schemas/intake'
import type { ConditionOption } from '@/app/actions/getConditions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  readonly conditions: ConditionOption[]
  readonly defaultValues?: Partial<TriageFormData>
  readonly onSubmit: (data: TriageFormData) => void | Promise<void>
  readonly onBack: () => void
}

export function TriageStep({ conditions, defaultValues, onSubmit, onBack }: Props) {
  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TriageFormData>({
    resolver: zodResolver(triageSchema),
    defaultValues: { conditionId: '', ...defaultValues },
  })

  const selectedId = watch('conditionId')
  const [query, setQuery] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  /* ── Filter conditions by symptom or title ────────────────────────── */
  const filtered = React.useMemo(() => {
    if (!query) return conditions
    const q = query.toLowerCase()
    return conditions.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.symptoms.some((s) => s.toLowerCase().includes(q)),
    )
  }, [conditions, query])

  /* ── Close dropdown on outside click ──────────────────────────────── */
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectedLabel = conditions.find((c) => c.id === selectedId)?.title

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2" ref={wrapperRef}>
        <Label htmlFor="symptomSearch">What brings you in today?</Label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            id="symptomSearch"
            placeholder="Search symptoms or conditions…"
            className="pl-9"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            aria-expanded={open}
            aria-autocomplete="list"
          />
        </div>

        {/* Dropdown */}
        {open && filtered.length > 0 && (
          <ul
            className="max-h-60 overflow-auto rounded-md border border-border bg-popover shadow-md"
          >
            {filtered.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={cn(
                    'w-full text-left cursor-pointer px-4 py-2 text-sm hover:bg-muted',
                    c.id === selectedId && 'bg-primary-50 font-medium text-primary-700',
                  )}
                  onClick={() => {
                    setValue('conditionId', c.id)
                    setQuery(c.title)
                    setOpen(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setValue('conditionId', c.id)
                      setQuery(c.title)
                      setOpen(false)
                    }
                  }}
                >
                  <span className="font-medium">{c.title}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {c.symptoms.slice(0, 3).join(', ')}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {open && filtered.length === 0 && query && (
          <p className="rounded-md border border-border bg-popover px-4 py-3 text-sm text-muted-foreground">
            No matching conditions found.
          </p>
        )}

        {selectedLabel && !open && (
          <p className="text-sm text-primary-600">
            Selected: <span className="font-semibold">{selectedLabel}</span>
          </p>
        )}

        {errors.conditionId && (
          <p className="text-sm text-destructive">{errors.conditionId.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="accent" size="lg" className="flex-1">
          Continue
        </Button>
      </div>
    </form>
  )
}
