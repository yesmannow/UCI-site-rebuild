'use client'

import * as React from 'react'
import { CheckCircle, ClipboardList, MapPin, ExternalLink } from 'lucide-react'

import type { ConditionOption } from '@/app/actions/getConditions'
import { saveInquiry } from '@/app/actions/saveInquiry'
import type { LeadFormData, TriageFormData, ClinicalFormData } from '@/lib/schemas/intake'

import { Stepper } from '@/components/ui/stepper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LeadStep } from '@/components/intake/LeadStep'
import { TriageStep } from '@/components/intake/TriageStep'
import { ClinicalStep } from '@/components/intake/ClinicalStep'

/* ── Steps config ───────────────────────────────────────────────────── */

const STEPS = [
  { id: 'contact', label: 'Contact' },
  { id: 'triage', label: 'Triage' },
  { id: 'details', label: 'Details' },
]

/* ── Checklist items shown after success ────────────────────────────── */

const CHECKLIST = [
  "Photo ID (driver\u2019s license, passport, etc.)",
  'Insurance card (front & back)',
  'List of current medications',
  'Any relevant medical records',
]

const CLINIC_ADDRESS = '6015 Sunnyside Rd, Indianapolis, IN 46236'
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_ADDRESS)}`
const PATIENT_PORTAL_URL = 'https://www.mymedicallocker.com'

/* ── Component ──────────────────────────────────────────────────────── */

interface IntakeFormProps {
  readonly conditions: ConditionOption[]
  readonly tenantId: string
}

export function IntakeForm({ conditions, tenantId }: IntakeFormProps) {
  const [step, setStep] = React.useState(0)
  const [isPending, startTransition] = React.useTransition()

  /* Accumulated form data across steps */
  const [leadData, setLeadData] = React.useState<LeadFormData | null>(null)
  const [triageData, setTriageData] = React.useState<TriageFormData | null>(null)
  const [clinicalData, setClinicalData] = React.useState<ClinicalFormData | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [submitted, setSubmitted] = React.useState(false)

  /* ── Step 1 handler — fires the server action immediately ───────── */
  function handleLeadSubmit(data: LeadFormData) {
    setError(null)
    startTransition(async () => {
      const result = await saveInquiry(tenantId, data)
      if (!result.success) {
        setError(result.error)
        return
      }
      setLeadData(data)
      setStep(1)
    })
  }

  /* ── Step 2 handler ─────────────────────────────────────────────── */
  function handleTriageSubmit(data: TriageFormData) {
    setTriageData(data)
    setStep(2)
  }

  /* ── Step 3 handler — full submission ───────────────────────────── */
  function handleClinicalSubmit(data: ClinicalFormData) {
    setClinicalData(data)
    // Call submitFullIntake server action to sync patient data to iSalus EMR
    // NOTE: PHI must be transmitted server-side only (never logged or exposed client-side)
    setSubmitted(true)
  }

  /* ════════════════════════════════════════════════════════════════════
   * SUCCESS SCREEN
   * ════════════════════════════════════════════════════════════════════ */
  if (submitted) {
    return (
      <div className="space-y-8">
        {/* Confirmation header */}
        <div className="flex flex-col items-center text-center gap-3">
          <CheckCircle className="h-16 w-16 text-primary-500" />
          <h2 className="text-2xl font-bold tracking-tight">You&rsquo;re All Set!</h2>
          <p className="text-muted-foreground max-w-md">
            Thank you, {leadData?.firstName}. Your spot has been saved. Here&rsquo;s what to
            bring to your visit:
          </p>
        </div>

        {/* Visit Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Visit Checklist
            </CardTitle>
            <CardDescription>Please bring these items to your appointment.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Directions card */}
        <Card>
          <CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
              <div>
                <p className="text-sm font-medium">UrgentCare Indy</p>
                <p className="text-sm text-muted-foreground">{CLINIC_ADDRESS}</p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                Get Directions <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Patient Portal CTA */}
        <div className="text-center">
          <Button asChild variant="accent" size="lg">
            <a href={PATIENT_PORTAL_URL} target="_blank" rel="noopener noreferrer">
              Access Patient Portal <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Powered by My Medical Locker
          </p>
        </div>
      </div>
    )
  }

  /* ════════════════════════════════════════════════════════════════════
   * FORM STEPS
   * ════════════════════════════════════════════════════════════════════ */
  return (
    <div className="space-y-8">
      <Stepper steps={STEPS} activeStep={step} />

      {/* Error banner */}
      {error && (
        <div role="alert" className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {step === 0 && (
        <LeadStep
          defaultValues={leadData ?? undefined}
          onSubmit={handleLeadSubmit}
          isPending={isPending}
        />
      )}

      {step === 1 && (
        <TriageStep
          conditions={conditions}
          defaultValues={triageData ?? undefined}
          onSubmit={handleTriageSubmit}
          onBack={() => setStep(0)}
        />
      )}

      {step === 2 && (
        <ClinicalStep
          defaultValues={clinicalData ?? undefined}
          onSubmit={handleClinicalSubmit}
          onBack={() => setStep(1)}
          isPending={isPending}
        />
      )}
    </div>
  )
}
