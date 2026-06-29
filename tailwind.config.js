/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0A0A0A',
          surface: '#111111',
          dark: '#000000',
          chapter4: '#080B14',
        },
        accent: {
          primary: '#F8C8DC',
          secondary: '#FFE5EC',
          gold: '#FFD700',
          blue: '#4F8EF7',
          blueLight: '#A8D8FF',
          pink: '#F8C8DC',
        },
        text: {
          primary: '#FFFFFF',
          muted: 'rgba(255,255,255,0.6)',
          faint: 'rgba(255,255,255,0.3)',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        subheading: ['"Playfair Display"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
        ui: ['"Inter"', 'sans-serif'],
        handwriting: ['"Dancing Script"', 'cursive'],
      },
      borderRadius: {
        sm: '12px',
        md: '20px',
        lg: '32px',
        full: '999px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(255,255,255,0.08)',
        goldGlow: '0 0 40px rgba(255,215,0,0.35)',
        pinkGlow: '0 0 35px rgba(248,200,220,0.40)',
        blueGlow: '0 0 30px rgba(79,142,247,0.40)',
        heartGlow: '0 0 60px rgba(248,200,220,0.6)',
      },
      animation: {
        heartbeat: 'heartbeat 1.2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'float 10s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        fadeIn: 'fadeIn 1s ease forwards',
        shimmer: 'shimmer 2s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 1s linear infinite',
        drift: 'drift 20s linear infinite',
        glowPulse: 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.2)' },
          '70%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.4)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        drift: {
          '0%': { transform: 'translateX(-100vw)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(248,200,220,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(248,200,220,0.8), 0 0 100px rgba(248,200,220,0.4)' },
        },
      },
      backdropBlur: {
        glass: '20px',
        heavy: '40px',
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
        '2xl': '1920px',
      },
      maxWidth: {
        container: '1440px',
      },
      spacing: {
        section: '120px',
      },
      zIndex: {
        cursor: '9999',
        modal: '9000',
        overlay: '8000',
        nav: '7000',
        content: '10',
        bg: '0',
      },
    },
  },
  plugins: [],
}
