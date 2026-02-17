'use client'

import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { PricingTier } from '@/collections/Pricing'
import type { TenantTheme } from '@/collections/Tenants'

interface PricingGridProps {
  readonly pricing: PricingTier[]
  readonly theme: TenantTheme
  readonly tenantSlug: string
}

export function PricingGrid({ pricing, theme, tenantSlug }: PricingGridProps) {
  // Determine accent color based on theme
  const accentColor = theme === 'teal-orange' ? 'orange' : 'blue'
  const accentClasses =
    theme === 'teal-orange'
      ? 'border-orange-500 bg-orange-50 text-orange-700'
      : 'border-blue-900 bg-blue-50 text-blue-900'
  const accentButtonClasses =
    theme === 'teal-orange'
      ? 'bg-orange-600 hover:bg-orange-700 text-white'
      : 'bg-blue-900 hover:bg-blue-800 text-white'

  return (
    <div className="w-full">
      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pricing.map((tier) => (
          <Card
            key={tier.id}
            className="relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            {/* Accent bar */}
            <div
              className={`h-1 ${
                theme === 'teal-orange' ? 'bg-orange-500' : 'bg-blue-900'
              }`}
            />

            <CardHeader>
              <CardTitle className="text-xl">{tier.levelName}</CardTitle>
              {tier.description && (
                <CardDescription className="text-sm">{tier.description}</CardDescription>
              )}
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
              {/* Price - Large and Bold */}
              <div className="mb-6 flex items-baseline gap-2">
                <span className={`text-4xl font-bold ${accentColor === 'orange' ? 'text-orange-600' : 'text-blue-900'}`}>
                  ${tier.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">per visit</span>
              </div>

              {/* Included items */}
              {tier.includes && tier.includes.length > 0 && (
                <ul className="mb-6 space-y-2 flex-1">
                  {tier.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                          accentColor === 'orange' ? 'text-orange-600' : 'text-blue-900'
                        }`}
                      />
                      <span>{item.item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Book Now Button */}
              <Link
                href={`/${tenantSlug}/book?priceLevel=${tier.id}`}
                className="w-full"
              >
                <Button className={`w-full ${accentButtonClasses}`} size="sm">
                  Book Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
