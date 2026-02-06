'use client'

import { useState } from 'react'
import SanityImage from './SanityImage'
import ImageModal from './ImageModal'

const INITIAL_COUNT = 9
const LOAD_MORE_COUNT = 9

export interface GalleryImage {
  image?: { 
    asset?: any
    hotspot?: { x: number; y: number; width: number; height: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  }
  alt?: string
  title?: string
  content?: any[]
}

interface GallerySectionProps {
  images: GalleryImage[]
}

export default function GallerySection({ images }: GallerySectionProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [currentModalIndex, setCurrentModalIndex] = useState<number | null>(null)

  const visible = images.slice(0, visibleCount)
  const hasMore = visibleCount < images.length
  const modalItem = currentModalIndex !== null ? visible[currentModalIndex] : null

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, images.length))
  }

  const goPrev = () => {
    setCurrentModalIndex((i) => (i === null ? null : Math.max(0, i - 1)))
  }
  const goNext = () => {
    setCurrentModalIndex((i) => (i === null ? null : Math.min(visible.length - 1, i + 1)))
  }

  if (!images || images.length === 0) {
    return (
      <section className="bg-brand-primary py-12">
        <div className="container mx-auto px-4 text-center text-brand-textMuted">
          No images in the gallery yet.
        </div>
      </section>
    )
  }

  return (
    <section className="bg-brand-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visible.map((item, index) => (
            <button
              key={index}
              type="button"
              className="block w-full text-left rounded-lg overflow-hidden shadow-soft hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-coral"
              onClick={() => setCurrentModalIndex(index)}
            >
              {item.image?.asset && (
                <SanityImage
                  asset={item.image.asset}
                  hotspot={item.image.hotspot}
                  crop={item.image.crop}
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

      {modalItem && currentModalIndex !== null && (
        <ImageModal
          isOpen
          onClose={() => setCurrentModalIndex(null)}
          imageAsset={modalItem.image?.asset}
          imageHotspot={modalItem.image?.hotspot}
          imageCrop={modalItem.image?.crop}
          alt={modalItem.alt || 'Gallery image'}
          title={modalItem.title}
          content={modalItem.content}
          onPrev={currentModalIndex > 0 ? goPrev : undefined}
          onNext={currentModalIndex < visible.length - 1 ? goNext : undefined}
          showPrev={currentModalIndex > 0}
          showNext={currentModalIndex < visible.length - 1}
        />
      )}
    </section>
  )
}
