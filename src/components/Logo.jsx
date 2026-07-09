function LogoEmblem({ className = '' }) {
  const g = '#c9a84c'
  return (
    <svg
      className={className}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="26" cy="26" r="24" fill="currentColor" className="logo-emblem__bg" />
      <circle cx="26" cy="26" r="24" stroke={g} strokeWidth="2.5" />
      <circle cx="26" cy="26" r="19" stroke={g} strokeWidth="1" strokeOpacity="0.45" />
      <path d="M26 12c-2 4-6 5-6 10a6 6 0 1 0 12 0c0-5-4-6-6-10z" fill={g} />
      <path d="M20 30c0 3.3 2.7 6 6 6s6-2.7 6-6" stroke={g} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 20h4M31 20h4M26 17v-2" stroke={g} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  )
}

function Logo({ variant = 'dark', className = '' }) {
  return (
    <div className={`logo-mark logo-mark--${variant} ${className}`} aria-label="Demo Bistro">
      <LogoEmblem className="logo-mark__emblem" />
      <div className="logo-mark__wordmark">
        <span className="logo-mark__sweet">Demo</span>
        <span className="logo-mark__memories">Bistro</span>
        <span className="logo-mark__tagline">Breakfast · Lunch · Dinner</span>
      </div>
    </div>
  )
}

export default Logo
