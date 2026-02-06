'use client'

import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import SanityImage from './SanityImage'

export interface Product {
  title: string
  content?: any[]
  image?: { 
    asset?: any
    hotspot?: { x: number; y: number; width: number; height: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  }
  alt?: string
}

interface ProductSectionProps {
  products: Product[]
  footerContent?: any[]
}

// Format product titles to make dimension numbers larger than the "x" and quotes
function formatProductTitle(title: string) {
  // Match patterns like 8"x8" or 4"x4" at the start of the title
  const match = title.match(/^(\d+)"x(\d+)"(.*)$/)
  if (!match) return <>{title}</>
  
  const [, num1, num2, rest] = match
  // Use text-3xl for 4"x4", text-2xl for 8"x8"
  const sizeClass = num1 === '4' ? 'text-3xl' : 'text-2xl'
  
  return (
    <>
      <span className={sizeClass}>{num1}</span><span className="text-xl">"x </span><span className={sizeClass}>{num2}</span><span className="text-xl">"</span>
      
      {rest}
    </>
  )
}

export default function ProductSection({ products, footerContent }: ProductSectionProps) {
  if (!products || products.length === 0) return null

  return (
    <section className="bg-brand-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col">
              {product.image?.asset && (
                <div className="rounded-lg overflow-hidden shadow-soft mb-4">
                  <SanityImage
                    asset={product.image.asset}
                    hotspot={product.image.hotspot}
                    crop={product.image.crop}
                    alt={product.alt || product.title}
                    width={600}
                    height={600}
                    className="w-full aspect-square object-cover"
                  />
                </div>
              )}
              <h3 className="text-2xl font-bold italic text-brand-text mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                {formatProductTitle(product.title)}
              </h3>
              {product.content && product.content.length > 0 && (
                <div className="prose prose-sm max-w-none prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-text prose-p:text-brand-textMuted flex-grow">
                  <PortableText value={product.content} />
                </div>
              )}
            </div>
          ))}
        </div>
        {footerContent && footerContent.length > 0 && (
          <div className="prose prose-sm max-w-2xl mx-auto prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-text prose-p:text-brand-textMuted prose-p:text-center text-center mt-8">
            <PortableText value={footerContent} />
          </div>
        )}
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
