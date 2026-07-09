import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { testimonials } from '../data/restaurant'

function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section id="reviews" className="testimonials section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Guest Reviews</span>
          <h2 className="section-title">
            What Our <em>Guests Say</em>
          </h2>
        </motion.div>

        <div className="testimonials__carousel">
          <motion.button
            type="button"
            className="testimonials__nav"
            onClick={prev}
            aria-label="Previous review"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiChevronLeft />
          </motion.button>

          <div className="testimonials__track">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="testimonials__card"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                <div className="testimonials__stars">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <HiStar key={i} />
                  ))}
                </div>
                <p className="testimonials__text">{testimonials[current].text}</p>
                <div className="testimonials__meta">
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="testimonials__avatar"
                    loading="lazy"
                  />
                  <div className="testimonials__meta-text">
                    <strong>{testimonials[current].name}</strong>
                    <span>{testimonials[current].country}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            className="testimonials__nav"
            onClick={next}
            aria-label="Next review"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiChevronRight />
          </motion.button>
        </div>

        <div className="testimonials__dots">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to review ${i + 1}`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.7 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
