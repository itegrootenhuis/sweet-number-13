import type { Metadata } from 'next'
import ContactUsForm from '@/components/ContactUsForm'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Sweet No. 13. Send us a message and we will get back to you.',
  openGraph: {
    title: 'Contact Us | Sweet No. 13',
    description: 'Get in touch with Sweet No. 13',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'}/contact-us`,
  },
}

export default function ContactUsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'

  return (
    <>
      <StructuredData
        type="ContactPage"
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Us - Sweet No. 13',
          description: 'Get in touch with Sweet No. 13',
          url: `${siteUrl}/contact-us`,
          mainEntity: {
            '@type': 'Organization',
            name: 'Sweet No. 13',
            url: siteUrl,
          },
        }}
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold italic mb-6 text-center text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
          Contact Us
        </h1>
        <p className="text-center text-brand-textMuted mb-12 max-w-2xl mx-auto">
          Have a question or want to get in touch? Fill out the form below and we will get back to you as soon as we can.
        </p>
        <ContactUsForm />
      </div>
    </>
  )
}
