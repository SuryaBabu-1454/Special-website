import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TRAIL_LENGTH = 10

export default function Cursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef([])
  const positionRef = useRef({ x: -100, y: -100 })
  const targetRef = useRef({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  )
  const rafRef = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    const interactables = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const animate = () => {
      positionRef.current = {
        x: positionRef.current.x + (targetRef.current.x - positionRef.current.x) * 0.15,
        y: positionRef.current.y + (targetRef.current.y - positionRef.current.y) * 0.15,
      }

      trailRef.current = [
        { ...positionRef.current },
        ...trailRef.current.slice(0, TRAIL_LENGTH - 1),
      ]

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`
      }

      setTrail([...trailRef.current])
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Trail dots */}
      {trail.map((pos, i) => (
        <div
          key={i}
          className="fixed pointer-events-none"
          style={{
            left: 0,
            top: 0,
            zIndex: 9998,
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
            opacity: (1 - i / TRAIL_LENGTH) * 0.4,
            transition: 'none',
            willChange: 'transform',
          }}
        >
          <div
            style={{
              width: `${Math.max(4, 10 - i)}px`,
              height: `${Math.max(4, 10 - i)}px`,
              borderRadius: '50%',
              background: `rgba(248, 200, 220, ${0.8 - i * 0.08})`,
              filter: `blur(${i * 0.5}px)`,
            }}
          />
        </div>
      ))}

      {/* Main heart cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none"
        style={{
          left: 0,
          top: 0,
          zIndex: 9999,
          willChange: 'transform',
          transition: 'none',
        }}
      >
        <div
          style={{
            fontSize: isHovering ? '40px' : isClicking ? '28px' : '32px',
            transition: 'font-size 0.2s ease',
            filter: isHovering
              ? 'drop-shadow(0 0 20px rgba(248,200,220,0.9)) drop-shadow(0 0 40px rgba(248,200,220,0.5))'
              : 'drop-shadow(0 0 8px rgba(248,200,220,0.6))',
            animation: 'heartbeat 1.2s ease-in-out infinite',
            display: 'block',
            lineHeight: 1,
          }}
        >
          ❤️
        </div>
      </div>
    </>
  )
}
