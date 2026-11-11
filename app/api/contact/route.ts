import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { verifyTurnstileToken } from '@/lib/turnstile'
import {
  checkRateLimit,
  getClientIp,
  rateLimitExceededResponse,
  RATE_LIMITS,
} from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    const limit = checkRateLimit(`contact:${getClientIp(req)}`, RATE_LIMITS.contact)
    if (!limit.allowed) {
      return rateLimitExceededResponse(limit.resetAfterSeconds)
    }
    const body = await req.json()
    // Cloudflare Turnstile: verified server-side before the message is
    // saved. Gracefully disabled when TURNSTILE_SECRET_KEY is unset, so
    // the form keeps working until the user sets the keys.
    const check = await verifyTurnstileToken(body?.turnstileToken, getClientIp(req))
    if (!check.success) {
      return NextResponse.json({ error: 'Security check failed. Please try again.' }, { status: 400 })
    }
    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim()
    const phone = String(body?.phone || '').trim()
    const subject = String(body?.subject || 'General Inquiry').trim()
    const message = String(body?.message || '').trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    await addDoc(collection(db, 'contactMessages'), {
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form submission failed:', err)
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 })
  }
}
