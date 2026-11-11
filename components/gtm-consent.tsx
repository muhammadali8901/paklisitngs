'use client'

import { useEffect, useRef } from 'react'
import { COOKIE_PREFS_KEY } from './cookie-consent-banner'

// Google Tag Manager — container GTM-WFTR6XMH, supplied by the user
// 2026-11-08 for paklistings.com. Same consent gate as Google Analytics
// (analytics-consent.tsx): GTM loads ONLY after the visitor accepts
// analytics in the cookie banner — never on a first visit before consent,
// and never when the visitor chose 'Essential Only'. The banner dispatches
// 'paklistings:consent-changed' on every save, so granting or revoking
// consent takes effect without a reload. The standard GTM <noscript> iframe
// is deliberately NOT rendered: it would fire without consent, which the
// site's consent design does not allow. GTM container IDs are public
// page-source identifiers (not secrets), so the ID is the code default;
// NEXT_PUBLIC_GTM_ID overrides it.
//
// NOTE: do NOT set NEXT_PUBLIC_GA_MEASUREMENT_ID while this GTM container
// already fires a GA4 tag — direct gtag + GTM would double-count pageviews.
const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WFTR6XMH'

function analyticsGranted(): boolean {
  try {
    const raw = localStorage.getItem(COOKIE_PREFS_KEY)
    if (!raw) return false
    return (JSON.parse(raw) as { analytics?: boolean }).analytics === true
  } catch {
    return false
  }
}

export default function GtmConsent() {
  const loaded = useRef(false)

  useEffect(() => {
    if (!GTM_CONTAINER_ID) return

    const apply = () => {
      if (analyticsGranted()) {
        if (loaded.current) return
        const loader = document.createElement('script')
        loader.async = true
        loader.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`
        loader.setAttribute('data-paklistings-gtm', 'true')
        const init = document.createElement('script')
        init.setAttribute('data-paklistings-gtm', 'true')
        init.text = `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());`
        document.head.appendChild(loader)
        document.head.appendChild(init)
        loaded.current = true
      } else {
        // Revoked or never granted: drop the tags if they were loaded
        // during this page view.
        if (loaded.current) {
          document
            .querySelectorAll('script[data-paklistings-gtm]')
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
