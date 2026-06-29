import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useStoryContext } from '@contexts/StoryContext'
import { useAudioContext } from '@contexts/AudioContext'
import { PrimaryButton } from '@components/buttons/PrimaryButton'
import FloatingParticles from '@components/effects/FloatingParticles'

// ─── Scene definitions ───────────────────────────────────────────────────────
const SCENES = [
  {
    id: 'silence',
    duration: 3000,
    component: 'silence',
  },
  {
    id: 'heartbeat',
    duration: 4000,
    component: 'heart',
  },
  {
    id: 'scene-03',
    duration: 5000,
    text: 'Some people enter our life unexpectedly...',
    component: 'fadeText',
    style: { fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.5rem, 4vw, 3rem)' },
  },
  {
    id: 'scene-04',
    duration: 5000,
    text: '...and slowly become our entire world.',
    component: 'fadeText',
    style: { fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontStyle: 'italic' },
    glow: 'pink',
  },
  {
    id: 'scene-05',
    duration: 5000,
    text: 'This is not just a website...',
    component: 'typeText',
    style: { fontFamily: '"Outfit", sans-serif', fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', letterSpacing: '0.1em' },
  },
  {
    id: 'scene-06',
    duration: 5000,
    text: 'This is our story.',
    component: 'goldReveal',
    particles: true,
  },
  {
    id: 'begin',
    duration: Infinity,
    component: 'begin',
  },
]

// ─── Scene Components ─────────────────────────────────────────────────────────
function SilenceScene() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="w-2 h-2 rounded-full bg-white/20"
        style={{ animation: 'pulse 2s ease-in-out infinite' }}
      />
    </div>
  )
}

function HeartScene({ onLongPress }) {
  const pressTimer = useRef(null)
  const [secretTriggered, setSecretTriggered] = useState(false)

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setSecretTriggered(true)
      onLongPress?.()
    }, 1500)
  }

  const handlePressEnd = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current)
  }

  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
    >
      <div
        style={{
          fontSize: 'clamp(60px, 15vw, 120px)',
          animation: 'heartbeat 0.9s ease-in-out infinite',
          filter: 'drop-shadow(0 0 40px rgba(248,200,220,0.9)) drop-shadow(0 0 80px rgba(248,200,220,0.5))',
          userSelect: 'none',
        }}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        data-cursor-hover
      >
        ❤️
      </div>
      {secretTriggered && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-pink rounded-lg px-8 py-6 text-center"
          style={{ marginTop: '100px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-handwriting text-xl text-accent-primary">
            Thank you for pressing play on our story ❤️
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

function FadeTextScene({ text, style = {}, glow = '' }) {
  const words = text.split(' ')
  return (
    <motion.div
      className="text-center max-w-4xl px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <p
        style={{
          color: '#FFFFFF',
          lineHeight: 1.4,
          textShadow: glow === 'pink'
            ? '0 0 40px rgba(248,200,220,0.8), 0 0 80px rgba(248,200,220,0.4)'
            : '0 0 30px rgba(255,255,255,0.3)',
          ...style,
        }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            {w}
          </motion.span>
        ))}
      </p>
    </motion.div>
  )
}

function TypeTextScene({ text, style = {} }) {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1))
        indexRef.current++
      } else {
        clearInterval(timer)
      }
    }, 55)
    return () => clearInterval(timer)
  }, [text])

  return (
    <motion.div
      className="text-center max-w-3xl px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 0 20px rgba(255,255,255,0.2)', ...style }}>
        {displayed}
        {displayed.length < text.length && <span className="typing-cursor" />}
      </p>
    </motion.div>
  )
}

