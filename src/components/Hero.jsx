import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { menuItems } from '../data/restaurant'

const curated = [
  menuItems.find((m) => m.name === 'Set Breakfast'),
  menuItems.find((m) => m.name === 'Chicken Burger'),
  menuItems.find((m) => m.name === 'Dal Bhat Set'),
  menuItems.find((m) => m.name === 'Sizzling Brownie'),
  menuItems.find((m) => m.name === 'Cappuccino'),
].filter(Boolean)

const dishes = curated.map((dish, i) => ({
  id: dish.id,
  image: dish.image,
  name: dish.name,
  price: dish.price,
  oldPrice: dish.price + 4 + i,
  hot: i === 2,
}))

function Hero() {
  const [active, setActive] = useState(2)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive((i) => (i + 1) % dishes.length), 5000)
    return () => clearInterval(t)
  }, [paused])

  const select = (i) => {
    setActive(i)
    setPaused(true)
    setTimeout(() => setPaused(false), 8000)
  }

  const scrollTo = (s) => document.querySelector(s)?.scrollIntoView({ behavior: 'smooth' })

  const getOffset = (i) => {
    let d = i - active
    const n = dishes.length
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
  }

  return (
    <section id="home" className="hero">
      <div className="hero__bg" />

      <div className="hero__content">
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Provide the <em>best food</em> for you
        </motion.h1>

        <motion.div
          className="hero__rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />

        <motion.p
          className="hero__desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          We provide the best and most delicious food based on high quality
          ingredients that are maintained by high tech machines and cooked
          by our experts
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <button className="hero__btn hero__btn--fill" onClick={() => scrollTo('#menu')}>
            Explore Menu
          </button>
          <button className="hero__btn hero__btn--outline" onClick={() => scrollTo('#reserve')}>
            Book a Table
          </button>
        </motion.div>
      </div>

      <div className="hero__carousel">
        {dishes.map((item, i) => {
          const offset = getOffset(i)
          const abs = Math.abs(offset)
          const isActive = offset === 0

          return (
            <button
              key={item.id}
              className={`hero__slide ${isActive ? 'hero__slide--active' : ''}`}
              onClick={() => select(i)}
              style={{
                transform: `translate(-50%,-50%) translateX(${offset * 60}%) scale(${isActive ? 1 : abs === 1 ? 0.72 : 0.55})`,
                zIndex: 10 - abs,
                opacity: abs > 2 ? 0 : 1,
              }}
            >
              <div className="hero__slide-plate">
                <div className="hero__slide-ring" />
                <img src={item.image} alt={item.name} />
                {item.hot && <span className="hero__slide-tag">HOT DEALS</span>}
              </div>
              <div className="hero__slide-prices">
                {isActive && <span className="hero__slide-old">${item.oldPrice.toFixed(2)}</span>}
                <span className="hero__slide-price">${item.price.toFixed(2)}</span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="hero__dots">
        {dishes.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === active ? 'hero__dot--active' : ''}`}
            onClick={() => select(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
