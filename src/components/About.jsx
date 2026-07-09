import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { restaurant, images } from '../data/restaurant'

const features = [
  {
    title: 'Warm lakeside atmosphere',
    text: 'Prayer flags, lantern light, and coffee steam create a cozy first impression.',
  },
  {
    title: 'Shared tables, local energy',
    text: 'Wooden benches connect travelers and locals around delicious everyday plates.',
  },
]

function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="about section">
      <div className="container" ref={ref}>
        <div className="about__layout">
          <motion.div
            className="about__image-wrap"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="about__image-frame">
              <img
                src={images.exterior}
                alt="Demo Bistro restaurant entrance"
                className="about__image"
              />
            </div>
          </motion.div>

          <motion.div
            className="about__content"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="section-label">Our Story</span>
            <h2 className="section-title">
              A Cozy Gem with <em>Warm Soul</em>
            </h2>
            <p className="about__text">{restaurant.about}</p>

            <div className="about__divider" />

            <div className="about__features">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="about__feature"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="about__divider" />

            <div className="about__stats">
              {restaurant.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="about__stat"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                >
                  <span className="about__stat-value">{stat.value}</span>
                  <span className="about__stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
