import { useEffect, useRef, useState } from 'react'

export function useMouseParallax(strength = 20) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength
      const y = (e.clientY / window.innerHeight - 0.5) * strength
      targetRef.current = { x, y }
    }

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.05,
        y: prev.y + (targetRef.current.y - prev.y) * 0.05,
      }))
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [strength])

  return position
}

export function useDeviceParallax(strength = 10) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleOrientation = (e) => {
      setTilt({
        x: (e.gamma / 90) * strength,
        y: (e.beta / 180) * strength,
      })
    }

    if (typeof DeviceOrientationEvent !== 'undefined') {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true })
      return () => window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [strength])

  return tilt
}
