import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { interiorFeatures } from '../data/restaurant'

const highlights = {
  tables: ['Seats 4–8 per table', 'Perfect for groups', 'Easy to make friends', 'Great for laptop work'],
  chairs: ['Classic slat-back design', 'Rustic, home-style comfort', 'Sturdy craftsmanship', 'Sit back and relax'],
  flags: ['Colorful decor', 'Warm ceiling display', 'A charming photo moment', 'Flutters in the breeze'],
  lanterns: ['Soft amber glow', 'Hand-lit every evening', 'Sets a cozy dinner mood', 'Perfect for golden-hour photos'],
  floor: ['Warm wood-plank texture', 'Matches table & chair grain', 'Natural, easy-care finish', 'Adds a cabin-like warmth'],
  interior: ['Warm decor', 'Cozy atmosphere', 'Soft lighting', 'Inviting vibe'],
}

const vibes = {
  tables: ['👥 Groups welcome', '☕ Coffee-friendly'],
  chairs: ['🪑 Classic comfort', '📖 Reading nook'],
  flags: ['📸 Photo-worthy', '🏔️ Scenic touch'],
  lanterns: ['🌅 Best at dusk', '💛 Romantic vibe'],
  floor: ['🪵 Cabin feel', '🧹 Easy clean'],
  interior: ['🏡 Homey vibe', '📸 Photo spot'],
}

function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = interiorFeatures[activeIndex]

  const prev = useCallback(() => setActiveIndex((i) => (i === 0 ? interiorFeatures.length - 1 : i - 1)), [])
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % interiorFeatures.length), [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <motion.section
      id="experience"
      className="experience section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Step Inside
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Our Cozy <em>Space</em>
          </motion.h2>
        </motion.div>

        <div className="experience__layout">
          <motion.div
            className="experience__visual"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={active.image}
                src={active.image}
                alt={active.label}
                className="experience__photo"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="experience__content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="experience__counter">
              0{activeIndex + 1} / 0{interiorFeatures.length}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3>{active.label}</h3>
                <p>{active.description}</p>
                <ul className="experience__highlights">
                  {highlights[active.id]?.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="experience__vibe">
                  {vibes[active.id]?.map((v) => (
                    <span key={v}>{v}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="experience__nav">
              <motion.button
                type="button"
                className="experience__arrow"
                onClick={prev}
                aria-label="Previous"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiChevronLeft />
              </motion.button>

              <div className="experience__dots">
                {interiorFeatures.map((f, i) => (
                  <motion.button
                    key={f.id}
                    type="button"
                    className={`experience__dot ${i === activeIndex ? 'experience__dot--active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`View ${f.label}`}
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                type="button"
                className="experience__arrow"
                onClick={next}
                aria-label="Next"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiChevronRight />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Experience