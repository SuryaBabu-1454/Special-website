import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedBackground from '@components/effects/AnimatedBackground'
import FloatingParticles from '@components/effects/FloatingParticles'
import FilmGrain from '@components/effects/FilmGrain'
import { FadeReveal } from '@components/animations/TextReveal'
import { PrimaryButton } from '@components/buttons/PrimaryButton'
import ProgressIndicator from '@components/common/ProgressIndicator'

// Secret Modal
function SecretModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9000 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            className="relative glass-pink rounded-lg p-10 max-w-md mx-6 text-center"
            initial={{ scale: 0.7, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-5xl mb-4" style={{ animation: 'heartbeat 1s ease infinite' }}>❤️</div>
            <h3 className="font-heading text-2xl text-accent-primary mb-4">Hidden Memory</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "Some people quietly become the reason we smile, even before they know our name. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>
              Close ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Scene 1: Campus Morning ────────────────────────────────────────────────────
function Scene1() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0d1014 100%)' }}>
      <AnimatedBackground showStars starCount={100} showParticles particleCount={30} showFog />

      {/* Golden morning gradient */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 100% 50% at 50% 100%, rgba(255,200,100,0.08) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <motion.div className="text-7xl mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          🌅
        </motion.div>
        <FadeReveal delay={0.5}>
          <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Chapter 02 — Scene 1</p>
        </FadeReveal>
        <FadeReveal delay={0.8}>
          <h2 className="font-heading text-5xl md:text-7xl text-white" style={{ textShadow: '0 0 40px rgba(248,200,220,0.4)' }}>
            A Normal Day
          </h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "For me...",
            "It was just another ordinary morning.",
            "I walked into the institute...",
            "Completely unaware that someone had already noticed me.",
          ].map((line, i) => (
            <motion.p key={i} className="font-body text-white/70 text-xl leading-relaxed"
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

// ── Scene 2: Crowd ────────────────────────────────────────────────────────────
function Scene2() {
  const figures = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 90 + 5,
    y: Math.random() * 60 + 20,
    size: Math.random() * 20 + 16,
    speed: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  })), [])

  return (
    <div className="scene-center" style={{ background: '#080810' }}>
      <AnimatedBackground showStars starCount={60} showParticles={false} showFog />

      {/* Crowd silhouettes */}
      <div className="fill-absolute overflow-hidden opacity-30">
        {figures.map(f => (
          <motion.div
            key={f.id}
            className="absolute select-none pointer-events-none"
            style={{ left: `${f.x}%`, top: `${f.y}%`, fontSize: `${f.size}px` }}
            animate={{ x: [-20, 20, -10, 0] }}
            transition={{ duration: f.speed * 3, repeat: Infinity, ease: 'easeInOut', delay: f.delay }}
          >
            🚶
          </motion.div>
        ))}
      </div>

      {/* Depth blur overlay */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(8,8,16,0.7) 0%, transparent 50%, rgba(8,8,16,0.7) 100%)',
      }} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-6">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-5xl md:text-6xl text-white">Among Everyone</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "There were hundreds of people around me.",
            "Everyone was busy living their own story.",
            "And somewhere in that crowd...",
            "Our paths quietly crossed.",
          ].map((line, i) => (
            <motion.p key={i} className="font-body text-white/70 text-lg leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.35, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Scene 3: Spotlight ────────────────────────────────────────────────────────
function Scene3() {
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      {/* Freeze effect: blurred crowd */}
      <div className="fill-absolute overflow-hidden opacity-10 pointer-events-none" style={{ filter: 'blur(4px)' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute text-3xl select-none"
            style={{ left: `${Math.random() * 90}%`, top: `${Math.random() * 80}%`, opacity: 0.5 }}>
            🚶
          </div>
        ))}
      </div>

      {/* Spotlight */}
      <motion.div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(248,200,220,0.08) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Saranya silhouette (walking in spotlight) */}
      <motion.div
        className="absolute text-8xl"
        style={{ top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <span style={{
          filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.6)) drop-shadow(0 0 60px rgba(248,200,220,0.4))',
        }}>🌟</span>
      </motion.div>

      {/* Floating petals */}
      <FloatingParticles type="mixed" count={25} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-6 mt-48">
        <FadeReveal delay={1}>
          <h2 className="font-heading text-4xl md:text-5xl" style={{
            background: 'linear-gradient(135deg, #FFD700, #F8C8DC)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>The One Person</h2>
        </FadeReveal>
        <div className="space-y-3">
          {[
            "Funny, isn't it?",
            "You had already seen me...",
            "Long before I ever noticed you.",
            "Destiny had introduced us.",
            "I just hadn't realized it yet.",
          ].map((line, i) => (
            <motion.p key={i} className="font-body text-white/70 text-lg"
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

// ── Scene 4: Road Crossing ────────────────────────────────────────────────────
function Scene4() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A, #110A0A)' }}>
      <AnimatedBackground showStars starCount={80} showParticles particleCount={20} showFog />

      {/* Golden hour lighting */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 70% 30%, rgba(255,160,50,0.1) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <div className="flex justify-center items-center gap-6 text-5xl mb-4">
          <motion.span animate={{ x: [0, 30, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🚶</motion.span>
          <span className="text-white/20">→</span>
          <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>👁️</motion.span>
        </div>

        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">A Moment I Never Saw</h2>
        </FadeReveal>

        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "You remembered moments...",
            "That I never even knew existed.",
            "You quietly watched me cross the road.",
            "While I walked by...",
            "Without knowing someone was smiling because of me.",
          ].map((line, i) => (
            <motion.p key={i}
              className={`font-body text-lg leading-relaxed ${i === 4 ? 'text-accent-primary italic' : 'text-white/70'}`}
              initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.3, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Scene 5: Invisible Memories ────────────────────────────────────────────────
function Scene5() {
  const cards = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 70 + 15,
    y: Math.random() * 60 + 20,
    rotate: (Math.random() - 0.5) * 20,
    scale: Math.random() * 0.3 + 0.8,
    emoji: ['✨', '💫', '🌸', '❤️', '🌟', '💕', '🌙', '⭐'][i],
    delay: Math.random() * 0.5,
  })), [])

  return (
    <div className="scene-center" style={{ background: '#050510' }}>
      <AnimatedBackground showStars starCount={150} showParticles particleCount={30} />

      {/* Floating memory cards */}
      {cards.map(card => (
        <motion.div
          key={card.id}
          className="absolute glass-pink rounded-md w-16 h-16 flex items-center justify-center text-2xl"
          style={{ left: `${card.x}%`, top: `${card.y}%`, transformOrigin: 'center' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: card.scale, rotate: card.rotate, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: card.delay + 0.5, duration: 0.5 },
            scale: { delay: card.delay + 0.5, duration: 0.5 },
            y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
          }}
        >
          {card.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-6">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-accent-primary">The Little Things</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "Some memories become special...",
            "Not because they were extraordinary.",
            "But because someone chose to remember them.",
            "Thank you...",
            "For remembering moments I never knew were important.",
          ].map((line, i) => (
            <motion.p key={i} className="font-body text-white/75 text-lg leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.3, duration: 0.6 }}>
              {i === 3 ? <span className="text-accent-primary italic">{line}</span> : line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Scene 6: Transition ────────────────────────────────────────────────────────
function Scene6({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      <AnimatedBackground showStars starCount={80} showParticles={false} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <div className="space-y-6">
          {[
            { text: "And then...", cls: "font-heading text-3xl text-white/60 italic" },
            { text: "One day...", cls: "font-heading text-4xl text-white/80 italic" },
            { text: "I finally looked at you.", cls: "font-heading text-5xl md:text-6xl text-white", glow: true },
          ].map((item, i) => (
            <motion.p
              key={i}
              className={item.cls}
              style={item.glow ? { textShadow: '0 0 40px rgba(248,200,220,0.6), 0 0 80px rgba(248,200,220,0.3)' } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.8, duration: 1 }}
            >
              {item.text}
            </motion.p>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 0.8 }}>
          <PrimaryButton id="ch2-continue" onClick={onContinue} icon="→">
            Continue To The Next Memory
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 2 Main ────────────────────────────────────────────────────────────
export default function Chapter2() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 6

  useEffect(() => {
    if (isPaused) return
    if (scene >= 5) return
    const durations = [7000, 8000, 10000, 9000, 8000]
    const timer = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(timer)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => navigate('/chapter/3'), [navigate])

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
        progress={10}
        chapterNum={2}
        chapterTitle="The Girl Who Already Knew Me"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain />

      {/* Hidden heart on tree */}
      <motion.div
        className="fixed bottom-24 left-8 z-50 text-3xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        onClick={() => setShowSecret(true)}
        data-cursor-hover
        whileHover={{ scale: 1.3, filter: 'drop-shadow(0 0 15px rgba(248,200,220,0.8))' }}
        style={{ cursor: 'pointer' }}
      >
        🌳
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      <SecretModal show={showSecret} onClose={() => setShowSecret(false)} />
    </div>
  )
}
