import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX, HiPhone } from 'react-icons/hi'
import { useLocation, useNavigate } from 'react-router-dom'
import { navLinks, restaurant } from '../data/restaurant'
import Logo from './Logo'

const primaryNav = navLinks.filter((l) =>
  ['#home', '#popular', '#experience', '#menu', '#gallery', '#contact'].includes(l.href),
)

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollSection, setScrollSection] = useState('#home')
  const location = useLocation()
  const navigate = useNavigate()
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  useEffect(() => {
    if (location.pathname !== '/') {
      const routeMap = {
        '/menu': '#menu',
        '/gallery': '#gallery',
        '/about': '#experience',
        '/contact': '#contact',
        '/reserve': '#reserve',
      }
      setScrollSection(routeMap[location.pathname] || '')
      return
    }
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
    }

    const onScroll = () => requestAnimationFrame(update)
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const handleNavClick = useCallback((href) => {
    setMenuOpen(false)
    toggleRef.current?.focus()
    if (href.startsWith('/')) { navigate(href); return }
    if (location.pathname !== '/') { navigate({ pathname: '/', hash: href.slice(1) }); return }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }, [location.pathname, navigate])

  const mobileVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 },
  }

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--top'}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar__bar">
        <div className="navbar__inner container">
          <a href="/" className="navbar__logo-link" onClick={(e) => { e.preventDefault(); navigate('/') }} aria-label="Home">
            <Logo variant="light" />
          </a>

          <nav className="navbar__links" aria-label="Main navigation">
            <ul>
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={scrollSection === link.href ? 'navbar__link--active' : ''}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    aria-current={scrollSection === link.href ? 'true' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <a
              href={`tel:${restaurant.location.phone}`}
              className="navbar__phone"
              title="Call us"
              aria-label={`Call ${restaurant.location.phone}`}
            >
              <HiPhone />
              <span>Call</span>
            </a>
            <a
              href="#reserve"
              className="btn btn--nav"
              onClick={(e) => { e.preventDefault(); handleNavClick('#reserve') }}
            >
              Book a Table
            </a>
          </div>

          <motion.button
            ref={toggleRef}
            type="button"
            className="navbar__toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            ref={menuRef}
            className="navbar__mobile"
            variants={mobileVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
          >
            {primaryNav.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={scrollSection === link.href ? 'navbar__link--active' : ''}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, ease: 'easeOut' }}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                tabIndex={0}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#reserve"
              className="btn btn--nav"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: primaryNav.length * 0.05 }}
              onClick={(e) => { e.preventDefault(); handleNavClick('#reserve') }}
            >
              Book a Table
            </motion.a>
            <motion.a
              href={`tel:${restaurant.location.phone}`}
              className="btn btn--nav btn--phone"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (primaryNav.length + 1) * 0.05 }}
            >
              <HiPhone /> {restaurant.location.phone}
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
