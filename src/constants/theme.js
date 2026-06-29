// Design token constants
export const COLORS = {
  bg: '#0A0A0A',
  surface: '#111111',
  dark: '#000000',
  text: '#FFFFFF',
  accentPrimary: '#F8C8DC',
  accentSecondary: '#FFE5EC',
  gold: '#FFD700',
  blue: '#4F8EF7',
  blueLight: '#A8D8FF',
  chapter4bg: '#080B14',
  chapter6bg: '#050505',
}

export const SHADOWS = {
  glass: '0 8px 32px rgba(255,255,255,0.08)',
  goldGlow: '0 0 40px rgba(255,215,0,0.35)',
  pinkGlow: '0 0 35px rgba(248,200,220,0.40)',
  blueGlow: '0 0 30px rgba(79,142,247,0.40)',
  heartGlow: '0 0 60px rgba(248,200,220,0.6)',
}

export const FONTS = {
  heading: '"Cormorant Garamond", serif',
  subheading: '"Playfair Display", serif',
  body: '"Outfit", sans-serif',
  ui: '"Inter", sans-serif',
  handwriting: '"Dancing Script", cursive',
}

export const RADII = {
  sm: '12px',
  md: '20px',
  lg: '32px',
  circle: '999px',
}

export const ANIMATION = {
  defaultDuration: 1.2,
  stagger: 0.08,
  ease: [0.25, 0.46, 0.45, 0.94],
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  spring: { type: 'spring', stiffness: 100, damping: 20 },
}
