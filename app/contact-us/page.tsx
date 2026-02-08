import type { Metadata } from 'next'
import ContactUsForm from '@/components/ContactUsForm'
import StructuredData from '@/components/StructuredData'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Sweet No. 13. Send us a message and we will get back to you. We are happy to answer questions about custom cookie orders.',
  alternates: {
    canonical: `${siteUrl}/contact-us`,
  },
  openGraph: {
    title: 'Contact Us | Sweet No. 13',
    description: 'Get in touch with Sweet No. 13',
    url: `${siteUrl}/contact-us`,
  },
}

export default function ContactUsPage() {
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
      <StructuredData
        type="BreadcrumbList"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Contact Us',
              item: `${siteUrl}/contact-us`,
            },
          ],
        }}
      />
      <section className="bg-brand-coral py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold italic text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
            Contact Us
          </h1>
        </div>
      </section>
      <div className="bg-brand-primary min-h-screen">
        <div className="container mx-auto px-4 py-12">
        <p className="text-center text-brand-textMuted mb-12 max-w-2xl mx-auto">
          Have a question or want to get in touch? Fill out the form below and we will get back to you as soon as we can.
        </p>
        <ContactUsForm />
        </div>
      </div>
    </>
  )
}
