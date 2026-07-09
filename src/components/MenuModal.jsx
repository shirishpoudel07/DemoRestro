import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HiX, HiStar, HiFire, HiHeart, HiCheck } from 'react-icons/hi'

function MenuModal({ item, onClose, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate()
  if (!item) return null

  return (
    <motion.div
      className="menu-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="menu-modal__content"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button type="button" className="menu-modal__close" onClick={onClose} aria-label="Close" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <HiX />
        </motion.button>

        <div className="menu-modal__image">
          <img src={item.image} alt={item.name} />
          {item.popular && (
            <span className="menu-modal__popular">
              <HiStar /> Guest Favorite
            </span>
          )}
        </div>

        <div className="menu-modal__body">
          <div className="menu-modal__header">
            <h2>{item.name}</h2>
            <motion.button
              type="button"
              className={`menu-modal__fav ${isFavorite ? 'menu-modal__fav--active' : ''}`}
              onClick={() => onToggleFavorite(item.id)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
            >
              <HiHeart />
            </motion.button>
          </div>

          <div className="menu-modal__meta">
            <span className="menu-modal__price">Rs. {item.price}</span>
            {item.vegetarian && <span className="menu-modal__tag menu-modal__tag--veg">Vegetarian</span>}
            {item.spicy > 0 && (
              <span className="menu-modal__tag menu-modal__tag--spicy">
                {Array.from({ length: item.spicy }).map((_, i) => (
                  <HiFire key={i} />
                ))}
              </span>
            )}
          </div>

          <p className="menu-modal__desc text-readable">{item.description}</p>

          {item.includes && (
            <div className="menu-modal__includes">
              <h4>What&apos;s included</h4>
              <ul>
                {item.includes.map((inc) => (
                  <li key={inc}>
                    <HiCheck /> {inc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="menu-modal__actions">
            <motion.button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                onClose()
                navigate({ pathname: '/', hash: 'reserve' })
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Reserve &amp; Try This
            </motion.button>
            <motion.button type="button" className="btn btn--secondary" onClick={onClose} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              Keep Browsing
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MenuModal
