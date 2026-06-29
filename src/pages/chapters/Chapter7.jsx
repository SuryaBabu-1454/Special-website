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
            <div className="text-5xl mb-4">🕯️</div>
            <h3 className="font-heading text-2xl text-accent-gold mb-4">Secret Prayer</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "Among all the prayers whispered that day... the one I never said aloud was how thankful I was to have met you. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Scene 1: The Journey Begins ────────────────────────────────────────────────
function Scene1() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0d0d08 100%)' }}>
      {/* Golden morning glow */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,200,80,0.15) 0%, transparent 60%)',
      }} />
      <AnimatedBackground showStars starCount={60} showParticles particleCount={30} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <FadeReveal delay={0.3}>
          <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Chapter 07 — Scene 1</p>
        </FadeReveal>
        <motion.div className="flex justify-center gap-3 text-5xl mb-2"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span style={{ filter: 'drop-shadow(0 0 20px rgba(255,200,80,0.8))' }}>🌅</span>
          <span style={{ filter: 'drop-shadow(0 0 15px rgba(255,200,80,0.6))' }}>🛵</span>
        </motion.div>
        <FadeReveal delay={0.7}>
          <h2 className="font-heading text-5xl md:text-7xl text-white" style={{ textShadow: '0 0 40px rgba(255,200,80,0.4)' }}>
            Today Was Different
          </h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "Some mornings feel different...",
            "You wake up with excitement...",
            "A little nervous...",
            "And a heart that's smiling before the day even begins.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-accent-gold italic' : 'text-white/75'}`}
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

