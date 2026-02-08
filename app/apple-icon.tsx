import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #9FEAF0 0%, #FF8F6B 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 36, // Rounded corners for iOS
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
          }}
        >
          S13
        </span>
      </div>
    ),
    { ...size }
  )
}
