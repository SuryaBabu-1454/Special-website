import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedBackground from '@components/effects/AnimatedBackground'
import FloatingParticles from '@components/effects/FloatingParticles'
import FilmGrain from '@components/effects/FilmGrain'
import { FadeReveal } from '@components/animations/TextReveal'
import { PrimaryButton } from '@components/buttons/PrimaryButton'
import ProgressIndicator from '@components/common/ProgressIndicator'
import { ChatInterface } from '@components/chat/ChatInterface'

// The special messages from Saranya
const SPECIAL_MESSAGES = [
  { sender: 'Saranya', text: 'I liked the way you cared for me today.' },
  { sender: 'Saranya', text: 'It made me feel safe.' },
]

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
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="font-heading text-2xl text-accent-gold mb-4">Hidden Promise</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "Thank you for reminding me that kindness is remembered long after the moment has passed. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scene 1: Quiet Evening
function Scene1() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A, #0d0a05)' }}>
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 60% 100%, rgba(255,180,80,0.10) 0%, transparent 60%)',
      }} />
      <AnimatedBackground showStars starCount={80} showParticles particleCount={25} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <FadeReveal delay={0.3}>
          <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Chapter 08 — Scene 1</p>
        </FadeReveal>
        <div className="flex justify-center gap-4 text-5xl mb-2">
          <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>🌆</motion.span>
          <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>☕</motion.span>
        </div>
        <FadeReveal delay={0.7}>
          <h2 className="font-heading text-5xl md:text-6xl text-white">The Day Continued</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "The day had ended...",
            "But the memories hadn't.",
            "I found myself smiling...",
            "Thinking about everything that had happened.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-accent-primary italic' : 'text-white/75'}`}
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

// Scene 2: One Message — the special words
function Scene2() {
  const [shownMessages, setShownMessages] = useState([])
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    if (msgIdx >= SPECIAL_MESSAGES.length) return
    const t = setTimeout(() => {
      setShownMessages(prev => [...prev, SPECIAL_MESSAGES[msgIdx]])
      setMsgIdx(prev => prev + 1)
    }, 2000 + msgIdx * 2500)
    return () => clearTimeout(t)
  }, [msgIdx])

  return (
    <div className="scene-center" style={{ background: '#060A10' }}>
      <AnimatedBackground showStars starCount={80} showParticles={false} />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 px-6 max-w-5xl w-full">
        <div className="flex-1 text-center md:text-left space-y-6">
          <FadeReveal delay={0.3}>
            <h2 className="font-heading text-4xl md:text-5xl text-white">A Few Words</h2>
          </FadeReveal>
          <div className="space-y-4">
            {[
              "Then I read your message.",
              "It wasn't long.",
              "It wasn't dramatic.",
              "But it meant more to me than you probably realized.",
            ].map((line, i) => (
              <motion.p key={i} className={`font-body text-lg ${i === 3 ? 'text-accent-primary italic' : 'text-white/70'}`}
                initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.35, duration: 0.6 }}>
                {line}
              </motion.p>
            ))}
          </div>
        </div>
        <div className="w-full md:w-auto">
          <ChatInterface messages={shownMessages} isVisible />
        </div>
      </div>
    </div>
  )
}

