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
          <motion.div className="relative glass-pink rounded-xl p-10 max-w-md mx-6 text-center"
            initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }} onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4">🥤</div>
            <h3 className="font-heading text-2xl text-accent-primary mb-4">Secret Memory</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "Some of my happiest memories taste like laughter, warm evenings, and milkshakes with you. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scene 1: Golden Evening
function Scene1() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0B0B0B, #0d0a05)' }}>
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,190,60,0.12) 0%, transparent 60%)',
      }} />
      <AnimatedBackground showStars starCount={80} showParticles particleCount={25} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <FadeReveal delay={0.3}>
          <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Chapter 09 — Scene 1</p>
        </FadeReveal>
        <div className="flex justify-center gap-4 text-6xl mb-2">
          <motion.span animate={{ filter: ['drop-shadow(0 0 10px rgba(255,190,60,0.4))', 'drop-shadow(0 0 30px rgba(255,190,60,0.8))', 'drop-shadow(0 0 10px rgba(255,190,60,0.4))'] }}
            transition={{ duration: 3, repeat: Infinity }}>🌇</motion.span>
        </div>
        <FadeReveal delay={0.7}>
          <h2 className="font-heading text-5xl md:text-7xl text-white" style={{ textShadow: '0 0 40px rgba(255,190,60,0.3)' }}>
            Some Evenings Feel Different
          </h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "There are evenings...",
            "That don't ask for anything extraordinary.",
            "Just a little time...",
            "A little laughter...",
            "And someone special beside you.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 4 ? 'text-accent-primary italic' : 'text-white/75'}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.35, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 2: The Café
