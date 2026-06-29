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
            <div className="text-5xl mb-4">🏮</div>
            <h3 className="font-heading text-2xl text-accent-gold mb-4">Hidden Dream</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "My favorite dream has never been a place... it's simply sharing more ordinary days with you. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scene 1: Dreams Begin Quietly — Galaxy Sunrise
function Scene1() {
  return (
    <div className="scene-center" style={{ background: '#070707' }}>
      <AnimatedBackground showStars starCount={200} showParticles particleCount={20} showFog={false} />
      {/* Sunrise gradient */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,200,80,0.15) 0%, rgba(255,100,50,0.05) 40%, transparent 70%)',
      }} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <FadeReveal delay={0.3}>
          <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Chapter 10 — Scene 1</p>
        </FadeReveal>
        <motion.div className="flex justify-center gap-3 text-5xl mb-2"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
          <span style={{ filter: 'drop-shadow(0 0 20px rgba(255,200,80,0.7))' }}>🌌</span>
          <span style={{ filter: 'drop-shadow(0 0 15px rgba(255,150,50,0.6))' }}>🌅</span>
        </motion.div>
        <FadeReveal delay={0.8}>
          <h2 className="font-heading text-5xl md:text-7xl text-white" style={{ textShadow: '0 0 40px rgba(255,200,80,0.3)' }}>
            A New Thought
          </h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "Something had quietly changed.",
            "I no longer imagined only my future.",
            "Without even realizing it...",
            "I had started imagining a future where you were part of it.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-accent-gold italic' : 'text-white/75'}`}
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

// Scene 2: Conversations About Tomorrow
function Scene2() {
  const chatItems = [
    { text: 'What are your future plans? 🤔', side: 'right' },
    { text: 'Goals. Growing. And you? 😊', side: 'left' },
    { text: 'Same. Also... making more memories 💛', side: 'right' },
    { text: 'haha that sounds perfect 😂', side: 'left' },
    { text: '✨📅 Next outing when?', side: 'right' },
  ]

  return (
    <div className="scene-center" style={{ background: '#050505' }}>
      <AnimatedBackground showStars starCount={120} showParticles particleCount={20} />

      {/* Floating chat bubbles */}
      <div className="fill-absolute overflow-hidden pointer-events-none">
        {chatItems.map((item, i) => (
          <motion.div key={i}
            className="absolute glass rounded-xl px-3 py-2 text-xs font-body text-white/70 max-w-xs"
            style={{ [item.side === 'right' ? 'right' : 'left']: `${8 + Math.random() * 20}%`, top: `${8 + i * 17}%` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.8, 0.8, 0], y: [20, 0, -20, -60] }}
            transition={{ duration: 6, delay: i * 0.5, repeat: Infinity, ease: 'easeOut' }}>
            {item.text}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8">
        <FadeReveal delay={0.4}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Every Conversation</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "We talked about little things.",
            "Plans. Goals. Funny ideas.",
            "Every conversation made tomorrow feel a little brighter.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 2 ? 'text-accent-gold italic' : 'text-white/75'}`}
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

// Scene 3: The Interview Day
function Scene3() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #080808, #0d0a05)' }}>
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,180,80,0.1) 0%, transparent 60%)',
      }} />
      <AnimatedBackground showStars starCount={80} showParticles particleCount={20} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <div className="text-6xl mb-2">🏫</div>
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">One More Memory</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "There were important days.",
            "Days filled with hope and nervousness.",
            "And somehow...",
            "Sharing those moments with you made everything feel lighter.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-accent-primary italic' : 'text-white/75'}`}
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

