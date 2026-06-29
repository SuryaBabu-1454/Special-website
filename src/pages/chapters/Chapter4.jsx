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

// All messages in order
const ALL_MESSAGES = [
  { sender: 'Surya', text: 'Hi...' },
  { sender: 'Saranya', text: 'Hmm...' },
  { sender: 'Saranya', text: 'Institute la pesuningale...' },
]

function SecretModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9000 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div className="relative glass-blue rounded-lg p-10 max-w-md mx-6 text-center"
            initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }} onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4">💙</div>
            <h3 className="font-heading text-2xl text-accent-blue mb-4">Hidden Message</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "One 'Hi' was enough to begin a lifetime of memories. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scene 1: Notification
function Scene1() {
  return (
    <div className="scene-center" style={{ background: '#080B14' }}>
      <AnimatedBackground showStars starCount={100} showParticles particleCount={30} showFog
        gradientColor1="#080B14" gradientColor2="rgba(15,20,50,1)" gradientColor3="rgba(10,15,35,1)" />

      {/* Blue particle field */}
      <div className="fill-absolute overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`, height: `${Math.random() * 4 + 1}px`,
              background: `rgba(79,142,247,${Math.random() * 0.5 + 0.1})`,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 4}s infinite`,
            }} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 px-6 max-w-3xl text-center">
        {/* Phone with notification */}
        <motion.div className="relative"
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, type: 'spring', stiffness: 80 }}>
          <div className="text-8xl" style={{ filter: 'drop-shadow(0 0 30px rgba(79,142,247,0.6))' }}>📱</div>
          {/* Notification badge */}
          <motion.div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #4F8EF7, #A8D8FF)', color: '#000' }}
            animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            1
          </motion.div>
          {/* Glow ring */}
          <motion.div className="absolute center-absolute rounded-full"
            style={{ width: '120px', height: '120px', border: '1px solid rgba(79,142,247,0.3)', zIndex: -1 }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}>
          </motion.div>
        </motion.div>

        <FadeReveal delay={0.8}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">An Ordinary Notification</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-lg mx-auto">
          {[
            "It looked like just another notification...",
            "Something most people would forget in minutes.",
            "But sometimes...",
            "Life hides extraordinary moments inside ordinary things.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 3 ? 'text-accent-blue italic' : 'text-white/70'}`}
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

