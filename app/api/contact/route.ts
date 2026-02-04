import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const dateNeeded = formData.get('dateNeeded') as string
    const occasion = formData.get('occasion') as string
    const size = formData.get('size') as string
    const quantity = formData.get('quantity') as string
    const description = formData.get('description') as string
    const imageFile = formData.get('image') as File | null

    // Validate required fields (image is optional)
    if (!fullName || !email || !dateNeeded || !occasion || !size || !quantity || !description) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate image file if provided (optional field)
    let attachments: Array<{ content: string; filename: string; type: string }> | undefined
    if (imageFile && imageFile.size > 0) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
      if (!validTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { message: 'Image must be PNG or JPG' },
          { status: 400 }
        )
      }
      if (imageFile.size < 500 * 1024) {
        return NextResponse.json(
          { message: 'Image must be at least 500KB' },
          { status: 400 }
        )
      }
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer())
      attachments = [
        {
          content: imageBuffer.toString('base64'),
          filename: imageFile.name,
          type: imageFile.type,
        },
      ]
    }

    // reCAPTCHA verification
    const recaptchaToken = formData.get('g-recaptcha-response') as string
    if (!recaptchaToken) {
      console.error('reCAPTCHA: No token provided')
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
    if (!recaptchaData.success || (recaptchaData.score !== undefined && recaptchaData.score < 0.5)) {
      console.error('reCAPTCHA verification failed:', recaptchaData)
      return NextResponse.json(
        { message: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }

    // Send email via SendGrid
    const emailHtml = `
      <h2>New Cookie Order Request</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date Needed:</strong> ${dateNeeded}</p>
      <p><strong>Occasion:</strong> ${occasion}</p>
      <p><strong>Size:</strong> ${size}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Description:</strong></p>
      <p>${description.replace(/\n/g, '<br>')}</p>
    `

    const recipientEmail = process.env.CONTACT_EMAIL || 'your-email@example.com'
    const senderEmail = process.env.FROM_EMAIL || recipientEmail

    console.log('Attempting to send email via SendGrid...')
    console.log('From:', senderEmail)
    console.log('To:', recipientEmail)
    console.log('SENDGRID_API_KEY set:', !!process.env.SENDGRID_API_KEY)
    console.log('CONTACT_EMAIL set:', !!process.env.CONTACT_EMAIL)
    console.log('FROM_EMAIL set:', !!process.env.FROM_EMAIL)

    const result = await sendEmail({
      from: senderEmail, // Must be verified in SendGrid
      to: recipientEmail,
      subject: `New Cookie Order Request from ${fullName}`,
      html: emailHtml,
      ...(attachments?.length ? { attachments } : {}),
    })

    console.log('Email sent successfully:', result.messageId)

    return NextResponse.json(
      { message: 'Form submitted successfully', messageId: result.messageId },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      if ((error as any).code) {
        console.error('Error code:', (error as any).code)
      }
      if ((error as any).response) {
        console.error('SendGrid response:', (error as any).response.body)
      }
    }
    return NextResponse.json(
      { 
        message: error instanceof Error ? error.message : 'An error occurred while processing your request' 
      },
      { status: 500 }
    )
  }
}
