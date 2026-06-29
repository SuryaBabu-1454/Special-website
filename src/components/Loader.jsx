import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStoryContext } from '@contexts/StoryContext'
import { LOADER_CONFIG } from '@constants/config'

function HeartbeatStep() {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        style={{
          fontSize: '80px',
          animation: 'heartbeat 0.8s ease-in-out infinite',
          filter: 'drop-shadow(0 0 30px rgba(248,200,220,0.9)) drop-shadow(0 0 60px rgba(248,200,220,0.5))',
        }}
      >
        ❤️
      </div>
    </motion.div>
  )
}

function TypewriterText({ text, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1))
        indexRef.current++
      } else {
        setDone(true)
        clearInterval(timer)
        setTimeout(onComplete, 400)
      }
    }, 60)
    return () => clearInterval(timer)
  }, [text, onComplete])

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p
        className="font-heading text-3xl md:text-5xl text-white/90 tracking-wider"
        style={{ textShadow: '0 0 40px rgba(248,200,220,0.6)' }}
      >
        {displayed}
        {!done && <span className="typing-cursor" />}
      </p>
    </motion.div>
  )
}

function WordRevealText({ text }) {
  const words = text.split(' ')
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p
        className="font-handwriting text-4xl md:text-6xl"
        style={{
          background: 'linear-gradient(135deg, #FFD700, #F8C8DC, #FFD700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))',
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            {word}
          </motion.span>
        ))}
      </p>
    </motion.div>
  )
}

// Loading progress bar
function LoadingBar({ progress }) {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64">
      <div className="h-px bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #F8C8DC, #FFD700)' }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-white/20 text-xs font-ui tracking-widest">LOADING</span>
        <span className="text-white/20 text-xs font-ui">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}

// Background particles for loader
function LoaderParticles() {
  return (
    <div className="fill-absolute overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            background: Math.random() > 0.5 ? 'rgba(248,200,220,0.3)' : 'rgba(255,215,0,0.2)',
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 5}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default function Loader() {
  const { setLoaderComplete } = useStoryContext()
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressTimer); return 100 }
        return prev + 100 / (LOADER_CONFIG.totalDuration / 50)
      })
    }, 50)

    // Step 1: Heartbeat (0–2s)
    const t1 = setTimeout(() => setStep(1), 2000)
    // Step 2: First text (2–4s)
    const t2 = setTimeout(() => setStep(2), 4000)
    // Step 3: Final text (4–6s)
    const t3 = setTimeout(() => {
      setStep(3)
      setTimeout(() => setLoaderComplete(true), 2000)
    }, 6000)

    return () => {
      clearInterval(progressTimer)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [setLoaderComplete])

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: '#000000', zIndex: 9990 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <LoaderParticles />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(248,200,220,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="init" className="text-white/20 font-ui text-xs tracking-widest uppercase"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Preparing your story...
            </motion.div>
          )}

          {step === 1 && <HeartbeatStep key="heart" />}

          {step === 2 && (
            <TypewriterText
              key="text1"
              text={LOADER_CONFIG.steps[1].content}
              onComplete={() => {}}
            />
          )}

          {step === 3 && (
            <WordRevealText
              key="text2"
              text={LOADER_CONFIG.steps[2].content}
            />
          )}
        </AnimatePresence>
      </div>

      <LoadingBar progress={Math.min(progress, 100)} />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-white/10 font-ui text-xs tracking-widest">
        THE STORY I NEVER WANTED TO END
      </div>
      <div className="absolute bottom-8 left-8 text-white/10 font-ui text-xs tracking-widest">
        FOR SARANYA ❤️
      </div>
    </motion.div>
  )
}
