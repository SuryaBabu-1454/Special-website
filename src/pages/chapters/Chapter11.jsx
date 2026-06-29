import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedBackground from '@components/effects/AnimatedBackground'
import FilmGrain from '@components/effects/FilmGrain'
import { FadeReveal } from '@components/animations/TextReveal'
import { PrimaryButton } from '@components/buttons/PrimaryButton'
import ProgressIndicator from '@components/common/ProgressIndicator'

// Shared rain component
function Rain({ intensity = 30 }) {
  return (
    <div className="fill-absolute overflow-hidden pointer-events-none opacity-25">
      {Array.from({ length: intensity }).map((_, i) => (
        <div key={i} className="absolute"
          style={{
            left: `${Math.random() * 100}%`, top: '-5px',
            width: '1px', height: `${15 + Math.random() * 20}px`,
            background: 'linear-gradient(180deg, rgba(120,150,255,0.5), transparent)',
            animation: `rain ${0.5 + Math.random() * 0.5}s linear ${Math.random() * 2}s infinite`,
          }} />
      ))}
      <style>{`@keyframes rain{0%{transform:translateY(-5px);opacity:0}10%{opacity:1}100%{transform:translateY(110vh);opacity:0.3}}`}</style>
    </div>
  )
}

function SecretModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9000 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div className="relative glass rounded-xl p-10 max-w-md mx-6 text-center"
            style={{ border: '1px solid rgba(107,122,153,0.4)' }}
            initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }} onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4">🌙</div>
            <h3 className="font-heading text-2xl text-blue-300 mb-4">Hidden Letter</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "No matter how far the roads became, I never stopped hoping we'd make more memories together. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scene 1: Different Cities (animated map)
