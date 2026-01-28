import sgMail from '@sendgrid/mail'

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
} else {
  console.warn('SENDGRID_API_KEY is not set in environment variables')
}

// Send email using SendGrid
export async function sendEmail({
  to,
  from,
  subject,
  html,
  attachments,
}: {
  to: string
  from: string
  subject: string
  html: string
  attachments?: Array<{ content: string; filename: string; type: string }>
}) {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY is not configured')
  }

  const msg = {
    to,
    from,
    subject,
    html,
    attachments: attachments?.map((att) => ({
      content: att.content,
      filename: att.filename,
      type: att.type,
      disposition: 'attachment',
    })),
  }

  try {
    const [response] = await sgMail.send(msg)
    return { success: true, messageId: response.headers['x-message-id'] || 'unknown' }
  } catch (error) {
    console.error('SendGrid error:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      if ((error as any).response) {
        console.error('Response body:', (error as any).response.body)
      }
    }
    throw error
  }
}
