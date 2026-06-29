import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedBackground from '@components/effects/AnimatedBackground'
import FloatingParticles from '@components/effects/FloatingParticles'
import FilmGrain from '@components/effects/FilmGrain'
import { FadeReveal } from '@components/animations/TextReveal'
import { PrimaryButton } from '@components/buttons/PrimaryButton'
import ProgressIndicator from '@components/common/ProgressIndicator'

function SecretModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9000 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div className="relative glass-gold rounded-xl p-10 max-w-md mx-6 text-center"
            initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }} onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4">🎁</div>
            <h3 className="font-heading text-2xl text-accent-gold mb-4">A Gift For You</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "My favorite gift has always been your time, your trust, and the beautiful memories we share. Happy Birthday. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scene 1: The Birthday Door
function Scene1() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A, #0d0814)' }}>
      {/* Golden door glow */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,200,80,0.1) 0%, transparent 60%)',
      }} />
      <AnimatedBackground showStars starCount={80} showParticles particleCount={25} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <FadeReveal delay={0.3}>
          <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Chapter 14 — Scene 1</p>
        </FadeReveal>

        {/* The Golden Door */}
        <motion.div className="relative w-36 h-56 mx-auto rounded-t-full border-2 border-accent-gold/40 flex items-center justify-center"
          style={{ background: 'rgba(255,200,80,0.05)', boxShadow: '0 0 30px rgba(255,200,80,0.1)' }}
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }}>
          <div className="text-6xl" style={{ filter: 'drop-shadow(0 0 15px rgba(255,200,80,0.8))' }}>🚪</div>
        </motion.div>

        <FadeReveal delay={0.8}>
          <h2 className="font-heading text-4xl md:text-6xl text-white">Your Special Day</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "Every year has one day...",
            "That belongs entirely to you.",
            "A day to look back on how far you've come.",
            "And look forward to the beautiful steps ahead.",
          ].map((line, i) => (
            <motion.p key={i} className="font-body text-white/70 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.4, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 2: Blow out candles
function Scene2({ candles, toggleCandle, candlesBlown }) {
  return (
    <div className="scene-center" style={{ background: '#0A0A0A' }}>
      <AnimatedBackground showStars starCount={80} showParticles={false} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        <h3 className="font-heading text-3xl text-white">Make A Wish</h3>

        {/* The Cake */}
        <motion.div className="relative flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          {/* Candles */}
          <div className="flex gap-6 mb-1 relative z-10">
            {candles.map((isOn, i) => (
              <div key={i} className="flex flex-col items-center cursor-pointer" onClick={() => toggleCandle(i)} data-cursor-hover>
                {/* Flame */}
                {isOn ? (
                  <motion.div className="w-3 h-5 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full"
                    animate={{ scaleY: [1, 1.2, 1], y: [0, -2, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(251,146,60,0.8))' }} />
                ) : (
                  <div className="w-3 h-5" />
                )}
                {/* Candle body */}
                <div className="w-2.5 h-12 rounded-t-sm" style={{ background: i % 2 === 0 ? '#F8C8DC' : '#FFD700' }} />
              </div>
            ))}
          </div>

          {/* Cake Body */}
          <div className="w-56 h-20 bg-pink-300/40 rounded-t-2xl border-t border-white/20 relative flex items-center justify-center overflow-hidden"
            style={{ backdropFilter: 'blur(5px)' }}>
            <div className="absolute top-2 w-full h-2 bg-pink-200/40" />
            <span className="font-heading text-white text-lg tracking-widest relative z-10">SARANYA</span>
          </div>
          {/* Cake Stand */}
          <div className="w-64 h-3 bg-white/10 rounded-full" />
        </motion.div>

        <p className="font-ui text-white/30 text-xs tracking-widest uppercase">
          {candlesBlown ? 'All wishes made! ❤️' : 'Click the candles to blow them out ✨'}
        </p>

        <div className="space-y-4 max-w-xl">
          {[
            "Some wishes are whispered to the wind.",
            "Others are kept silently in the heart.",
            "Take a quiet moment...",
            "And make your wish.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 3 ? 'text-accent-primary italic text-xl' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.4, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 3: Celebration / Floating Balloons
function Scene3() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A, #080510)' }}>
      {/* Floating balloons / party system */}
      <div className="fill-absolute overflow-hidden pointer-events-none opacity-40">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={i} className="absolute text-5xl"
            style={{ left: `${5 + i * 7}%`, bottom: '-50px' }}
            animate={{ y: ['100vh', '-10vh'], rotate: [0, (i % 2 === 0 ? 10 : -10), 0] }}
            transition={{ duration: 7 + i * 0.5, repeat: Infinity, ease: 'easeOut', delay: i * 0.4 }}>
            🎈
          </motion.div>
        ))}
      </div>
      <AnimatedBackground showStars starCount={80} showParticles particleCount={30} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <motion.div className="text-8xl" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>🎂</motion.div>
        <FadeReveal delay={0.3}>
          <h2 className="font-heading text-4xl md:text-6xl text-white">Happy Birthday</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "Happy Birthday, Saranya. ❤️",
            "Thank you for bringing so much light into my life.",
            "For every single memory we've shared.",
            "And for the beautiful story we are writing together.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 0 ? 'text-accent-primary italic text-3xl font-heading' : 'text-white/75'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.4, duration: 0.8 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 4: The Golden Birthday Door Opens
function Scene4({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      <AnimatedBackground showStars starCount={100} showParticles={false} showFog />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        {/* Door opening visual */}
        <motion.div className="relative w-36 h-56 mx-auto rounded-t-full border-2 border-accent-gold/40 overflow-hidden flex items-center justify-center"
          style={{ background: 'rgba(255,200,80,0.1)', boxShadow: '0 0 50px rgba(255,200,80,0.2)' }}
          initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}>
          {/* Light beam escaping */}
          <motion.div className="absolute inset-0 bg-gradient-to-t from-accent-gold/50 via-accent-gold/10 to-transparent"
            animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-6xl z-10">🚪</span>
        </motion.div>

        <div className="space-y-5">
          <FadeReveal delay={0.5}>
            <p className="font-heading text-white/40 text-sm tracking-widest uppercase">The Next Chapter</p>
          </FadeReveal>
          <FadeReveal delay={0.9}>
            <h2 className="font-heading text-4xl md:text-5xl text-white">One Final Memory</h2>
          </FadeReveal>
          <motion.p className="font-body text-xl text-white/70 italic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.7 }}>
            And now, walk through the door. A final memory awaits...
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.8 }}>
          <PrimaryButton id="ch14-continue" onClick={onContinue} icon="→">
            Step Through The Door
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 14 Main ────────────────────────────────────────────────────────────
export default function Chapter14() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [candles, setCandles] = useState([true, true, true])
  const maxScenes = 4

  const toggleCandle = (idx) => {
    setCandles(prev => {
      const next = [...prev]
      next[idx] = !next[idx]
      return next
    })
  }

  const candlesBlown = candles.every(c => c === false)

  useEffect(() => {
    if (isPaused) return
    if (scene === 1) return // pause auto-advance on the interactive cake scene
    if (scene >= 3) return
    const durations = [7000, 10000, 10000]
    const t = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(t)
  }, [scene, isPaused])

  // If candles are blown out, automatically advance to Scene 3 after a delay
  useEffect(() => {
    if (candlesBlown && scene === 1) {
      const t = setTimeout(() => setScene(2), 2500)
      return () => clearTimeout(t)
    }
  }, [candlesBlown, scene])

  const handleContinue = useCallback(() => navigate('/chapter/15'), [navigate])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" candles={candles} toggleCandle={toggleCandle} candlesBlown={candlesBlown} />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" onContinue={handleContinue} />,
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <ProgressIndicator
        progress={94}
        chapterNum={14}
        chapterTitle="Happy Birthday"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain />

      {/* Hidden gift package box */}
      <motion.div
        className="fixed bottom-24 left-8 z-50 text-3xl cursor-pointer"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        onClick={() => setShowSecret(true)}
        data-cursor-hover
        whileHover={{ scale: 1.3, filter: 'drop-shadow(0 0 15px rgba(255,200,80,0.8))' }}
      >
        🎁
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={scene} className="w-full"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}>
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      <SecretModal show={showSecret} onClose={() => setShowSecret(false)} />
    </div>
  )
}
