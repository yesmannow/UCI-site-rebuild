'use client'

import React from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, RotateCcw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface TriageResultCardProps {
  readonly symptom: string
  readonly estimatedWait: number
  readonly tenantSlug: string
  readonly theme: 'teal-orange' | 'navy-gold'
  readonly onReset: () => void
}

export function TriageResultCard({
  symptom,
  estimatedWait,
  tenantSlug,
  theme,
  onReset,
}: TriageResultCardProps) {
  const getButtonClasses = () => {
    return theme === 'teal-orange'
      ? 'bg-orange-600 hover:bg-orange-700 text-white'
      : 'bg-blue-900 hover:bg-blue-800 text-white'
  }

  const getAccentColor = () => {
    return theme === 'teal-orange' ? 'orange' : 'blue'
  }

  return (
    <Card className="w-full bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className={`h-5 w-5 ${getAccentColor() === 'orange' ? 'text-orange-600' : 'text-blue-900'}`} />
          You&rsquo;re Ready to Book!
        </CardTitle>
        <CardDescription>
          We can help with <strong>{symptom}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Wait Time Display */}
        <div className="rounded-lg border-2 border-green-300 bg-white p-6 text-center">
          <p className="text-sm font-semibold text-gray-600 mb-2">Current Estimated Wait Time</p>
          <div className="flex items-baseline justify-center gap-2">
            <span className={`text-5xl font-bold ${getAccentColor() === 'orange' ? 'text-orange-600' : 'text-blue-900'}`}>
              {estimatedWait}
            </span>
            <span className="text-lg text-gray-600">minutes</span>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Based on current patient flow. Actual wait may vary.
          </p>
        </div>

        {/* What to Expect */}
        <div className="space-y-2 rounded-lg bg-white/50 p-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-200 text-sm font-bold text-green-700">
              ✓
            </span>
            What to Expect
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 ml-8">
            <li>• Quick check-in (5 minutes)</li>
            <li>• Medical evaluation by licensed provider</li>
            <li>• Treatment & care recommendations</li>
            <li>• Insurance accepted at checkout</li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link href={`/${tenantSlug}/book`} className="block">
            <Button
              size="lg"
              className={`w-full ${getButtonClasses()} text-base font-semibold`}
            >
              Save My Spot <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Check Different Symptom
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 text-center">
          By booking, you agree to our wait time estimate. Your actual appointment may be sooner or
          later based on priority.
        </p>
      </CardContent>
    </Card>
  )
}
