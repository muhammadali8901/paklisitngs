'use client'

export function formatDate(value: any): string {
  if (!value) return '—'
  const d = value?.toDate ? value.toDate() : new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-violet-50 text-violet-700 border-violet-200',
    approved: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  }
  const cls = styles[status] || 'bg-slate-50 text-slate-600 border-slate-200'
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${cls}`}>
      {status || 'pending'}
    </span>
  )
}

export function AdminLoading() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-sm text-slate-500">
      Loading...
    </div>
  )
}

export function AdminEmpty({ text }: { text: string }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-sm text-slate-500">
      {text}
    </div>
  )
}

export const adminBtn =
  'px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer disabled:opacity-50'
export const approveBtn = `${adminBtn} bg-cyan-700 border-cyan-700 text-white hover:bg-cyan-800`
export const rejectBtn = `${adminBtn} bg-white border-red-200 text-red-600 hover:bg-red-50`
export const neutralBtn = `${adminBtn} bg-white border-slate-200 text-slate-700 hover:border-cyan-500`
export const dangerBtn = `${adminBtn} bg-white border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-600`
