import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeOnly, fadeRise, stagger } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
}

export function Reveal({ children, className }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={reduce ? fadeOnly : fadeRise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    >
      {children}
    </motion.div>
  )
}

export function RevealGroup({ children, className }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={reduce ? { hidden: {}, visible: { transition: { staggerChildren: 0.03 } } } : stagger}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div className={className} variants={reduce ? fadeOnly : fadeRise}>
      {children}
    </motion.div>
  )
}
