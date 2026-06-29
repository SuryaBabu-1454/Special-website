import { useMemo, useEffect, useRef } from 'react'

function Heart({ size, x, y, delay, duration, opacity, color = '#F8C8DC' }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}px`,
        opacity,
        animation: `floatUp ${duration}s ease-out ${delay}s forwards`,
        filter: `drop-shadow(0 0 ${size}px ${color}80)`,
      }}
    >
      ❤️
    </div>
  )
}

function Dust({ size, x, y, delay, duration, color }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        animation: `floatSpin ${duration}s ease-in-out ${delay}s infinite`,
        filter: 'blur(0.5px)',
      }}
    />
  )
}

function GoldStar({ size, x, y, delay }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}px`,
        animation: `twinkle ${2 + Math.random() * 2}s ease-in-out ${delay}s infinite`,
        filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
      }}
    >
      ✦
    </div>
  )
}

export default function FloatingParticles({
  type = 'dust', // 'dust' | 'hearts' | 'stars' | 'mixed'
  count = 50,
  colors = ['#F8C8DC', '#FFE5EC', '#FFD700'],
  className = '',
}) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 4,
      delay: Math.random() * 8,
      duration: Math.random() * 10 + 5,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  }, [count, colors])

  return (
    <div className={`fill-absolute overflow-hidden pointer-events-none ${className}`}>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100px) rotate(20deg); opacity: 0; }
        }
        @keyframes floatSpin {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-30px) rotate(180deg) scale(1.2); }
        }
      `}</style>

      {particles.map(p => {
        if (type === 'hearts') {
          return <Heart key={p.id} {...p} />
        } else if (type === 'stars') {
          return <GoldStar key={p.id} {...p} />
        } else if (type === 'mixed') {
          const r = p.id % 3
          if (r === 0) return <Heart key={p.id} {...p} />
          if (r === 1) return <GoldStar key={p.id} {...p} size={p.size * 0.6} />
          return <Dust key={p.id} {...p} />
        } else {
          return <Dust key={p.id} {...p} />
        }
      })}
    </div>
  )
}
