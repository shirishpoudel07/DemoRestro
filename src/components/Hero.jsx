import { motion } from 'framer-motion'
import { HiStar, HiLocationMarker, HiArrowDown } from 'react-icons/hi'
import { restaurant, heroSlides } from '../data/restaurant'

function Hero() {
  const scrollTo = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <motion.div className="hero__bg">
        <img src={heroSlides[0].image} alt={heroSlides[0].label} />
        <div className="hero__overlay" />
      </motion.div>

      <div className="hero__content container">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <HiStar />
          <span>{restaurant.rating} · {restaurant.rank}</span>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {restaurant.name}
        </motion.h1>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          {restaurant.tagline}
        </motion.p>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          <HiLocationMarker />
          {restaurant.subtitle}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button
            type="button"
            className="btn btn--primary btn--lg"
            onClick={() => scrollTo('#popular')}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            See Popular Dishes
          </motion.button>
          <motion.button
            type="button"
            className="btn btn--outline btn--lg"
            onClick={() => scrollTo('#experience')}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            Step Inside
          </motion.button>
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="hero__scroll"
        onClick={() => scrollTo('#popular')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 1.5, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll down"
      >
        <HiArrowDown />
      </motion.button>
    </section>
  )
}

export default Hero
