import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface SanityImageProps {
  asset: SanityImageSource
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export default function SanityImage({
  asset,
  alt,
  className,
  width,
  height,
  priority = false,
}: SanityImageProps) {
  if (!asset) return null

  try {
    const imageUrl = urlFor(asset).width(width || 1200).height(height || 800).url()
    
    if (!imageUrl) return null

    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={width || 1200}
        height={height || 800}
        className={className}
        priority={priority}
      />
    )
  } catch (error) {
    console.error('Error generating image URL:', error)
    return null
  }
}
