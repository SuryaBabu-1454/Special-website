export const AUDIO_CONFIG = {
  masterVolume: 0.75,
  autoplay: false,
  crossFadeDuration: 2000,
  ambient: true,
  heartbeat: true,
}

export const SCROLL_CONFIG = {
  lerp: 0.08,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  infinite: false,
  smooth: true,
}

export const CURSOR_CONFIG = {
  size: 32,
  trailLength: 8,
  hoverScale: 1.4,
  heartbeatInterval: 1200,
}

export const LOADER_CONFIG = {
  totalDuration: 6000,
  steps: [
    { duration: 2000, content: '❤️', animation: 'heartbeat', type: 'emoji' },
    { duration: 2000, content: 'Some stories are written by fate.', animation: 'fadeIn', type: 'text' },
    { duration: 2000, content: 'This one is ours.', animation: 'wordReveal', type: 'text' },
  ],
}

export const PERFORMANCE = {
  fpsTarget: 60,
  gpuAcceleration: true,
  lazyLoad: true,
  imageOptimization: true,
}

export const CHAPTERS = [
  { id: 1, path: '/chapter/1', title: 'Before I Met You', progress: 5, color: '#111111' },
  { id: 2, path: '/chapter/2', title: 'The Girl Who Already Knew Me', progress: 10, color: '#F8C8DC' },
  { id: 3, path: '/chapter/3', title: 'The First Time I Truly Saw You', progress: 15, color: '#FFE5EC' },
  { id: 4, path: '/chapter/4', title: 'The Message That Changed Everything', progress: 20, color: '#4F8EF7' },
  { id: 5, path: '/chapter/5', title: 'Our Everyday', progress: 28, color: '#FFE5EC' },
  { id: 6, path: '/chapter/6', title: 'The Day You Called Me Crying', progress: 36, color: '#3A4A6A' },
]
