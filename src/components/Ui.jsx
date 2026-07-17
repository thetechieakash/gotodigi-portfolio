import { useTheme } from "../context/Themecontext.jsx";

/* ── Skeleton block ──────────────────────────────────────────── */
export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />
}

/* ── Error message ───────────────────────────────────────────── */
export function ErrorMsg({ message }) {
  return (
    <div className="text-center py-16">
      <p className="text-sm font-mono text-red-500">Error: {message}</p>
      <p className="text-sm text-[#888] mt-1">Check API connection or try again.</p>
    </div>
  )
}

/* ── Section header ──────────────────────────────────────────── */
export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-12">
      {eyebrow && (
        <p className="text-accent text-xs font-mono uppercase tracking-widest mb-3">{eyebrow}</p>
      )}
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        {title}
      </h2>
      {subtitle && <p className="text-[#888] mt-3 max-w-xl text-sm leading-relaxed">{subtitle}</p>}
    </div>
  )
}

/* ── Tech tag ────────────────────────────────────────────────── */
export function Tag({ label }) {
  const { dark } = useTheme();
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded font-mono ${dark ? 'bg-[#111] text-white/60 border border-[#222]' : 'bg-black/5 text-black/50 border border-black/10'
        }`}
    >
      {label}
    </span>
  )
}