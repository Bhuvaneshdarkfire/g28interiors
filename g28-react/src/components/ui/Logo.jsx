/* G28 logomark — roofline + hanging pendant lamp, drawn in champagne gold. */
export function LogoMark({ className = 'h-9 w-9', animated = false }) {
  return (
    <svg viewBox="0 0 132 120" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="g28-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A87724" />
          <stop offset="35%" stopColor="#D49B35" />
          <stop offset="65%" stopColor="#F2E2BE" />
          <stop offset="100%" stopColor="#D49B35" />
        </linearGradient>
        <radialGradient id="g28-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F2E2BE" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#D49B35" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D49B35" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* roof */}
      <path
        d="M14 44 L66 14 L118 44"
        stroke="url(#g28-gold)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* cord */}
      <line x1="66" y1="14" x2="66" y2="74" stroke="#D49B35" strokeWidth="3" />
      {/* shade */}
      <path d="M50 78 L82 78 L90 98 L42 98 Z" fill="url(#g28-gold)" />
      {/* bulb + glow */}
      <circle cx="66" cy="106" r="4" fill="#E6C675" />
      <circle cx="66" cy="104" r="20" fill="url(#g28-glow)" opacity="0.8" />
    </svg>
  )
}

/* Wordmark lockup */
export default function Logo({ className = '', tone = 'ink', compact = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={compact ? 'h-7 w-7' : 'h-9 w-9'} />
      <span className="leading-none">
        <span
          className={`block font-display text-[22px] font-bold tracking-[0.02em] ${
            tone === 'light' ? 'text-cream' : 'text-ink'
          }`}
        >
          G28
        </span>
        <span
          className={`mt-[3px] block text-[9px] font-semibold uppercase tracking-[0.34em] ${
            tone === 'light' ? 'text-cream/50' : 'text-muted'
          }`}
        >
          Interiors
        </span>
      </span>
    </span>
  )
}
