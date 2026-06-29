import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { SCROLL_CONFIG } from '@constants/config'

const ScrollCtx = createContext(null)

export function ScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: SCROLL_CONFIG.lerp,
      wheelMultiplier: SCROLL_CONFIG.wheelMultiplier,
      touchMultiplier: SCROLL_CONFIG.touchMultiplier,
      infinite: SCROLL_CONFIG.infinite,
      smooth: SCROLL_CONFIG.smooth,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ({ scroll, progress }) => {
      setScrollY(scroll)
      setScrollProgress(progress)
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const scrollTo = (target, options = {}) => {
    lenisRef.current?.scrollTo(target, { duration: 1.2, ...options })
  }

  const stop = () => lenisRef.current?.stop()
  const start = () => lenisRef.current?.start()

  return (
    <ScrollCtx.Provider value={{ lenis: lenisRef.current, scrollY, scrollProgress, scrollTo, stop, start }}>
      {children}
    </ScrollCtx.Provider>
  )
}

export const useScrollContext = () => {
  const ctx = useContext(ScrollCtx)
  if (!ctx) throw new Error('useScrollContext must be inside ScrollProvider')
  return ctx
}