// Scene 3: Words become golden particles
function Scene3() {
  const wordFragments = ["I", "liked", "the", "way", "you", "cared", "for", "me", "today", "It", "made", "me", "feel", "safe"]

  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={160} showParticles={false} />

      {/* Words dissolving to gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {wordFragments.map((word, i) => (
          <motion.div key={i} className="absolute font-body text-sm font-medium"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              color: `rgba(255, ${180 + Math.floor(Math.random() * 75)}, ${80 + Math.floor(Math.random() * 60)}, 0.7)`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0], y: [0, -40], filter: ['blur(0px)', 'blur(0px)', 'blur(4px)'] }}
            transition={{ delay: 0.5 + i * 0.2, duration: 2.5, repeat: Infinity, repeatDelay: i * 0.3 }}>
            {word}
          </motion.div>
        ))}
      </div>

      {/* Central heart pulse */}
      <motion.div className="absolute center-absolute flex items-center justify-center"
        style={{ width: '150px', height: '150px' }}>
        <motion.div className="absolute rounded-full"
          style={{ inset: 0, background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}>
        </motion.div>
        <div className="text-7xl" style={{ animation: 'heartbeat 1.2s ease infinite', filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.8))' }}>💛</div>
      </motion.div>

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-6 mt-52">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">A Memory I'll Always Carry</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "Those words stayed with me.",
            "Not because they praised me...",
            "But because they reminded me that small acts of care can matter deeply.",
            "If I could make your day feel a little lighter...",
            "That alone felt special to me.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${[2, 4].includes(i) ? 'text-accent-gold italic' : 'text-white/75'}`}
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

// Scene 4: The Little Things (memory gallery)
function Scene4() {
  const memories = [
    { emoji: '🚶', label: 'Walking together', delay: 0.3 },
    { emoji: '🛍️', label: 'Holding bags', delay: 0.6 },
    { emoji: '🚪', label: 'Opening doors', delay: 0.9 },
    { emoji: '⏳', label: 'Waiting together', delay: 1.2 },
    { emoji: '💡', label: 'Street lights', delay: 1.5 },
    { emoji: '☕', label: 'Simple coffee', delay: 1.8 },
  ]

  return (
    <div className="scene-center" style={{ background: '#080808' }}>
      <AnimatedBackground showStars starCount={80} showParticles particleCount={20} showFog />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-4xl w-full">
        <FadeReveal delay={0.3}>
          <h2 className="font-heading text-4xl md:text-5xl text-white text-center">Care Isn't Loud</h2>
        </FadeReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
          {memories.map((m, i) => (
            <motion.div key={i} className="glass-pink rounded-xl p-4 text-center"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: m.delay, duration: 0.6, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -4 }} data-cursor-hover>
              <div className="text-3xl mb-2">{m.emoji}</div>
              <p className="font-body text-white/60 text-xs">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3 text-center max-w-xl">
          {[
            "None of those moments felt extraordinary.",
            "They were simply little choices...",
            "To be kind. To be present. To care.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 2 ? 'text-accent-primary italic' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2.5 + i * 0.3, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 5: A Promise To Myself — night sky + stars
function Scene5({ onStarClick }) {
  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={200} showParticles={false} />

      {/* Moon */}
      <motion.div className="absolute top-10 right-16 text-6xl"
        animate={{ y: [0, -8, 0], filter: ['drop-shadow(0 0 15px rgba(255,230,120,0.4))', 'drop-shadow(0 0 35px rgba(255,230,120,0.8))', 'drop-shadow(0 0 15px rgba(255,230,120,0.4))'] }}
        transition={{ duration: 5, repeat: Infinity }}>
        🌙
      </motion.div>

      {/* Clickable star */}
      <motion.div className="absolute top-1/4 left-1/3 text-3xl cursor-pointer"
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
        onClick={onStarClick} data-cursor-hover whileHover={{ scale: 1.6, filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.9))' }}>
        ⭐
      </motion.div>

      {/* Constellation lines */}
      <svg className="fill-absolute pointer-events-none opacity-20">
        <motion.polyline points="30%,25% 40%,45% 60%,35% 70%,55% 55%,65%"
          fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="0.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}>
        </motion.polyline>
      </svg>

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8 mt-40">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Always</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "That evening, I made a quiet promise to myself.",
            "Whenever life allows me to...",
            "I'll keep choosing kindness.",
            "I'll keep trying to be someone you can rely on.",
            "Because your smile became important to me.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${[0, 4].includes(i) ? 'text-accent-primary italic' : 'text-white/75'}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.4, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 6: Café Introduction transition
function Scene6({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #000005, #080808)' }}>
      <AnimatedBackground showStars starCount={80} showParticles particleCount={20} showFog />
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(255,180,80,0.08) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <div className="flex justify-center gap-3 text-5xl">
          <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>🥤</motion.span>
          <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>✨</motion.span>
          <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>🥤</motion.span>
        </div>
        <div className="space-y-5">
          <FadeReveal delay={0.4}><p className="font-heading text-white/40 text-sm tracking-widest uppercase">Another Beautiful Day</p></FadeReveal>
          <FadeReveal delay={0.8}><h2 className="font-heading text-4xl md:text-5xl text-white">Another Simple Outing</h2></FadeReveal>
          <div className="space-y-3">
            {[
              "And then...",
              "Another simple outing...",
              "Created another memory...",
              "One that still makes me smile.",
            ].map((line, i) => (
              <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-accent-primary italic' : 'text-white/70'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.4, duration: 0.7 }}>
                {line}
              </motion.p>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.8 }}>
          <PrimaryButton id="ch8-continue" onClick={onContinue} icon="→">
            Continue To The Next Memory
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 8 Main ────────────────────────────────────────────────────────────
export default function Chapter8() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 6

  useEffect(() => {
    if (isPaused) return
    if (scene >= 5) return
    const durations = [8000, 12000, 12000, 12000, 12000]
    const t = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(t)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => navigate('/chapter/9'), [navigate])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" />,
    <Scene5 key="s5" onStarClick={() => setShowSecret(true)} />,
    <Scene6 key="s6" onContinue={handleContinue} />,
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <ProgressIndicator
        progress={52}
        chapterNum={8}
        chapterTitle="The Words That Stayed With Me"
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
