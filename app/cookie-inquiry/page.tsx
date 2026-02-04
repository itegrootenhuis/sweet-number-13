import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import ContactForm from '@/components/ContactForm'
import StructuredData from '@/components/StructuredData'

export const dynamic = 'force-dynamic'

interface CookieInquiryPageData {
  heading?: string
  content?: any[]
}

async function getCookieInquiryPageData(): Promise<CookieInquiryPageData> {
  try {
    const query = groq`*[_type == "cookieInquiryPage"][0]{
      heading,
      content
    }`
    
    const data = await client.fetch(query)
    return data || {}
  } catch (error) {
    console.error('Error fetching cookie inquiry page data:', error)
    return {}
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'
  
  return {
    title: 'Cookie Inquiry',
    description: 'Order custom decorated cookies from Sweet No. 13 for your special occasion.',
    openGraph: {
      title: 'Cookie Inquiry | Sweet No. 13',
      description: 'Order custom decorated cookies for your special occasion',
      url: `${siteUrl}/cookie-inquiry`,
    },
  }
}

export default async function CookieInquiryPage() {
  const data = await getCookieInquiryPageData()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'

  return (
    <>
      <StructuredData
        type="ContactPage"
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Cookie Inquiry - Sweet No. 13',
          description: 'Order custom decorated cookies from Sweet No. 13',
          url: `${siteUrl}/cookie-inquiry`,
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
