import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { HiStar, HiChevronLeft, HiChevronRight, HiFire, HiArrowRight } from 'react-icons/hi'
import { popularDishes } from '../data/restaurant'

function PopularDishes({ onSelectDish }) {
  const trackRef = useRef(null)
  const [expandedId, setExpandedId] = useState(null)
  const longPressTimer = useRef(null)
  const isLongPress = useRef(false)

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  const toggleExpand = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  const handleTouchStart = useCallback((id) => {
    isLongPress.current = false
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true
      toggleExpand(id)
    }, 2000)
  }, [toggleExpand])

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }, [])

  return (
    <section id="popular" className="popular section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Guest Favorites</span>
          <h2 className="section-title">
            Most <em>Popular</em> Dishes
          </h2>
          <p className="section-desc text-readable">
            Click a dish to read the full story — on mobile, touch and hold for 2 seconds.
          </p>
        </div>

        <div className="popular__carousel-wrap">
          <motion.button
            type="button"
            className="popular__nav popular__nav--prev"
            onClick={() => scroll(-1)}
            aria-label="Previous"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiChevronLeft />
          </motion.button>

          <div className="popular__track" ref={trackRef}>
            {popularDishes.map((dish, i) => (
              <motion.article
                key={dish.id}
                className={`popular__card ${expandedId === dish.id ? 'popular__card--expanded' : ''}`}
                onClick={() => {
                  if (!isLongPress.current) toggleExpand(dish.id)
                }}
                onTouchStart={() => handleTouchStart(dish.id)}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchEnd}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="popular__card-image">
                  <img src={dish.image} alt={dish.name} loading="lazy" />
                  <span className="popular__card-rank">#{i + 1}</span>
                  <span className="popular__card-badge"><HiStar /> Popular</span>
                </div>

                <div className="popular__card-body">
                  <h3>{dish.name}</h3>
                  <p className="popular__card-short text-readable">{dish.shortDesc}</p>
                  <motion.p
                    className="popular__card-full text-readable"
                    initial={false}
                    animate={{ opacity: expandedId === dish.id ? 1 : 0, height: expandedId === dish.id ? 'auto' : 0 }}
                  >
                    {dish.description}
                  </motion.p>

                  {dish.includes && (
                    <ul className={`popular__card-includes ${expandedId === dish.id ? 'popular__card-includes--visible' : ''}`}>
                      {dish.includes.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  <div className="popular__card-footer">
                    <span className="popular__card-price">Rs. {dish.price}</span>
                    {dish.spicy > 0 && (
                      <span className="popular__card-spicy">
                        {Array.from({ length: dish.spicy }).map((_, j) => (
                          <HiFire key={j} />
                        ))}
                      </span>
                    )}
                  </div>
                </div>

                <motion.button
                  type="button"
                  className="popular__card-cta"
                  onClick={() => onSelectDish?.(dish)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Full Details <HiArrowRight />
                </motion.button>
              </motion.article>
            ))}
          </div>

          <motion.button
            type="button"
            className="popular__nav popular__nav--next"
            onClick={() => scroll(1)}
            aria-label="Next"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiChevronRight />
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default PopularDishes
