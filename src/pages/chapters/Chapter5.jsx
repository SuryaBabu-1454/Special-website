import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedBackground from '@components/effects/AnimatedBackground'
import FloatingParticles from '@components/effects/FloatingParticles'
import FilmGrain from '@components/effects/FilmGrain'
import { FadeReveal } from '@components/animations/TextReveal'
import { PrimaryButton } from '@components/buttons/PrimaryButton'
import ProgressIndicator from '@components/common/ProgressIndicator'
import GlassCard from '@components/common/GlassCard'

function SecretModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9000 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div className="relative glass-pink rounded-lg p-10 max-w-md mx-6 text-center"
            initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }} onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4" style={{ animation: 'heartbeat 1s ease infinite' }}>❤️</div>
            <h3 className="font-heading text-2xl text-accent-primary mb-4">Secret Letter</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "The best part of every morning wasn't waking up... it was knowing I'd hear from you. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scene 1: Good Morning
function Scene1() {
  const messages = ['Good Morning ❤️👑', 'Have a wonderful day.', 'Take care.']

  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A, #0d0814)' }}>
      {/* Sunrise glow */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,200,100,0.12) 0%, transparent 60%)',
      }} />
      <AnimatedBackground showStars starCount={80} showParticles particleCount={30} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-10">
        <FadeReveal delay={0.3}>
          <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Chapter 05 — Scene 1</p>
        </FadeReveal>

        <div className="text-6xl mb-4">🌅</div>

        {/* Good morning message cards */}
        <div className="flex flex-col items-center gap-3">
          {messages.map((msg, i) => (
            <motion.div key={i}
              className="glass-pink rounded-2xl px-6 py-3"
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.7, duration: 0.6, type: 'spring', stiffness: 100 }}>
              <p className="font-handwriting text-xl text-accent-primary">{msg}</p>
            </motion.div>
          ))}
        </div>

        <FadeReveal delay={1.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Morning</h2>
        </FadeReveal>
        <div className="space-y-3 max-w-xl mx-auto">
          {[
            "Slowly...",
            "Every morning started with one notification.",
            "Before coffee... Before work...",
            "Before everything else...",
            "There was you.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 4 ? 'text-accent-primary italic text-xl' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2 + i * 0.3, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 2: Everyday Messages
function Scene2() {
  const bubbles = [
    { text: '😂', bg: 'rgba(248,200,220,0.15)', side: 'right', delay: 0 },
    { text: 'Did you eat?', bg: 'rgba(255,255,255,0.08)', side: 'left', delay: 0.3 },
    { text: '❤️', bg: 'rgba(248,200,220,0.15)', side: 'right', delay: 0.6 },
    { text: 'Look at this 😂', bg: 'rgba(255,255,255,0.08)', side: 'left', delay: 0.9 },
    { text: 'Good night! 🌙', bg: 'rgba(248,200,220,0.15)', side: 'right', delay: 1.2 },
    { text: '🎵', bg: 'rgba(255,255,255,0.08)', side: 'left', delay: 1.5 },
    { text: '✨💫', bg: 'rgba(248,200,220,0.15)', side: 'right', delay: 1.8 },
    { text: 'Miss talking to you', bg: 'rgba(255,255,255,0.08)', side: 'left', delay: 2.1 },
  ]

  return (
    <div className="scene-center" style={{ background: '#0A0A0A' }}>
      <AnimatedBackground showStars starCount={100} showParticles particleCount={20} showFog />

      {/* Floating bubbles */}
      <div className="fill-absolute overflow-hidden pointer-events-none">
        {bubbles.map((b, i) => (
          <motion.div key={i}
            className="absolute rounded-xl px-3 py-2 text-sm font-body text-white/80"
            style={{
              background: b.bg,
              border: '1px solid rgba(255,255,255,0.08)',
              [b.side === 'right' ? 'right' : 'left']: `${15 + Math.random() * 20}%`,
              top: `${8 + i * 11}%`,
              backdropFilter: 'blur(10px)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: [0, 0.8, 0], y: [30, -50, -130] }}
            transition={{ duration: 6, delay: b.delay, repeat: Infinity, ease: 'easeOut' }}>
            {b.text}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Simple Conversations</h2>
        </FadeReveal>
        <div className="space-y-3">
          {[
            "Nothing extraordinary...",
            "Just random conversations.",
            "Tiny jokes... Photos... Updates...",
            "But somehow...",
            "Those ordinary moments became unforgettable.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 4 ? 'text-accent-primary italic' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.3, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 3: Memory Gallery (Polaroid style)
function Scene3() {
  const memories = [
    { emoji: '🍜', label: 'Food pics', rotate: -8 },
    { emoji: '🤳', label: 'Selfies', rotate: 5 },
    { emoji: '👗', label: 'Dress opinions', rotate: -4 },
    { emoji: '🌅', label: 'Sunsets', rotate: 7 },
    { emoji: '📸', label: 'Random moments', rotate: -6 },
    { emoji: '🎵', label: 'Voice notes', rotate: 3 },
  ]

  return (
    <div className="scene-center" style={{ background: '#0A0A0A' }}>
      <AnimatedBackground showStars starCount={80} showParticles particleCount={20} showFog />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-5xl w-full">
        <FadeReveal delay={0.3}>
          <h2 className="font-heading text-4xl md:text-5xl text-white text-center">The Small Things</h2>
        </FadeReveal>

        {/* Polaroid grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
          {memories.map((m, i) => (
            <motion.div key={i}
              className="polaroid text-center"
              style={{ transform: `rotate(${m.rotate}deg)` }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.6, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}>
              <div className="bg-gray-100 h-24 flex items-center justify-center text-4xl rounded-sm mb-2">
                {m.emoji}
              </div>
              <p className="font-handwriting text-gray-700 text-sm">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3 text-center max-w-xl">
          {[
            "You shared your day with me.",
            "I shared mine with you.",
            "Every message said...",
            "\"I'm thinking about you.\"",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 3 ? 'text-accent-primary italic text-xl' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + i * 0.3, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 4: Laughing Together
function Scene4() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A, #100A10)' }}>
      <AnimatedBackground showStars starCount={80} showParticles particleCount={30} showFog />
      <FloatingParticles type="hearts" count={20} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8">
        <div className="flex justify-center gap-4 text-5xl">
          {['😂', '🥹', '😊', '🤭', '😄'].map((emoji, i) => (
            <motion.span key={i}
              animate={{ y: [0, -15, 0], rotate: [(i % 2 === 0 ? -5 : 5), (i % 2 === 0 ? 5 : -5), (i % 2 === 0 ? -5 : 5)] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}>
              {emoji}
            </motion.span>
          ))}
        </div>

        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Happiness</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "Some conversations made us laugh.",
            "Some made us blush.",
            "Some lasted only a few minutes.",
            "But every single one...",
            "Made my day brighter.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 4 ? 'text-accent-primary italic' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.3, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 5: Galaxy Timeline
function Scene5() {
  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={200} showParticles={false} showFog={false} />

      {/* Time passage visualization */}
      <div className="relative z-10 text-center max-w-3xl px-6 space-y-10">
        <div className="flex justify-center items-center gap-4 mb-4">
          {['January', 'March', 'May', 'July', 'September', 'December'].map((month, i) => (
            <motion.div key={i} className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}>
              <div className="w-px h-8" style={{ background: 'linear-gradient(180deg, rgba(255,215,0,0.5), rgba(248,200,220,0.3))' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: i % 2 === 0 ? '#FFD700' : '#F8C8DC' }} />
              <p className="text-white/20 text-xs font-ui hidden md:block">{month.slice(0, 3)}</p>
            </motion.div>
          ))}
        </div>

        <FadeReveal delay={1.2}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Without Realizing</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "Days became weeks.",
            "Weeks became months.",
            "And somewhere between all those conversations...",
            "You quietly became...",
            "The person I looked forward to the most.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${[3, 4].includes(i) ? 'text-accent-primary italic' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + i * 0.4, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 6: You Became Home
function Scene6() {
  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={180} showParticles={false} />
      <FloatingParticles type="mixed" count={20} />

      {/* Moon */}
      <motion.div className="absolute top-12 right-12 text-5xl"
        animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }}>
        🌙
      </motion.div>

      {/* Heart constellation */}
      <motion.div className="absolute center-absolute text-8xl pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 50px rgba(248,200,220,0.7))' }}
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity }}>
        ❤️
      </motion.div>

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-6 mt-52">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl" style={{
            background: 'linear-gradient(135deg, #F8C8DC, #FFD700)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Home</h2>
        </FadeReveal>
        <div className="space-y-3">
          {[
            "People often say...",
            "\"Home is a place.\"",
            "But somewhere along the way...",
            "Home stopped being a place.",
            "Home became...",
            "You.",
          ].map((line, i) => (
            <motion.p key={i}
              className={`font-body text-lg ${i === 5 ? 'text-accent-primary italic text-3xl font-heading' : i === 1 ? 'text-white/50 italic' : 'text-white/75'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.5, duration: 0.8 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 7: Phone Call Transition
function Scene7({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      <AnimatedBackground showStars starCount={60} showParticles={false} showFog />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <motion.div className="text-8xl"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}>
          📞
        </motion.div>
        <div className="space-y-5">
          <FadeReveal delay={0.5}>
            <p className="font-heading text-white/40 text-sm tracking-widest uppercase">One Unexpected Call</p>
          </FadeReveal>
          <FadeReveal delay={0.9}>
            <h2 className="font-heading text-4xl md:text-5xl text-white">Then one day...</h2>
          </FadeReveal>
          <motion.p className="font-body text-xl text-white/70 italic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.7 }}>
            Everything changed with a single phone call...
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.8 }}>
          <PrimaryButton id="ch5-continue" onClick={onContinue} icon="→">
            Continue To The Next Memory
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 5 Main ─────────────────────────────────────────────────────────
export default function Chapter5() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 7

  useEffect(() => {
    if (isPaused) return
    if (scene >= 6) return
    const durations = [12000, 10000, 14000, 10000, 12000, 12000]
    const timer = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(timer)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => navigate('/chapter/6'), [navigate])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" />,
    <Scene5 key="s5" />,
    <Scene6 key="s6" />,
    <Scene7 key="s7" onContinue={handleContinue} />,
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <ProgressIndicator
        progress={28}
        chapterNum={5}
        chapterTitle="Our Everyday"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain />

      {/* Good morning hidden heart */}
      <motion.div
        className="fixed bottom-24 left-8 z-50 text-3xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        onClick={() => setShowSecret(true)}
        data-cursor-hover
        whileHover={{ scale: 1.3, filter: 'drop-shadow(0 0 15px rgba(248,200,220,0.9))' }}
      >
        ☀️
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
