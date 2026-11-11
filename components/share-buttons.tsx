// ShareButtons — small, honest share row for business profile pages.
// Plain share links (WhatsApp / X / Facebook) plus a copy-link button.
// No third-party share SDK is loaded, so this adds no tracking scripts
// and only a few hundred bytes of client JS. Rendered only on business
// detail pages, never on listing grids.
'use client'

import { useState } from 'react'
import { Link2, Check, Share2 } from 'lucide-react'

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const text = `${title} — on PakListings`
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Clipboard API unavailable (old browser / non-secure context):
      // fall back to selecting via a temporary input.
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const linkClass =
    'inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:border-cyan-500 text-slate-700 font-bold text-xs rounded-xl transition-colors'

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
        <Share2 className="w-3.5 h-3.5" /> Share this listing:
      </span>
      <a
        href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label={`Share ${title} on WhatsApp`}
      >
        WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label={`Share ${title} on X`}
      >
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label={`Share ${title} on Facebook`}
      >
        Facebook
      </a>
      <button type="button" onClick={copyLink} className={linkClass} aria-label="Copy link to this listing">
        {copied ? <Check className="w-3.5 h-3.5 text-cyan-700" /> : <Link2 className="w-3.5 h-3.5" />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}
