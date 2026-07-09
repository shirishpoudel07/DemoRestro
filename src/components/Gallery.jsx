import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { galleryImages } from '../data/restaurant'
import CardFanCarousel from './CardFanCarousel'

function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [filter, setFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'Your Photo', label: 'Our Photos' },
    { id: 'Scenic', label: 'Scenic' },
  ]

  const shown =
    filter === 'all' ? galleryImages : galleryImages.filter((img) => img.tag === filter)

  const carouselCards = shown.map((img) => ({
    imgUrl: img.src,
    alt: img.alt,
    caption: img.caption,
    tag: img.tag,
    src: img.src,
  }))

  const lightboxIndex = lightbox ? shown.findIndex((img) => img.caption === lightbox.caption) : -1

  useEffect(() => {
    if (!lightbox) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') {
        const idx = shown.findIndex((img) => img.caption === lightbox.caption)
        if (idx < shown.length - 1) setLightbox(shown[idx + 1])
      }
      if (e.key === 'ArrowLeft') {
        const idx = shown.findIndex((img) => img.caption === lightbox.caption)
        if (idx > 0) setLightbox(shown[idx - 1])
      }
    }
    window.addEventListener('keydown', handleKey)
    document.documentElement.classList.add('lightbox-open')
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.documentElement.classList.remove('lightbox-open')
    }
  }, [lightbox, shown])

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
          <div className="section-header">
            <span className="section-label">Gallery</span>
            <h2 className="section-title">
              A Feast for the <em>Eyes</em>
            </h2>
          </div>

        <div className="gallery__filters">
          {filters.map((f) => (
            <motion.button
              key={f.id}
              type="button"
              className={`gallery__filter ${filter === f.id ? 'gallery__filter--active' : ''}`}
              onClick={() => setFilter(f.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        <div className="gallery__carousel">
          <CardFanCarousel
            cards={carouselCards}
            onSelectImage={(card) => {
              const full = shown.find((img) => img.caption === card.caption)
              if (full) setLightbox(full)
            }}
          />
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="gallery__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="gallery__lightbox-content"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button type="button" className="gallery__lightbox-close" onClick={() => setLightbox(null)} aria-label="Close" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <HiX />
              </motion.button>

              {lightboxIndex > 0 && (
                <motion.button type="button" className="gallery__lightbox-nav gallery__lightbox-nav--prev" onClick={() => setLightbox(shown[lightboxIndex - 1])} aria-label="Previous" whileHover={{ scale: 1.1, x: -2 }} whileTap={{ scale: 0.9 }}>
                  <HiChevronLeft />
                </motion.button>
              )}

              <img src={lightbox.src} alt={lightbox.alt} />

              {lightboxIndex < shown.length - 1 && (
                <motion.button type="button" className="gallery__lightbox-nav gallery__lightbox-nav--next" onClick={() => setLightbox(shown[lightboxIndex + 1])} aria-label="Next" whileHover={{ scale: 1.1, x: 2 }} whileTap={{ scale: 0.9 }}>
                  <HiChevronRight />
                </motion.button>
              )}

              <div className="gallery__lightbox-meta">
                <p>{lightbox.caption}</p>
                <span className="gallery__lightbox-tag">{lightbox.tag}</span>
                <span className="gallery__lightbox-counter">{lightboxIndex + 1} / {shown.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
