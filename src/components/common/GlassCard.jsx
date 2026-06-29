import { motion } from 'framer-motion'

export default function GlassCard({
  children,
  className = '',
  variant = 'default', // 'default' | 'pink' | 'gold' | 'blue' | 'dark'
  hover = true,
  glow = false,
  style = {},
  onClick,
}) {
  const variants = {
    default: 'glass',
    pink: 'glass-pink',
    gold: 'glass-gold',
    blue: 'glass-blue',
    dark: 'glass-dark',
  }

  const glowStyles = {
    default: '0 0 30px rgba(255,255,255,0.1)',
    pink: '0 0 30px rgba(248,200,220,0.3)',
    gold: '0 0 30px rgba(255,215,0,0.3)',
    blue: '0 0 30px rgba(79,142,247,0.3)',
    dark: 'none',
  }

  return (
    <motion.div
      className={`${variants[variant]} rounded-lg overflow-hidden ${className}`}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        boxShadow: glow ? glowStyles[variant] : undefined,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
