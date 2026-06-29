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
          <motion.div className="relative glass-pink rounded-lg p-10 max-w-md mx-6 text-center"
            initial={{ scale: 0.7, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }} onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4" style={{ animation: 'heartbeat 1s ease infinite' }}>❤️</div>
            <h3 className="font-heading text-2xl text-accent-primary mb-4">Secret Memory</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "Some eyes meet for only a second... but stay in the heart forever. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scene 1: Ordinary Day
function Scene1() {
  return (
    <div className="scene-center" style={{ background: '#0A0A0A' }}>
      <AnimatedBackground showStars starCount={100} showParticles particleCount={30} showFog />
      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <FadeReveal delay={0.3}>
          <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Chapter 03 — Scene 1</p>
        </FadeReveal>
        <FadeReveal delay={0.6}>
          <h2 className="font-heading text-5xl md:text-7xl text-white" style={{ textShadow: '0 0 40px rgba(255,255,255,0.2)' }}>
            Nothing Felt Different
          </h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "It looked like every other day...",
            "Nothing seemed unusual...",
            "Until one small moment changed everything.",
          ].map((line, i) => (
            <motion.p key={i} className="font-body text-white/70 text-xl"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.4, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 2: Time Stops
function Scene2() {
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      {/* Frozen crowd in background */}
      <div className="fill-absolute overflow-hidden opacity-10 pointer-events-none" style={{ filter: 'blur(3px)' }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="absolute text-2xl select-none"
            style={{ left: `${Math.random() * 90}%`, top: `${Math.random() * 80}%` }}>🚶</div>
        ))}
      </div>

      {/* Spotlight glow */}
      <motion.div className="absolute center-absolute w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,229,236,0.2) 0%, transparent 70%)', filter: 'blur(30px)' }}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2 }}>
      </motion.div>

      {/* Leaves floating frozen */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div key={i} className="absolute text-xl pointer-events-none"
          style={{ left: `${20 + i * 10}%`, top: `${30 + (i % 3) * 20}%` }}
          initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.01 }}>
          🍃
        </motion.div>
      ))}

      <FloatingParticles type="mixed" count={20} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-5xl md:text-6xl text-white" style={{ textShadow: '0 0 40px rgba(255,229,236,0.5)' }}>
            Everything Became Quiet
          </h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "For just a moment...",
            "The entire world became silent.",
            "The crowd disappeared.",
            "Only you remained.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-accent-primary font-medium' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.5, duration: 0.8 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 3: First Eye Contact
