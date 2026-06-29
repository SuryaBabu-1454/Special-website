import { createContext, useContext, useRef, useCallback, useState } from 'react'

const AudioCtx = createContext(null)

// Web Audio API based ambient sound generator
const createAmbientOscillator = (audioCtx, frequency, gain, type = 'sine') => {
  const osc = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime)
  gainNode.gain.setValueAtTime(gain, audioCtx.currentTime)
  osc.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  return { osc, gainNode }
}

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [masterVolume, setMasterVolume] = useState(0.75)
  const [isMuted, setIsMuted] = useState(false)
  const audioContextRef = useRef(null)
  const gainNodeRef = useRef(null)

  const initAudio = useCallback(() => {
    if (audioContextRef.current) return
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioContextRef.current = new AudioContext()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.gain.setValueAtTime(masterVolume, audioContextRef.current.currentTime)
      gainNodeRef.current.connect(audioContextRef.current.destination)
    } catch (e) {
      console.warn('Web Audio API not supported:', e)
    }
  }, [masterVolume])

  const play = useCallback((type = 'ambient') => {
    initAudio()
    setIsPlaying(true)
  }, [initAudio])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setValueAtTime(
          prev ? masterVolume : 0,
          audioContextRef.current.currentTime
        )
      }
      return !prev
    })
  }, [masterVolume])

  const playHeartbeat = useCallback(() => {
    if (!audioContextRef.current || isMuted) return
    try {
      const ctx = audioContextRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.setValueAtTime(80, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.1)
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.3)

      setTimeout(() => {
        if (!audioContextRef.current) return
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.frequency.setValueAtTime(75, ctx.currentTime)
        gain2.gain.setValueAtTime(0.2, ctx.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
        osc2.start(ctx.currentTime)
        osc2.stop(ctx.currentTime + 0.25)
      }, 150)
    } catch (e) {
      // Silently fail
    }
  }, [isMuted])

  const playClick = useCallback(() => {
    if (!audioContextRef.current || isMuted) return
    try {
      const ctx = audioContextRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1)
      gain.gain.setValueAtTime(0.1, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.15)
    } catch (e) {}
  }, [isMuted])

  const playChime = useCallback(() => {
    if (!audioContextRef.current || isMuted) return
    try {
      const ctx = audioContextRef.current
      const frequencies = [523.25, 659.25, 783.99, 1046.5]
      frequencies.forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.type = 'sine'
          osc.frequency.setValueAtTime(freq, ctx.currentTime)
          gain.gain.setValueAtTime(0.15, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 0.8)
        }, i * 120)
      })
    } catch (e) {}
  }, [isMuted])

  return (
    <AudioCtx.Provider value={{
      isPlaying, isMuted, masterVolume,
      play, pause, toggleMute,
      playHeartbeat, playClick, playChime,
      initAudio, setMasterVolume,
    }}>
      {children}
    </AudioCtx.Provider>
  )
}

export const useAudioContext = () => {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudioContext must be inside AudioProvider')
  return ctx
}