// Scene 4: Lunch Together — Biriyani
function Scene4() {
  return (
    <div className="scene-center" style={{ background: '#080808' }}>
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,160,50,0.07) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 px-8 max-w-5xl w-full">
        {/* Biriyani visual */}
        <motion.div className="text-center"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <div className="text-8xl mb-3" style={{ filter: 'drop-shadow(0 0 25px rgba(255,160,50,0.5))' }}>🍛</div>
          <p className="font-body text-white/50 text-sm">Biriyani 🔥</p>
          {/* Steam */}
          {[0, 1, 2].map(i => (
            <motion.div key={i} className="inline-block mx-0.5 text-white/20"
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}>
              ≈
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center md:text-left space-y-6 flex-1">
          <FadeReveal delay={0.5}>
            <h2 className="font-heading text-4xl md:text-5xl text-white">Simple Joy</h2>
          </FadeReveal>
          <div className="space-y-4">
            {[
              "Sometimes...",
              "The happiest conversations happen over a simple meal.",
              "Not because of what's on the table...",
              "But because of who's sitting across from you.",
            ].map((line, i) => (
              <FadeReveal key={i} delay={0.7 + i * 0.3} direction="left">
                <p className={`font-body text-lg ${i === 3 ? 'text-accent-primary italic' : 'text-white/75'}`}>{line}</p>
              </FadeReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Scene 5: Everyday Care
function Scene5() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #0A0A0A, #0d0a05)' }}>
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 50% at 60% 80%, rgba(255,160,50,0.08) 0%, transparent 60%)',
      }} />
      <AnimatedBackground showStars starCount={80} showParticles particleCount={15} showFog />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8">
        <div className="flex justify-center gap-4 text-5xl mb-2">
          <motion.span animate={{ x: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }}>👫</motion.span>
          <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>🌆</motion.span>
        </div>
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">The Little Things</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "It wasn't one grand gesture.",
            "It was the little moments.",
            "Helping each other.",
            "Waiting for each other.",
            "Simply being there.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 4 ? 'text-accent-primary italic' : 'text-white/75'}`}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.35, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 6: The Future I Imagine — Lanterns + Galaxy
function Scene6({ onLanternClick }) {
  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={220} showParticles={false} />

      {/* Northern lights simulation */}
      <div className="fill-absolute pointer-events-none overflow-hidden">
        {['rgba(100,255,150,0.04)', 'rgba(80,150,255,0.04)', 'rgba(200,100,255,0.03)'].map((color, i) => (
          <motion.div key={i} className="absolute w-full h-40 rounded-full"
            style={{ top: `${10 + i * 20}%`, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, filter: 'blur(30px)' }}
            animate={{ x: [-200, 200, -200], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}>
          </motion.div>
        ))}
      </div>

      {/* Floating lanterns */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div key={i} className="absolute text-2xl cursor-pointer"
          style={{ left: `${10 + i * 11}%`, bottom: '10%' }}
          animate={{ y: [0, -(100 + Math.random() * 150)], opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
          onClick={i === 3 ? onLanternClick : undefined}
          data-cursor-hover whileHover={{ scale: 1.4 }}>
          🏮
        </motion.div>
      ))}

      {/* Golden path */}
      <svg className="fill-absolute opacity-20 pointer-events-none">
        <motion.path d="M 50% 90% Q 30% 60% 50% 30% Q 70% 10% 50% 5%"
          fill="none" stroke="rgba(255,215,0,0.6)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5 }}>
        </motion.path>
      </svg>

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8 mt-20">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-6xl" style={{
            background: 'linear-gradient(135deg, #FFD700, #FFF4E6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Dreams</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "I don't know exactly what tomorrow will bring.",
            "Life always has surprises.",
            "But one hope quietly stayed in my heart...",
            "That we'd keep creating beautiful memories together.",
            "One ordinary day at a time.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${[2, 4].includes(i) ? 'text-accent-gold italic' : 'text-white/75'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.4, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
        <p className="font-ui text-white/20 text-xs">Click a lantern to release a wish ✨</p>
      </div>
    </div>
  )
}

// Scene 7: Clouds Gather — storm transition
function Scene7({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #050505, #020202)' }}>
      {/* Dark clouds */}
      <div className="fill-absolute pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{
              width: `${200 + i * 50}px`, height: `${80 + i * 20}px`,
              background: `rgba(30, 30, 50, 0.${4 + i})`,
              top: `${i * 8}%`, filter: 'blur(20px)',
            }}
            animate={{ x: ['-10%', '10%', '-10%'] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}>
          </motion.div>
        ))}
      </div>
      {/* Moon fading */}
      <motion.div className="absolute top-10 right-16 text-5xl"
        animate={{ opacity: [0.8, 0.2, 0.8] }} transition={{ duration: 5, repeat: Infinity }}>
        🌙
      </motion.div>
      {/* First raindrops */}
      <div className="fill-absolute overflow-hidden pointer-events-none opacity-20">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="absolute" style={{
            left: `${Math.random() * 100}%`, top: '-5px',
            width: '1px', height: '15px',
            background: 'rgba(150,180,255,0.5)',
            animation: `rain ${0.6 + Math.random() * 0.5}s linear ${Math.random() * 2}s infinite`,
          }} />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <div className="flex justify-center gap-3 text-5xl">
          <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}>⛈️</motion.span>
        </div>
        <div className="space-y-5">
          <FadeReveal delay={0.4}><h2 className="font-heading text-4xl md:text-5xl text-white">Every Story Has Challenges</h2></FadeReveal>
          <div className="space-y-3">
            {[
              "But every beautiful story...",
              "Has moments of uncertainty too.",
              "Ours was no different.",
            ].map((line, i) => (
              <motion.p key={i} className={`font-body text-xl ${i === 2 ? 'text-white/60 italic' : 'text-white/75'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.5, duration: 0.7 }}>
                {line}
              </motion.p>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.8 }}>
          <PrimaryButton id="ch10-continue" onClick={onContinue} icon="→">Continue To The Next Memory</PrimaryButton>
        </motion.div>
      </div>

      <style>{`@keyframes rain { 0%{transform:translateY(-5px);opacity:0} 10%{opacity:1} 100%{transform:translateY(110vh);opacity:0.3} }`}</style>
    </div>
  )
}

// ─── Chapter 10 Main ────────────────────────────────────────────────────────────
export default function Chapter10() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 7

  useEffect(() => {
    if (isPaused) return
    if (scene >= 6) return
    const durations = [10000, 12000, 12000, 12000, 12000, 15000]
    const t = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(t)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => navigate('/chapter/11'), [navigate])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" />,
    <Scene5 key="s5" />,
    <Scene6 key="s6" onLanternClick={() => setShowSecret(true)} />,
    <Scene7 key="s7" onContinue={handleContinue} />,
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: '#070707' }}>
      <ProgressIndicator
        progress={65}
        chapterNum={10}
        chapterTitle="The Dreams We Started Building"
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
