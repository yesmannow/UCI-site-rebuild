'use client'

import * as icons from 'lucide-react'

interface DynamicIconProps extends React.SVGAttributes<SVGSVGElement> {
  /** The PascalCase Lucide icon name (e.g. "Stethoscope") */
  name: string
}

/**
 * Renders a Lucide icon by its string name.
 * Falls back to a generic circle if the name doesn't resolve.
 */
export function LucideIcon({ name, ...props }: DynamicIconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (icons as Record<string, any>)[name]

  if (!Icon || typeof Icon !== 'function') {
    const Fallback = icons.Circle
    return <Fallback {...props} />
  }

  return <Icon {...props} />
}
