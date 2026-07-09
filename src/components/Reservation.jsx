import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { HiCheckCircle, HiExclamationCircle, HiPhone } from 'react-icons/hi'
import { restaurant } from '../data/restaurant'

function validate(f) {
  const errors = {}
  if (!f.name.trim()) errors.name = 'Name is required'
  if (!f.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(f.email)) errors.email = 'Invalid email address'
  if (!f.phone.trim()) errors.phone = 'Phone is required'
  if (!f.date) errors.date = 'Select a date'
  if (!f.time) errors.time = 'Select a time'
  return errors
}

function Reservation() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState({})
  const formRef = useRef(null)

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value }
    setForm(updated)
    if (touched[e.target.name]) {
      const newErrors = validate(updated)
      setErrors((prev) => {
        const next = { ...prev }
        if (newErrors[e.target.name]) next[e.target.name] = newErrors[e.target.name]
        else delete next[e.target.name]
        return next
      })
    }
  }

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true })
    const newErrors = validate(form)
    if (newErrors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: newErrors[e.target.name] })
    } else {
      const next = { ...errors }
      delete next[e.target.name]
      setErrors(next)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate(form)
    setErrors(newErrors)
    setTouched({ name: true, email: true, phone: true, date: true, time: true })
    if (Object.keys(newErrors).length > 0) return

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          date: form.date,
          time: form.time,
          guests: form.guests,
          message: form.message || 'None',
          to_email: 'aieducare07@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
    } catch (err) {
      console.error('Email send failed:', err)
    }

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' })
    setTouched({})
    setErrors({})
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="reserve" className="reservation section">
      <div className="container reservation__grid">
        <motion.div
          className="reservation__info"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Reservations</span>
          <h2 className="section-title">
            Book Your <em>Table</em>
          </h2>
          <p className="reservation__desc">
            Reserve ahead for weekends and holidays. Walk-ins welcome when tables are available.
            For groups of 8+, please call us directly.
          </p>
          <a href={`tel:${restaurant.location.phone}`} className="reservation__phone">
            <HiPhone /> {restaurant.location.phone}
          </a>
        </motion.div>

        <motion.form
          className="reservation__form"
          onSubmit={handleSubmit}
          ref={formRef}
          noValidate
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="reservation__row">
            <label>
              <span>Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                className={errors.name && touched.name ? 'reservation__input--error' : ''}
              />
              {errors.name && touched.name && <span className="reservation__error"><HiExclamationCircle /> {errors.name}</span>}
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@email.com"
                className={errors.email && touched.email ? 'reservation__input--error' : ''}
              />
              {errors.email && touched.email && <span className="reservation__error"><HiExclamationCircle /> {errors.email}</span>}
            </label>
          </div>

          <div className="reservation__row">
            <label>
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+977 ..."
                className={errors.phone && touched.phone ? 'reservation__input--error' : ''}
              />
              {errors.phone && touched.phone && <span className="reservation__error"><HiExclamationCircle /> {errors.phone}</span>}
            </label>
            <label>
              <span>Guests</span>
              <select name="guests" value={form.guests} onChange={handleChange}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="reservation__row">
            <label>
              <span>Date</span>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                onBlur={handleBlur}
                min={today}
                className={errors.date && touched.date ? 'reservation__input--error' : ''}
              />
              {errors.date && touched.date && <span className="reservation__error"><HiExclamationCircle /> {errors.date}</span>}
            </label>
            <label>
              <span>Time</span>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.time && touched.time ? 'reservation__input--error' : ''}
              />
              {errors.time && touched.time && <span className="reservation__error"><HiExclamationCircle /> {errors.time}</span>}
            </label>
          </div>

          <label>
            <span>Special Requests</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Dietary needs, celebration, seating preference..."
              rows={3}
            />
          </label>

          <motion.button
            type="submit"
            className="btn btn--primary btn--lg reservation__submit"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Confirm Reservation
          </motion.button>

          {submitted && (
            <motion.div
              className="reservation__success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <HiCheckCircle />
              <div>
                <strong>Request sent!</strong>
                <span>We&apos;ll confirm your reservation shortly.</span>
              </div>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
}

export default Reservation
