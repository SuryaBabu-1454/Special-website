import { motion, AnimatePresence } from 'framer-motion'

export default function PageTransition({ children, locationKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: '100%' }}
      >
        {/* Black screen wipe overlay */}
        <motion.div
          className="fixed inset-0 bg-black pointer-events-none"
          style={{ zIndex: 8000 }}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
