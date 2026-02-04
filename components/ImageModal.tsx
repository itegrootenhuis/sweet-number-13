'use client'

import { useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import SanityImage from './SanityImage'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageAsset?: any
  alt?: string
  title?: string
  content?: any[]
  onPrev?: () => void
  onNext?: () => void
  showPrev?: boolean
  showNext?: boolean
}

export default function ImageModal({ isOpen, onClose, imageAsset, alt = 'Product image', title, content, onPrev, onNext, showPrev, showNext }: ImageModalProps) {
  // Close on Escape; prev/next on Arrow keys
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
      if (e.key === 'ArrowLeft' && showPrev && onPrev) {
        e.preventDefault()
        onPrev()
      }
      if (e.key === 'ArrowRight' && showNext && onNext) {
        e.preventDefault()
        onNext()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, onPrev, onNext, showPrev, showNext])

  if (!isOpen || !imageAsset) return null

  const hasSidebar = !!(title || (content && content.length > 0))

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        className={`relative max-h-[90vh] w-full ${hasSidebar ? 'max-w-5xl' : 'max-w-4xl'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-brand-coral transition-colors z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Previous image */}
        {showPrev && onPrev && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next image */}
        {showNext && onNext && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div className="bg-white rounded-lg overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
          {/* Image */}
          <div className={`flex-shrink-0 ${hasSidebar ? 'md:max-w-[60%]' : ''}`}>
            <SanityImage
              asset={imageAsset}
              alt={alt}
              width={1200}
              height={1200}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </div>
          {/* Optional title + content to the right */}
          {hasSidebar && (
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {title && (
                <h3 className="text-xl font-bold italic text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {title}
                </h3>
              )}
              {content && content.length > 0 && (
                <div className="prose prose-sm max-w-none prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-text prose-p:text-brand-textMuted">
                  <PortableText value={content} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
