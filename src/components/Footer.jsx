import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#09090b] border-t border-zinc-900 overflow-hidden pt-24 pb-12">
      {/* SVG Wave Background with parallax sliding animation */}
      <div className="absolute inset-x-0 top-0 h-[100px] pointer-events-none select-none overflow-hidden">
        <svg
          className="absolute left-0 w-[200%] h-full opacity-[0.03] animate-[wave-move_25s_linear_infinite]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <path
            d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1350,20 1500,60 C1650,100 1850,20 2000,60 L2000,120 L0,120 Z"
            fill="#3b82f6"
          />
        </svg>
        <svg
          className="absolute left-0 w-[200%] h-full opacity-[0.02] animate-[wave-move_15s_linear_infinite_reverse] bottom-0"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <path
            d="M0,50 C180,90 310,10 480,50 C650,90 820,10 990,50 C1160,90 1330,10 1500,50 C1670,90 1840,10 2010,50 L2010,120 L0,120 Z"
            fill="#06b6d4"
          />
        </svg>
      </div>

      {/* CSS wave animation helper */}
      <style>{`
        @keyframes wave-move {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-25%, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        {/* Decorative Brand Icon */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mb-6 flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-800 bg-zinc-950/80 text-sm font-bold font-display text-zinc-400 select-none shadow-md shadow-black/10"
        >
          GP
        </motion.div>

        {/* Brand Text */}
        <p className="font-display font-medium text-sm text-zinc-500 max-w-sm leading-relaxed mb-4">
          Designing and engineering high-quality custom software applications & engaging web experiences.
        </p>

        <div className="w-12 h-[1px] bg-zinc-850 my-4" />

        {/* Copyright */}
        <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          Copyright &copy; {currentYear} by Ghanashyam Panda. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
