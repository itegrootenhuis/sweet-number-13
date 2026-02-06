import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret token to verify requests are from Sanity
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token
    const secret = request.nextUrl.searchParams.get('secret')
    
    if (!REVALIDATION_SECRET) {
      console.warn('REVALIDATION_SECRET is not set')
      return NextResponse.json(
        { message: 'Revalidation secret not configured' },
        { status: 500 }
      )
    }

    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Parse the webhook payload from Sanity
    const body = await request.json()
    const { _type } = body

    // Revalidate based on document type
    switch (_type) {
      case 'homePage':
        revalidatePath('/')
        break
      case 'galleryPage':
        revalidatePath('/gallery')
        break
      case 'cookieInquiryPage':
        revalidatePath('/cookie-inquiry')
        break
      case 'siteSettings':
        // Site settings affect all pages (header, footer, etc.)
        revalidatePath('/', 'layout')
        break
      default:
        // Revalidate all pages for unknown types
        revalidatePath('/', 'layout')
    }

    console.log(`Revalidated for document type: ${_type}`)

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated for ${_type}`,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}
