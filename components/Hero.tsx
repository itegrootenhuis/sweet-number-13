import SanityImage from './SanityImage'
import { PortableText } from '@portabletext/react'

interface HeroProps {
  heroImage: any
  heroTitle: string
  heroSubtitle: string
  heroTextColor?: 'light' | 'dark'
}

export default function Hero({ heroImage, heroTitle, heroSubtitle, heroTextColor = 'light' }: HeroProps) {
  const isDark = heroTextColor === 'dark'
  const textColorClass = isDark ? 'text-brand-text' : 'text-white'

  return (
    <section className="relative w-full h-[400px] md:h-[600px]">
      {heroImage?.asset && (
        <SanityImage
          asset={heroImage.asset}
          alt={heroTitle}
          width={1920}
          height={800}
          className="object-cover w-full h-full"
          priority
        />
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
