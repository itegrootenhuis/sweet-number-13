import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import ContactForm from '@/components/ContactForm'
import StructuredData from '@/components/StructuredData'

export const dynamic = 'force-dynamic'

interface ContactPageData {
  heading?: string
  content?: any[]
}

async function getContactPageData(): Promise<ContactPageData> {
  try {
    const query = groq`*[_type == "contactPage"][0]{
      heading,
      content
    }`
    
    const data = await client.fetch(query)
    return data || {}
  } catch (error) {
    console.error('Error fetching contact page data:', error)
    return {}
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'
  
  return {
    title: 'Contact Us',
    description: 'Get in touch with Sweet No. 13 to order custom decorated cookies for your special occasion.',
    openGraph: {
      title: 'Contact Us | Sweet No. 13',
      description: 'Order custom decorated cookies for your special occasion',
      url: `${siteUrl}/contact`,
    },
  }
}

export default async function ContactPage() {
  const data = await getContactPageData()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'

  return (
    <>
      <StructuredData
        type="ContactPage"
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Us - Sweet No. 13',
          description: 'Contact Sweet No. 13 to order custom decorated cookies',
          url: `${siteUrl}/contact`,
          mainEntity: {
            '@type': 'Organization',
            name: 'Sweet No. 13',
            url: siteUrl,
          },
        }}
      />
      <div className="container mx-auto px-4 py-12">
        {data.heading && (
          <h1 className="text-4xl font-bold italic mb-6 text-center text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
            {data.heading}
          </h1>
        )}
        
        {data.content && data.content.length > 0 && (
          <div className="prose prose-lg max-w-3xl mx-auto mb-12 prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-text prose-p:text-brand-textMuted">
            <PortableText value={data.content} />
          </div>
        )}

        <ContactForm />
      </div>
    </>
  )
}
