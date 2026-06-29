import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Premium Chat Interface for Chapter 4
export function ChatInterface({ messages = [], isVisible = true }) {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.8 }}
    >
      {/* Phone frame */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(8,11,20,0.95)',
          border: '1px solid rgba(79,142,247,0.25)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(79,142,247,0.15)',
        }}
      >
        {/* Chat header */}
        <div
          className="glass-blue px-5 py-4 flex items-center gap-3"
          style={{ borderBottom: '1px solid rgba(79,142,247,0.15)' }}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
            style={{ background: 'linear-gradient(135deg, #4F8EF7, #A8D8FF)' }}>
            S
          </div>
          <div>
            <p className="font-ui font-medium text-sm text-white">Saranya</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <p className="font-ui text-xs text-white/40">LinkedIn · Connected</p>
            </div>
          </div>
          <div className="ml-auto text-white/30 text-xs font-ui">🔒</div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3 min-h-48 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`flex ${msg.sender === 'Surya' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
              >
                <div
                  className="max-w-xs px-4 py-2.5 rounded-2xl text-sm font-body"
                  style={{
                    background: msg.sender === 'Surya'
                      ? 'linear-gradient(135deg, rgba(79,142,247,0.7), rgba(79,142,247,0.5))'
                      : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    borderRadius: msg.sender === 'Surya'
                      ? '18px 18px 4px 18px'
                      : '18px 18px 18px 4px',
                    border: msg.sender !== 'Surya' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  }}
                >
                  {msg.text}
                  <div className="text-right text-white/30 text-xs mt-1">
                    {msg.sender === 'Surya' ? '✓✓' : ''}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <TypingIndicator />
          <div ref={endRef} />
        </div>

        {/* Bottom bar */}
        <div
          className="px-4 py-3 flex items-center gap-3"
          style={{ borderTop: '1px solid rgba(79,142,247,0.1)' }}
        >
          <div className="flex-1 glass rounded-full px-4 py-2 text-white/20 text-sm font-body">
            Type a message...
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: 'rgba(79,142,247,0.5)' }}>
            ↑
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40"
              style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
