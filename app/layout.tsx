import type { Metadata, Viewport } from 'next'
import { Playfair_Display } from 'next/font/google'

// Revalidate layout every 5 minutes (for site settings in footer/header)
export const revalidate = 300
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['italic', 'normal'],
  variable: '--font-playfair',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sweetno13.com'
const siteName = 'Sweet No. 13'
const defaultDescription = 'Custom decorated cookies and sweet treats. Order your personalized cookies for any occasion. Operates under Michigan\'s Cottage Food Laws.'

// Explicit viewport configuration for better mobile SEO
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#9FEAF0' },
    { media: '(prefers-color-scheme: dark)', color: '#9FEAF0' },
  ],
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: ['custom cookies', 'decorated cookies', 'cookie orders', 'Michigan', 'cottage food', 'personalized cookies', 'sweet treats', 'custom cookie design', 'birthday cookies', 'wedding cookies', 'party cookies'],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteName} - Custom Decorated Cookies`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
    images: ['/opengraph-image'],
    // Add Twitter handles if available
    // creator: '@sweetnumber13',
    // site: '@sweetnumber13',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192x192', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteName,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#9FEAF0',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} font-sans min-h-screen flex flex-col bg-brand-primary`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
