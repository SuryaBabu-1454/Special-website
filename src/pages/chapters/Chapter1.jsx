import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedBackground from '@components/effects/AnimatedBackground'
import FloatingParticles from '@components/effects/FloatingParticles'
import FilmGrain from '@components/effects/FilmGrain'
import { TextReveal, FadeReveal } from '@components/animations/TextReveal'
import { PrimaryButton } from '@components/buttons/PrimaryButton'
import ProgressIndicator from '@components/common/ProgressIndicator'
import GlassCard from '@components/common/GlassCard'

// Secret Heart Modal
function SecretModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-modal"
          style={{ zIndex: 9000 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            className="relative glass-pink rounded-lg p-10 max-w-md mx-6 text-center"
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-5xl mb-4" style={{ animation: 'heartbeat 1s ease infinite' }}>❤️</div>
            <h3 className="font-heading text-2xl text-accent-primary mb-4">Secret Note</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "Even before I met you... life was unknowingly preparing me for you. ❤️"
            </p>
            <button
              className="mt-6 text-white/40 text-sm font-ui hover:text-white/70 transition-colors"
              onClick={onClose}
            >
              Close ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scene: A Normal Life (laptop + rain)
function Scene1() {
  return (
    <div className="scene-center">
      <AnimatedBackground showStars starCount={80} particleCount={30} />

      {/* Rain effect */}
      <div className="fill-absolute overflow-hidden opacity-20 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10px',
              width: '1px',
              height: `${Math.random() * 40 + 20}px`,
              background: 'rgba(180,200,255,0.5)',
              animation: `rain ${Math.random() * 0.5 + 0.8}s linear ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Desk scene illustration */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 max-w-3xl text-center">
        <motion.div
          className="text-7xl md:text-9xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          💻
        </motion.div>

        <div className="space-y-6">
          <motion.p
            className="font-heading text-white/30 text-sm tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Chapter 01 — Scene 1
          </motion.p>
          <FadeReveal delay={0.8}>
            <h2 className="font-heading text-4xl md:text-6xl text-white" style={{ textShadow: '0 0 30px rgba(255,255,255,0.2)' }}>
              Life Was Simple
            </h2>
          </FadeReveal>
          <FadeReveal delay={1.2}>
            <div className="space-y-3 max-w-xl mx-auto">
              {[
                "There was a time when my world was simple.",
                "Every day looked almost the same.",
                "Books. Code. Dreams.",
                "I believed my biggest challenge was building my career.",
              ].map((line, i) => (
                <motion.p
                  key={i}
                  className="font-body text-white/70 text-lg leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + i * 0.3, duration: 0.7 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </FadeReveal>
        </div>
      </div>

      <style>{`
        @keyframes rain {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// Scene: Preparing for the future
function Scene2() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0d0a18 100%)' }}>
      <AnimatedBackground showStars starCount={60} showParticles={false} />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 px-8 max-w-5xl w-full">
        {/* Coding screen simulation */}
        <motion.div
          className="glass rounded-lg p-6 font-mono text-sm w-full md:w-80 text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ borderColor: 'rgba(79,142,247,0.3)', border: '1px solid rgba(79,142,247,0.2)' }}
        >
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          {[
            { text: 'const life = {', color: 'rgba(79,142,247,0.9)' },
            { text: '  dreams: [...],', color: 'rgba(248,200,220,0.8)' },
            { text: '  hardWork: true,', color: 'rgba(255,215,0,0.8)' },
            { text: '  destiny: unknown,', color: 'rgba(255,255,255,0.5)' },
            { text: '}', color: 'rgba(79,142,247,0.9)' },
          ].map((line, i) => (
            <motion.div
              key={i}
              className="text-xs mb-1"
              style={{ color: line.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.2 }}
            >
              {line.text}
              {i === 4 && <span className="typing-cursor" />}
            </motion.div>
          ))}
        </motion.div>

        {/* Text */}
        <div className="text-center md:text-left space-y-6 flex-1">
          <FadeReveal delay={0.5}>
            <h2 className="font-heading text-4xl md:text-5xl text-white">Dreams</h2>
          </FadeReveal>
          <div className="space-y-4">
            {[
              "Every interview felt like another chance.",
              "Every rejection taught me something.",
              "I kept moving forward.",
              "Without knowing life had another plan waiting for me.",
            ].map((line, i) => (
              <FadeReveal key={i} delay={0.8 + i * 0.25} direction="left">
                <p className="font-body text-white/70 text-lg leading-relaxed">{line}</p>
              </FadeReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Scene: The Unknown Journey
function Scene3() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0A0E14 100%)' }}>
      <AnimatedBackground showStars starCount={100} showParticles particleCount={40} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <motion.div
          className="text-6xl mb-6"
          animate={{ x: [0, 20, 0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🚶
        </motion.div>

        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Destiny</h2>
        </FadeReveal>

        <div className="space-y-5 max-w-xl mx-auto">
          {[
            { text: "Sometimes...", delay: 0.8, className: "font-heading text-2xl text-white/80 italic" },
            { text: "Life quietly changes direction.", delay: 1.2, className: "font-body text-lg text-white/70" },
            { text: "Not with loud moments.", delay: 1.6, className: "font-body text-lg text-white/60" },
            { text: "But with people we haven't met yet.", delay: 2.0, className: "font-heading text-xl text-accent-primary italic" },
          ].map((item, i) => (
            <motion.p
              key={i}
              className={item.className}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 0.7 }}
            >
              {item.text}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene: The Institute
function Scene4({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0d0a14 0%, #0A0A0A 100%)' }}>
      {/* Golden sunrise gradient */}
      <div
        className="fill-absolute pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,200,100,0.12) 0%, transparent 70%)',
        }}
      />
      <AnimatedBackground showStars={false} showParticles particleCount={50} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-10">
        {/* Institute visual */}
        <motion.div
          className="flex justify-center gap-4 text-5xl mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          🏛️
        </motion.div>

        <FadeReveal delay={0.3}>
          <h2 className="font-heading text-4xl md:text-6xl text-white">The Beginning</h2>
        </FadeReveal>

        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "I walked into this place...",
            "Thinking it was just another day.",
            "I had no idea...",
            "My entire life was about to change.",
          ].map((line, i) => (
            <motion.p
              key={i}
              className="font-body text-white/75 text-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.4, duration: 0.8 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          <PrimaryButton id="ch1-continue" onClick={onContinue} icon="→">
            Continue To The Next Memory
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 1 Main ────────────────────────────────────────────────────────────
export default function Chapter1() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 4

  // Auto-advance scenes 0–2
  useEffect(() => {
    if (isPaused) return
    if (scene >= 3) return
    const durations = [6000, 8000, 7000]
    const timer = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(timer)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => {
    navigate('/chapter/2')
  }, [navigate])

  return (
    <div className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <ProgressIndicator
        progress={5}
        chapterNum={1}
        chapterTitle="Before I Met You"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain />

      {/* Hidden heart on coffee mug (floating) */}
      <motion.div
        className="fixed bottom-24 left-8 z-50 text-3xl cursor-pointer"
        style={{ filter: 'drop-shadow(0 0 10px rgba(248,200,220,0.4))' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        onClick={() => setShowSecret(true)}
        title="Click me ☕"
        data-cursor-hover
        whileHover={{ scale: 1.3 }}
      >
        ☕
      </motion.div>

      <AnimatePresence mode="wait">
        {scene === 0 && <motion.div key="s0" className="w-full" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}><Scene1 /></motion.div>}
        {scene === 1 && <motion.div key="s1" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}><Scene2 /></motion.div>}
        {scene === 2 && <motion.div key="s2" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}><Scene3 /></motion.div>}
        {scene >= 3 && <motion.div key="s3" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}><Scene4 onContinue={handleContinue} /></motion.div>}
      </AnimatePresence>

      <SecretModal show={showSecret} onClose={() => setShowSecret(false)} />
    </div>
  )
}
