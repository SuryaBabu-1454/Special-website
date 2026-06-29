import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimatedBackground from '@components/effects/AnimatedBackground'
import FloatingParticles from '@components/effects/FloatingParticles'
import FilmGrain from '@components/effects/FilmGrain'
import { FadeReveal } from '@components/animations/TextReveal'
import { PrimaryButton } from '@components/buttons/PrimaryButton'
import ProgressIndicator from '@components/common/ProgressIndicator'

// Generate 100 cute reasons
const REASONS = [
  "The way your eyes light up when you're happy.",
  "Your beautiful, contagious laughter.",
  "The quiet comfort of standing beside you.",
  "Your incredibly sweet Good Morning messages.",
  "How you remembered the day we crossed roads.",
  "The safety I felt when you trusted me with your tears.",
  "Sharing a simple Podi Dosa with you.",
  "The excitement of driving you around on the scooty.",
  "How you listen to my dreams without judgment.",
  "Your kindness towards everyone around you.",
  "The cute emojis you use when you text.",
  "Your voice notes that make my days brighter.",
  "How you make ordinary days feel extraordinary.",
  "The warmth of your presence even in silence.",
  "Your wisdom and the way you look at life.",
  "The sweet vanilla milkshake moments we share.",
  "Your support during my college interviews.",
  "How you made forty days of silence feel like a bridge, not a wall.",
  "The way you say my name.",
  "Your patience with me.",
  "Your strength and grace under pressure.",
  "The quiet promises we make to ourselves.",
  "Your fashion sense and dress opinions.",
  "How you make me want to be a better person.",
  "Your gorgeous smile that cures any bad day.",
  "The way we can talk about absolutely anything.",
  "Your love for sunsets and quiet walks.",
  "The cute way you blush.",
  "Your handwriting and the letters you write.",
  "How we find happiness in the smallest dosas.",
  "The magic of our connection on March 5.",
  "The way you hold shopping bags.",
  "Your love for music and songs we share.",
  "The comfort of knowing you are my home.",
  "How you protect our memories.",
  "The beautiful chaos of our everyday conversations.",
  "Your passion for the things you care about.",
  "The way you cross the road carefully.",
  "Your bright energy that fills every room.",
  "How you guide me when I'm lost.",
  "The gentle touch of your hand.",
  "Your lovely hair and the way it moves in the wind.",
  "Your sense of humor that makes me giggle instantly.",
  "How we look at the same moon from different cities.",
  "Your unconditional support in everything I do.",
  "The warmth in your voice when you call.",
  "Your love for simple, cozy cafés.",
  "How you handle my silly jokes.",
  "Your focus and dedication to your work.",
  "The peace I feel when I pray beside you.",
  "Your honesty and pure heart.",
  "The beautiful destiny that brought us together.",
  "How you celebrate my small victories.",
  "The way you make coffee taste sweeter.",
  "Your gentle eyes that make me feel seen.",
  "The reassurance that everything will be okay.",
  "How you make distance feel like nothing.",
  "Your cute stubbornness.",
  "The depth of our conversations at midnight.",
  "Your love for nature and green trees.",
  "How you trust me with your deepest secrets.",
  "The beautiful stories we are building.",
  "Your soft voice when you are sleepy.",
  "How you notice when I am quiet.",
  "Your respect for my parents and family.",
  "The way you encourage me to study and grow.",
  "Your sweet vanilla scent.",
  "The quiet walks under street lights.",
  "How you celebrate your birthdays with grace.",
  "Your love for pods and juices.",
  "The way we laugh at our own chat histories.",
  "Your endless patience during busy days.",
  "How you hold the scooty handles.",
  "The beautiful reflection in your eyes.",
  "Your cute reactions to surprise letters.",
  "How you check if I ate my meals.",
  "The comfort of sharing a quiet tea.",
  "Your dreams for our future.",
  "The cute way you say 'Hmm...'.",
  "How we walk at the same pace.",
  "Your respect for our individual spaces.",
  "The way you light up my darkest thoughts.",
  "Your passion for learning new things.",
  "The simple joy of waiting for you.",
  "Your cute morning face.",
  "The way you make me feel safe in this big world.",
  "Your love for simple, starry skies.",
  "How you keep all our photos safe.",
  "Your beautiful, pure soul.",
  "The way you care for the little details.",
  "Your warm, healing hugs.",
  "How you make my heart beat faster and slower at the same time.",
  "The quiet promise of your trust.",
  "Your intelligence and bright mind.",
  "The sweet way you look after my health.",
  "Your love for life's tiny adventures.",
  "How you chose me out of the crowd.",
  "The way you say 'Good Night'.",
  "The beautiful chapters we haven't written yet.",
  "Simply... because you are you. ❤️"
]

function SecretModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9000 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div className="relative glass-pink rounded-xl p-10 max-w-md mx-6 text-center"
            initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }} onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4" style={{ animation: 'heartbeat 1s ease infinite' }}>❤️</div>
            <h3 className="font-heading text-2xl text-accent-primary mb-4">Hidden Love Letter</h3>
            <p className="font-body text-white/80 leading-relaxed italic">
              "Even after 100 reasons... I know there are countless more waiting to be discovered. ❤️"
            </p>
            <button className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors" onClick={onClose}>Close ✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Main component
export default function Chapter13() {
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [showSecret, setShowSecret] = useState(false)
  const [openedCards, setOpenedCards] = useState(new Set([0]))
  const maxScenes = 3 // 0: intro, 1: interactive deck, 2: ending transition

  // Auto-advance scenes 0 and 2
  useEffect(() => {
    if (isPaused) return
    if (scene === 1) return // pause auto-advance during interactive cards
    if (scene >= 2) return
    const durations = [6000, 8000]
    const t = setTimeout(() => setScene(prev => prev + 1), durations[scene])
    return () => clearTimeout(t)
  }, [scene, isPaused])

  const drawNextCard = useCallback(() => {
    if (currentCard < 99) {
      const next = currentCard + 1
      setCurrentCard(next)
      setOpenedCards(prev => {
        const nextSet = new Set(prev)
        nextSet.add(next)
        return nextSet
      })
    } else {
      // 100th card reached
      setShowSecret(true)
    }
  }, [currentCard])

  const drawPrevCard = useCallback(() => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
    }
  }, [currentCard])

  const handleContinue = useCallback(() => navigate('/chapter/14'), [navigate])

  return (
    <div className="relative overflow-hidden w-full min-h-100vh" style={{ background: '#050508' }}>
      <ProgressIndicator
        progress={88}
        chapterNum={13}
        chapterTitle="100 Reasons"
        scene={scene}
        setScene={setScene}
        maxScenes={maxScenes}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <FilmGrain opacity={0.03} />

      <AnimatePresence mode="wait">
        {scene === 0 && (
          <motion.div key="intro" className="scene-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <AnimatedBackground showStars starCount={80} showParticles particleCount={25} showFog />
            <div className="relative z-10 text-center max-w-3xl px-6 space-y-8">
              <FadeReveal delay={0.3}>
                <p className="font-heading text-white/30 text-xs tracking-widest uppercase">Chapter 13 — Intro</p>
              </FadeReveal>
              <div className="text-7xl mb-2" style={{ animation: 'heartbeat 2s infinite' }}>💌</div>
              <FadeReveal delay={0.6}>
                <h2 className="font-heading text-4xl md:text-6xl text-white">100 Reasons Why</h2>
              </FadeReveal>
              <div className="space-y-4 max-w-xl mx-auto">
                {[
                  "There are moments when words fail us.",
                  "Yet, my heart always knew exactly why.",
                  "I gathered a list of one hundred little things...",
                  "That make you so special to me."
                ].map((line, i) => (
                  <motion.p key={i} className="font-body text-white/70 text-lg"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.4, duration: 0.7 }}>
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {scene === 1 && (
          <motion.div key="interactive" className="scene-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <AnimatedBackground showStars starCount={120} showParticles={false} />
            <FloatingParticles type="hearts" count={12} />

            <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-lg px-6">
              {/* Deck header */}
              <div className="text-center space-y-1">
                <h3 className="font-heading text-2xl text-white">Reasons I Love You</h3>
                <p className="font-ui text-white/40 text-xs uppercase tracking-widest">
                  Card {currentCard + 1} of 100
                </p>
              </div>

              {/* The Card Deck Stack */}
              <div className="relative w-72 h-96 flex items-center justify-center select-none">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentCard}
                    className="polaroid absolute w-full h-full flex flex-col justify-between"
                    style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))' }}
                    initial={{ scale: 0.9, opacity: 0, rotate: -5, y: 20 }}
                    animate={{ scale: 1, opacity: 1, rotate: (currentCard % 2 === 0 ? 2 : -2), y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, x: 200, rotate: 15 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                  >
                    {/* Top rose graphic */}
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100/30 h-48 rounded-md flex items-center justify-center text-6xl">
                      {currentCard === 99 ? '❤️' : '🌹'}
                    </div>

                    {/* Content text */}
                    <div className="flex-1 flex items-center justify-center px-4 py-6">
                      <p className="font-body text-gray-800 text-base font-medium leading-relaxed text-center italic">
                        "{REASONS[currentCard]}"
                      </p>
                    </div>

                    {/* Index number footer */}
                    <div className="text-right px-4 pb-3">
                      <span className="font-handwriting text-pink-500 text-lg font-semibold">#{currentCard + 1}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6 mt-4">
                <button
                  onClick={drawPrevCard}
                  disabled={currentCard === 0}
                  className="glass w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none active:scale-95"
                  title="Previous Card"
                  data-cursor-hover
                >
                  ◀
                </button>
                <div className="w-24 text-center">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-400 to-accent-primary" style={{ width: `${((currentCard + 1) / 100) * 100}%` }} />
                  </div>
                </div>
                <button
                  onClick={drawNextCard}
                  className="glass-pink w-14 h-14 rounded-full flex items-center justify-center text-pink-300 hover:text-white transition-all active:scale-95"
                  title={currentCard === 99 ? "Reveal Secret Letter" : "Next Card"}
                  data-cursor-hover
                >
                  {currentCard === 99 ? '💝' : '▶'}
                </button>
              </div>

              {/* Secret indicator */}
              {currentCard === 99 && (
                <motion.p className="text-accent-primary text-xs font-ui tracking-widest uppercase cursor-pointer"
                  animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
                  onClick={() => setShowSecret(true)}>
                  Click card or heart to read secret letter
                </motion.p>
              )}

              {/* Jump to end helper for convenience */}
              {currentCard < 90 && (
                <button
                  onClick={() => {
                    setCurrentCard(99)
                    setOpenedCards(prev => {
                      const nextSet = new Set(prev)
                      nextSet.add(99)
                      return nextSet
                    })
                  }}
                  className="text-white/20 hover:text-white/40 text-xs transition-colors font-ui tracking-wide"
                >
                  Jump to Reason #100 ➔
                </button>
              )}

              {openedCards.size >= 100 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <PrimaryButton id="ch13-next-scene" onClick={() => setScene(2)} icon="→">
                    Continue to Chapter 14
                  </PrimaryButton>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {scene === 2 && (
          <motion.div key="ending" className="scene-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <AnimatedBackground showStars starCount={100} showParticles particleCount={30} showFog />
            <div className="relative z-10 text-center max-w-2xl px-6 space-y-10">
              <motion.div className="text-7xl"
                animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                💝
              </motion.div>
              <div className="space-y-5">
                <FadeReveal delay={0.4}>
                  <h2 className="font-heading text-4xl md:text-5xl text-white">Thank You</h2>
                </FadeReveal>
                <div className="space-y-4">
                  {[
                    "Every reason is a reminder...",
                    "Of how beautiful life is with you.",
                    "And next...",
                    "Comes a very special day."
                  ].map((line, i) => (
                    <motion.p key={i} className={`font-body text-xl ${i === 3 ? 'text-accent-primary italic font-heading text-3xl' : 'text-white/70'}`}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.4, duration: 0.7 }}>
                      {line}
                    </motion.p>
                  ))}
                </div>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.8 }}>
                <PrimaryButton id="ch13-continue" onClick={handleContinue} icon="→">
                  Open The Birthday Gate
                </PrimaryButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SecretModal show={showSecret} onClose={() => setShowSecret(false)} />
    </div>
  )
}
