import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const fullName = formData.get('fullName') as string
    const dateNeeded = formData.get('dateNeeded') as string
    const occasion = formData.get('occasion') as string
    const size = formData.get('size') as string
    const quantity = formData.get('quantity') as string
    const description = formData.get('description') as string
    const imageFile = formData.get('image') as File

    // Validate required fields
    if (!fullName || !dateNeeded || !occasion || !size || !quantity || !description || !imageFile) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate image file
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if (!validTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { message: 'Image must be PNG or JPG' },
        { status: 400 }
      )
    }

    // Validate image size (minimum 500KB)
    if (imageFile.size < 500 * 1024) {
      return NextResponse.json(
        { message: 'Image must be at least 500KB' },
        { status: 400 }
      )
    }

    // Convert image to base64 for email attachment
    const imageBuffer = await imageFile.arrayBuffer()
    const imageBase64 = Buffer.from(imageBuffer).toString('base64')

    // reCAPTCHA verification (commented out until domain is purchased)
    /*
    const recaptchaToken = formData.get('g-recaptcha-response') as string
    if (!recaptchaToken) {
      return NextResponse.json(
        { message: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }

    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    })

    const recaptchaData = await recaptchaResponse.json()
    if (!recaptchaData.success) {
      return NextResponse.json(
        { message: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }
    */

    // Send email via Resend
    const emailHtml = `
      <h2>New Cookie Order Request</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Date Needed:</strong> ${dateNeeded}</p>
      <p><strong>Occasion:</strong> ${occasion}</p>
      <p><strong>Size:</strong> ${size}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Description:</strong></p>
      <p>${description.replace(/\n/g, '<br>')}</p>
    `

    const { data, error } = await resend.emails.send({
      from: 'Sweet No. 13 <onboarding@resend.dev>', // Update with your verified domain
      to: ['your-email@example.com'], // Update with recipient email
      subject: `New Cookie Order Request from ${fullName}`,
      html: emailHtml,
      attachments: [
        {
          filename: imageFile.name,
          content: imageBase64,
        },
      ],
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { message: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Form submitted successfully', id: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}
