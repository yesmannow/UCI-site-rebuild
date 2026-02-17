'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { leadSchema, type LeadFormData } from '@/lib/schemas/intake'

export type SaveInquiryResult =
  | { success: true; inquiryId: string }
  | { success: false; error: string }

/**
 * Server Action – Step 1 of the intake form.
 *
 * Validates and saves the lead data to the 'inquiries' collection
 * immediately so the Mailchimp afterChange hook can fire even if
 * the patient abandons the remaining steps.
 *
 * @param tenantId - The tenant this inquiry belongs to.
 * @param data     - Validated lead form data.
 */
export async function saveInquiry(
  tenantId: string,
  data: LeadFormData,
): Promise<SaveInquiryResult> {
  /* ── Validate on the server ───────────────────────────────────────── */
  const parsed = leadSchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join('; '),
    }
  }

  const { firstName, lastName, email, marketingConsent } = parsed.data

  try {
    const payload = await getPayload({ config })

    /* Upsert: if a lead with this email already exists, update it */
    const existing = await payload.find({
      collection: 'inquiries',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const doc = existing.docs[0]
      await payload.update({
        collection: 'inquiries',
        id: doc.id,
        data: { firstName, lastName, marketingConsent },
      })
      return { success: true, inquiryId: String(doc.id) }
    }

    const created = await payload.create({
      collection: 'inquiries',
      data: {
        tenant: tenantId,
        firstName,
        lastName,
        email,
        marketingConsent,
        status: 'Lead',
      },
    })

    return { success: true, inquiryId: String(created.id) }
  } catch (err) {
    console.error('[saveInquiry] Failed:', err)
    return { success: false, error: 'Unable to save inquiry. Please try again.' }
  }
}
