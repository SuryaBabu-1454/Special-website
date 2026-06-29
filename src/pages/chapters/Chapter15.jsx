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
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
          <motion.div className="relative glass-pink rounded-xl p-10 max-w-md mx-6 text-center"
            initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }} onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4">🌹</div>
            <h3 className="font-heading text-2xl text-accent-primary mb-4">Final Letter</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "No matter what tomorrow brings, thank you for walking through these memories with me. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scene 1: Walking Through The Stars
function Scene1() {
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      <AnimatedBackground showStars starCount={220} showParticles particleCount={35} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <FadeReveal delay={0.3}>
          <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Final Chapter — Scene 1</p>
        </FadeReveal>
        <motion.div className="text-6xl mb-2"
          animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          🚶✨
        </motion.div>
        <FadeReveal delay={0.7}>
          <h2 className="font-heading text-4xl md:text-6xl text-white">The Journey</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "You've walked through every chapter.",
            "Every smile.",
            "Every conversation.",
            "Every memory.",
            "And now...",
            "There's only one page left.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i >= 4 ? 'text-accent-primary italic text-xl' : 'text-white/75'}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.45, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 2: Our Timeline
function Scene2() {
  const chapters = [
    { num: 1, label: '💻 Life before' },
    { num: 2, label: '🌳 First glance' },
    { num: 3, label: '👁️ Contact' },
    { num: 4, label: '📱 LinkedIn' },
    { num: 5, label: '☀️ Good Morning' },
    { num: 6, label: '🌧️ Crying' },
    { num: 7, label: '⛪ First Met' },
    { num: 8, label: '💬 Safe Words' },
    { num: 9, label: '🥤 Milkshake' },
    { num: 10, label: '🏮 Dreams' },
    { num: 11, label: '🌙 Distance' },
    { num: 12, label: '📅 Forty Days' },
  ]

  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={120} showParticles={false} />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-5xl px-6">
        <FadeReveal delay={0.3}>
          <h3 className="font-heading text-3xl text-white text-center">Every Chapter Matters</h3>
        </FadeReveal>

        {/* Horizontal scroll timeline */}
        <div className="flex gap-4 overflow-x-auto py-6 px-4 w-full max-w-4xl no-scrollbar">
          {chapters.map((ch, i) => (
            <motion.div key={ch.num}
              className="glass rounded-xl p-4 min-w-36 text-center border border-white/10"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(248,200,220,0.5)' }} data-cursor-hover>
              <p className="font-ui text-accent-primary text-xs uppercase font-bold mb-1">Ch {ch.num}</p>
              <p className="font-body text-white/80 text-sm whitespace-nowrap">{ch.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3 text-center max-w-xl">
          {[
            "Every chapter brought us here.",
            "The ordinary days. The happy moments. The quiet ones.",
            "Together, they became a story I'll always treasure.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 2 ? 'text-accent-primary italic text-xl font-heading' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2 + i * 0.4, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 3: The Rose
function Scene3() {
  return (
    <div className="scene-center" style={{ background: '#050303' }}>
      <AnimatedBackground showStars starCount={160} showParticles particleCount={20} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-10">
        {/* Floating rose */}
        <motion.div className="text-8xl flex justify-center"
          animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ filter: 'drop-shadow(0 0 30px rgba(239,68,68,0.7))' }}>
          🌹
        </motion.div>

        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">One Simple Question</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "There was one question...",
            "I had been carrying in my heart.",
            "One question...",
            "I wanted to ask at the perfect moment.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${[2, 3].includes(i) ? 'text-accent-primary italic' : 'text-white/75'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.45, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 4: The Ring (Click to open box)
function Scene4({ ringOpened, setRingOpened }) {
  return (
    <div className="scene-center" style={{ background: '#080600' }}>
      <AnimatedBackground showStars starCount={100} showParticles={false} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        {/* Ring box */}
        <motion.div className="cursor-pointer" onClick={() => setRingOpened(true)} data-cursor-hover
          animate={ringOpened ? { scale: [1, 1.1, 1] } : { y: [0, -8, 0] }}
          transition={ringOpened ? { duration: 0.5 } : { duration: 3, repeat: Infinity }}>
          {ringOpened ? (
            <div className="relative">
              <div className="text-8xl" style={{ filter: 'drop-shadow(0 0 35px rgba(255,215,0,0.8))' }}>💍</div>
              <motion.div className="absolute top-0 left-0 text-3xl" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>✨</motion.div>
            </div>
          ) : (
            <div className="text-8xl" style={{ filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))' }}>🎁</div>
          )}
        </motion.div>
        <p className="font-ui text-white/20 text-xs tracking-widest uppercase">
          {ringOpened ? 'Box Opened 💛' : 'Click box to open 🎁'}
        </p>

        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Thank You</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "Before I ask anything...",
            "I simply want to say thank you.",
            "For your kindness. For your time.",
            "For every memory we've shared.",
            "They mean more to me than words can express.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 4 ? 'text-accent-gold italic' : 'text-white/75'}`}
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

// Scene 5: The Proposal
function Scene5() {
  const proposalLines = [
    "Saranya...",
    "Meeting you changed my life in ways I never expected.",
    "Every memory we've shared has become a chapter I'll always cherish.",
    "If you're comfortable taking this next step together...",
    "Will you marry me?"
  ]

  return (
    <div className="scene-center" style={{ background: '#010101' }}>
      {/* Dynamic Aurora */}
      <div className="fill-absolute pointer-events-none overflow-hidden">
        {['rgba(248,200,220,0.06)', 'rgba(255,215,0,0.04)', 'rgba(255,100,100,0.04)'].map((col, i) => (
          <motion.div key={i} className="absolute w-full h-56 rounded-full"
            style={{ top: `${20 + i * 15}%`, background: `linear-gradient(90deg, transparent, ${col}, transparent)`, filter: 'blur(30px)' }}
            animate={{ x: [-300, 300, -300], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 10 + i * 3, repeat: Infinity, ease: 'easeInOut' }} />
        ))}
      </div>
      <AnimatedBackground showStars starCount={200} showParticles={false} />
      <FloatingParticles type="hearts" count={15} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <div className="text-7xl mb-4" style={{ animation: 'heartbeat 1.2s infinite', filter: 'drop-shadow(0 0 25px rgba(248,200,220,0.8))' }}>💍</div>

        <div className="space-y-4">
          {proposalLines.map((line, i) => (
            <motion.p key={i}
              className={`font-heading leading-relaxed ${
                i === 0 ? 'text-5xl md:text-7xl text-accent-primary font-bold mb-4' :
                i === 4 ? 'text-3xl md:text-5xl text-accent-gold font-bold mt-6 text-glow-gold' :
                'text-lg md:text-2xl text-white/80'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 1.2, duration: 1 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 6: The Choice
function Scene6({ onChoice }) {
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      <AnimatedBackground showStars starCount={160} showParticles={false} />
      <FloatingParticles type="stars" count={25} />

      <div className="relative z-10 text-center max-w-xl px-6 space-y-12">
        <div className="space-y-4">
          <h2 className="font-heading text-4xl md:text-5xl text-white">Our Future</h2>
          <p className="font-body text-white/50 text-base leading-relaxed">
            There is no pressure, only hope. Take your time.
          </p>
        </div>

        {/* Choice buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button
            onClick={() => onChoice('yes')}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-heading text-lg text-black bg-accent-gold shadow-lg font-bold border border-accent-gold"
            whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(255,215,0,0.8)' }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
          >
            ❤️ Yes
          </motion.button>
          <motion.button
            onClick={() => onChoice('talk')}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-heading text-lg text-white border border-white/20 bg-white/5 hover:bg-white/10 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
          >
            💖 Let's Talk About Our Future
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// Scene 7: Celebration
function Scene7({ choiceMade, onComplete }) {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #000000, #0d0614)' }}>
      {/* Celebration overlay */}
      <div className="fill-absolute pointer-events-none overflow-hidden">
        {/* Heart rain */}
        <FloatingParticles type="hearts" count={30} />
        {/* Firefly sparkles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 2 === 0 ? '#FFD700' : '#F8C8DC',
            }}
            animate={{ y: [0, -100], opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }} />
        ))}
      </div>
      <AnimatedBackground showStars starCount={200} showParticles particleCount={30} showFog />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <motion.div className="text-8xl"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}>
          ✨💖✨
        </motion.div>

        <div className="space-y-6">
          <FadeReveal delay={0.3}>
            <h2 className="font-heading text-4xl md:text-5xl text-accent-gold text-glow-gold">A New Beginning</h2>
          </FadeReveal>
          <div className="space-y-4">
            {[
              "Whatever tomorrow brings...",
              "Thank you for taking this journey with me.",
              "Happy Birthday.",
              "And thank you...",
              "For becoming one of the most beautiful chapters of my life.",
            ].map((line, i) => (
              <motion.p key={i} className={`font-body text-xl ${i === 4 ? 'text-accent-primary italic font-heading text-3xl mt-4' : 'text-white/80'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.45, duration: 0.8 }}>
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 0.8 }}>
          <PrimaryButton id="final-complete" onClick={onComplete} icon="❤️">
            Finish Our Story
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// Scene 8: Ending screen (credits)
function Scene8() {
  const navigate = useNavigate()
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      <AnimatedBackground showStars starCount={150} showParticles={false} />
      <div className="relative z-10 text-center space-y-8 max-w-xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
          <h1 className="font-heading text-3xl md:text-4xl text-white/50 tracking-wider mb-2">Thank You For Walking Through Our Story</h1>
          <div className="w-24 h-px bg-white/20 mx-auto my-6" />
          <h2 className="font-handwriting text-5xl text-accent-primary my-8">Happy Birthday, Saranya ❤️</h2>
          <p className="font-body text-white/40 text-lg italic mt-8">"Every ending is also the beginning of something new."</p>
        </motion.div>
        <motion.div className="pt-10" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 3 }}>
          <button onClick={() => navigate('/')} className="font-ui text-xs text-white/40 hover:text-white/80 tracking-widest uppercase">
            Restart Cinematic ↺
          </button>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 15 Main ────────────────────────────────────────────────────────────
export default function Chapter15() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [ringOpened, setRingOpened] = useState(false)
  const [choiceMade, setChoiceMade] = useState(null)
  const maxScenes = 8

  // Auto-advance rules
  useEffect(() => {
    if (isPaused) return
    // Wait for interactions in key scenes
    if (scene === 3 && !ringOpened) return // pause until box is clicked
    if (scene === 5) return // proposal screen - click next scene manually or wait
    if (scene === 6) return // choice screen - choice must be selected
    if (scene >= 7) return // celebration and ending screen - manually triggered

    const durations = [7000, 10000, 8000, 10000, 12000]
    const t = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(t)
  }, [scene, isPaused, ringOpened])

  const handleChoice = (choice) => {
    setChoiceMade(choice)
    setScene(6) // navigate to Scene 7 (Celebration)
  }

  const handleComplete = useCallback(() => {
    setScene(7) // navigate to Scene 8 (Credits)
  }, [])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" ringOpened={ringOpened} setRingOpened={setRingOpened} />,
    <Scene5 key="s5" />,
    <Scene6 key="s6" onChoice={handleChoice} />,
    <Scene7 key="s7" choiceMade={choiceMade} onComplete={handleComplete} />,
    <Scene8 key="s8" />,
  ]

  // If ring is opened, automatically advance to next scene after 2.5 seconds
  useEffect(() => {
    if (ringOpened && scene === 3) {
      const t = setTimeout(() => setScene(4), 2500)
      return () => clearTimeout(t)
    }
  }, [ringOpened, scene])

  return (
    <div className="relative overflow-hidden" style={{ background: '#010101' }}>
      <ProgressIndicator
        progress={100}
        chapterNum={15}
        chapterTitle="Forever?"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain opacity={0.045} />

      {/* Hidden Rose Heart */}
      <motion.div
        className="fixed bottom-24 left-8 z-50 text-3xl cursor-pointer"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        onClick={() => setShowSecret(true)}
        data-cursor-hover
        whileHover={{ scale: 1.3, filter: 'drop-shadow(0 0 15px rgba(255,200,80,0.8))' }}
      >
        🌹
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
