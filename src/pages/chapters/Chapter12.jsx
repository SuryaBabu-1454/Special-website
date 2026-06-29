import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedBackground from '@components/effects/AnimatedBackground'
import FloatingParticles from '@components/effects/FloatingParticles'
import FilmGrain from '@components/effects/FilmGrain'
import { FadeReveal } from '@components/animations/TextReveal'
import { PrimaryButton } from '@components/buttons/PrimaryButton'
import ProgressIndicator from '@components/common/ProgressIndicator'

function Rain({ intensity = 25 }) {
  return (
    <div className="fill-absolute overflow-hidden pointer-events-none opacity-30">
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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <motion.div className="relative glass-pink rounded-xl p-10 max-w-md mx-6 text-center"
            initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }} onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4" style={{ animation: 'heartbeat 1s ease infinite' }}>❤️</div>
            <h3 className="font-heading text-2xl text-accent-primary mb-4">A Quiet Gratitude</h3>
            <p className="font-body text-white/85 leading-relaxed italic">
              "Forty days of silence... and when you came back, it was as if no time had passed at all.
              That's when I knew — some things don't need to be said to be felt. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scene 1: The Calendar
function Scene1() {
  return (
    <div className="scene-center" style={{ background: '#020202' }}>
      <Rain intensity={20} />

      {/* Moonlight from window */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-15" style={{
        background: 'linear-gradient(90deg, transparent, rgba(150,180,255,0.15))',
      }} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        <FadeReveal delay={0.3}>
          <p className="font-heading text-white/20 text-xs tracking-widest uppercase">Chapter 12 — Scene 1</p>
        </FadeReveal>

        {/* Calendar page */}
        <motion.div className="glass rounded-xl p-8 w-48 text-center"
          style={{ border: '1px solid rgba(94,106,135,0.3)', boxShadow: '0 0 30px rgba(94,106,135,0.1)' }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
          <p className="font-ui text-white/30 text-xs tracking-widest uppercase mb-3">Day</p>
          <p className="font-heading text-7xl text-white" style={{ textShadow: '0 0 30px rgba(94,106,135,0.5)', lineHeight: 1 }}>1</p>
          <div className="mt-4 h-px bg-white/10" />
          <p className="font-ui text-white/20 text-xs mt-3">of forty</p>
          {/* Rain on window effect */}
          <div className="mt-4 flex justify-center gap-1 text-blue-300/30 text-xs">🌧️</div>
        </motion.div>

        <FadeReveal delay={0.8}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Day One</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl">
          {[
            "At first...",
            "It felt like a normal pause.",
            "Life gets busy sometimes.",
            "I believed tomorrow would be different.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-blue-300 italic' : 'text-white/70'}`}
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

// Scene 2: Days Passing — animated calendar flip
function Scene2() {
  const [day, setDay] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDay(prev => prev >= 40 ? 40 : prev + 1)
    }, 250)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="scene-center" style={{ background: '#020202' }}>
      <Rain intensity={30} />
      <AnimatedBackground showStars={false} showParticles={false} showFog />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        {/* Flipping day counter */}
        <AnimatePresence mode="wait">
          <motion.div key={day} className="glass rounded-xl p-8 w-48 text-center"
            style={{ border: '1px solid rgba(94,106,135,0.3)' }}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}>
            <p className="font-ui text-white/30 text-xs tracking-widest uppercase mb-2">Day</p>
            <p className="font-heading text-7xl text-white" style={{ lineHeight: 1, textShadow: `0 0 30px rgba(${day > 30 ? '248,200,220' : '94,106,135'},0.5)` }}>{day}</p>
            <p className="font-ui text-white/20 text-xs mt-3">of forty</p>
          </motion.div>
        </AnimatePresence>

        {/* Day / Night indicator */}
        <div className="flex gap-3 items-center">
          <motion.span className="text-2xl" animate={{ opacity: day % 2 === 0 ? 1 : 0.3 }} transition={{ duration: 0.2 }}>☀️</motion.span>
          <div className="w-20 h-1 rounded-full bg-white/10">
            <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #FFD700, #5E6A87)', width: `${(day / 40) * 100}%` }} />
          </div>
          <motion.span className="text-2xl" animate={{ opacity: day % 2 === 1 ? 1 : 0.3 }} transition={{ duration: 0.2 }}>🌙</motion.span>
        </div>

        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Time</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl">
          {[
            "One day became another.",
            "The calendar kept moving.",
            "Morning became night.",
            "Night became morning.",
            "Time never stopped...",
            "Even when it felt like my thoughts had.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 5 ? 'text-blue-300 italic' : 'text-white/65'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.25, duration: 0.5 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 3: Remembering the Good Days — floating photo memories
function Scene3() {
  const memories = [
    { emoji: '⛪', label: 'Church', x: 10, y: 20, rotate: -8, delay: 0.3 },
    { emoji: '🥤', label: 'Milkshake', x: 55, y: 15, rotate: 6, delay: 0.6 },
    { emoji: '🛵', label: 'The Ride', x: 25, y: 55, rotate: -5, delay: 0.9 },
    { emoji: '🌅', label: 'Sunset', x: 70, y: 40, rotate: 8, delay: 1.2 },
    { emoji: '❤️', label: 'Good Morning', x: 15, y: 65, rotate: -10, delay: 1.5 },
    { emoji: '🍛', label: 'Biriyani', x: 65, y: 65, rotate: 5, delay: 1.8 },
  ]

  return (
    <div className="scene-center" style={{ background: '#030305' }}>
      <AnimatedBackground showStars starCount={150} showParticles={false} />
      <FloatingParticles type="mixed" count={15} />

      {/* Floating Polaroids */}
      {memories.map((m, i) => (
        <motion.div key={i} className="absolute polaroid w-24 text-center"
          style={{ left: `${m.x}%`, top: `${m.y}%`, transform: `rotate(${m.rotate}deg)` }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 0.85, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: m.delay, duration: 0.7 },
            scale: { delay: m.delay, duration: 0.7, type: 'spring' },
            y: { delay: m.delay, duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          whileHover={{ scale: 1.2, rotate: 0, zIndex: 20 }} data-cursor-hover>
          <div className="bg-white h-16 flex items-center justify-center text-3xl rounded-sm mb-1">{m.emoji}</div>
          <p className="font-handwriting text-gray-700 text-xs">{m.label}</p>
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-6 mt-52">
        <FadeReveal delay={2.2}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Memories</h2>
        </FadeReveal>
        <div className="space-y-3">
          {[
            "When everything became quiet...",
            "I found myself remembering the little things.",
            "A morning message. A shared laugh.",
            "A peaceful church. A simple milkshake.",
            "Those memories reminded me how meaningful ordinary moments can be.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${i === 4 ? 'text-accent-primary italic' : 'text-white/70'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2.5 + i * 0.35, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 4: Hope — quiet candle in the dark
function Scene4() {
  return (
    <div className="scene-center" style={{ background: '#010101' }}>
      {/* Very subtle rain */}
      <Rain intensity={10} />

      {/* Candle glow */}
      <motion.div className="absolute center-absolute w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,200,80,0.15) 0%, transparent 70%)', filter: 'blur(10px)' }}
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }}>
      </motion.div>

      {/* Candle */}
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-5xl"
        style={{ marginTop: '-100px' }}
        animate={{ filter: ['drop-shadow(0 0 10px rgba(255,200,80,0.4))', 'drop-shadow(0 0 25px rgba(255,200,80,0.8))', 'drop-shadow(0 0 10px rgba(255,200,80,0.4))'] }}
        transition={{ duration: 2, repeat: Infinity }}>
        🕯️
      </motion.div>

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8 mt-32">
        <FadeReveal delay={0.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Hope</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "Even in the quietest moments...",
            "A small part of me never gave up.",
            "Not because I knew what would happen...",
            "But because some things simply feel worth waiting for.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${[1, 3].includes(i) ? 'text-accent-gold italic' : 'text-white/70'}`}
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

// Scene 5: The Reconnection — a message lights up
function Scene5({ onHeartClick }) {
  const [messageVisible, setMessageVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMessageVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="scene-center" style={{ background: '#010101' }}>
      {/* Rain fading away */}
      <Rain intensity={8} />
      <AnimatedBackground showStars starCount={60} showParticles={false} />

      {/* Warm light returning */}
      <motion.div className="fill-absolute pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 60%, rgba(255,200,120,0.05) 0%, transparent 70%)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }}>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-3xl text-center">
        {/* Phone lighting up */}
        <motion.div className="relative"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="glass rounded-3xl overflow-hidden w-52"
            style={{ border: '1px solid rgba(248,200,220,0.2)', boxShadow: messageVisible ? '0 0 40px rgba(248,200,220,0.3)' : 'none', transition: 'box-shadow 1s' }}>
            <div className="bg-gradient-to-b from-pink-900/20 to-black/60 p-6 text-center space-y-3">
              <p className="font-ui text-white/30 text-xs tracking-widest">New Message</p>
              <AnimatePresence>
                {messageVisible && (
                  <motion.div className="glass-pink rounded-xl px-4 py-3"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, type: 'spring' }}>
                    <p className="font-handwriting text-accent-primary text-lg">Good Morning ❤️👑</p>
                    <motion.div className="text-2xl mt-1 cursor-pointer"
                      animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}
                      onClick={onHeartClick} data-cursor-hover>
                      ❤️
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Glow ring */}
          {messageVisible && (
            <motion.div className="absolute center-absolute rounded-full"
              style={{ width: '220px', height: '220px', border: '1px solid rgba(248,200,220,0.3)', zIndex: -1 }}
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}>
            </motion.div>
          )}
        </motion.div>

        <FadeReveal delay={2.5}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">She Was Back</h2>
        </FadeReveal>
        <div className="space-y-4 max-w-xl">
          {[
            "And then...",
            "After forty days...",
            "One morning felt familiar again.",
            "A message. A simple message.",
            "And suddenly, the waiting made sense.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-xl ${i === 4 ? 'text-accent-primary italic text-2xl' : 'text-white/75'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 3 + i * 0.4, duration: 0.7 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 6: Gratitude — the lesson learned
function Scene6() {
  return (
    <div className="scene-center" style={{ background: 'linear-gradient(180deg, #010101, #0A0A0A)' }}>
      <AnimatedBackground showStars starCount={180} showParticles particleCount={20} showFog />
      <FloatingParticles type="hearts" count={15} />

      {/* Returning warmth */}
      <div className="fill-absolute pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(248,200,220,0.07) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-8">
        <motion.div className="text-7xl"
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}
          style={{ filter: 'drop-shadow(0 0 30px rgba(248,200,220,0.7))' }}>
          ❤️
        </motion.div>
        <FadeReveal delay={0.4}>
          <h2 className="font-heading text-4xl md:text-5xl text-white">What Silence Taught Me</h2>
        </FadeReveal>
        <div className="space-y-4">
          {[
            "Those forty days taught me something.",
            "I had taken the little things for granted.",
            "A good morning message.",
            "A simple conversation.",
            "Your presence in my day.",
            "Absence has a way of making you realize...",
            "What you never want to be without.",
          ].map((line, i) => (
            <motion.p key={i} className={`font-body text-lg ${[5, 6].includes(i) ? 'text-accent-primary italic' : 'text-white/75'}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.3, duration: 0.6 }}>
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scene 7: The Final Scene — portal to what's next
function Scene7({ onContinue }) {
  return (
    <div className="scene-center" style={{ background: '#000000' }}>
      <AnimatedBackground showStars starCount={200} showParticles particleCount={30} showFog />

      <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.15, 1], filter: ['drop-shadow(0 0 20px rgba(248,200,220,0.3))', 'drop-shadow(0 0 50px rgba(248,200,220,0.8))', 'drop-shadow(0 0 20px rgba(248,200,220,0.3))'] }}
          transition={{ duration: 4, repeat: Infinity }}>
          🌅
        </motion.div>

        <div className="space-y-6">
          <FadeReveal delay={0.5}>
            <p className="font-heading text-white/40 text-sm tracking-widest uppercase">And So The Story Continues</p>
          </FadeReveal>
          <FadeReveal delay={1}>
            <h2 className="font-heading text-4xl md:text-5xl text-white" style={{ textShadow: '0 0 40px rgba(248,200,220,0.4)' }}>
              Every chapter taught me more about us.
            </h2>
          </FadeReveal>
          <div className="space-y-4">
            {[
              "Thank you for being part of my story.",
              "Thank you for the memories.",
              "Thank you for simply being you.",
            ].map((line, i) => (
              <motion.p key={i} className={`font-body text-xl ${i === 2 ? 'text-accent-primary italic' : 'text-white/70'}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + i * 0.5, duration: 0.8 }}>
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 0.8 }}>
          <PrimaryButton id="ch12-complete" onClick={onContinue} icon="→">
            Continue To The Next Memory
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Chapter 12 Main ────────────────────────────────────────────────────────────
export default function Chapter12() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const maxScenes = 7

  useEffect(() => {
    if (isPaused) return
    if (scene >= 6) return
    const durations = [10000, 16000, 14000, 12000, 14000, 14000]
    const t = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(t)
  }, [scene, isPaused])

  const handleContinue = useCallback(() => navigate('/chapter/13'), [navigate])

  const scenes = [
    <Scene1 key="s1" />,
    <Scene2 key="s2" />,
    <Scene3 key="s3" />,
    <Scene4 key="s4" />,
    <Scene5 key="s5" onHeartClick={() => setShowSecret(true)} />,
    <Scene6 key="s6" />,
    <Scene7 key="s7" onContinue={handleContinue} />,
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: '#020202' }}>
      <ProgressIndicator
        progress={80}
        chapterNum={12}
        chapterTitle="Forty Days"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain opacity={0.045} />

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
