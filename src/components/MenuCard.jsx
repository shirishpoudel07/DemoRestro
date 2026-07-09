import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { HiFire, HiStar, HiHeart, HiArrowRight } from 'react-icons/hi'

function MenuCard({ item, index, onClick, onToggleFavorite, isFavorite }) {
  const [expanded, setExpanded] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-80, 80], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-80, 80], [-6, 6]), { stiffness: 300, damping: 30 })

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const resetTilt = () => { x.set(0); y.set(0) }

  const handleFav = (e) => {
    e.stopPropagation()
    onToggleFavorite?.(item.id)
  }

  return (
    <motion.article
      className={`menu-card ${expanded ? 'menu-card--expanded' : ''}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      onClick={() => onClick?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(item)}
    >
      <div className="menu-card__image-wrap">
        <img src={item.image} alt={item.name} className="menu-card__image" loading="lazy" />
        <div className="menu-card__badges">
          {item.popular && (
            <span className="menu-card__badge menu-card__badge--popular">
              <HiStar /> Popular
            </span>
          )}
          {item.vegetarian && (
            <span className="menu-card__badge menu-card__badge--veg">Veg</span>
          )}
        </div>
        <motion.button
          type="button"
          className={`menu-card__fav-btn ${isFavorite ? 'menu-card__fav-btn--active' : ''}`}
          onClick={handleFav}
          aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.85 }}
        >
          <HiHeart />
        </motion.button>
        <div className="menu-card__overlay">
          <span>Open Details <HiArrowRight /></span>
        </div>
        <div className="menu-card__price">Rs. {item.price}</div>
      </div>

      <div className="menu-card__body">
        <div className="menu-card__header">
          <h3 className="menu-card__name">{item.name}</h3>
          {item.spicy > 0 && (
            <span className="menu-card__spicy" title={`Spice level ${item.spicy}/3`}>
              {Array.from({ length: item.spicy }).map((_, i) => (
                <HiFire key={i} />
              ))}
            </span>
          )}
        </div>

        <p className="menu-card__desc text-readable">
          {expanded ? item.description : item.shortDesc}
        </p>

        <motion.button
          type="button"
          className="menu-card__read-more"
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.97 }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </motion.button>
      </div>
    </motion.article>
  )
}

export default MenuCard
