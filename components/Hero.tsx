import SanityImage from './SanityImage'
import { PortableText } from '@portabletext/react'

interface HeroProps {
  heroImageDesktop: any
  heroImageMobile?: any
  heroTitle: string
  heroSubtitle: string
  heroTextColor?: 'light' | 'dark'
}

export default function Hero({ heroImageDesktop, heroImageMobile, heroTitle, heroSubtitle, heroTextColor = 'light' }: HeroProps) {
  const isDark = heroTextColor === 'dark'
  const textColorClass = isDark ? 'text-brand-text' : 'text-white'
  
  // Use mobile image if available, otherwise fall back to desktop
  const mobileImage = heroImageMobile?.asset || heroImageDesktop?.asset
  const desktopImage = heroImageDesktop?.asset

  return (
    <section className="relative w-full h-[400px] md:h-[600px]">
      {/* Mobile Image */}
      {mobileImage && (
        <div className="md:hidden absolute inset-0">
          <SanityImage
            asset={mobileImage}
            alt={heroTitle}
            width={800}
            height={600}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      )}
      
      {/* Desktop Image */}
      {desktopImage && (
        <div className="hidden md:block absolute inset-0">
          <SanityImage
            asset={desktopImage}
            alt={heroTitle}
            width={1920}
            height={800}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-center ${textColorClass} px-4`}>
          <h1 className={`text-8xl md:text-8xl font-bold italic mb-4 ${textColorClass}`} style={{ fontFamily: 'var(--font-playfair)' }}>
            {heroTitle}
          </h1>
          <p className={`text-4xl md:text-4xl italic ${textColorClass}`} style={{ fontFamily: 'var(--font-playfair)' }}>
            {heroSubtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
