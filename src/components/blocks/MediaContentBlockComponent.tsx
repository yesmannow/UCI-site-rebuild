import Image from 'next/image'

import { cn } from '@/lib/utils'
import type { MediaContentBlockData } from '@/collections/Pages'

interface Props {
  block: MediaContentBlockData
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

      {/* Rich-text placeholder — swap in your Payload serializer */}
      <div className="prose max-w-none">
        {/* TODO: Render `block.richText` through Payload's Lexical serializer */}
        <p className="text-muted-foreground">
          [Rich text content renders here]
        </p>
      </div>
    </section>
  )
}
