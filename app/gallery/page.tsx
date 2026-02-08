import type { Metadata } from 'next'
import { client } from '@/lib/sanity'

// Revalidate every 5 minutes (300 seconds) for ISR
export const revalidate = 300
import { groq } from 'next-sanity'
import GallerySection from '@/components/GallerySection'
import StructuredData from '@/components/StructuredData'

interface GalleryImage {
  image?: { 
    asset?: any
    hotspot?: { x: number; y: number; width: number; height: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  }
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
        image{ asset, hotspot, crop },
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
    description: 'View our gallery of custom decorated cookies and sweet treats. Browse beautiful cookie designs for birthdays, weddings, holidays, and special occasions.',
    alternates: {
      canonical: `${siteUrl}/gallery`,
    },
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'n2qqnp5j'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

  // Build image list for structured data
  const imageListItems = images.map((img, index) => {
    const imageUrl = img.image?.asset?._ref 
      ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${img.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
      : undefined
    return {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'ImageObject',
        name: img.title || img.alt || `Custom cookie design ${index + 1}`,
        description: img.alt || 'Custom decorated cookie by Sweet No. 13',
        contentUrl: imageUrl,
      },
    }
  }).filter(item => item.item.contentUrl)

  return (
    <>
      <StructuredData
        type="ImageGallery"
        data={{
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: 'Sweet No. 13 Cookie Gallery',
          description: 'Browse our gallery of custom decorated cookies for birthdays, weddings, holidays, and special occasions.',
          url: `${siteUrl}/gallery`,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: imageListItems.length,
            itemListElement: imageListItems.slice(0, 20), // Limit to first 20 for structured data
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
              name: 'Gallery',
              item: `${siteUrl}/gallery`,
            },
          ],
        }}
      />
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
    </>
  )
}
