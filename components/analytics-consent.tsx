'use client'

import { useEffect, useRef } from 'react'
import { COOKIE_PREFS_KEY } from './cookie-consent-banner'

// Google Analytics loads ONLY after the visitor accepts analytics in the
// cookie banner — never on a first visit before consent, and never when the
// visitor chose 'Essential Only'. The banner dispatches
// 'paklistings:consent-changed' on every save (see cookie-consent-banner.tsx),
// so granting or revoking consent takes effect without a reload.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

function analyticsGranted(): boolean {
  try {
    const raw = localStorage.getItem(COOKIE_PREFS_KEY)
    if (!raw) return false
    return (JSON.parse(raw) as { analytics?: boolean }).analytics === true
  } catch {
    return false
  }
}

export default function AnalyticsConsent() {
  const loaded = useRef(false)

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    const disableFlag = `ga-disable-${GA_MEASUREMENT_ID}`

    const apply = () => {
      const w = window as unknown as Record<string, unknown>
      if (analyticsGranted()) {
        if (loaded.current) {
          w[disableFlag] = false
          return
        }
        const loader = document.createElement('script')
        loader.async = true
        loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
        loader.setAttribute('data-paklistings-analytics', 'true')
        const config = document.createElement('script')
        config.setAttribute('data-paklistings-analytics', 'true')
        config.text = `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${GA_MEASUREMENT_ID}');`
        document.head.appendChild(loader)
        document.head.appendChild(config)
        loaded.current = true
        w[disableFlag] = false
      } else {
        // Revoked or never granted: block any future hits, and drop the
        // tags if they were loaded during this page view.
        w[disableFlag] = true
        if (loaded.current) {
          document
            .querySelectorAll('script[data-paklistings-analytics]')
            .forEach((node) => node.remove())
          loaded.current = false
        }
      }
    }

    apply()
    window.addEventListener('paklistings:consent-changed', apply)
    window.addEventListener('storage', apply)
    return () => {
      window.removeEventListener('paklistings:consent-changed', apply)
      window.removeEventListener('storage', apply)
    }
  }, [])

  return null
}
