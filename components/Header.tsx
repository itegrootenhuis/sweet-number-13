import Link from 'next/link'
import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import { FaInstagram, FaFacebook, FaEtsy, FaPinterest } from 'react-icons/fa'
import SanityImage from './SanityImage'
import MobileMenu from './MobileMenu'

interface SiteSettings {
  logo?: {
    asset?: any
    alt?: string
  }
  instagramUrl?: string
  facebookUrl?: string
  etsyUrl?: string
  pinterestUrl?: string
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
      pinterestUrl
    }`
    
    const settings = await client.fetch(query)
    return settings || {}
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return {}
  }
}

export default async function Header() {
  const settings = await getSiteSettings()

  return (
    <header className="bg-brand-primary border-b border-brand-muted/20 relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
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

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/contact"
              className="text-lg text-brand-text hover:text-brand-coral transition-colors"
            >
              Contact Us
            </Link>
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

          {/* Mobile Menu Button */}
          <MobileMenu
            instagramUrl={settings.instagramUrl}
            facebookUrl={settings.facebookUrl}
            etsyUrl={settings.etsyUrl}
            pinterestUrl={settings.pinterestUrl}
          />
        </div>
      </div>
    </header>
  )
}
