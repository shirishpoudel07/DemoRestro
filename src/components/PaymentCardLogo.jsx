function Card({ children, bg }) {
  return (
    <svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg" className="payment-logo">
      <rect width="50" height="32" rx="4" fill={bg}/>
      {children}
    </svg>
  )
}

function VisaLogo() {
  return (
    <Card bg="#1a1f71">
      <path d="M5 10l-3 12h3.5l.5-2h2l.5 2h4L12 10H8zm1 2.5l.8 2.5H7l1-2.5z" fill="#fff" opacity="0.9"/>
      <path d="M17 10l-2 12h3l2-12h-3z" fill="#fff" opacity="0.9"/>
      <path d="M20 10l1.2 4.5L23 10h1.5l1.2 4.5L27 10h3l-3 12h-2.5L24 17l-1 5h-2.5L17 10h3z" fill="#fff" opacity="0.9"/>
      <path d="M30 10l3 12h-3l-3-12h3z" fill="#f4c430"/>
      <ellipse cx="39" cy="16" rx="10" ry="8" fill="#f4c430" opacity="0.08"/>
      <text x="36" y="19" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#f4c430" letterSpacing=".3">VISA</text>
    </Card>
  )
}

function MastercardLogo() {
  return (
    <Card bg="#000">
      <circle cx="18" cy="16" r="9" fill="#eb001b"/>
      <circle cx="28" cy="16" r="9" fill="#f79e1b"/>
      <path d="M23 9a9 9 0 000 14 9 9 0 000-14z" fill="#ff5f01"/>
    </Card>
  )
}

function AmexLogo() {
  return (
    <Card bg="#016fd0">
      <rect x="5" y="9" width="40" height="14" rx="2" fill="#fff"/>
      <text x="25" y="19" fontFamily="Georgia,serif" fontSize="8" fontWeight="700" fill="#016fd0" textAnchor="middle">Amex</text>
    </Card>
  )
}

function DiscoverLogo() {
  return (
    <Card bg="#000">
      <circle cx="14" cy="16" r="10" fill="#ff6000"/>
      <circle cx="14" cy="16" r="10" fill="#ff8c00" opacity="0.35"/>
      <path d="M9.5 11.5h2.5c2.2 0 3.8 1.6 3.8 4.5s-1.6 4.5-3.8 4.5H9.5V11.5zm2.8 7c1.2 0 2-.8 2-2.5s-.8-2.5-2-2.5h-.5v5h.5z" fill="#fff"/>
      <text x="28" y="19" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ff6000">Discover</text>
    </Card>
  )
}

const logos = {
  visa: VisaLogo,
  mastercard: MastercardLogo,
  amex: AmexLogo,
  discover: DiscoverLogo,
}

function PaymentCardLogo({ brand }) {
  const key = brand.toLowerCase()
  const Logo = logos[key]
  if (!Logo) return <span className="payment-card">{brand}</span>
  return <Logo />
}

export default PaymentCardLogo
