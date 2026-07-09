import { useReducer } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSearch, HiHeart } from 'react-icons/hi'
import { menuCategories, menuItems } from '../data/restaurant'
import MenuCard from './MenuCard'
import MenuModal from './MenuModal'

function menuReducer(state, action) {
  switch (action.type) {
    case 'SET_CATEGORY': return { ...state, activeCategory: action.payload }
    case 'SET_SEARCH': return { ...state, search: action.payload }
    case 'TOGGLE_FAV':
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter((f) => f !== action.payload)
          : [...state.favorites, action.payload],
      }
    case 'SET_FAVORITES_ONLY': return { ...state, favoritesOnly: !state.favoritesOnly }
    case 'SET_SELECTED': return { ...state, selectedItem: action.payload }
    case 'EXTERNAL_SELECT': {
      action.onClear?.()
      return { ...state, selectedItem: action.payload }
    }
    default: return state
  }
}

function Menu({ externalSelected, onExternalClear }) {
  const [state, dispatch] = useReducer(menuReducer, {
    activeCategory: 'all',
    search: '',
    favoritesOnly: false,
    favorites: [],
    selectedItem: null,
  })

  const { activeCategory, search, favoritesOnly, favorites, selectedItem } = state

  if (externalSelected && externalSelected !== state.selectedItem) {
    dispatch({ type: 'EXTERNAL_SELECT', payload: externalSelected, onClear: onExternalClear })
  }

  const toggleFavorite = (id) => {
    dispatch({ type: 'TOGGLE_FAV', payload: id })
  }

  const filtered = menuItems.filter((item) => {
    const matchCategory =
      activeCategory === 'all' ||
      (activeCategory === 'popular' ? item.popular : item.category === activeCategory)
    const matchSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    const matchFav = !favoritesOnly || favorites.includes(item.id)
    return matchCategory && matchSearch && matchFav
  })

  return (
    <section id="menu" className="menu section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Menu</span>
          <h2 className="section-title">
            Our <em>Favorites</em>
          </h2>
          <p className="section-desc text-readable">
            Search, filter, heart your picks, and tap any card for the full dish story.
            Real photos where available — curated shots for the rest.
          </p>
        </div>

        <div className="menu__controls">
          <div className="menu__search">
            <HiSearch />
            <input
              type="text"
              placeholder="Search by name or ingredient…"
              value={search}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            />
          </div>
          <motion.button
            type="button"
            className={`menu__fav-toggle ${favoritesOnly ? 'menu__fav-toggle--active' : ''}`}
            onClick={() => dispatch({ type: 'SET_FAVORITES_ONLY' })}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiHeart />
            My Favorites {favorites.length > 0 && `(${favorites.length})`}
          </motion.button>
        </div>

        <div className="menu__tabs">
          {menuCategories.map((cat) => {
            const count =
              cat.id === 'all'
                ? menuItems.length
                : cat.id === 'popular'
                  ? menuItems.filter((m) => m.popular).length
                  : menuItems.filter((m) => m.category === cat.id).length
            return (
              <motion.button
                key={cat.id}
                type="button"
                className={`menu__tab ${activeCategory === cat.id ? 'menu__tab--active' : ''}`}
                onClick={() => dispatch({ type: 'SET_CATEGORY', payload: cat.id })}
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
              >
                {cat.label}
                <span className="menu__tab-count">{count}</span>
              </motion.button>
            )
          })}
        </div>

        <p className="menu__result-count">
          Showing <strong>{filtered.length}</strong> dish{filtered.length !== 1 ? 'es' : ''}
        </p>

        <motion.div layout className="menu__grid">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                >
                  <MenuCard
                    item={item}
                    index={i}
                    onClick={(item) => dispatch({ type: 'SET_SELECTED', payload: item })}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.includes(item.id)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.p className="menu__empty text-readable" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                No dishes found — try a different search or category.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <MenuModal
            item={selectedItem}
            onClose={() => dispatch({ type: 'SET_SELECTED', payload: null })}
            isFavorite={favorites.includes(selectedItem.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Menu
