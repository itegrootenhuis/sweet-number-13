'use client'

import { useEffect } from 'react'
import SanityImage from './SanityImage'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageAsset?: any
  alt?: string
}

export default function ImageModal({ isOpen, onClose, imageAsset, alt = 'Product image' }: ImageModalProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-brand-coral transition-colors"
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

        {/* Image */}
        <div className="bg-white rounded-lg overflow-hidden">
          <SanityImage
            asset={imageAsset}
            alt={alt}
            width={1200}
            height={1200}
            className="w-full h-auto max-h-[90vh] object-contain"
          />
        </div>
      </div>
    </div>
  )
}
