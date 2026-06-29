import { motion } from 'framer-motion'

// Word-by-word text reveal
export function TextReveal({ text = '', className = '', delay = 0, stagger = 0.08, once = true }) {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const word = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((w, i) => (
        <motion.span key={i} className="inline-block mr-[0.25em]" variants={word}>
          {w}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Letter-by-letter reveal
export function LetterReveal({ text = '', className = '', delay = 0, stagger = 0.04, once = true }) {
  const letters = text.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const letter = {
    hidden: { opacity: 0, y: 30, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      style={{ perspective: '400px' }}
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={letter}
          style={{ display: l === ' ' ? 'inline' : 'inline-block' }}
        >
          {l === ' ' ? '\u00A0' : l}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Fade + slide reveal for blocks
export function FadeReveal({ children, delay = 0, direction = 'up', className = '', once = true }) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction], filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once }}
      transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export default TextReveal
