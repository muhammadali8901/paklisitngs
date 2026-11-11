'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import BottomNav from '@/components/bottom-nav'
import ProtectionGuard from '@/components/protection-guard'
import { COOKIE_PREFS_KEY } from '@/components/cookie-consent-banner'

// Deferred until after the page has loaded: the toast system and the cookie
// banner are never needed for the initial render, so their JS should not be
// fetched or parsed during the critical load window on any page. They mount
// on window load + idle, on the user's first interaction, or after a hard
// fallback timeout — whichever comes first. Toasts only ever fire from user
// actions (form submits), which cannot happen before this gate opens.
const Toaster = dynamic(() => import('sonner').then((m) => m.Toaster), {
  ssr: false,
})
const CookieConsentBanner = dynamic(
  () => import('@/components/cookie-consent-banner'),
  { ssr: false }
)

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number }
  ) => number
  cancelIdleCallback?: (handle: number) => void
}

function useDeferredReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let done = false
    let idleId: number | undefined
    let fallbackId: number | undefined

    const enable = () => {
      if (done) return
      done = true
      setReady(true)
    }

    const armIdle = () => {
      const w = window as IdleWindow
      if (typeof w.requestIdleCallback === 'function') {
        idleId = w.requestIdleCallback(enable, { timeout: 1500 })
      } else {
        fallbackId = window.setTimeout(enable, 800)
      }
    }

    if (document.readyState === 'complete') {
      armIdle()
    } else {
      window.addEventListener('load', armIdle, { once: true })
    }
    // First interaction also opens the gate immediately (a submit can then
    // never beat the Toaster mount), and a hard fallback guarantees the
    // deferred UI always appears even if load/idle never fire.
    window.addEventListener('pointerdown', enable, { once: true })
    window.addEventListener('keydown', enable, { once: true })
    const hardFallback = window.setTimeout(enable, 3000)

    return () => {
      window.removeEventListener('load', armIdle)
      window.removeEventListener('pointerdown', enable)
      window.removeEventListener('keydown', enable)
      window.clearTimeout(hardFallback)
      if (fallbackId !== undefined) window.clearTimeout(fallbackId)
      const w = window as IdleWindow
      if (idleId !== undefined && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(idleId)
      }
    }
  }, [])

  return ready
}

export default function ClientProviders() {
  const deferredReady = useDeferredReady()

  // Vercel Analytics loads ONLY after the visitor accepts analytics in the
  // cookie banner — same consent gate as Google Analytics (see
  // components/analytics-consent.tsx). Vercel Speed Insights below is
  // cookieless performance measurement, so it stays always-on and is
  // disclosed as such in the Cookie Policy.
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false)

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(COOKIE_PREFS_KEY)
        setAnalyticsAllowed(raw ? JSON.parse(raw).analytics === true : false)
      } catch {
        setAnalyticsAllowed(false)
      }
    }
    read()
    window.addEventListener('paklistings:consent-changed', read)
    window.addEventListener('storage', read)
    return () => {
      window.removeEventListener('paklistings:consent-changed', read)
      window.removeEventListener('storage', read)
    }
  }, [])

  return (
    <>
      {/* Site-protection guard (components/protection-guard.tsx): mounted
          here instead of the root layout — ClientProviders renders on every
          page via the root layout, same coverage. */}
      <ProtectionGuard />
      <BottomNav />
      {deferredReady && <CookieConsentBanner />}
      {deferredReady && (
        <Toaster
          position="top-center"
          duration={5000}
          closeButton={true}
          richColors={true}
          expand={true}
          toastOptions={{
            duration: 5000,
            className: 'paklistings-popup-toast',
          }}
        />
      )}
      <SpeedInsights />
      {analyticsAllowed && <Analytics />}
    </>
  )
}
