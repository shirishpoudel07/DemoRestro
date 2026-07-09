import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { galleryImages } from '../data/restaurant'

function GalleryTeaser() {
  const navigate = useNavigate()
  const previewImages = galleryImages.slice(0, 4)

  return (
    <section id="gallery" className="gallery-teaser section">
      <motion.div
        className="container gallery-teaser__box"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <span className="section-label">Gallery</span>
          <h2 className="section-title">
            See Demo Bistro <em>Through Our Lens</em>
          </h2>
          <p className="section-desc text-readable">
            Browse hand-picked moments from our cozy space.
          </p>

          <div className="gallery-teaser__previews">
            {previewImages.map((item, i) => (
              <motion.img
                key={item.caption}
                src={item.src}
                alt={item.alt}
                className="gallery-teaser__preview"
                loading="lazy"
                title={item.caption}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        </div>

        <motion.button
          type="button"
          className="btn btn--primary btn--lg gallery-teaser__action"
          onClick={() => navigate('/gallery')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Explore Full Gallery
          <HiArrowRight />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default GalleryTeaser
