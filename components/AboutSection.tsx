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
    <section className="bg-brand-mintWash pb-12">
      <div className="container mx-auto px-4">
        {aboutTitle && (
          <h2 className="text-3xl font-bold italic mb-6 text-center text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
            {aboutTitle}
          </h2>
        )}
        {aboutContent && (
          <div className="prose prose-lg max-w-3xl mx-auto prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-text prose-p:text-brand-textMuted">
            <PortableText value={aboutContent} />
          </div>
        )}
      </div>
    </section>
  )
}
