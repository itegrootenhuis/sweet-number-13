'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import SanityImage from './SanityImage'
import ImageModal from './ImageModal'

interface PriceSectionProps {
  priceField1: any[]
  priceField1Image?: {
    asset?: any
  }
  priceField2: any[]
  priceField2Image?: {
    asset?: any
  }
}

export default function PriceSection({ priceField1, priceField1Image, priceField2, priceField2Image }: PriceSectionProps) {
  const [modalImage, setModalImage] = useState<{ asset: any; alt: string } | null>(null)

  const openModal = (asset: any, alt: string) => {
    setModalImage({ asset, alt })
  }

  const closeModal = () => {
    setModalImage(null)
  }

  return (
    <section className="bg-brand-mintWash py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="prose prose-lg max-w-none text-center prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-text prose-p:text-brand-textMuted">
              <PortableText
                value={priceField1}
                components={{
                  block: {
                    h2: ({ children }) => (
                      <h2 className="text-3xl font-bold italic" style={{ fontFamily: 'var(--font-playfair)' }}>{children}</h2>
                    ),
                  },
                }}
              />
            </div>
            {priceField1Image?.asset && (
              <div className="mt-6 cursor-pointer" onClick={() => openModal(priceField1Image.asset, 'Product image')}>
                <SanityImage
                  asset={priceField1Image.asset}
                  alt="Product image"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover w-full max-w-sm hover:opacity-90 transition-opacity"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="prose prose-lg max-w-none text-center prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-text prose-p:text-brand-textMuted">
              <PortableText
                value={priceField2}
                components={{
                  block: {
                    h2: ({ children }) => (
                      <h2 className="text-3xl font-bold italic" style={{ fontFamily: 'var(--font-playfair)' }}>{children}</h2>
                    ),
                  },
                }}
              />
            </div>
            {priceField2Image?.asset && (
              <div className="mt-6 cursor-pointer" onClick={() => openModal(priceField2Image.asset, 'Product image')}>
                <SanityImage
                  asset={priceField2Image.asset}
                  alt="Product image"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover w-full max-w-sm hover:opacity-90 transition-opacity"
                />
              </div>
            )}
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/contact"
            className="inline-block bg-brand-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-coral/90 transition-colors shadow-soft"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onClose={closeModal}
          imageAsset={modalImage.asset}
          alt={modalImage.alt}
        />
      )}
    </section>
  )
}
