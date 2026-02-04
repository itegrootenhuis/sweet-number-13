'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  dateNeeded: z.string().min(1, 'Date is required'),
  occasion: z.string().min(1, 'Occasion is required'),
  size: z.string().min(1, 'Please select a size'),
  quantity: z.union([
    z.string().min(1, 'Quantity is required'),
    z.number().min(1, 'Quantity must be at least 1'),
  ]),
  description: z.string().min(1, 'Description is required'),
  image: z.custom<FileList | undefined>((val) => {
    if (typeof window === 'undefined') return true // Skip validation during SSR
    if (val === undefined || val === null) return true // Optional
    if (val instanceof FileList && val.length === 0) return true // Optional
    if (!(val instanceof FileList) || val.length === 0) return true
    const file = val[0]
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if (!validTypes.includes(file.type)) return false
    if (file.size < 500 * 1024) return false // If provided, must be at least 500KB
    return true
  }, 'If provided, image must be PNG or JPG and at least 500KB').optional(),
})

type FormData = z.infer<typeof formSchema>

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => Promise<void>
      execute: (siteKey: string, options?: { action: string }) => Promise<string>
    }
  }
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const selectedSize = watch('size')
  const currentQuantity = watch('quantity')

  // Auto-fill quantity when "Smaller sizes" or "Chunk Royale" is selected
  useEffect(() => {
    if (
      (selectedSize === 'Smaller sizes (must be a dozen)' || selectedSize === 'Chunk Royale') &&
      currentQuantity !== 'Sweet Dozen'
    ) {
      setValue('quantity', 'Sweet Dozen' as any)
    }
  }, [selectedSize, currentQuantity, setValue])

  // Load reCAPTCHA v3 script
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) return

    // Check if script already exists
    const existingScript = document.querySelector(`script[src*="recaptcha/api.js?render=${siteKey}"]`)
    
    if (existingScript) {
      // Script already loaded
      return
    }

    // Script doesn't exist, create and load it
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      if (!siteKey) {
        throw new Error('reCAPTCHA site key is not configured')
      }

      // Get reCAPTCHA v3 token
      let recaptchaToken = ''
      if (window.grecaptcha) {
        await new Promise<void>((resolve) => {
          window.grecaptcha.ready(() => resolve())
        })
        recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit' })
      }

      if (!recaptchaToken) {
        setSubmitStatus('error')
        setErrorMessage('reCAPTCHA verification failed. Please try again.')
        setIsSubmitting(false)
        return
      }

      const formData = new FormData()
      formData.append('fullName', data.fullName)
      formData.append('email', data.email)
      formData.append('dateNeeded', data.dateNeeded)
      formData.append('occasion', data.occasion)
      formData.append('size', data.size)
      formData.append('quantity', String(data.quantity))
      formData.append('description', data.description)
      if (data.image?.length) {
        formData.append('image', data.image[0])
      }
      formData.append('g-recaptcha-response', recaptchaToken)

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit form')
      }

      setSubmitStatus('success')
      // Reset form
      ;(document.getElementById('contact-form') as HTMLFormElement)?.reset()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6">
      {/* Full Name and Email - Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-brand-text mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            {...register('fullName')}
            className="w-full px-4 py-2 border border-brand-muted rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full px-4 py-2 border border-brand-muted rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Date Needed */}
      <div>
        <label htmlFor="dateNeeded" className="block text-sm font-medium text-brand-text mb-2">
          Date cookies are needed <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dateNeeded"
          {...register('dateNeeded')}
          className="w-full px-4 py-2 border border-brand-muted rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
        />
        {errors.dateNeeded && (
          <p className="mt-1 text-sm text-red-500">{errors.dateNeeded.message}</p>
        )}
      </div>

      {/* Occasion */}
      <div>
        <label htmlFor="occasion" className="block text-sm font-medium text-brand-text mb-2">
          What&apos;s the occasion? <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="occasion"
          {...register('occasion')}
          className="w-full px-4 py-2 border border-brand-muted rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
        />
        {errors.occasion && (
          <p className="mt-1 text-sm text-red-500">{errors.occasion.message}</p>
        )}
      </div>

      {/* Size and Quantity - Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Size */}
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-brand-text mb-2">
            Size <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="size"
              {...register('size')}
              className="w-full pl-4 pr-10 py-2 border border-brand-muted rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select Size</option>
              <option value='8"x8" square (The Bubba) $25 min Qty. 1'>
                8&quot;x8&quot; square (The Bubba) $25 min Qty. 1
              </option>
              <option value='4"x4" square (The Peanut) $8 min Qty. 2'>
                4&quot;x4&quot; square (The Peanut) $8 min Qty. 2
              </option>
              <option value="Smaller sizes (must be a dozen)">Smaller sizes (must be a dozen)</option>
              <option value="Chunk Royale">Chunk Royale</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-4 h-4 text-brand-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.size && (
            <p className="mt-1 text-sm text-red-500">{errors.size.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-brand-text mb-2">
            Quantity <span className="text-red-500">*</span>
          </label>
          {selectedSize === 'Smaller sizes (must be a dozen)' || selectedSize === 'Chunk Royale' ? (
            <input
              type="text"
              id="quantity"
              {...register('quantity')}
              value="Sweet Dozen"
              readOnly
              className="w-full px-4 py-2 border border-brand-muted rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-gray-50"
            />
          ) : (
            <input
              type="number"
              id="quantity"
              {...register('quantity', { valueAsNumber: true })}
              min="1"
              className="w-full px-4 py-2 border border-brand-muted rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          )}
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-500">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-brand-text mb-2">
          Brief description of what you would like <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={5}
          {...register('description')}
          className="w-full px-4 py-2 border border-brand-muted rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-brand-text mb-2">
          Image Upload (PNG or JPG, minimum 500KB) <span className="text-brand-textMuted font-normal">(optional)</span>
        </label>
        <input
          type="file"
          id="image"
          accept="image/png,image/jpeg,image/jpg"
          {...register('image')}
          className="w-full px-4 py-2 border border-brand-muted rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
        />
        {errors.image && (
          <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-coral text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-coralDark transition-colors shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>


      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {errorMessage || 'An error occurred. Please try again.'}
        </div>
      )}
    </form>
  )
}
