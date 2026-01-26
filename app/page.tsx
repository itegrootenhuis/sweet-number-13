import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import Hero from '@/components/Hero'
import PriceSection from '@/components/PriceSection'
import AboutSection from '@/components/AboutSection'
import Link from 'next/link'

interface HomePageData {
  heroImageDesktop?: {
    asset?: any
  }
  heroImageMobile?: {
    asset?: any
  }
  heroTitle: string
  heroSubtitle: string
  heroTextColor?: 'light' | 'dark'
  priceField1: any[]
  priceField1Image?: {
    asset?: any
  }
  priceField2: any[]
  priceField2Image?: {
    asset?: any
  }
  aboutTitle?: string
  aboutContent?: any[]
}

async function getHomePageData(): Promise<HomePageData | null> {
  try {
    // Query for published documents (exclude drafts)
    const query = groq`*[_type == "homePage" && !(_id in path("drafts.**"))][0]{
      heroImageDesktop{
        asset
      },
      heroImageMobile{
        asset
      },
      heroTitle,
      heroSubtitle,
      heroTextColor,
      priceField1,
      priceField1Image{
        asset
      },
      priceField2,
      priceField2Image{
        asset
      },
      aboutTitle,
      aboutContent
    }`
    
    const data = await client.fetch(query)
    
    // Log for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Home page data fetched:', data ? 'Data found' : 'No data found')
      console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')
      console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'n2qqnp5j')
      
      if (!data) {
        console.log('No home page document found. Make sure:')
        console.log('1. The document is published (click "Publish" in Sanity Studio)')
        console.log('2. The dataset matches your environment variable')
        console.log('3. The document type is "homePage"')
      }
    }
    
    return data || null
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return null
  }
}

export default async function Home() {
  const data = await getHomePageData()

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Sweet No. 13</h1>
        <p className="text-brand-textMuted mb-8">
          Please configure your content in{' '}
          <Link href="/studio" className="text-brand-primary hover:underline">
            Sanity Studio
          </Link>
        </p>
        <Link
          href="/contact"
          className="inline-block bg-brand-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-coral/90 transition-colors shadow-soft"
        >
          Contact Us
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Hero
        heroImageDesktop={data.heroImageDesktop}
        heroImageMobile={data.heroImageMobile}
        heroTitle={data.heroTitle || 'Welcome'}
        heroSubtitle={data.heroSubtitle || 'Sweet No. 13'}
        heroTextColor={data.heroTextColor}
      />
      {data.priceField1 && data.priceField2 && (
        <PriceSection
          priceField1={data.priceField1}
          priceField1Image={data.priceField1Image}
          priceField2={data.priceField2}
          priceField2Image={data.priceField2Image}
        />
      )}
      <AboutSection
        aboutTitle={data.aboutTitle}
        aboutContent={data.aboutContent}
      />
    </div>
  )
}
