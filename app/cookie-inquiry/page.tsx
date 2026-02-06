import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import ContactForm from '@/components/ContactForm'
import StructuredData from '@/components/StructuredData'

// Revalidate every 5 minutes (300 seconds) for ISR
export const revalidate = 300

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
      <section className="bg-brand-coral py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold italic text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
            Cookie Inquiry
          </h1>
        </div>
      </section>
      <div className="bg-brand-primary min-h-screen">
        <div className="container mx-auto px-4 py-12">
        {data.heading && (
          <h2 className="text-3xl font-bold italic mb-6 text-center text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
            {data.heading}
          </h2>
        )}
        
        {data.content && data.content.length > 0 && (
          <div className="prose prose-lg max-w-3xl mx-auto mb-12 prose-headings:font-playfair prose-headings:italic prose-headings:text-brand-text prose-p:text-brand-textMuted">
            <PortableText value={data.content} />
          </div>
        )}

        <ContactForm />
        </div>
      </div>
    </>
  )
}
