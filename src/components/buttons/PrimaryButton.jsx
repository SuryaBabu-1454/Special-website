import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAudioContext } from '@contexts/AudioContext'

export function PrimaryButton({ children, onClick, className = '', icon = null, id = '' }) {
  const btnRef = useRef(null)
  const { playClick } = useAudioContext()

  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    btnRef.current.style.setProperty('--x', `${x}%`)
    btnRef.current.style.setProperty('--y', `${y}%`)
  }, [])

  const handleClick = useCallback((e) => {
    playClick()
    onClick?.(e)
    // Ripple
    if (btnRef.current) {
      const ripple = document.createElement('span')
      const rect = btnRef.current.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out forwards;
        pointer-events: none;
      `
      btnRef.current.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    }
  }, [playClick, onClick])

  return (
    <>
      <style>{`
        @keyframes ripple {
          to { transform: scale(2); opacity: 0; }
        }
      `}</style>
      <motion.button
        ref={btnRef}
        id={id}
        className={`btn-primary relative overflow-hidden px-8 py-4 rounded-full font-body font-medium text-base tracking-wide ${className}`}
        style={{
          background: 'linear-gradient(135deg, rgba(248,200,220,0.9), rgba(255,215,0,0.8))',
          color: '#0A0A0A',
          border: 'none',
          boxShadow: '0 0 30px rgba(248,200,220,0.4), 0 4px 20px rgba(0,0,0,0.3)',
        }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(248,200,220,0.7), 0 8px 30px rgba(0,0,0,0.4)' }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {children}
        </span>
      </motion.button>
    </>
  )
}

export function SecondaryButton({ children, onClick, className = '', id = '' }) {
  const { playClick } = useAudioContext()

  return (
    <motion.button
      id={id}
      className={`relative overflow-hidden px-6 py-3 rounded-full font-body font-medium text-sm tracking-wide glass-pink ${className}`}
      style={{
        color: '#F8C8DC',
        border: '1px solid rgba(248,200,220,0.3)',
      }}
      onClick={() => { playClick(); onClick?.() }}
      whileHover={{ scale: 1.03, borderColor: 'rgba(248,200,220,0.6)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  )
}
