import { FadeIn } from '@/components/FadeIn'
import { HeroBlockComponent } from '@/components/blocks/HeroBlockComponent'
import { ServiceGridBlockComponent } from '@/components/blocks/ServiceGridBlockComponent'
import { MediaContentBlockComponent } from '@/components/blocks/MediaContentBlockComponent'
import { FAQBlockComponent } from '@/components/blocks/FAQBlockComponent'
import type { PageBlock } from '@/collections/Pages'
import type { ConditionOption } from '@/app/actions/getConditions'

interface Props {
  /** Live wait time (from Tenant document) */
  readonly waitTime?: number
  /** Whether the clinic is open */
  readonly isOpen?: boolean
  /** Conditions for the QuickSearch in HeroBlock */
  readonly conditions?: ConditionOption[]
  readonly blocks: PageBlock[]
}

/**
 * Maps Payload block data to their corresponding React components.
 * Each block is wrapped in a <FadeIn> for viewport-triggered animation.
 */
export function BlockRenderer({ blocks, waitTime, isOpen, conditions }: Props) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `block-${index}`

        return (
          <FadeIn key={key}>
            <BlockSwitch
              block={block}
              waitTime={waitTime}
              isOpen={isOpen}
              conditions={conditions}
            />
          </FadeIn>
        )
      })}
    </>
  )
}

/* ── Internal switch ────────────────────────────────────────────────── */

interface BlockSwitchProps {
  readonly block: PageBlock
  readonly waitTime?: number
  readonly isOpen?: boolean
  readonly conditions?: ConditionOption[]
}

function BlockSwitch({ block, waitTime, isOpen, conditions }: BlockSwitchProps) {
  switch (block.blockType) {
    case 'hero':
      return (
        <HeroBlockComponent
          block={block}
          waitTime={waitTime}
          isOpen={isOpen}
          conditions={conditions}
        />
      )
    case 'serviceGrid':
      return <ServiceGridBlockComponent block={block} />
    case 'mediaContent':
      return <MediaContentBlockComponent block={block} />
    case 'faq':
      return <FAQBlockComponent block={block} />
    default: {
      const _exhaustive: never = block
      console.warn('Unknown block type:', (_exhaustive as { blockType: string }).blockType)
      return null
    }
  }
}
