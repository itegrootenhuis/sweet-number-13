import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

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
    if (!recaptchaData.success || (recaptchaData.score !== undefined && recaptchaData.score < 0.5)) {
      return NextResponse.json(
        { message: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }

    const recipientEmail = process.env.CONTACT_EMAIL || 'your-email@example.com'
    const senderEmail = process.env.FROM_EMAIL || recipientEmail

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${fullName} &lt;${email}&gt;</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `

    const result = await sendEmail({
      from: senderEmail,
      to: recipientEmail,
      subject: `Contact Us: ${subject}`,
      html: emailHtml,
    })

    return NextResponse.json(
      { message: 'Form submitted successfully', messageId: result.messageId },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact Us form error:', error)
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'An error occurred while processing your request',
      },
      { status: 500 }
    )
  }
}
