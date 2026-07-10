import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const duration = 1500 // 1.5 seconds loading simulation
    const intervalTime = 20
    const step = 100 / (duration / intervalTime)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setVisible(false)
            setTimeout(onFinish, 600) // Call onFinish after fadeout animation
          }, 400)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [onFinish])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#09090b] text-[#f4f4f5]"
        >
          {/* Neon Aurora Glow in loader background */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none animate-pulse" />
          
          <div className="relative flex flex-col items-center max-w-xs w-full px-4">
            {/* Pulsing Modern Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-8 relative flex items-center justify-center w-16 h-16 rounded-xl border border-blue-500/30 bg-blue-500/5 glow-text"
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-md animate-pulse" />
              <span className="text-2xl font-bold font-display text-blue-400">GP</span>
            </motion.div>

            {/* Title */}
            <h2 className="mb-2 font-display text-lg tracking-wider uppercase text-zinc-400">
              Initializing Experience
            </h2>

            {/* Percentage */}
            <div className="mb-4 font-mono text-3xl font-semibold text-white tracking-widest">
              {Math.round(progress)}%
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-[3px] bg-zinc-800 rounded-full overflow-hidden relative">
              {/* Glowing active bar */}
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full relative"
                style={{ width: `${progress}%` }}
                layout
              >
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-white blur-[4px] opacity-70 animate-pulse" />
              </motion.div>
            </div>
            
            {/* Status indicator text */}
            <span className="mt-3 text-xs font-mono text-zinc-500 uppercase tracking-widest text-center h-4">
              {progress < 30 && 'Resolving assets...'}
              {progress >= 30 && progress < 70 && 'Structuring components...'}
              {progress >= 70 && progress < 100 && 'Rendering layout...'}
              {progress === 100 && 'Welcome'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
