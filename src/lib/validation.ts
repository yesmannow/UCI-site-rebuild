import { z } from 'zod'

/* ── Shared Zod Schemas ─────────────────────────────────────────────── */

/** RFC-5322-ish email check (Zod default) */
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .transform((v) => v.toLowerCase().trim())

/** US ZIP – exactly 5 digits */
export const zipCodeSchema = z
  .string()
  .regex(/^\d{5}$/, 'ZIP code must be exactly 5 digits')

/* ── Payload-compatible validators ──────────────────────────────────── */

/**
 * Wraps a Zod schema into a Payload `validate` function.
 * Returns `true` on success or an error string on failure.
 *
 * Payload validators receive `value | null | undefined`, so we
 * accept that union and let the Zod schema decide what's valid.
 */
export function zodToPayloadValidator<T>(schema: z.ZodType<T>) {
  return (value: T | null | undefined): true | string => {
    if (value === null || value === undefined) return true // let Payload's `required` handle emptiness
    const result = schema.safeParse(value)
    if (result.success) return true
    return result.error.issues.map((i) => i.message).join('; ')
  }
}

export const validateEmail = zodToPayloadValidator(emailSchema)
export const validateZipCode = zodToPayloadValidator(zipCodeSchema)
