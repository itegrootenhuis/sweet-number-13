import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface SanityImageProps {
  asset: SanityImageSource
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export default function SanityImage({
  asset,
  hotspot,
  crop,
  alt,
  className,
  width,
  height,
  priority = false,
}: SanityImageProps) {
  if (!asset) return null

  try {
    // Build the full image object with hotspot/crop for urlFor to use
    const imageSource = hotspot || crop ? { asset, hotspot, crop } : asset
    const imageUrl = urlFor(imageSource).width(width || 1200).height(height || 800).url()
    
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
