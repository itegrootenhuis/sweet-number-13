import nodemailer from 'nodemailer'

// Create reusable transporter using Outlook/Microsoft 365 SMTP
export const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your Outlook email address
    pass: process.env.SMTP_PASSWORD, // Your Outlook password or App Password
  },
  tls: {
    ciphers: 'SSLv3',
  },
})

// Verify connection configuration
export async function verifyEmailConnection() {
  try {
    await transporter.verify()
    console.log('Email server is ready to send messages')
    return true
  } catch (error) {
    console.error('Email server connection failed:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      console.error('Error code:', (error as any).code)
    }
    return false
  }
}