function Scene2() {
  return (
    <div className="scene-center" style={{ background: '#080808' }}>
      {/* Warm café glow */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 60%, rgba(255,160,60,0.08) 0%, transparent 70%)',
      }} />
      <FloatingParticles type="dust" count={25} colors={['rgba(255,200,80,0.4)', 'rgba(255,230,150,0.3)']} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        {/* Café visual */}
        <motion.div className="glass rounded-xl p-8 flex flex-col items-center gap-4"
          style={{ border: '1px solid rgba(255,180,60,0.2)', boxShadow: '0 0 40px rgba(255,160,60,0.1)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="flex gap-4 text-4xl">
            <span>☕</span><span>🪴</span><span>🍵</span>
          </div>
          <div className="flex gap-2 items-center">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-2 h-2 rounded-full"
                style={{ background: i <= 4 ? 'rgba(255,180,60,0.7)' : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
          <p className="font-ui text-white/30 text-xs tracking-widest">⭐ Our Café</p>
        </motion.div>

        <FadeReveal delay={0.7}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Comfort</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl">
          {[
            "Some places become beautiful...",
            "Because of the memories created there.",
            "That café...",
            "Will always remind me of you.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 3 ? 'text-accent-primary italic text-xl' : 'text-white/75'}`}
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

// Scene 3: Milkshake Time — the star scene
function Scene3({ onDrinkClick }) {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #080808, #0B0B08)' }}>
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,240,180,0.06) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        {/* The drinks */}
        <div className="flex justify-center gap-8 md:gap-16">
          {[
            { emoji: '🥤', label: 'Vanilla Milkshake', isSecret: true },
            { emoji: '🧃', label: 'Musk Melon Juice', isSecret: false },
          ].map((drink, i) => (
            <motion.div key={i} className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.4, duration: 0.8, type: 'spring', stiffness: 100 }}
              onClick={drink.isSecret ? onDrinkClick : undefined}
              data-cursor-hover whileHover={{ scale: 1.1 }}>
              <div className="relative">
                <div className="text-7xl" style={{ filter: 'drop-shadow(0 0 20px rgba(255,220,100,0.5))' }}>{drink.emoji}</div>
                {/* Condensation drops */}
                {[0, 1, 2].map(d => (
                  <motion.div key={d} className="absolute w-1 h-2 rounded-full bg-white/30"
                    style={{ left: `${20 + d * 20}%`, top: '60%' }}
                    animate={{ y: [0, 15], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, delay: d * 0.5, repeat: Infinity }}>
                  </motion.div>
                ))}
              </div>
              <p className="font-body text-white/60 text-sm">{drink.label}</p>
              {drink.isSecret && (
                <p className="font-ui text-white/20 text-xs tracking-widest">Click me ✨</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Ice cube particle effect */}
        <div className="flex justify-center gap-2 text-xl opacity-40">
          {['🧊', '🧊', '🧊'].map((c, i) => (
            <motion.span key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}>{c}</motion.span>
          ))}
        </div>

        <FadeReveal delay={1.2}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Simple Happiness</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl">
          {[
            "No grand celebration...",
            "No expensive surprises...",
            "Just sharing a drink...",
            "Sharing conversations...",
            "And sharing another beautiful memory together.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 4 ? 'text-accent-primary italic' : 'text-white/70'}`}
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

// Scene 4: Little Conversations
function Scene4() {
  return (
    <div className="scene-center" style={{ background: '#080808' }}>
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,160,60,0.06) 0%, transparent 70%)',
      }} />
      <FloatingParticles type="hearts" count={12} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8">
        <div className="flex justify-center gap-4 text-4xl mb-2">
          {['😂', '🤭', '😊', '🥹'].map((e, i) => (
            <motion.span key={i} animate={{ y: [0, -12, 0], rotate: [0, (i % 2 === 0 ? 10 : -10), 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}>
              {e}
            </motion.span>
          ))}
        </div>
        <FadeReveal delay={0.4}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Time Stopped Again</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "The funniest conversations...",
            "Usually aren't remembered word for word.",
            "What stays...",
            "Is how they made us feel.",
            "Happy. Comfortable. At peace.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 4 ? 'text-accent-primary italic text-2xl' : 'text-white/75'}`}
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

// Scene 5: Scooty Ride Home
function Scene5() {
  return (
    <div className="scene-center" style={{ background: '#050508' }}>
      {/* Street lights moving */}
      <div className="fill-absolute overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div key={i} className="absolute"
            style={{ left: `${10 + i * 12}%`, top: '-5px', width: '2px', height: '40vh',
              background: 'linear-gradient(180deg, rgba(255,180,60,0.3), transparent)' }}
            animate={{ y: ['0vh', '110vh'] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25, ease: 'linear' }}>
          </motion.div>
        ))}
      </div>
      {/* Floating leaves */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div key={i} className="absolute text-lg pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ x: [0, -50], y: [0, 50], rotate: [0, 360], opacity: [0.6, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}>
          🍂
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8">
        <motion.div className="text-7xl" animate={{ x: [0, 5, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <span style={{ filter: 'drop-shadow(0 0 20px rgba(255,180,60,0.6))' }}>🛵</span>
        </motion.div>
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">One More Ride</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "The road home felt shorter.",
            "Not because of the distance...",
            "But because I wished the evening...",
            "Would last just a little longer.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-accent-primary italic' : 'text-white/75'}`}
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

// Scene 6: Memory Jar ✨
function Scene6() {
  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={180} showParticles={false} />

      {/* Memory jar visual */}
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ marginTop: '-80px' }}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, type: 'spring', stiffness: 80 }}>
        <div className="relative w-32 h-40 mx-auto">
          <div className="w-32 h-36 rounded-b-3xl rounded-t-lg border-2 border-white/20 overflow-hidden"
            style={{ background: 'rgba(255,230,100,0.05)', backdropFilter: 'blur(5px)' }}>
            {/* Stars inside jar */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div key={i} className="absolute text-xs"
                style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 2 }}>
                ✨
              </motion.div>
            ))}
          </div>
          <div className="w-20 h-4 mx-auto bg-white/10 rounded-t-sm" />
        </div>
        <div className="text-5xl text-center mt-2" style={{ filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.6))' }}>✨</div>
      </motion.div>

      <FloatingParticles type="hearts" count={15} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-6 mt-64">
        <FadeReveal delay={1}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Keeping Every Memory</h2>
        </FadeReveal>
        <div className="space-y-3">
          {[
            "If memories could be collected...",
            "I'd keep this evening safely inside a jar.",
            "Not because it was extraordinary...",
            "But because it was ours.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 3 ? 'text-accent-gold italic text-xl' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.3 + i * 0.4, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 7: Galaxy transition
function Scene7({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={200} showParticles={false} showFog={false} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <motion.div className="flex justify-center gap-3 text-4xl"
          animate={{ rotate: [0, 360] }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: 'center' }}>
          {['⭐', '✨', '💫', '⭐', '✨'].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </motion.div>
        <div className="space-y-5">
          <FadeReveal delay={0.4}><h2 className="font-heading text-4xl md:text-5xl text-white">Looking Ahead</h2></FadeReveal>
          <div className="space-y-3">
            {[
              "Little by little...",
              "The memories kept growing.",
              "And so did the dreams.",
              "The future slowly began to feel exciting...",
            ].map((line, i) => (
              <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-accent-gold italic' : 'text-white/70'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.4, duration: 0.7 }}>
                {line}
              </motion.p>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.8 }}>
          <PrimaryButton id="ch9-continue" onClick={onContinue} icon="→">Continue To The Next Memory</PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 9 Main ────────────────────────────────────────────────────────────
export default function Chapter9() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 7

  useEffect(() => {
    if (isPaused) return
    if (scene >= 6) return
    const durations = [9000, 12000, 14000, 12000, 12000, 12000]
    const t = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(t)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => navigate('/chapter/10'), [navigate])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" />,
    <Scene3 key="s3" onDrinkClick={() => setShowSecret(true)} />,
    <Scene4 key="s4" />,
    <Scene5 key="s5" />,
    <Scene6 key="s6" />,
    <Scene7 key="s7" onContinue={handleContinue} />,
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: '#0B0B0B' }}>
      <ProgressIndicator
        progress={58}
        chapterNum={9}
        chapterTitle="Milkshake Memories"
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
