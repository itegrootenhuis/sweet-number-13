import Link from 'next/link'
import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import { FaInstagram } from 'react-icons/fa'
import MobileMenu from './MobileMenu'

interface SiteSettings {
  instagramUrl?: string
  facebookUrl?: string
  etsyUrl?: string
  pinterestUrl?: string
}

async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const query = groq`*[_type == "siteSettings"][0]{
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
    <header className="bg-brand-primary relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - text only */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold italic text-brand-text" style={{ fontFamily: 'var(--font-playfair)' }}>
              Sweet No. <span className="text-3xl">13</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/gallery"
              className="text-lg text-brand-text hover:text-brand-coral transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/cookie-inquiry"
              className="text-lg text-brand-text hover:text-brand-coral transition-colors"
            >
              Cookie Inquiry
            </Link>
            {settings.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-text hover:text-brand-coral transition-colors"
                aria-label="Follow us on Instagram"
              >
                <span className="text-lg">Follow Us</span>
                <FaInstagram className="w-6 h-6" />
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
