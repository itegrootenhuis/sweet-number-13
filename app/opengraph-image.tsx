import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Sweet No. 13 - Custom Decorated Cookies'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FAFAF7 0%, #9FEAF0 50%, #FF8F6B 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Logo Circle */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #9FEAF0 0%, #FF8F6B 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: 'white',
              fontStyle: 'italic',
            }}
          >
            S13
          </span>
        </div>
        
        {/* Title */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: '#2D3748',
            margin: 0,
            marginBottom: 20,
          }}
        >
          Sweet No. 13
        </h1>
        
        {/* Subtitle */}
        <p
          style={{
            fontSize: 32,
            color: '#4A5568',
            margin: 0,
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Custom Decorated Cookies & Sweet Treats
        </p>
        
        {/* Location */}
        <p
          style={{
            fontSize: 24,
            color: '#718096',
            margin: 0,
            marginTop: 30,
          }}
        >
          Michigan • Made with Love
        </p>
      </div>
    ),
    { ...size }
  )
}
