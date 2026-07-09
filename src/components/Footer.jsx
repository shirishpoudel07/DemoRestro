import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import PaymentCardLogo from './PaymentCardLogo'
import { navLinks, restaurant } from '../data/restaurant'

const stagger = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <motion.div className="footer__brand" {...stagger}>
          <Logo variant="light" className="footer__logo" />
          <p>{restaurant.tagline}</p>
          <div className="footer__payments">
            {restaurant.paymentMethods.map((m) => (
              <PaymentCardLogo key={m} brand={m} />
            ))}
          </div>
        </motion.div>

        <motion.nav
          className="footer__nav"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {navLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link key={link.href} to={link.href}>{link.label}</Link>
            ) : (
              <a key={link.href} href={link.href}>{link.label}</a>
            )
          ))}
        </motion.nav>

        <motion.div
          className="footer__contact"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>{restaurant.location.address}</p>
          <a href={`tel:${restaurant.location.phone}`}>{restaurant.location.phone}</a>
          <a href={`tel:${restaurant.location.phoneAlt}`}>{restaurant.location.phoneAlt}</a>
        </motion.div>
      </div>

      <motion.div
        className="footer__bottom container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p>&copy; {year} Demo Bistro. All rights reserved.</p>
        <p className="footer__made">Made with love</p>
      </motion.div>
    </footer>
  )
}

export default Footer
