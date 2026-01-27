import { NextRequest, NextResponse } from 'next/server'
import { transporter } from '@/lib/email'

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

    // Convert image to buffer for email attachment
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer())

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

    // Send email via Nodemailer
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

    const recipientEmail = process.env.CONTACT_EMAIL || 'your-email@example.com'
    const senderEmail = process.env.SMTP_USER || 'your-email@outlook.com'

    console.log('Attempting to send email...')
    console.log('From:', senderEmail)
    console.log('To:', recipientEmail)
    console.log('SMTP_USER set:', !!process.env.SMTP_USER)
    console.log('SMTP_PASSWORD set:', !!process.env.SMTP_PASSWORD)
    console.log('CONTACT_EMAIL set:', !!process.env.CONTACT_EMAIL)

    const info = await transporter.sendMail({
      from: `Sweet No. 13 <${senderEmail}>`,
      to: recipientEmail,
      subject: `New Cookie Order Request from ${fullName}`,
      html: emailHtml,
      attachments: [
        {
          filename: imageFile.name,
          content: imageBuffer,
          contentType: imageFile.type,
        },
      ],
    })

    console.log('Email sent successfully:', info.messageId)

    return NextResponse.json(
      { message: 'Form submitted successfully', messageId: info.messageId },
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
        console.error('SMTP response:', (error as any).response)
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
