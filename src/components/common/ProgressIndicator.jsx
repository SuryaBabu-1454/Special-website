import { useEffect } from 'react'

export default function ProgressIndicator({
  progress = 0,
  chapterNum = 0,
  chapterTitle = '',
  scene,
  setScene,
  maxScenes,
  isPaused,
  setIsPaused
}) {
  // Add keyboard controls for slideshow navigation
  useEffect(() => {
    if (scene === undefined || !setScene || maxScenes === undefined) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setScene(prev => Math.max(0, prev - 1))
      } else if (e.key === 'ArrowRight') {
        setScene(prev => Math.min(maxScenes - 1, prev + 1))
      } else if (e.key === ' ') {
        e.preventDefault() // prevent page scrolling
        if (setIsPaused) {
          setIsPaused(p => !p)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scene, setScene, maxScenes, setIsPaused])

  return (
    <>
      {/* Top progress bar */}
      <div className="progress-track" style={{ zIndex: 7000 }}>
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Chapter label */}
      {chapterNum > 0 && (
        <div
          className="fixed top-4 right-6 glass px-4 py-2 rounded-full text-xs font-ui text-white/60 tracking-widest uppercase flex items-center gap-2"
          style={{ zIndex: 7000 }}
        >
          <span>Chapter {String(chapterNum).padStart(2, '0')}</span>
          <span className="text-white/20">|</span>
          <span className="text-accent-primary normal-case font-body italic">{chapterTitle}</span>
        </div>
      )}

      {/* Navigation Controls Overlay */}
      {scene !== undefined && setScene && maxScenes !== undefined && (
        <div
          className="fixed bottom-6 right-6 glass px-5 py-2.5 rounded-full flex items-center gap-4 text-sm font-ui text-white/80 select-none shadow-lg"
          style={{ zIndex: 7000, border: '1px solid rgba(255, 255, 255, 0.15)' }}
          data-cursor-hover
        >
          {/* Previous Button */}
          <button
            onClick={() => setScene(prev => Math.max(0, prev - 1))}
            disabled={scene === 0}
            className={`hover:text-accent-primary transition-colors flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/5 active:scale-95 ${scene === 0 ? 'opacity-25 pointer-events-none' : ''}`}
            title="Previous Scene (Left Arrow)"
          >
            ◀
          </button>

          {/* Play/Pause Button */}
          {isPaused !== undefined && setIsPaused && (
            <button
              onClick={() => setIsPaused(p => !p)}
              className="hover:text-accent-primary transition-colors flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/5 active:scale-95 text-xs"
              title={isPaused ? "Play (Spacebar)" : "Pause (Spacebar)"}
            >
              {isPaused ? "▶" : "⏸"}
            </button>
          )}

          {/* Next Button */}
          <button
            onClick={() => setScene(prev => Math.min(maxScenes - 1, prev + 1))}
            disabled={scene >= maxScenes - 1}
            className={`hover:text-accent-primary transition-colors flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/5 active:scale-95 ${scene >= maxScenes - 1 ? 'opacity-25 pointer-events-none' : ''}`}
            title="Next Scene (Right Arrow)"
          >
            ▶
          </button>

          {/* Scene Counter */}
          <div className="h-4 w-px bg-white/10" />
          <span className="text-xs text-white/40 font-mono tracking-wider font-semibold">
            {scene + 1} / {maxScenes}
          </span>
        </div>
      )}
    </>
  )
}
