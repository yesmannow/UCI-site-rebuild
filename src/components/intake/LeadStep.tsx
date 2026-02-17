'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { leadSchema, type LeadFormData } from '@/lib/schemas/intake'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

interface Props {
  readonly defaultValues?: Partial<LeadFormData>
  readonly onSubmit: (data: LeadFormData) => void | Promise<void>
  readonly isPending?: boolean
}

export function LeadStep({ defaultValues, onSubmit, isPending }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      marketingConsent: false,
      ...defaultValues,
    },
  })

  const consent = watch('marketingConsent')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register('firstName')} aria-invalid={!!errors.firstName} />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register('lastName')} aria-invalid={!!errors.lastName} />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" {...register('email')} aria-invalid={!!errors.email} />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Marketing Consent */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="marketingConsent"
          checked={consent}
          onCheckedChange={(checked) => setValue('marketingConsent', checked === true)}
        />
        <Label htmlFor="marketingConsent" className="text-sm font-normal">
          I agree to receive health tips and promotions from UrgentCare Indy.
        </Label>
      </div>

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isPending}>
        {isPending ? 'Saving…' : 'Continue'}
      </Button>
    </form>
  )
}
