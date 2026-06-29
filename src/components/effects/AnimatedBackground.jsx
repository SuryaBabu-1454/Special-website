import { useEffect, useRef, useMemo } from 'react'
import { useMouseParallax } from '@hooks/useParallax'

// Star field component
function StarField({ count = 200 }) {
  const stars = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
    opacity: Math.random() * 0.7 + 0.2,
  })), [count])

  return (
    <div className="fill-absolute overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}

// Floating dust particles
function DustParticles({ count = 80 }) {
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: -(Math.random() * 0.2 + 0.05),
    opacity: Math.random() * 0.4 + 0.1,
    delay: Math.random() * 10,
    duration: Math.random() * 15 + 10,
  })), [count])

  return (
    <div className="fill-absolute overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `rgba(248, 200, 220, ${p.opacity})`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  )
}

// Animated gradient background
function AnimatedGradient({ color1 = '#0A0A0A', color2 = '#111111', color3 = '#0D0A14' }) {
  return (
    <div
      className="fill-absolute"
      style={{
        background: `radial-gradient(ellipse at 20% 50%, ${color2} 0%, transparent 60%),
                     radial-gradient(ellipse at 80% 50%, ${color3} 0%, transparent 60%),
                     ${color1}`,
        animation: 'gradientShift 15s ease infinite alternate',
      }}
    />
  )
}

// Fog overlay
function FogOverlay() {
  return (
    <div
      className="fill-absolute pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% 120%, rgba(248,200,220,0.04) 0%, transparent 70%),
          radial-gradient(ellipse 60% 40% at 20% 0%, rgba(255,215,0,0.02) 0%, transparent 60%)
        `,
        animation: 'fogDrift 25s ease-in-out infinite alternate',
      }}
    />
  )
}

export default function AnimatedBackground({
  showStars = true,
  showParticles = true,
  showFog = true,
  showGradient = true,
  starCount = 150,
  particleCount = 60,
  gradientColor1 = '#0A0A0A',
  gradientColor2 = 'rgba(20,10,30,1)',
  gradientColor3 = 'rgba(15,10,25,1)',
  mouseReactive = true,
  className = '',
}) {
  const parallax = useMouseParallax(8)

  return (
    <div className={`fill-absolute overflow-hidden ${className}`} style={{ zIndex: 0 }}>
      {/* Base gradient */}
      {showGradient && (
        <AnimatedGradient
          color1={gradientColor1}
          color2={gradientColor2}
          color3={gradientColor3}
        />
      )}

      {/* Star field with parallax */}
      {showStars && (
        <div
          className="fill-absolute"
          style={{
            transform: mouseReactive
              ? `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.5}px, 0)`
              : undefined,
            transition: 'transform 0.1s linear',
          }}
        >
          <StarField count={starCount} />
        </div>
      )}

      {/* Dust particles */}
      {showParticles && <DustParticles count={particleCount} />}

      {/* Fog */}
      {showFog && <FogOverlay />}

      {/* Vignette */}
      <div
        className="fill-absolute pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <style>{`
        @keyframes gradientShift {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(30deg); }
        }
        @keyframes fogDrift {
          0% { transform: translateX(0) scale(1); }
          100% { transform: translateX(30px) scale(1.05); }
        }
      `}</style>
    </div>
  )
}
