import SanityImage from './SanityImage'

interface HeroProps {
  heroLogoImage?: { 
    asset?: any
    alt?: string
    hotspot?: { x: number; y: number; width: number; height: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  }
  heroTitle: string
  heroSubtitle: string
  heroTextColor?: 'light' | 'dark'
}

export default function Hero({ heroLogoImage, heroTitle, heroSubtitle, heroTextColor = 'light' }: HeroProps) {
  const isDark = heroTextColor === 'dark'
  const textColorClass = isDark ? 'text-brand-text' : 'text-white'
  const showLogo = heroLogoImage?.asset

  return (
    <section className="relative w-full h-[400px] md:h-[600px] bg-brand-coral">
      <div className="absolute inset-0 flex items-center justify-center">
        {showLogo ? (
          <SanityImage
            asset={heroLogoImage.asset}
            hotspot={heroLogoImage.hotspot}
            crop={heroLogoImage.crop}
            alt={heroLogoImage.alt || heroTitle}
            width={800}
            height={400}
            className="max-w-[90%] max-h-[80%] w-auto h-auto object-contain"
          />
        ) : (
          <div className={`text-center ${textColorClass} px-4`}>
            <h1 className={`text-8xl md:text-8xl font-bold italic mb-4 ${textColorClass}`} style={{ fontFamily: 'var(--font-playfair)' }}>
              {heroTitle}
            </h1>
            <p className={`text-4xl md:text-4xl italic ${textColorClass}`} style={{ fontFamily: 'var(--font-playfair)' }}>
              {heroSubtitle}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
