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
}

export default function ImageModal({ isOpen, onClose, imageAsset, alt = 'Product image', title, content }: ImageModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

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
