'use client'

import React, { useState } from 'react'
import { AlertTriangle, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { EmergencyAlertModal } from './EmergencyAlertModal'
import { TriageResultCard } from './TriageResultCard'

/* ── Symptom definitions ───────────────────────────────────────────── */

const EMERGENCY_SYMPTOMS = ['Chest Pain', 'Shortness of Breath']

const STANDARD_SYMPTOMS = [
  'Sore Throat',
  'Cough',
  'Fever',
  'Headache',
  'Body Aches',
  'Nausea/Vomiting',
  'Ear Pain',
  'Rash',
  'Minor Injury',
]

/* ── Mock wait time data ───────────────────────────────────────────── */

const WAIT_TIME_MAP: Record<string, number> = {
  'Sore Throat': 12,
  'Cough': 15,
  'Fever': 18,
  'Headache': 10,
  'Body Aches': 15,
  'Nausea/Vomiting': 20,
  'Ear Pain': 8,
  'Rash': 25,
  'Minor Injury': 30,
}

interface TriageAgentProps {
  readonly tenantSlug: string
  readonly theme: 'teal-orange' | 'navy-gold'
}

export function TriageAgent({ tenantSlug, theme }: TriageAgentProps) {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null)
  const [showEmergency, setShowEmergency] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const isEmergency = selectedSymptom && EMERGENCY_SYMPTOMS.includes(selectedSymptom)
  const estimatedWait = selectedSymptom ? WAIT_TIME_MAP[selectedSymptom] || 20 : null

  const handleSymptomSelect = (symptom: string) => {
    setSelectedSymptom(symptom)
    setShowResult(false)

    if (EMERGENCY_SYMPTOMS.includes(symptom)) {
      setShowEmergency(true)
    }
  }

  const handleProceed = () => {
    if (selectedSymptom && !isEmergency) {
      setShowResult(true)
    }
  }

  const handleReset = () => {
    setSelectedSymptom(null)
    setShowResult(false)
  }

  const getAccentColor = () => {
    return theme === 'teal-orange' ? 'orange' : 'blue'
  }

  const getButtonClasses = () => {
    return theme === 'teal-orange'
      ? 'bg-orange-600 hover:bg-orange-700 text-white'
      : 'bg-blue-900 hover:bg-blue-800 text-white'
  }

  /* ── Emergency Modal Open ──────────────────────────────────────────── */
  if (showEmergency && selectedSymptom && isEmergency) {
    return (
      <EmergencyAlertModal
        symptom={selectedSymptom}
        onClose={() => {
          setShowEmergency(false)
          setSelectedSymptom(null)
        }}
      />
    )
  }

  /* ── Result Screen ─────────────────────────────────────────────── */
  if (showResult && selectedSymptom && estimatedWait !== null) {
    return (
      <TriageResultCard
        symptom={selectedSymptom}
        estimatedWait={estimatedWait}
        tenantSlug={tenantSlug}
        theme={theme}
        onReset={handleReset}
      />
    )
  }

  /* ── Symptom Selection Screen ──────────────────────────────────── */
  return (
    <Card className="w-full border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className={`h-5 w-5 ${getAccentColor() === 'orange' ? 'text-orange-600' : 'text-blue-900'}`} />
          Quick Symptom Checker
        </CardTitle>
        <CardDescription>
          Tell us what brought you in today. This helps us prioritize your care and estimate your wait time.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Emergency Warning */}
        <div className={`rounded-md border-l-4 px-4 py-3 ${
          theme === 'teal-orange'
            ? 'border-l-orange-500 bg-orange-50 text-orange-800'
            : 'border-l-blue-900 bg-blue-50 text-blue-900'
        }`}>
          <p className="text-sm font-medium">
            If you're experiencing a life-threatening emergency, call 911 immediately.
          </p>
        </div>

        {/* Symptom Selection */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-3">What are your main symptoms?</h3>

            {/* Standard Symptoms */}
            <RadioGroup value={selectedSymptom || ''} onValueChange={handleSymptomSelect}>
              <div className="space-y-3">
                {STANDARD_SYMPTOMS.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <RadioGroupItem value={symptom} id={symptom} />
                    <Label htmlFor={symptom} className="cursor-pointer flex-1">
                      {symptom}
                    </Label>
                  </div>
                ))}

                {/* Divider */}
                <hr className="my-4" />

                {/* Emergency Symptoms Section */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-red-600 uppercase">Urgent – Call 911</p>
                  {EMERGENCY_SYMPTOMS.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <RadioGroupItem value={symptom} id={symptom} />
                      <Label
                        htmlFor={symptom}
                        className="cursor-pointer flex-1 font-semibold text-red-600"
                      >
                        {symptom}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleProceed}
          disabled={!selectedSymptom}
          className={`w-full ${getButtonClasses()}`}
          size="lg"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  )
}
