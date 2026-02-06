import Link from 'next/link'
import { PortableText } from '@portabletext/react'

interface AboutSectionProps {
  aboutTitle?: string
  aboutContent?: any[]
}

export default function AboutSection({ aboutTitle, aboutContent }: AboutSectionProps) {
  if (!aboutTitle && !aboutContent) {
    return null
  }

  return (
    <section className="bg-brand-primary py-8">
      <div className="container mx-auto px-4">
        {aboutTitle && (
          <h2 className="text-4xl font-bold italic mb-6 text-center text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
            {aboutTitle}
          </h2>
        )}
        {aboutContent && (
          <div className="text-center prose prose-lg max-w-3xl mx-auto prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-text prose-p:text-brand-textMuted">
            <PortableText value={aboutContent} />
          </div>
        )}
        <div className="text-center mt-8">
          <Link
            href="/contact-us"
            className="inline-block bg-brand-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-coralDark transition-colors shadow-soft"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