// Scene 2: Connection Accepted
function Scene2() {
  return (
    <div className="scene-center" style={{ background: '#060A14' }}>
      <AnimatedBackground showStars starCount={80} showParticles particleCount={20} />

      {/* LinkedIn card */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        <motion.div
          className="glass-blue rounded-2xl p-8 w-64"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ boxShadow: '0 0 40px rgba(79,142,247,0.3)' }}
        >
          <div className="text-5xl mb-3">🤝</div>
          <p className="font-ui text-white/60 text-xs tracking-widest uppercase mb-1">LinkedIn</p>
          <p className="font-body text-white font-medium">Connection Accepted</p>
          <motion.div className="mt-3 h-px bg-gradient-to-r from-transparent via-accent-blue to-transparent"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.6 }} />
          <p className="font-ui text-white/40 text-xs mt-2">Saranya • 1st connection</p>
        </motion.div>

        {/* Particle burst */}
        <div className="absolute pointer-events-none">
          <FloatingParticles type="stars" count={15} />
        </div>

        <FadeReveal delay={0.8}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">A Tiny Click</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-lg mx-auto">
          {[
            "One connection request...",
            "One acceptance...",
            "One small click...",
            "None of us knew it would become the beginning of our story.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 3 ? 'text-accent-blue italic' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.3, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 3: First Messages
function Scene3() {
  const [shownMessages, setShownMessages] = useState([])
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    if (msgIndex >= ALL_MESSAGES.length) return
    const timer = setTimeout(() => {
      setShownMessages(prev => [...prev, ALL_MESSAGES[msgIndex]])
      setMsgIndex(prev => prev + 1)
    }, 1500 + msgIndex * 1800)
    return () => clearTimeout(timer)
  }, [msgIndex])

  return (
    <div className="scene-center" style={{ background: '#060A14' }}>
      <AnimatedBackground showStars starCount={60} showParticles={false} />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 px-6 max-w-5xl w-full">
        <div className="flex-1 text-center md:text-left space-y-6">
          <FadeReveal delay={0.3}>
            <h2 className="font-heading text-4xl md:text-5xl text-white">The Conversation</h2>
          </FadeReveal>
          <div className="space-y-4">
            {[
              "I expected a normal reply.",
              "Instead...",
              "You remembered something I had almost forgotten.",
              "That was the moment I realized...",
              "You had been paying attention all along.",
            ].map((line, i) => (
              <motion.p key={i} className={`font-body text-lg ${[3, 4].includes(i) ? 'text-accent-primary italic' : 'text-white/70'}`}
                initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.3, duration: 0.6 }}>
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

// Scene 4: March 5
function Scene4() {
  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={200} showParticles={false} />

      {/* Constellation lines */}
      <svg className="fill-absolute pointer-events-none opacity-20" style={{ zIndex: 1 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.line key={i}
            x1={`${20 + Math.random() * 60}%`} y1={`${20 + Math.random() * 60}%`}
            x2={`${20 + Math.random() * 60}%`} y2={`${20 + Math.random() * 60}%`}
            stroke="rgba(255,215,0,0.5)" strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}>
          </motion.line>
        ))}
      </svg>

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        {/* Calendar */}
        <motion.div
          className="glass-gold rounded-xl p-8 inline-block mx-auto"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: 'spring' }}
          style={{ boxShadow: '0 0 40px rgba(255,215,0,0.25)' }}
        >
          <p className="font-ui text-white/40 text-xs tracking-widest uppercase mb-2">March</p>
          <p className="font-heading text-7xl text-gradient-gold" style={{ lineHeight: 1 }}>5</p>
          <p className="font-ui text-white/30 text-xs mt-2 tracking-widest">THE DAY IT ALL BEGAN</p>
        </motion.div>

        <FadeReveal delay={0.8}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">One Date</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "Some dates are just numbers.",
            "Others quietly become unforgettable.",
            "March 5...",
            "Wasn't just another day.",
            "It became the first page of our story.",
          ].map((line, i) => (
            <motion.p key={i}
              className={`font-body text-lg ${i === 2 ? 'text-accent-gold font-medium text-2xl' : i === 4 ? 'text-accent-primary italic' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.4, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 5: Messages Become Memories / Stars
function Scene5() {
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    text: ['Hi...', 'How was your day?', '😊', 'Good morning!', 'Hmm...', '❤️',
           'Tell me more', 'Take care!', '💙', 'haha yes', 'I know right', '✨'][i],
    side: i % 2 === 0 ? 'right' : 'left',
    delay: i * 0.3,
  }))

  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={180} showParticles={false} />

      {/* Floating chat bubbles */}
      <div className="fill-absolute overflow-hidden pointer-events-none">
        {bubbles.map(b => (
          <motion.div key={b.id} className={`absolute glass-blue rounded-2xl px-3 py-1.5 text-xs font-body text-white/70`}
            style={{
              [b.side === 'right' ? 'right' : 'left']: `${10 + Math.random() * 30}%`,
              top: `${5 + b.id * 8}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.7, 0], y: [20, -60, -140] }}
            transition={{ duration: 5, delay: b.delay, repeat: Infinity, ease: 'easeOut' }}>
            {b.text}
          </motion.div>
        ))}
      </div>

      {/* Heart constellation */}
      <motion.div className="absolute center-absolute text-9xl pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 40px rgba(248,200,220,0.6))' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}>
        ❤️
      </motion.div>

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-6 mt-52">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl text-white">Every Word</h2>
        </FadeReveal>
        <div className="space-y-3">
          {[
            "Every conversation...",
            "Every reply...",
            "Every tiny message...",
            "Slowly became memories I never wanted to lose.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 3 ? 'text-accent-primary italic' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.3, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 6: New Chapter
function Scene6({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #080B14, #0A0A0A)' }}>
      <AnimatedBackground showStars starCount={80} showParticles particleCount={30} showFog />
      {/* Pink morning */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(248,200,220,0.08) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <motion.div className="text-6xl" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>🌄</motion.div>
        <div className="space-y-5">
          <FadeReveal delay={0.4}>
            <h2 className="font-heading text-4xl md:text-5xl text-white">From Stranger To Someone Special</h2>
          </FadeReveal>
          <div className="space-y-3">
            {[
              "We didn't know it then...",
              "But those little conversations...",
              "Would soon become part of our everyday lives.",
            ].map((line, i) => (
              <motion.p key={i} className={`font-body text-xl ${i === 2 ? 'text-accent-primary italic' : 'text-white/70'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.4, duration: 0.7 }}>
                {line}
              </motion.p>
            ))}
          </div>
          {/* Good morning preview */}
          <motion.div className="glass-pink rounded-xl px-6 py-4 inline-block mx-auto"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}>
            <p className="font-handwriting text-2xl text-accent-primary">Good Morning ❤️👑</p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.8 }}>
          <PrimaryButton id="ch4-continue" onClick={onContinue} icon="→">
            Continue To The Next Memory
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 4 Main ─────────────────────────────────────────────────────────
export default function Chapter4() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 6

  useEffect(() => {
    if (isPaused) return
    if (scene >= 5) return
    const durations = [8000, 9000, 14000, 10000, 10000]
    const timer = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(timer)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => navigate('/chapter/5'), [navigate])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" />,
    <Scene5 key="s5" />,
    <Scene6 key="s6" onContinue={handleContinue} />,
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: '#080B14' }}>
      <ProgressIndicator
        progress={20}
        chapterNum={4}
        chapterTitle="The Message That Changed Everything"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain />

      {/* Hidden notification heart */}
      <motion.div
        className="fixed bottom-24 left-8 z-50 text-3xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        onClick={() => setShowSecret(true)}
        data-cursor-hover
        whileHover={{ scale: 1.3, filter: 'drop-shadow(0 0 15px rgba(79,142,247,0.9))' }}
      >
        🔔
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
