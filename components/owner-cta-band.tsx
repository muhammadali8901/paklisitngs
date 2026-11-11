import Link from 'next/link'
import { ArrowRight, Building2 } from 'lucide-react'

type RelatedLink = { label: string; href: string }

export default function OwnerCtaBand({
  title = 'Run a business in Pakistan? Get listed from PKR 99.',
  text = 'Create an account at no cost, complete the eight-step Add Business form, and once approved, your listing goes live at the next weekly release — then appears in your category, your city and search, with call and WhatsApp buttons customers can use directly. One-time fee, no commission, no subscription.',
  links = [],
}: {
  title?: string
  text?: string
  links?: RelatedLink[]
}) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-14">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2.5">
              <Building2 className="w-6 h-6 text-cyan-400" />
              {title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">{text}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/add-business" prefetch={false}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors"
            >
              Add Your Business — PKR 99 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register" prefetch={false}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-colors"
            >
              Create Your Account
            </Link>
          </div>
        </div>
        {links.length > 0 && (
          <nav aria-label="Related pages" className="flex flex-wrap gap-2.5">
            {links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-cyan-500 text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5"
              >
                {link.label}
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
