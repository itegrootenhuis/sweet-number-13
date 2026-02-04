import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import GallerySection from '@/components/GallerySection'

interface GalleryImage {
  image?: { asset?: any }
  alt?: string
  title?: string
  content?: any[]
}

interface GalleryPageData {
  images?: GalleryImage[]
}

async function getGalleryPageData(): Promise<GalleryPageData | null> {
  try {
    const query = groq`*[_type == "galleryPage" && !(_id in path("drafts.**"))][0]{
      images[]{
        image{ asset },
        alt,
        title,
        content
      }
    }`
    const data = await client.fetch(query)
    return data || null
  } catch (error) {
    console.error('Error fetching gallery page data:', error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'
  return {
    title: 'Gallery',
    description: 'View our gallery of custom decorated cookies and sweet treats.',
    openGraph: {
      title: 'Gallery | Sweet No. 13',
      description: 'View our gallery of custom decorated cookies and sweet treats.',
      url: `${siteUrl}/gallery`,
    },
  }
}

export default async function GalleryPage() {
  const data = await getGalleryPageData()
  const images = data?.images ?? []

  return (
    <div>
      <section className="bg-brand-coral py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold italic text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
            Gallery
          </h1>
        </div>
      </section>
      <GallerySection images={images} />
    </div>
  )
}
