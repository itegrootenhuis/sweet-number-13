import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { FaInstagram, FaFacebook, FaEtsy, FaPinterest } from 'react-icons/fa'
import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import SanityImage from './SanityImage'

interface SiteSettings {
  logo?: {
    asset?: any
    alt?: string
  }
  instagramUrl?: string
  facebookUrl?: string
  etsyUrl?: string
  pinterestUrl?: string
  disclaimer?: any[]
}

async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const query = groq`*[_type == "siteSettings"][0]{
      logo{
        asset,
        alt
      },
      instagramUrl,
      facebookUrl,
      etsyUrl,
      pinterestUrl,
      disclaimer
    }`
    
    const settings = await client.fetch(query)
    return settings || {}
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return {}
  }
}

export default async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer className="bg-brand-primary border-t border-brand-muted/20 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center justify-start">
            {settings.logo?.asset ? (
              <SanityImage
                asset={settings.logo.asset}
                alt={settings.logo.alt || 'Sweet No. 13 Logo'}
                width={150}
                height={60}
                className="h-12 w-auto"
              />
            ) : (
              <span className="text-2xl font-bold italic text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
                Sweet No. 13
              </span>
            )}
          </Link>

          {/* Disclaimer - Center */}
          {settings.disclaimer && settings.disclaimer.length > 0 ? (
            <div className="text-brand-text text-xs text-center max-w-md mx-auto">
              <PortableText
                value={settings.disclaimer}
                components={{
                  block: {
                    normal: ({ children }) => <p className="mb-0 text-center">{children}</p>,
                  },
                  marks: {
                    link: ({ children, value }) => {
                      const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined
                      const target = !value.href.startsWith('/') ? '_blank' : undefined
                      return (
                        <a
                          href={value.href}
                          target={target}
                          rel={rel}
                          className="text-brand-text hover:text-brand-coral underline transition-colors"
                        >
                          {children}
                        </a>
                      )
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div></div>
          )}

          {/* Social Links - Right */}
          <nav className="hidden md:flex items-center gap-6 justify-end">
            {settings.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text hover:text-brand-coral transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            )}
            {settings.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text hover:text-brand-coral transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
            )}
            {settings.etsyUrl && (
              <a
                href={settings.etsyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text hover:text-brand-coral transition-colors"
                aria-label="Etsy"
              >
                <FaEtsy className="w-6 h-6" />
              </a>
            )}
            {settings.pinterestUrl && (
              <a
                href={settings.pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text hover:text-brand-coral transition-colors"
                aria-label="Pinterest"
              >
                <FaPinterest className="w-6 h-6" />
              </a>
            )}
          </nav>
        </div>
      </div>
    </footer>
  )
}
