import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowLeft, HiChevronDown } from 'react-icons/hi'
import { menuCategories, menuItems } from '../data/restaurant'
import MenuCard from '../components/MenuCard'
import MenuModal from '../components/MenuModal'

const categoryIcons = {
  popular: '🔥',
  starters: '🥟',
  mains: '🍛',
  desserts: '🍨',
  beverages: '☕',
}

function MenuPage() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [favorites, setFavorites] = useState([])
  const heroRef = useRef(null)

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    )
  }

  const categories = menuCategories.filter((category) => category.id !== 'all')

  const scrollToCategory = (id) => {
    const el = document.getElementById(`cat-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      <section className="menu-page section" ref={heroRef}>
        <div className="container">
          <div className="menu-page__hero">
            <span className="section-label">Full Menu</span>
            <h1 className="menu-page__title">Explore Every <em>Category</em></h1>
            <p className="menu-page__desc">
               All dishes are grouped by category so you can browse the full Demo Bistro menu at once.
              Tap any dish card to open the full details, then reserve your table.
            </p>

            <div className="menu-page__actions">
              <Link to="/" className="btn btn--outline menu-page__back-btn">
                <HiArrowLeft /> Back to Main Page
              </Link>
              <div className="menu-page__stats">
                <span><strong>{categories.length}</strong> categories</span>
                <span><strong>{menuItems.length}</strong> dishes</span>
              </div>
            </div>
          </div>

          <nav className="menu-page__nav">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="menu-page__nav-chip"
                onClick={() => scrollToCategory(cat.id)}
              >
                {categoryIcons[cat.id] || '🍽️'} {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <div className="menu-page__body">
        <div className="container">
          {categories.map((category, ci) => {
            const items =
              category.id === 'popular'
                ? menuItems.filter((item) => item.popular)
                : menuItems.filter((item) => item.category === category.id)

            if (items.length === 0) return null

            return (
              <motion.section
                key={category.id}
                id={`cat-${category.id}`}
                className={`menu-page__category ${ci % 2 === 1 ? 'menu-page__category--alt' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
              >
                <div className="menu-page__category-heading">
                  <span className="menu-page__category-icon">{categoryIcons[category.id] || '🍽️'}</span>
                  <h2 className="menu-page__category-title">{category.label}</h2>
                  <span className="menu-page__category-count">{items.length}</span>
                </div>

                <div className="menu-page__grid">
                  {items.map((item, index) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      index={index}
                      isFavorite={favorites.includes(item.id)}
                      onToggleFavorite={toggleFavorite}
                      onClick={setSelectedItem}
                    />
                  ))}
                </div>
              </motion.section>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <MenuModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            isFavorite={favorites.includes(selectedItem.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

export default MenuPage
