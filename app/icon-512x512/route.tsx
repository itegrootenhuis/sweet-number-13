import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
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
        }}
      >
        <span
          style={{
            fontSize: 200,
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
    { width: 512, height: 512 }
  )
}
