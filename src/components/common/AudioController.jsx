import { motion, AnimatePresence } from 'framer-motion'
import { useAudioContext } from '@contexts/AudioContext'

export default function AudioController() {
  const { isPlaying, isMuted, toggleMute, play, initAudio } = useAudioContext()

  const handleToggle = () => {
    initAudio()
    toggleMute()
  }

  return (
    <motion.button
      id="audio-controller"
      className="fixed bottom-6 right-6 glass-pink rounded-full w-12 h-12 flex items-center justify-center"
      style={{ zIndex: 7001, border: '1px solid rgba(248,200,220,0.3)' }}
      onClick={handleToggle}
      whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(248,200,220,0.4)' }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      <span className="text-xl select-none">
        {isMuted ? '🔇' : '🎵'}
      </span>
    </motion.button>
  )
}
