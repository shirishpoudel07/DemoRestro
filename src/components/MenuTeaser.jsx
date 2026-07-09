import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { menuCategories } from '../data/restaurant'

function MenuTeaser() {
  const navigate = useNavigate()

  return (
    <section id="menu" className="menu-teaser section">
      <motion.div
        className="container menu-teaser__box"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <span className="section-label">Menu Preview</span>
          <h2 className="section-title">
            Explore Our Full <em>Menu</em>
          </h2>
          <p className="section-desc text-readable">
            Click the menu box to see every dish grouped by category, with photos,
            spice level, and full details.
          </p>

          <div className="menu-teaser__chips">
            {menuCategories.slice(0, 5).map((category, i) => (
              <motion.span
                key={category.id}
                className="menu-teaser__chip"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.button
          type="button"
          className="btn btn--primary btn--lg menu-teaser__action"
          onClick={() => navigate('/menu')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          View Full Menu
          <HiArrowRight />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default MenuTeaser