function Scene3() {
  return (
    <div className="scene-center" style={{ background: '#050505' }}>
      {/* Golden light rays */}
      <div className="fill-absolute pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div key={i} className="absolute top-0 left-1/2 origin-top"
            style={{
              width: '1px',
              height: '60vh',
              background: 'linear-gradient(180deg, rgba(255,215,0,0.3), transparent)',
              transform: `rotate(${-30 + i * 8}deg)`,
              filter: 'blur(3px)',
            }}
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}>
          </motion.div>
        ))}
      </div>

      {/* Bokeh circles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            width: `${Math.random() * 60 + 20}px`, height: `${Math.random() * 60 + 20}px`,
            border: `1px solid rgba(255,215,0,${0.1 + Math.random() * 0.2})`,
            filter: 'blur(8px)',
            animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
          }}>
        </div>
      ))}

      {/* Eye emoji as placeholder for eye contact */}
      <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-8xl"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, type: 'spring', stiffness: 80 }}
        style={{ filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.5))' }}>
        👁️‍🗨️
      </motion.div>

      <FloatingParticles type="stars" count={20} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-6 mt-40">
        <FadeReveal delay={1}>
          <h2 className="font-heading text-4xl md:text-5xl" style={{
            background: 'linear-gradient(135deg, #FFD700, #F8C8DC)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>The Moment</h2>
        </FadeReveal>
        <div className="space-y-3 max-w-xl mx-auto">
          {[
            "That was the first time...",
            "I truly looked at you.",
            "I didn't know your story.",
            "I didn't know your dreams.",
            "But somehow...",
            "My heart remembered that moment.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${[4, 5].includes(i) ? 'text-accent-primary italic' : 'text-white/75'}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.3, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 4: A Smile
function Scene4() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A, #100808)' }}>
      <AnimatedBackground showStars starCount={80} showParticles particleCount={30} showFog />
      {/* Warm sunset overlay */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,150,50,0.1) 0%, transparent 60%)',
      }} />

      {/* Floating flowers */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div key={i} className="absolute text-2xl pointer-events-none"
          style={{ left: `${10 + i * 9}%`, top: `${20 + (i % 4) * 15}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}>
          🌸
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8">
        <motion.div className="text-7xl" style={{ animation: 'heartbeat 2s ease-in-out infinite' }}>🙂</motion.div>
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">The Beginning</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "Maybe it lasted only a few seconds...",
            "But some seconds...",
            "Become memories for a lifetime.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 2 ? 'text-accent-secondary italic' : 'text-white/75'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.5, duration: 0.8 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 5: Heartbeats in Galaxy
function Scene5() {
  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={200} showParticles={false} showFog={false} />

      {/* Pulsing heart */}
      <motion.div className="absolute center-absolute flex items-center justify-center"
        style={{ width: '200px', height: '200px' }}>
        <div className="absolute rounded-full"
          style={{
            width: '100%', height: '100%',
            background: 'radial-gradient(circle, rgba(248,200,220,0.3) 0%, transparent 70%)',
            animation: 'heartbeat 1s ease infinite',
          }} />
        <div className="text-8xl" style={{ animation: 'heartbeat 1s ease infinite', filter: 'drop-shadow(0 0 30px rgba(248,200,220,0.8))' }}>❤️</div>
      </motion.div>

      {/* Expanding rings */}
      {[1, 2, 3].map(ring => (
        <motion.div key={ring} className="absolute center-absolute rounded-full border pointer-events-none"
          style={{ borderColor: 'rgba(248,200,220,0.2)' }}
          initial={{ width: '60px', height: '60px', opacity: 0.8 }}
          animate={{ width: `${ring * 150}px`, height: `${ring * 150}px`, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, delay: ring * 0.6, ease: 'easeOut' }}>
        </motion.div>
      ))}

      <FloatingParticles type="stars" count={30} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-6 mt-60">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl text-white">Something Changed</h2>
        </FadeReveal>
        <div className="space-y-3">
          {[
            "I walked away...",
            "Thinking nothing had happened.",
            "But my heart...",
            "Had already begun writing a new chapter.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 3 ? 'text-accent-primary italic' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.4, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 6: LinkedIn Intro
function Scene6({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: '#050810' }}>
      <AnimatedBackground showStars starCount={80} showParticles particleCount={20} />

      {/* LinkedIn-ish glow */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(79,142,247,0.08) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <motion.div className="text-6xl"
          animate={{ y: [0, -10, 0], boxShadow: [] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 20px rgba(79,142,247,0.6))' }}>
          📱
        </motion.div>

        <div className="space-y-5">
          <FadeReveal delay={0.5}>
            <p className="font-heading text-white/40 text-sm tracking-widest uppercase">A Few Days Later</p>
          </FadeReveal>
          <FadeReveal delay={0.9}>
            <h2 className="font-heading text-4xl md:text-5xl text-white">One Simple Message</h2>
          </FadeReveal>
          <div className="space-y-3">
            {[
              "I didn't know it then...",
              "But one simple message...",
              "Was about to change everything.",
            ].map((line, i) => (
              <motion.p key={i} className={`font-body text-xl ${i === 2 ? 'text-accent-blue italic' : 'text-white/70'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.4, duration: 0.7 }}>
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.8 }}>
          <PrimaryButton id="ch3-continue" onClick={onContinue} icon="→">
            Continue To The Next Memory
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 3 Main ─────────────────────────────────────────────────────────
export default function Chapter3() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 6

  useEffect(() => {
    if (isPaused) return
    if (scene >= 5) return
    const durations = [6000, 10000, 12000, 8000, 9000]
    const timer = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(timer)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => navigate('/chapter/4'), [navigate])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" />,
    <Scene5 key="s5" />,
    <Scene6 key="s6" onContinue={handleContinue} />,
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <ProgressIndicator
        progress={15}
        chapterNum={3}
        chapterTitle="The First Time I Truly Saw You"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain />

      {/* Hidden flower heart */}
      <motion.div
        className="fixed bottom-24 left-8 z-50 text-3xl"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        onClick={() => setShowSecret(true)}
        data-cursor-hover
        whileHover={{ scale: 1.3, filter: 'drop-shadow(0 0 15px rgba(248,200,220,0.9))' }}
        style={{ cursor: 'pointer' }}
      >
        🌸
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
