import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'

// Helper to get last modified date from Sanity
async function getLastModifiedDates() {
  try {
    const query = groq`{
      "homePage": *[_type == "homePage" && !(_id in path("drafts.**"))][0]._updatedAt,
      "galleryPage": *[_type == "galleryPage" && !(_id in path("drafts.**"))][0]._updatedAt,
      "cookieInquiryPage": *[_type == "cookieInquiryPage" && !(_id in path("drafts.**"))][0]._updatedAt
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching last modified dates:', error)
    return null
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'
  const dates = await getLastModifiedDates()
  
  // Use Sanity dates if available, otherwise fall back to a static date
  const fallbackDate = new Date('2026-01-01')
  
  return [
    {
      url: siteUrl,
      lastModified: dates?.homePage ? new Date(dates.homePage) : fallbackDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: dates?.galleryPage ? new Date(dates.galleryPage) : fallbackDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/cookie-inquiry`,
      lastModified: dates?.cookieInquiryPage ? new Date(dates.cookieInquiryPage) : fallbackDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact-us`,
      lastModified: fallbackDate, // Static page, no CMS content
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
