import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX, HiPhone } from 'react-icons/hi'
import { useLocation, useNavigate } from 'react-router-dom'
import { navLinks, restaurant } from '../data/restaurant'
import Logo from './Logo'

const primaryNav = navLinks.filter((l) =>
  ['#home', '#popular', '#menu', '#experience', '#gallery', '#contact'].includes(l.href),
)

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollSection, setScrollSection] = useState('#home')
  const location = useLocation()
  const navigate = useNavigate()
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return

    const ids = navLinks.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1))
    const navbarH = 80

    const update = () => {
      let best = '#home'
      let bestDist = Infinity
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const dist = Math.abs(el.getBoundingClientRect().top - navbarH)
        if (dist < bestDist) {
          bestDist = dist
          best = `#${id}`
        }
      }
      setScrollSection(best)
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const handleNavClick = (href) => {
    setMenuOpen(false)

    if (href.startsWith('/')) {
      navigate(href)
      return
    }

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: href.slice(1) })
      return
    }

    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--top'} ${scrollSection.startsWith('#') ? `navbar--${scrollSection.replace('#', 'section-')}` : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar__bar">
        <div className="navbar__inner container">
          <a
            href="/"
            className="navbar__logo-link"
            onClick={(e) => { e.preventDefault(); navigate('/') }}
          >
            <Logo variant={scrolled ? 'dark' : 'light'} />
          </a>

          <nav className="navbar__links" aria-label="Main navigation">
            <ul>
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    className={scrollSection === link.href ? 'navbar__link--active' : ''}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <a
              href={`tel:${restaurant.location.phone}`}
              className="navbar__phone"
              title="Call us"
            >
              <HiPhone />
              <span>Call</span>
            </a>
            <a
              href="#reserve"
              className="btn btn--nav navbar__cta"
              onClick={(e) => { e.preventDefault(); handleNavClick('#reserve') }}
            >
              Book a Table
            </a>
          </div>

          <motion.button
            type="button"
            className="navbar__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={scrollSection === link.href ? 'navbar__link--active' : ''}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              >
                {link.label}
              </motion.a>
            ))}
            <a href={`tel:${restaurant.location.phone}`} className="btn btn--nav">
              <HiPhone /> {restaurant.location.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
