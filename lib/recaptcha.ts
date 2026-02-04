declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => Promise<void>
      execute: (siteKey: string, options?: { action: string }) => Promise<string>
    }
  }
}

/**
 * Load reCAPTCHA v3 script only when needed (e.g. on form submit).
 * Returns a promise that resolves when grecaptcha is ready to use.
 */
export function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('reCAPTCHA requires browser'))
  }

  const existing = document.querySelector(
    `script[src*="recaptcha/api.js?render=${siteKey}"]`
  )

  if (existing) {
    if (window.grecaptcha) {
      return new Promise((resolve) => {
        window.grecaptcha.ready(() => resolve())
      })
    }
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(check)
          window.grecaptcha.ready(() => resolve())
        }
      }, 50)
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.onload = () => {
      window.grecaptcha.ready(() => resolve())
    }
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'))
    document.body.appendChild(script)
  })
}
