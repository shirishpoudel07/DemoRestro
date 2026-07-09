import { useCallback, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import PopularDishes from './components/PopularDishes'
import About from './components/About'
import Experience from './components/Experience'
import MenuTeaser from './components/MenuTeaser'
import GalleryTeaser from './components/GalleryTeaser'
import Testimonials from './components/Testimonials'
import Reservation from './components/Reservation'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import MenuPage from './pages/MenuPage'
import GalleryPage from './pages/GalleryPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function HomePage() {
  const navigate = useNavigate()

  const handlePopularSelect = useCallback(() => {
    navigate('/menu')
  }, [navigate])

  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const element = document.querySelector(location.hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <PopularDishes onSelectDish={handlePopularSelect} />
        <About />
        <Experience />
        <MenuTeaser />
        <GalleryTeaser />
        <Testimonials />
        <Reservation />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
}

function AnimatedPage({ children }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={
          <AnimatedPage>
            <Navbar />
            <ScrollProgress />
            <MenuPage />
            <Footer />
            <BackToTop />
          </AnimatedPage>
        } />
        <Route path="/gallery" element={
          <AnimatedPage>
            <Navbar />
            <ScrollProgress />
            <GalleryPage />
            <Footer />
            <BackToTop />
          </AnimatedPage>
        } />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
