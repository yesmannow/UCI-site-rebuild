'use client'

import React from 'react'
import { AlertTriangle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmergencyAlertModalProps {
  readonly symptom: string
  readonly onClose: () => void
}

export function EmergencyAlertModal({ symptom, onClose }: EmergencyAlertModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      {/* Modal Card */}
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-2xl sm:p-8 animate-in zoom-in-50 duration-300">
        {/* Alert Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">EMERGENCY ALERT</h2>
          <p className="mt-2 text-gray-600">
            You reported: <strong>{symptom}</strong>
          </p>
        </div>

        {/* Warning Message */}
        <div className="space-y-3 rounded-lg border-l-4 border-l-red-600 bg-red-50 px-4 py-3">
          <p className="font-semibold text-red-900">
            For life-threatening emergencies, you need immediate care.
          </p>
          <p className="text-sm text-red-800">
            Please call 911 or go to the nearest emergency room immediately. Do not wait for an
            urgent care appointment.
          </p>
        </div>

        {/* Primary CTA - Call 911 */}
        <a href="tel:911">
          <Button
            size="lg"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg"
          >
            <Phone className="mr-2 h-5 w-5" />
            CALL 911 NOW
          </Button>
        </a>

        {/* Secondary Options */}
        <div className="space-y-2">
          <p className="text-center text-xs font-semibold text-gray-500 uppercase">OR</p>
          <a href="https://www.google.com/maps/search/nearest+emergency+room" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="w-full border-gray-300">
              Find Nearest ER
            </Button>
          </a>
        </div>

        {/* Dismiss (for testing/UI purposes only) */}
        <Button
          variant="ghost"
          className="w-full text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          I need to close this
        </Button>
      </div>
    </div>
  )
}
