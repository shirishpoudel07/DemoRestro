import { motion } from 'framer-motion'
import { HiLocationMarker, HiPhone, HiMail, HiClock, HiCreditCard, HiMap } from 'react-icons/hi'
import PaymentCardLogo from './PaymentCardLogo'
import { restaurant } from '../data/restaurant'

const cards = [
  { icon: HiLocationMarker, key: 'address', content: <p>{restaurant.location.address}</p> },
  {
    icon: HiPhone, key: 'phone',
    content: <><motion.a href={`tel:${restaurant.location.phone}`} whileHover={{ x: 2 }}>{restaurant.location.phone}</motion.a><motion.a href={`tel:${restaurant.location.phoneAlt}`} whileHover={{ x: 2 }}>{restaurant.location.phoneAlt}</motion.a></>,
  },
  { icon: HiMail, key: 'email', content: <motion.a href={`mailto:${restaurant.location.email}`} whileHover={{ x: 2 }}>{restaurant.location.email}</motion.a> },
  {
    icon: HiClock, key: 'hours', wide: true,
    content: restaurant.hours.map((h) => <p key={h.day}><strong>{h.day}:</strong> {h.time}</p>),
  },
  {
    icon: HiCreditCard, key: 'payments', wide: true,
    content: <div className="contact__payments">{restaurant.paymentMethods.map((m) => <PaymentCardLogo key={m} brand={m} />)}</div>,
  },
]

function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Visit Us</span>
          <h2 className="section-title">
            Find Us
          </h2>
          <p className="section-desc text-readable">
            Drop by for a meal, a coffee, or just to say hi — we&apos;re open every day.
          </p>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            {cards.map((c, i) => (
              <motion.div
                key={c.key}
                className={`contact__card ${c.wide ? 'contact__card--wide' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="contact__icon-wrap"
                  whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <c.icon />
                </motion.span>
                <div>
                  <h3>{c.key === 'address' ? 'Address' : c.key === 'phone' ? 'Phone' : c.key === 'email' ? 'Email' : c.key === 'hours' ? 'Opening Hours' : 'We Accept'}</h3>
                  {c.content}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="contact__map-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="contact__map-badge">
              <HiMap /> Find us on the map
            </div>
            <div className="contact__map">
              <iframe
                title="Demo Bistro location"
                src={restaurant.location.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact