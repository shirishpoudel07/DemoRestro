import { motion, useScroll, useSpring } from 'framer-motion'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div className="scroll-progress-wrap">
      <motion.div className="scroll-progress" style={{ scaleX }} />
    </div>
  )
}

export default ScrollProgress
