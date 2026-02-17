import { z } from 'zod'
import { emailSchema, zipCodeSchema } from '@/lib/validation'

/* ── Step 1 – Lead ──────────────────────────────────────────────────── */

export const leadSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(100),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(100),
  email: emailSchema,
  marketingConsent: z.boolean(),
})

export type LeadFormData = z.infer<typeof leadSchema>

/* ── Step 2 – Triage ────────────────────────────────────────────────── */

export const triageSchema = z.object({
  conditionId: z
    .string()
    .min(1, 'Please select a condition'),
})

export type TriageFormData = z.infer<typeof triageSchema>

/* ── Step 3 – Clinical ──────────────────────────────────────────────── */

export const clinicalSchema = z.object({
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required'),
  street: z
    .string()
    .min(1, 'Street address is required'),
  city: z
    .string()
    .min(1, 'City is required'),
  state: z
    .string()
    .length(2, 'Use 2-letter state abbreviation'),
  zip: zipCodeSchema,
  medications: z
    .string()
    .optional(), // placeholder – openFDA integration later
})

export type ClinicalFormData = z.infer<typeof clinicalSchema>

/* ── Combined payload (all 3 steps) ─────────────────────────────────── */

export const fullIntakeSchema = leadSchema
  .merge(triageSchema)
  .merge(clinicalSchema)

export type FullIntakeData = z.infer<typeof fullIntakeSchema>
