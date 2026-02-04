'use client'

import { useState } from 'react'
import SanityImage from './SanityImage'
import ImageModal from './ImageModal'

const INITIAL_COUNT = 9
const LOAD_MORE_COUNT = 9

export interface GalleryImage {
  image?: { asset?: any }
  alt?: string
  title?: string
  content?: any[]
}

interface GallerySectionProps {
  images: GalleryImage[]
}

export default function GallerySection({ images }: GallerySectionProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [modalItem, setModalItem] = useState<GalleryImage | null>(null)

  const visible = images.slice(0, visibleCount)
  const hasMore = visibleCount < images.length

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, images.length))
  }

  if (!images || images.length === 0) {
    return (
      <section className="bg-brand-mintWash py-12">
        <div className="container mx-auto px-4 text-center text-brand-textMuted">
          No images in the gallery yet.
        </div>
      </section>
    )
  }

  return (
    <section className="bg-brand-mintWash py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visible.map((item, index) => (
            <button
              key={index}
              type="button"
              className="block w-full text-left rounded-lg overflow-hidden shadow-soft hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-coral"
              onClick={() => setModalItem(item)}
            >
              {item.image?.asset && (
                <SanityImage
                  asset={item.image.asset}
                  alt={item.alt || 'Gallery image'}
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover"
                />
              )}
            </button>
          ))}
        </div>
        {hasMore && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={showMore}
              className="inline-block bg-brand-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-coralDark transition-colors shadow-soft"
            >
              Show More
            </button>
          </div>
        )}
      </div>

      {modalItem && (
        <ImageModal
          isOpen={!!modalItem}
          onClose={() => setModalItem(null)}
          imageAsset={modalItem.image?.asset}
          alt={modalItem.alt || 'Gallery image'}
          title={modalItem.title}
          content={modalItem.content}
        />
      )}
    </section>
  )
}
