import Image from 'next/image'

import { cn } from '@/lib/utils'
import type { MediaContentBlockData } from '@/collections/Pages'

interface Props {
  readonly block: MediaContentBlockData
}

export function MediaContentBlockComponent({ block }: Props) {
  const imageRight = block.imagePosition === 'right'
  const imageData =
    typeof block.image === 'object'
      ? block.image
      : { url: '/placeholder.svg', alt: '' }

  return (
    <section
      className={cn(
        'grid items-center gap-8 py-12 md:grid-cols-2',
        imageRight && 'md:[&>*:first-child]:order-2',
      )}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={imageData.url}
          alt={imageData.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Rich-text content */}
      <div className="prose max-w-none">
        {/* NOTE: Integrate Payload's Lexical serializer when block.richText is populated */}
        {block.richText ? (
          <div>{/* Lexical serializer will render block.richText here */}</div>
        ) : (
          <p className="text-muted-foreground">
            [Rich text content renders here]
          </p>
        )}
      </div>
    </section>
  )
}