function Scene1() {
  return (
    <div className="scene-center" style={{ background: '#040404' }}>
      <Rain intensity={25} />
      <AnimatedBackground showStars={false} showParticles={false} showFog />

      {/* Map visualization */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        <FadeReveal delay={0.3}>
          <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Chapter 11 — Scene 1</p>
        </FadeReveal>

        {/* Stylized map */}
        <motion.div className="glass rounded-2xl p-8 w-full max-w-sm relative overflow-hidden"
          style={{ border: '1px solid rgba(107,122,153,0.3)', boxShadow: '0 0 40px rgba(107,122,153,0.15)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          {/* Road lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute"
              style={{
                left: `${10 + i * 15}%`, top: '10%', width: '1px', height: '80%',
                background: 'rgba(107,122,153,0.15)',
              }} />
          ))}
          {/* Location dots */}
          <div className="flex justify-between items-center px-4 py-8 relative z-10">
            <div className="flex flex-col items-center gap-2">
              <motion.div className="w-4 h-4 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ boxShadow: '0 0 15px rgba(96,165,250,0.8)' }}>
              </motion.div>
              <p className="font-ui text-blue-300 text-xs">You</p>
            </div>
            {/* Dashed connection line */}
            <div className="flex-1 mx-4 flex gap-1 items-center">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-px flex-1 bg-white/20" />
              ))}
            </div>
            <div className="flex flex-col items-center gap-2">
              <motion.div className="w-4 h-4 rounded-full bg-pink-400"
                animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                style={{ boxShadow: '0 0 15px rgba(248,200,220,0.8)' }}>
              </motion.div>
              <p className="font-ui text-pink-300 text-xs">Me</p>
            </div>
          </div>
          <p className="font-ui text-white/20 text-xs tracking-widest text-center">Different cities. Same heart.</p>
        </motion.div>

        <FadeReveal delay={0.8}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Apart</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl">
          {[
            "Life took us to different places.",
            "The roads beneath our feet changed.",
            "But every day...",
            "My thoughts still found their way back to you.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-blue-300 italic' : 'text-white/75'}`}
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

// Scene 2: Good Morning ❤️👑
function Scene2() {
  const messages = ['Good Morning ❤️👑', 'Take care today.', 'Have a nice day.']

  return (
    <div className="scene-center" style={{ background: '#030308' }}>
      <Rain intensity={15} />
      <AnimatedBackground showStars starCount={60} showParticles={false} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        {/* Phone with morning message */}
        <motion.div className="glass rounded-3xl overflow-hidden w-56"
          style={{ border: '1px solid rgba(107,122,153,0.3)', boxShadow: '0 0 40px rgba(107,122,153,0.2)' }}
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
          {/* Phone header */}
          <div className="bg-blue-900/20 px-4 pt-4 pb-2">
            <p className="font-ui text-white/30 text-xs text-center">6:30 AM ☀️</p>
          </div>
          {/* Notification */}
          <div className="p-4 space-y-2">
            {messages.map((msg, i) => (
              <motion.div key={i} className="glass-pink rounded-xl px-3 py-2"
                initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.7, duration: 0.5 }}>
                <p className="font-handwriting text-accent-primary text-sm">{msg}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <FadeReveal delay={1.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">A Familiar Beginning</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl">
          {[
            "Even when we were far apart...",
            "Some mornings still began the same way.",
            "One small notification...",
            "Could brighten an entire day.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-accent-primary italic' : 'text-white/75'}`}
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

// Scene 3: Waiting — typing indicator
function Scene3() {
  const [showTyping, setShowTyping] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setShowTyping(p => !p), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="scene-center" style={{ background: '#020202' }}>
      <Rain intensity={30} />
      {/* Window reflection */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-10" style={{
        background: 'linear-gradient(90deg, transparent, rgba(120,150,255,0.1))',
      }} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        {/* Typing indicator card */}
        <motion.div className="glass rounded-2xl p-6 w-full max-w-xs"
          style={{ border: '1px solid rgba(107,122,153,0.3)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-sm font-bold">S</div>
            <div>
              <p className="font-ui text-white text-xs font-medium">Saranya</p>
              <AnimatePresence mode="wait">
                {showTyping ? (
                  <motion.p key="typing" className="font-ui text-blue-300 text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    typing...
                  </motion.p>
                ) : (
                  <motion.p key="seen" className="font-ui text-white/30 text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    seen ✓✓
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="ml-auto">
              <motion.div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300/60"
                    style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </motion.div>
            </div>
          </div>
          {/* Clock */}
          <div className="text-center text-white/20 text-xs font-ui">
            🕐 Waiting...
          </div>
        </motion.div>

        <FadeReveal delay={0.8}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Patience</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl">
          {[
            "Sometimes conversations came easily.",
            "Sometimes life became busy.",
            "There were moments of waiting.",
            "Moments of wondering.",
            "And moments of simply hoping everything was okay.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 4 ? 'text-blue-300 italic' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.3, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-4px);opacity:1}}`}</style>
    </div>
  )
}

// Scene 4: The Empty Chair
function Scene4() {
  return (
    <div className="scene-center" style={{ background: '#050505' }}>
      <Rain intensity={20} />
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 50% at 40% 50%, rgba(80,100,150,0.1) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        {/* Empty café table */}
        <motion.div className="glass rounded-2xl p-8 flex gap-8 items-center"
          style={{ border: '1px solid rgba(100,120,160,0.2)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {/* Chair 1 - occupied */}
          <div className="text-4xl">🪑</div>
          {/* Table */}
          <div className="text-3xl">☕</div>
          {/* Chair 2 - empty with ghost effect */}
          <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity }}>
            <div className="text-4xl opacity-30">🪑</div>
          </motion.div>
        </motion.div>

        <FadeReveal delay={0.8}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Missing You</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl">
          {[
            "Some places reminded me of you.",
            "A café.",
            "A road.",
            "A familiar song.",
            "Distance has a way of making ordinary places feel different.",
          ].map((line, i) => (
            <motion.p key={i}
              className={`font-body text-lg ${i === 4 ? 'text-blue-300 italic' : i < 4 && i > 0 ? 'text-white/50' : 'text-white/75'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.4, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 5: Night Sky & Moon — hidden secret
function Scene5({ onMoonClick }) {
  return (
    <div className="scene-center" style={{ background: '#000005' }}>
      <AnimatedBackground showStars starCount={220} showParticles={false} showFog />

      {/* Glowing heart constellation */}
      <svg className="fill-absolute pointer-events-none opacity-30">
        <motion.path
          d="M 50% 30% C 40% 20%, 30% 30%, 50% 45% C 70% 30%, 60% 20%, 50% 30%"
          fill="none" stroke="rgba(248,200,220,0.5)" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}>
        </motion.path>
      </svg>

      {/* Clickable moon */}
      <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 text-6xl cursor-pointer"
        animate={{ y: [0, -10, 0], filter: ['drop-shadow(0 0 15px rgba(255,230,150,0.4))', 'drop-shadow(0 0 35px rgba(255,230,150,0.8))', 'drop-shadow(0 0 15px rgba(255,230,150,0.4))'] }}
        transition={{ duration: 5, repeat: Infinity }}
        onClick={onMoonClick} data-cursor-hover whileHover={{ scale: 1.2 }}>
        🌕
      </motion.div>
      <p className="absolute top-32 left-1/2 -translate-x-1/2 font-ui text-white/15 text-xs tracking-widest">Click the moon ✨</p>

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8 mt-32">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Hope</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "The same moon...",
            "The same stars...",
            "The same sky...",
            "It reminded me that even when we were apart...",
            "We were still looking at the same night.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 4 ? 'text-accent-primary italic' : 'text-white/75'}`}
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

// Scene 6: Calendar — one more tomorrow
function Scene6() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div className="scene-center" style={{ background: '#040404' }}>
      <Rain intensity={15} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        {/* Animated calendar */}
        <div className="flex gap-2 flex-wrap justify-center max-w-sm">
          {months.map((m, i) => (
            <motion.div key={i} className="glass rounded-lg w-14 h-14 flex flex-col items-center justify-center"
              style={{ border: '1px solid rgba(107,122,153,0.2)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.6, 0.3], scale: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}>
              <div className="w-2 h-2 rounded-full mb-1" style={{ background: i < 8 ? 'rgba(107,122,153,0.5)' : 'rgba(255,215,0,0.3)' }} />
              <p className="font-ui text-white/30 text-xs">{m}</p>
            </motion.div>
          ))}
        </div>

        <FadeReveal delay={1.2}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Tomorrow</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl">
          {[
            "Distance taught me something.",
            "Sometimes loving someone...",
            "Means believing that another tomorrow will come.",
            "And with it...",
            "Another chance to create new memories.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${[2, 4].includes(i) ? 'text-accent-primary italic' : 'text-white/75'}`}
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

// Scene 7: Silence
function Scene7({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      <Rain intensity={40} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <div className="space-y-6">
          {[
            { text: "And then...", cls: "font-heading text-3xl text-white/40 italic" },
            { text: "Life became unexpectedly quiet.", cls: "font-heading text-4xl md:text-5xl text-white/80" },
          ].map((item, i) => (
            <motion.p key={i} className={item.cls}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.8, duration: 1 }}>
              {item.text}
            </motion.p>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.8 }}>
          <PrimaryButton id="ch11-continue" onClick={onContinue} icon="→">Continue To The Next Memory</PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 11 Main ────────────────────────────────────────────────────────────
export default function Chapter11() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 7

  useEffect(() => {
    if (isPaused) return
    if (scene >= 6) return
    const durations = [12000, 12000, 14000, 12000, 14000, 10000]
    const t = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(t)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => navigate('/chapter/12'), [navigate])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" />,
    <Scene5 key="s5" onMoonClick={() => setShowSecret(true)} />,
    <Scene6 key="s6" />,
    <Scene7 key="s7" onContinue={handleContinue} />,
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: '#040404' }}>
      <ProgressIndicator
        progress={72}
        chapterNum={11}
        chapterTitle="Distance"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain opacity={0.04} />

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
