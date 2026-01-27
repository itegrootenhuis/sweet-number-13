import nodemailer from 'nodemailer'

// Create reusable transporter using Gmail SMTP
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER, // Your Gmail address
    pass: process.env.SMTP_PASSWORD, // Your Gmail App Password
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
    return false
  }
}