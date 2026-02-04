'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'

interface MobileMenuProps {
  instagramUrl?: string
  facebookUrl?: string
  etsyUrl?: string
  pinterestUrl?: string
}

export default function MobileMenu({
  instagramUrl,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-brand-text transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <nav className="absolute top-full left-0 right-0 bg-brand-primary md:hidden z-50">
          <div className="container mx-auto px-4 py-4 space-y-3 text-right">
            <Link
              href="/gallery"
              onClick={() => setIsOpen(false)}
              className="block text-brand-text hover:text-brand-coral visited:text-brand-text transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/cookie-inquiry"
              onClick={() => setIsOpen(false)}
              className="block text-brand-text hover:text-brand-coral visited:text-brand-text transition-colors"
            >
              Cookie Inquiry
            </Link>
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-brand-text hover:text-brand-coral visited:text-brand-text transition-colors justify-end"
                aria-label="Follow us on Instagram"
              >
                <span>Follow Us</span>
                <FaInstagram className="w-5 h-5" />
              </a>
            )}
          </div>
        </nav>
      )}
    </>
  )
}
