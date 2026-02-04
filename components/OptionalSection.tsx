import { PortableText } from '@portabletext/react'
import SanityImage from './SanityImage'

interface OptionalSectionProps {
  title?: string
  content?: any[]
  image?: { asset?: any }
  imageAlt?: string
}

export default function OptionalSection({ title, content, image, imageAlt }: OptionalSectionProps) {
  const hasTitle = title && title.trim().length > 0
  const hasContent = content && content.length > 0
  const hasImage = image?.asset

  if (!hasTitle && !hasContent && !hasImage) {
    return null
  }

  return (
    <section className="bg-brand-mintWash pb-12">
      <div className="container mx-auto px-4 max-w-3xl mx-auto">
        {hasTitle && (
          <h2 className="text-3xl font-bold italic mb-6 text-center text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
            {title}
          </h2>
        )}
        {hasContent && (
          <div className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-text prose-p:text-brand-textMuted mb-6">
            <PortableText value={content} />
          </div>
        )}
        {hasImage && (
          <div className="rounded-lg overflow-hidden shadow-soft">
            <SanityImage
              asset={image.asset}
              alt={imageAlt || title || 'Section image'}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
