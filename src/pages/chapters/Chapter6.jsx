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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div className="relative glass rounded-xl p-10 max-w-md mx-6 text-center"
            style={{ border: '1px solid rgba(108,139,199,0.4)' }}
            initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }} onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4">💙</div>
            <h3 className="font-heading text-2xl text-blue-300 mb-4">A Hidden Truth</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "The bravest thing I ever did was stay... when you needed someone who wouldn't leave. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Rain effect component
function RainEffect({ intensity = 30 }) {
  return (
    <div className="fill-absolute overflow-hidden pointer-events-none opacity-30">
      {Array.from({ length: intensity }).map((_, i) => (
        <div key={i} className="absolute"
          style={{
            left: `${Math.random() * 100}%`, top: '-5px',
            width: '1px', height: `${Math.random() * 30 + 15}px`,
            background: 'linear-gradient(180deg, rgba(150,180,255,0.6), transparent)',
            animation: `rain ${Math.random() * 0.4 + 0.6}s linear ${Math.random() * 2}s infinite`,
          }} />
      ))}
      <style>{`
        @keyframes rain {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}

// Scene 1: Silence
function Scene1() {
  return (
    <div className="scene-center" style={{ background: '#050505' }}>
      <RainEffect />
      <AnimatedBackground showStars={false} showParticles={false} showFog />

      {/* Window with rain */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-10" style={{
        background: 'linear-gradient(90deg, transparent, rgba(150,180,255,0.1))',
      }} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <FadeReveal delay={0.3}>
          <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Chapter 06 — Scene 1</p>
        </FadeReveal>
        <div className="text-6xl">🌧️</div>
        <FadeReveal delay={0.7}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">An Unexpected Evening</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "Some evenings arrive quietly...",
            "Without warning...",
            "Without any sign...",
            "That they are about to change everything.",
          ].map((line, i) => (
            <motion.p key={i} className="font-body text-lg text-white/70"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.5, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 2: Incoming Call
function Scene2() {
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      <RainEffect intensity={20} />
      <AnimatedBackground showStars={false} showParticles={false} showFog />

      {/* Phone screen */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        <motion.div className="relative"
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}>
          {/* Phone body */}
          <div className="glass rounded-3xl w-56 overflow-hidden"
            style={{ border: '1px solid rgba(108,139,199,0.4)', boxShadow: '0 0 50px rgba(108,139,199,0.2)' }}>
            <div className="bg-gradient-to-b from-blue-900/30 to-black/60 p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl font-bold"
                style={{ background: 'linear-gradient(135deg, #6C8BC7, #3A4A6A)' }}>
                S
              </div>
              <p className="font-ui text-white font-medium">Saranya</p>
              <p className="font-ui text-white/40 text-xs tracking-widest uppercase">Incoming Call...</p>
              {/* Pulse ring */}
              <motion.div className="w-24 h-24 mx-auto rounded-full border-2 border-blue-400/30"
                animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}>
              </motion.div>
              {/* Accept button */}
              <div className="flex justify-center gap-8 pt-2">
                <div className="w-12 h-12 rounded-full bg-green-500/80 flex items-center justify-center text-xl">📞</div>
                <div className="w-12 h-12 rounded-full bg-red-500/40 flex items-center justify-center text-xl">📵</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center space-y-4 max-w-md px-6">
          <FadeReveal delay={1.2}>
            <h2 className="font-heading text-4xl text-white">Incoming Call</h2>
          </FadeReveal>
          <div className="space-y-3">
            {[
              "I didn't think much of it at first.",
              "But then I heard your voice...",
              "And I knew something was wrong.",
            ].map((line, i) => (
              <motion.p key={i} className="font-body text-lg text-white/70"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + i * 0.4, duration: 0.6 }}>
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Scene 3: She Was Crying
function Scene3() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #050505, #030308)' }}>
      <RainEffect intensity={25} />
      <AnimatedBackground showStars={false} showParticles={false} showFog />

      {/* Blue glow */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(58,74,106,0.15) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
        <motion.div className="text-6xl"
          animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
          😢
        </motion.div>

        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">You Were Crying</h2>
        </FadeReveal>

        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "You called me...",
            "And the moment I heard you cry...",
            "Something inside me changed.",
            "I didn't know what to say.",
            "But I knew...",
            "I wasn't going to let you face it alone.",
          ].map((line, i) => (
            <motion.p key={i}
              className={`font-body text-lg ${[4, 5].includes(i) ? 'text-blue-300 italic' : 'text-white/75'}`}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.4, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 4: Being There
function Scene4() {
  return (
    <div className="scene-center" style={{ background: '#050505' }}>
      <RainEffect intensity={15} />
      <AnimatedBackground showStars starCount={40} showParticles={false} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-10">
        <div className="flex justify-center gap-4 text-5xl">
          <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>🫂</motion.span>
        </div>

        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">I Was There</h2>
        </FadeReveal>

        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "I stayed on the call.",
            "For as long as you needed.",
            "Sometimes words aren't enough.",
            "Sometimes...",
            "Just knowing someone is there...",
            "Is everything.",
          ].map((line, i) => (
            <motion.p key={i}
              className={`font-body text-lg ${[4, 5].includes(i) ? 'text-accent-secondary italic' : 'text-white/75'}`}
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

// Scene 5: Trust
function Scene5() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #050505, #0A0A14)' }}>
      <AnimatedBackground showStars starCount={120} showParticles particleCount={20} showFog />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-10">
        <motion.div className="text-7xl"
          animate={{ scale: [1, 1.1, 1], filter: ['drop-shadow(0 0 10px rgba(248,200,220,0.3))', 'drop-shadow(0 0 30px rgba(248,200,220,0.8))', 'drop-shadow(0 0 10px rgba(248,200,220,0.3))'] }}
          transition={{ duration: 3, repeat: Infinity }}>
          🤝
        </motion.div>

        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-6xl text-white" style={{ textShadow: '0 0 40px rgba(248,200,220,0.3)' }}>
            Trust
          </h2>
        </FadeReveal>

        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "That day...",
            "You trusted me with your tears.",
            "And that...",
            "Changed everything.",
            "Because when someone trusts you with their pain...",
            "They've already given you their heart.",
          ].map((line, i) => (
            <motion.p key={i}
              className={`font-body text-lg ${[4, 5].includes(i) ? 'text-accent-primary italic' : 'text-white/75'}`}
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

// Scene 6: Relief — the transition to warmth + continue
function Scene6({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #050505, #0A0A0A)' }}>
      <AnimatedBackground showStars starCount={100} showParticles particleCount={30} showFog />
      <FloatingParticles type="mixed" count={20} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <motion.div className="text-7xl"
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}
          style={{ filter: 'drop-shadow(0 0 30px rgba(248,200,220,0.7))' }}>
          ❤️
        </motion.div>

        <div className="space-y-5">
          <FadeReveal delay={0.5}>
            <h2 className="font-heading text-4xl md:text-5xl" style={{
              background: 'linear-gradient(135deg, #F8C8DC, #FFD700)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>More Than I Knew</h2>
          </FadeReveal>
          <div className="space-y-4">
            {[
              "I realized then...",
              "That you meant more to me...",
              "Than I had ever allowed myself to admit.",
              "And no matter what happened...",
              "I would always choose to be there for you.",
            ].map((line, i) => (
              <motion.p key={i} className={`font-body text-xl ${[2, 4].includes(i) ? 'text-accent-primary italic' : 'text-white/75'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.4, duration: 0.7 }}>
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 0.8 }}>
          <PrimaryButton id="ch6-complete" onClick={onContinue} icon="→">
            Continue To The Next Memory
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 6 Main ─────────────────────────────────────────────────────────
export default function Chapter6() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 6

  useEffect(() => {
    if (isPaused) return
    if (scene >= 5) return
    const durations = [8000, 10000, 10000, 10000, 10000]
    const timer = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(timer)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => navigate('/chapter/7'), [navigate])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" />,
    <Scene5 key="s5" />,
    <Scene6 key="s6" onContinue={handleContinue} />,
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: '#050505' }}>
      <ProgressIndicator
        progress={36}
        chapterNum={6}
        chapterTitle="The Day You Called Me Crying"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain opacity={0.035} />

      {/* Hidden raindrop heart */}
      <motion.div
        className="fixed bottom-24 left-8 z-50 text-3xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => setShowSecret(true)}
        data-cursor-hover
        whileHover={{ scale: 1.3, filter: 'drop-shadow(0 0 15px rgba(108,139,199,0.9))' }}
      >
        🌧️
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
