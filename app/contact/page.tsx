import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import ContactForm from '@/components/ContactForm'

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

export default async function ContactPage() {
  const data = await getContactPageData()

  return (
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
  )
}