function GoldRevealScene({ text, showParticles }) {
  const words = text.split(' ')
  return (
    <motion.div
      className="text-center relative max-w-3xl px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <FloatingParticles type="mixed" count={30} />
        </div>
      )}
      <p
        className="font-heading"
        style={{
          fontSize: 'clamp(2rem, 6vw, 5rem)',
          background: 'linear-gradient(135deg, #FFD700, #F8C8DC, #FFD700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          backgroundSize: '200% auto',
          animation: 'shimmer 3s linear infinite',
          filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.5))',
        }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8, type: 'spring', stiffness: 120 }}
          >
            {w}
          </motion.span>
        ))}
      </p>
    </motion.div>
  )
}

function BeginScene({ onBegin }) {
  return (
    <motion.div
      className="text-center flex flex-col items-center gap-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Decorative line */}
      <div className="flex items-center gap-4 w-64">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/30" />
        <span className="text-white/30 text-xs">✦</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/30" />
      </div>

      <div className="space-y-3 text-center">
        <p className="font-heading text-white/40 text-sm tracking-widest uppercase">
          Your story awaits
        </p>
        <p
          className="font-heading text-4xl md:text-6xl text-white"
          style={{ textShadow: '0 0 40px rgba(248,200,220,0.5)' }}
        >
          This is our story.
        </p>
      </div>

      <PrimaryButton
        id="begin-journey-btn"
        onClick={onBegin}
        icon="❤️"
        className="text-lg px-10 py-5"
      >
        Begin Our Journey
      </PrimaryButton>

      <p className="font-ui text-white/20 text-xs tracking-widest">
        For Saranya, with all my heart.
      </p>
    </motion.div>
  )
}

// ─── Main Opening Component ────────────────────────────────────────────────────
export default function Opening() {
  const navigate = useNavigate()
  const { setOpeningComplete } = useStoryContext()
  const { playHeartbeat, playChime, initAudio } = useAudioContext()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [showBegin, setShowBegin] = useState(false)

  const currentScene = SCENES[sceneIndex]

  useEffect(() => {
    if (currentScene.component === 'heart') {
      playHeartbeat()
      const hbInterval = setInterval(playHeartbeat, 1200)
      return () => clearInterval(hbInterval)
    }
    if (currentScene.component === 'goldReveal') {
      playChime()
    }
  }, [sceneIndex, currentScene.component, playHeartbeat, playChime])

  useEffect(() => {
    if (currentScene.duration === Infinity) {
      setShowBegin(true)
      return
    }

    const timer = setTimeout(() => {
      setSceneIndex(prev => {
        if (prev < SCENES.length - 1) return prev + 1
        return prev
      })
    }, currentScene.duration)

    return () => clearTimeout(timer)
  }, [sceneIndex, currentScene.duration])

  const handleBegin = useCallback(() => {
    initAudio()
    playChime()
    setOpeningComplete(true)
    setTimeout(() => navigate('/chapter/1'), 800)
  }, [navigate, setOpeningComplete, playChime, initAudio])

  const handleLongPress = useCallback(() => {
    // Secret found
  }, [])

  const renderScene = () => {
    switch (currentScene.component) {
      case 'silence': return <SilenceScene />
      case 'heart': return <HeartScene onLongPress={handleLongPress} />
      case 'fadeText': return <FadeTextScene text={currentScene.text} style={currentScene.style} glow={currentScene.glow} />
      case 'typeText': return <TypeTextScene text={currentScene.text} style={currentScene.style} />
      case 'goldReveal': return <GoldRevealScene text={currentScene.text} showParticles={currentScene.particles} />
      case 'begin': return <BeginScene onBegin={handleBegin} />
      default: return null
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: '#000000', zIndex: 100 }}
    >
      {/* Background star field */}
      <div className="fill-absolute overflow-hidden">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <div
        className="fill-absolute pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(248,200,220,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Scene content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene.id}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>

      {/* Scene progress dots */}
      {!showBegin && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {SCENES.slice(0, -1).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === sceneIndex ? '24px' : '6px',
                height: '6px',
                background: i <= sceneIndex ? '#F8C8DC' : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
      )}

      {/* Film grain */}
      <div className="film-grain" />
    </div>
  )
}
