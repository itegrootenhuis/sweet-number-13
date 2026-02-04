'use client'

import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import SanityImage from './SanityImage'

export interface Product {
  title: string
  content?: any[]
  image?: { asset?: any }
  alt?: string
}

interface ProductSectionProps {
  products: Product[]
}

export default function ProductSection({ products }: ProductSectionProps) {
  if (!products || products.length === 0) return null

  return (
    <section className="bg-brand-mintWash py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col">
              {product.image?.asset && (
                <div className="rounded-lg overflow-hidden shadow-soft mb-4">
                  <SanityImage
                    asset={product.image.asset}
                    alt={product.alt || product.title}
                    width={600}
                    height={600}
                    className="w-full aspect-square object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold italic text-brand-text mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                {product.title}
              </h3>
              {product.content && product.content.length > 0 && (
                <div className="prose prose-sm max-w-none prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-text prose-p:text-brand-textMuted flex-grow">
                  <PortableText value={product.content} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/cookie-inquiry"
            className="inline-block bg-brand-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-coralDark transition-colors shadow-soft"
          >
            Cookie Inquiry
          </Link>
        </div>
      </div>
    </section>
  )
}
