import { motion, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-[var(--header-h)] z-50 h-[2px] origin-left"
      style={{ scaleX: scrollYProgress, backgroundImage: 'var(--gradient-gold)' }}
    />
  )
}
