function Card({ children, bg, width = 50, height = 32 }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" className="payment-logo">
      <rect width={width} height={height} rx="5" fill={bg}/>
      {children}
    </svg>
  )
}

function VisaLogo() {
  return (
    <Card bg="#1a1f71">
      <text x="25" y="20" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fontStyle="italic" fill="#fff" textAnchor="middle" letterSpacing="1">VISA</text>
    </Card>
  )
}

function MastercardLogo() {
  return (
    <Card bg="#252525">
      <circle cx="20" cy="16" r="8" fill="#eb001b"/>
      <circle cx="30" cy="16" r="8" fill="#f79e1b"/>
      <path d="M25 9.5a8 8 0 000 13 8 8 0 000-13z" fill="#ff5f01"/>
    </Card>
  )
}

function AmexLogo() {
  return (
    <Card bg="#016fd0">
      <text x="25" y="19.5" fontFamily="Georgia,serif" fontSize="9" fontWeight="700" fontStyle="italic" fill="#fff" textAnchor="middle">AMEX</text>
    </Card>
  )
}

function DiscoverLogo() {
  return (
    <Card bg="#252525">
      <circle cx="17" cy="16" r="8" fill="#ff6000"/>
      <circle cx="17" cy="16" r="8" fill="#ff8c00" opacity="0.3"/>
      <text x="32" y="20" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">Disc</text>
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
