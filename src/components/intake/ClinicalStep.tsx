'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'

import { clinicalSchema, type ClinicalFormData } from '@/lib/schemas/intake'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface Props {
  readonly defaultValues?: Partial<ClinicalFormData>
  readonly onSubmit: (data: ClinicalFormData) => void | Promise<void>
  readonly onBack: () => void
  readonly isPending?: boolean
}

export function ClinicalStep({ defaultValues, onSubmit, onBack, isPending }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClinicalFormData>({
    resolver: zodResolver(clinicalSchema),
    defaultValues: {
      dateOfBirth: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      medications: '',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* DOB */}
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input id="dateOfBirth" type="date" {...register('dateOfBirth')} aria-invalid={!!errors.dateOfBirth} />
        {errors.dateOfBirth && (
          <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
        )}
      </div>

      {/* Address */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-medium">Address</legend>

        <div className="space-y-2">
          <Label htmlFor="street">Street</Label>
          <Input id="street" {...register('street')} aria-invalid={!!errors.street} />
          {errors.street && <p className="text-sm text-destructive">{errors.street.message}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register('city')} aria-invalid={!!errors.city} />
            {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" maxLength={2} placeholder="IN" {...register('state')} aria-invalid={!!errors.state} />
            {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" maxLength={5} placeholder="46220" {...register('zip')} aria-invalid={!!errors.zip} />
            {errors.zip && <p className="text-sm text-destructive">{errors.zip.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* Medications placeholder */}
      <div className="space-y-2">
        <Label htmlFor="medications">Current Medications</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            id="medications"
            className="pl-9"
            placeholder="Search medications (openFDA — coming soon)"
            {...register('medications')}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Medication lookup powered by openFDA will be available in a future update.
        </p>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="accent" size="lg" className="flex-1" disabled={isPending}>
          {isPending ? 'Submitting…' : 'Complete Booking'}
        </Button>
      </div>
    </form>
  )
}