// ── Scene 2: The Church ────────────────────────────────────────────────────────
function Scene2({ onCandleClick }) {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #050400, #0d0a05)' }}>
      {/* God rays */}
      <div className="fill-absolute pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div key={i} className="absolute top-0 left-1/2 origin-top"
            style={{
              width: '2px', height: '70vh',
              background: 'linear-gradient(180deg, rgba(255,230,120,0.25), transparent)',
              transform: `rotate(${-40 + i * 8}deg)`, filter: 'blur(4px)',
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}>
          </motion.div>
        ))}
      </div>

      {/* Floating dust in church light */}
      <FloatingParticles type="dust" count={30} colors={['rgba(255,230,120,0.6)', 'rgba(255,215,0,0.4)']} />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 px-8 max-w-5xl w-full">
        {/* Church visual */}
        <motion.div className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <div className="text-8xl" style={{ filter: 'drop-shadow(0 0 30px rgba(255,230,120,0.7))' }}>⛪</div>
          {/* Candles row — clickable */}
          <div className="flex gap-4 mt-4">
            {['🕯️', '🕯️', '🕯️'].map((c, i) => (
              <motion.div key={i}
                className="text-3xl cursor-pointer"
                animate={{ filter: ['drop-shadow(0 0 8px rgba(255,200,80,0.5))', 'drop-shadow(0 0 20px rgba(255,200,80,0.9))', 'drop-shadow(0 0 8px rgba(255,200,80,0.5))'] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                onClick={i === 1 ? onCandleClick : undefined}
                data-cursor-hover
                whileHover={{ scale: 1.3 }}>
                {c}
              </motion.div>
            ))}
          </div>
          <p className="font-ui text-white/20 text-xs tracking-widest mt-1">Click the middle candle ✨</p>
        </motion.div>

        {/* Text */}
        <div className="text-center md:text-left space-y-6 flex-1">
          <FadeReveal delay={0.5}>
            <h2 className="font-heading text-4xl md:text-5xl text-white" style={{ textShadow: '0 0 30px rgba(255,230,120,0.4)' }}>Peace</h2>
          </FadeReveal>
          <div className="space-y-4">
            {[
              "The church wasn't just beautiful...",
              "It felt peaceful.",
              "Standing beside you...",
              "Everything became calm.",
              "That moment still lives in my heart.",
            ].map((line, i) => (
              <FadeReveal key={i} delay={0.7 + i * 0.3} direction="left">
                <p className={`font-body text-lg ${i === 4 ? 'text-accent-gold italic' : 'text-white/75'}`}>{line}</p>
              </FadeReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Scene 3: The Scooty Ride ───────────────────────────────────────────────────
function Scene3() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0d0a05, #080A0A)' }}>
      {/* Moving road effect */}
      <div className="fill-absolute overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i} className="absolute"
            style={{
              left: `${48 + (i % 2 === 0 ? 2 : -2)}%`, top: `${-5 + i * 6}%`,
              width: '4px', height: '30px',
              background: 'rgba(255,255,255,0.15)', borderRadius: '2px',
            }}
            animate={{ y: ['0vh', '110vh'] }}
            transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.1, ease: 'linear' }}>
          </motion.div>
        ))}
      </div>
      {/* Wind lens flare */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,200,80,0.2) 0%, transparent 70%)', filter: 'blur(10px)' }} />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-3xl">
        <motion.div className="flex items-center gap-4 text-7xl"
          animate={{ x: [0, 5, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <span style={{ filter: 'drop-shadow(0 0 20px rgba(255,200,80,0.6))' }}>🛵</span>
        </motion.div>
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Freedom</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl">
          {[
            "It wasn't about where we were going...",
            "It was about sharing the journey.",
            "Some roads become beautiful...",
            "Simply because you're travelling together.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-accent-gold italic' : 'text-white/75'}`}
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

// ── Scene 4: Lunch Together ────────────────────────────────────────────────────
function Scene4() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #080808, #0d0a05)' }}>
      {/* Warm restaurant glow */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,180,80,0.08) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 px-8 max-w-5xl w-full">
        {/* Food visual */}
        <motion.div className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <div className="text-center space-y-3">
            {[
              { emoji: '🫓', label: 'Podi Dosa' },
              { emoji: '🥘', label: 'Masala Dosa' },
              { emoji: '☕', label: 'Coffee' },
            ].map((item, i) => (
              <motion.div key={i} className="flex items-center gap-3 glass rounded-lg px-5 py-3"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05, x: 4 }} data-cursor-hover>
                <span className="text-3xl">{item.emoji}</span>
                <span className="font-body text-white/70">{item.label}</span>
                {/* Steam */}
                <motion.span className="text-white/20 text-xs"
                  animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                  〰
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Narration */}
        <div className="text-center md:text-left space-y-6 flex-1">
          <FadeReveal delay={0.5}>
            <h2 className="font-heading text-4xl md:text-5xl text-white">Simple Happiness</h2>
          </FadeReveal>
          <div className="space-y-4">
            {[
              "Some people remember expensive gifts...",
              "I remember a dosa.",
              "Sharing food...",
              "Laughing together...",
              "Those little moments became priceless memories.",
            ].map((line, i) => (
              <FadeReveal key={i} delay={0.7 + i * 0.25} direction="left">
                <p className={`font-body text-lg ${[1, 4].includes(i) ? 'text-accent-primary italic' : 'text-white/75'}`}>{line}</p>
              </FadeReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Scene 5: Walking Together ──────────────────────────────────────────────────
function Scene5() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A, #0d0a05)' }}>
      {/* Sunset glow */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 50% at 70% 100%, rgba(255,150,50,0.12) 0%, transparent 60%)',
      }} />
      {/* Floating leaves */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div key={i} className="absolute text-xl pointer-events-none"
          style={{ left: `${10 + i * 8}%`, top: `${20 + (i % 4) * 15}%` }}
          animate={{ y: [0, 60, 120], x: [0, (i % 2 === 0 ? 20 : -20), 0], rotate: [0, 180, 360], opacity: [0.6, 0.8, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: 'easeIn' }}>
          🍃
        </motion.div>
      ))}
      <AnimatedBackground showStars={false} showParticles particleCount={20} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <motion.div className="flex justify-center text-6xl gap-3"
          animate={{ x: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
          <span>👫</span>
          <span style={{ filter: 'drop-shadow(0 0 15px rgba(255,150,50,0.7))' }}>🌇</span>
        </motion.div>
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Beside You</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "Walking beside you...",
            "I wasn't thinking about tomorrow.",
            "I wasn't thinking about anything else.",
            "I was simply grateful...",
            "To be sharing that moment with you.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${[3, 4].includes(i) ? 'text-accent-primary italic' : 'text-white/75'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.4, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Scene 6: A Beautiful Memory — floating Polaroids ──────────────────────────
function Scene6() {
  const photos = [
    { emoji: '⛪', label: 'Church', rotate: -8, x: 15, y: 25 },
    { emoji: '🛵', label: 'The Ride', rotate: 6, x: 55, y: 15 },
    { emoji: '🥘', label: 'Dosa Time', rotate: -4, x: 35, y: 55 },
    { emoji: '🌇', label: 'The Walk', rotate: 10, x: 70, y: 50 },
    { emoji: '❤️', label: 'Together', rotate: -7, x: 20, y: 60 },
  ]

  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={180} showParticles={false} />
      <FloatingParticles type="hearts" count={15} />

      {/* Floating polaroid memories */}
      {photos.map((p, i) => (
        <motion.div key={i} className="absolute polaroid w-28 text-center"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `rotate(${p.rotate}deg)` }}
          initial={{ opacity: 0, scale: 0, y: 30 }}
          animate={{ opacity: 0.9, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 0.3 + i * 0.4, duration: 0.7 },
            scale: { delay: 0.3 + i * 0.4, duration: 0.7, type: 'spring' },
            y: { delay: i * 0.4, duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          whileHover={{ scale: 1.2, rotate: 0, zIndex: 20 }} data-cursor-hover>
          <div className="bg-white h-20 flex items-center justify-center text-4xl rounded-sm mb-1">{p.emoji}</div>
          <p className="font-handwriting text-gray-700 text-xs">{p.label}</p>
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-6 mt-64">
        <FadeReveal delay={1.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">The Memory</h2>
        </FadeReveal>
        <div className="space-y-3">
          {[
            "That day eventually came to an end.",
            "But the memories never did.",
            "Even today...",
            "Whenever I think about happiness...",
            "My heart quietly returns to that day.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 4 ? 'text-accent-primary italic' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2 + i * 0.4, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Scene 7: Something You Said ────────────────────────────────────────────────
function Scene7({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      <AnimatedBackground showStars starCount={120} showParticles={false} showFog />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <motion.div className="text-6xl" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
          💬
        </motion.div>
        <div className="space-y-5">
          <FadeReveal delay={0.4}>
            <p className="font-heading text-white/40 text-sm tracking-widest uppercase">A Few Days Later</p>
          </FadeReveal>
          <FadeReveal delay={0.8}>
            <h2 className="font-heading text-4xl md:text-5xl text-white">Something You Said</h2>
          </FadeReveal>
          <div className="space-y-3">
            {[
              "A few days later...",
              "You said something...",
              "That I will never forget.",
            ].map((line, i) => (
              <motion.p key={i} className={`font-body text-xl ${i === 2 ? 'text-accent-primary italic' : 'text-white/70'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.5, duration: 0.7 }}>
                {line}
              </motion.p>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 0.8 }}>
          <PrimaryButton id="ch7-continue" onClick={onContinue} icon="→">
            Continue To The Next Memory
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 7 Main ────────────────────────────────────────────────────────────
export default function Chapter7() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 7

  useEffect(() => {
    if (isPaused) return
    if (scene >= 6) return
    const durations = [8000, 14000, 12000, 14000, 12000, 12000]
    const timer = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(timer)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => navigate('/chapter/8'), [navigate])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" onCandleClick={() => setShowSecret(true)} />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" />,
    <Scene5 key="s5" />,
    <Scene6 key="s6" />,
    <Scene7 key="s7" onContinue={handleContinue} />,
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <ProgressIndicator
        progress={45}
        chapterNum={7}
        chapterTitle="The Day We Finally Met"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain />

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
