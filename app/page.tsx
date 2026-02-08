import type { Metadata } from 'next'
import { client } from '@/lib/sanity'

// Revalidate every 5 minutes (300 seconds) for ISR
export const revalidate = 300
import { groq } from 'next-sanity'
import Hero from '@/components/Hero'
import PriceSection from '@/components/PriceSection'
import AboutSection from '@/components/AboutSection'
import ProductSection from '@/components/ProductSection'
import OptionalSection from '@/components/OptionalSection'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

interface HomePageData {
  heroLogoImage?: {
    asset?: any
    alt?: string
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
  products?: Array<{
    title: string
    content?: any[]
    image?: { asset?: any }
    alt?: string
  }>
  productsFooterContent?: any[]
  optionalSection1Title?: string
  optionalSection1Content?: any[]
  optionalSection1Image?: { asset?: any }
  optionalSection1ImageAlt?: string
  optionalSection2Title?: string
  optionalSection2Content?: any[]
  optionalSection2Image?: { asset?: any }
  optionalSection2ImageAlt?: string
}

async function getHomePageData(): Promise<HomePageData | null> {
  try {
    // Query for published documents (exclude drafts)
    const query = groq`*[_type == "homePage" && !(_id in path("drafts.**"))][0]{
      heroLogoImage{
        asset,
        hotspot,
        crop,
        alt
      },
      heroTitle,
      heroSubtitle,
      heroTextColor,
      priceField1,
      priceField1Image{
        asset,
        hotspot,
        crop
      },
      priceField2,
      priceField2Image{
        asset,
        hotspot,
        crop
      },
      aboutTitle,
      aboutContent,
      products[]{
        title,
        content,
        image{ asset, hotspot, crop },
        alt
      },
      productsFooterContent,
      optionalSection1Title,
      optionalSection1Content,
      optionalSection1Image{ asset, hotspot, crop },
      optionalSection1ImageAlt,
      optionalSection2Title,
      optionalSection2Content,
      optionalSection2Image{ asset, hotspot, crop },
      optionalSection2ImageAlt
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

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'
  
  return {
    title: data?.heroTitle ? `${data.heroTitle} | Sweet No. 13` : 'Sweet No. 13 - Custom Decorated Cookies',
    description: data?.heroSubtitle || 'Custom decorated cookies and sweet treats. Order your personalized cookies for any occasion.',
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title: data?.heroTitle || 'Sweet No. 13',
      description: data?.heroSubtitle || 'Custom decorated cookies and sweet treats',
      url: siteUrl,
      images: data?.heroLogoImage?.asset ? [
        {
          url: `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${data.heroLogoImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`,
          width: 1200,
          height: 630,
          alt: data.heroLogoImage.alt || data.heroTitle || 'Sweet No. 13',
        },
      ] : undefined,
    },
  }
}

export default async function Home() {
  const data = await getHomePageData()

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Sweet No. 13</h1>
        <p className="text-brand-textMuted mb-8">
          Please configure your content in Sanity Studio (run the standalone studio from the <code className="bg-brand-primary/10 px-1 rounded">studio/</code> folder and deploy it separately).
        </p>
        <Link
          href="/cookie-inquiry"
          className="inline-block bg-brand-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-coralDark transition-colors shadow-soft"
        >
          Cookie Inquiry
        </Link>
      </div>
    )
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'n2qqnp5j'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

  return (
    <>
      <StructuredData
        type="LocalBusiness"
        data={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${siteUrl}/#localbusiness`,
          name: 'Sweet No. 13',
          description: data.heroSubtitle || 'Custom decorated cookies and sweet treats. Handcrafted personalized cookies for birthdays, weddings, baby showers, and special occasions. Operating under Michigan Cottage Food Laws.',
          image: data.heroLogoImage?.asset ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${data.heroLogoImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}` : `${siteUrl}/og-image.png`,
          url: siteUrl,
          email: 'sweetnumber13@gmail.com',
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'MI',
            addressCountry: 'US',
          },
          areaServed: [
            {
              '@type': 'State',
              name: 'Michigan',
            },
          ],
          priceRange: '$$',
          currenciesAccepted: 'USD',
          paymentAccepted: 'Cash, Credit Card, Venmo, PayPal',
          knowsAbout: [
            'Custom decorated cookies',
            'Royal icing cookies',
            'Birthday cookies',
            'Wedding cookies',
            'Baby shower cookies',
            'Holiday cookies',
            'Corporate event cookies',
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Custom Cookie Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Custom Decorated Cookies',
                  description: 'Handcrafted decorated sugar cookies for any occasion',
                },
              },
            ],
          },
        }}
      />
      <StructuredData
        type="WebSite"
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          name: 'Sweet No. 13',
          url: siteUrl,
          description: 'Custom decorated cookies and sweet treats in Michigan',
          publisher: {
            '@id': `${siteUrl}/#localbusiness`,
          },
        }}
      />
      <div>
        <Hero
          heroLogoImage={data.heroLogoImage}
          heroTitle={data.heroTitle || 'Welcome'}
          heroSubtitle={data.heroSubtitle || 'Sweet No. 13'}
          heroTextColor={data.heroTextColor}
        />
        <AboutSection
          aboutTitle={data.aboutTitle}
          aboutContent={data.aboutContent}
        />
        {data.products && data.products.length > 0 && (
          <ProductSection products={data.products} footerContent={data.productsFooterContent} />
        )}
        {data.priceField1 && data.priceField2 && (
          <PriceSection
            priceField1={data.priceField1}
            priceField1Image={data.priceField1Image}
            priceField2={data.priceField2}
            priceField2Image={data.priceField2Image}
          />
        )}
        <OptionalSection
          title={data.optionalSection1Title}
          content={data.optionalSection1Content}
          image={data.optionalSection1Image}
          imageAlt={data.optionalSection1ImageAlt}
        />
        <OptionalSection
          title={data.optionalSection2Title}
          content={data.optionalSection2Content}
          image={data.optionalSection2Image}
          imageAlt={data.optionalSection2ImageAlt}
        />
      </div>
    </>
  )
}
