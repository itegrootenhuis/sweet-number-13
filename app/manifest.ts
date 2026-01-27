import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sweet No. 13',
    short_name: 'Sweet No. 13',
    description: 'Custom decorated cookies and sweet treats',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF7',
    theme_color: '#9FEAF0',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
