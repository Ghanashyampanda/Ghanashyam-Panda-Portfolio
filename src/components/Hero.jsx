import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowDown } from 'react-icons/fi'

// Reusable Magnetic Button Component
function MagneticButton({ children, href, className, primary = false }) {
  const btnRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    
    btnRef.current.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`
    btnRef.current.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'
  }

  const handleMouseLeave = () => {
    if (!btnRef.current) return
    btnRef.current.style.transform = 'translate(0px, 0px)'
    btnRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
  }

  return (
    <a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-poppins text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
        primary 
          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/30' 
          : 'border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-950/20 hover:bg-zinc-200/80 dark:hover:bg-zinc-900 text-zinc-800 dark:text-white'
      } ${className}`}
    >
      {children}
    </a>
  )
}

// Typing Text Effect
function TypingEffect() {
  const typingTexts = [
    'Engineer',
    'Front End Developer',
    'Full Stack Developer',
    'Back End Developer',
  ]
  const [textIndex, setTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = typingTexts[textIndex]
    let timer

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
      }, 50)
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) => currentText.slice(0, prev.length + 1))
      }, 100)
    }

    if (!isDeleting && displayText === currentText) {
      timer = setTimeout(() => setIsDeleting(true), 1500)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % typingTexts.length)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, textIndex])

  return (
    <span className="relative font-mono font-bold text-2xl md:text-3xl text-gradient bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 dark:from-blue-400 dark:via-cyan-400 dark:to-emerald-400">
      {displayText}
      <span className="animate-pulse font-normal ml-0.5 text-cyan-500 dark:text-cyan-400">|</span>
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 25
      const y = (e.clientY / window.innerHeight - 0.5) * 25
      setParallaxOffset({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      id="home-section" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Glow blobs for background decoration */}
      <div 
        className="absolute w-[300px] md:w-[450px] h-[300px] md:h-[450px] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] md:blur-[130px] pointer-events-none"
        style={{
          top: '20%',
          left: '10%',
          transform: `translate(${parallaxOffset.x * 0.4}px, ${parallaxOffset.y * 0.4}px)`
        }}
      />
      <div 
        className="absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] md:blur-[130px] pointer-events-none"
        style={{
          bottom: '20%',
          right: '10%',
          transform: `translate(${parallaxOffset.x * -0.3}px, ${parallaxOffset.y * -0.3}px)`
        }}
      />

      <div className="container mx-auto px-6 md:px-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Area */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          <span className="font-mono text-sm tracking-widest text-blue-600 dark:text-cyan-400 bg-blue-100/50 dark:bg-cyan-400/10 px-3.5 py-1.5 rounded-full uppercase mb-6 font-semibold">
            Welcome to my universe
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-zinc-900 dark:text-white leading-none mb-4">
            Hello! I'm <br />
            <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400">
              Ghanashyam Panda
            </span>
          </h1>

          <div className="h-12 flex items-center mb-6">
            <TypingEffect />
          </div>

          <p className="max-w-xl text-zinc-650 dark:text-zinc-400 font-sans text-base md:text-lg mb-10 leading-relaxed">
            Highly motivated Software Developer crafting pixel-perfect, scalable web experiences and full-stack solutions. Dedicated to bridging design principles and software systems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <MagneticButton href="https://indiastudyboost.odoo.com" primary>
              <span>Website</span>
              <FiExternalLink className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href="https://github.com/Ghanashyampanda">
              <span>My works</span>
              <FiGithub className="w-4 h-4" />
            </MagneticButton>
          </div>
        </motion.div>

        {/* Profile Image / Abstract Shape Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.9] }}
          className="lg:col-span-5 flex justify-center items-center relative"
          style={{
            transform: `translate(${parallaxOffset.x * -0.5}px, ${parallaxOffset.y * -0.5}px)`
          }}
        >
          {/* Rotating Glowing rings behind profile */}
          <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-blue-500/10 dark:border-blue-500/20 rounded-full animate-[spin_30s_linear_infinite]" />
          <div className="absolute w-[340px] h-[340px] md:w-[440px] md:h-[440px] border border-dashed border-cyan-400/5 dark:border-cyan-400/10 rounded-full animate-[spin_50s_linear_infinite_reverse]" />
          
          {/* Main profile frame */}
          <div className="relative group w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-3xl p-[2px] animate-shimmer-border overflow-hidden shadow-2xl shadow-blue-500/5 dark:shadow-blue-500/10">
            <div className="w-full h-full rounded-[22px] bg-white dark:bg-[#09090b] overflow-hidden relative">
              <img 
                src="/images/about-me.jpg" 
                alt="Ghanashyam Panda" 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 dark:brightness-[0.9] dark:contrast-[1.05]"
              />
              {/* Premium gradient overlay to fade white background into the dark/light theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 dark:from-[#09090b] via-transparent to-black/10 dark:to-[#09090b]/40 opacity-70 dark:opacity-85 transition-opacity duration-500 group-hover:opacity-60" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 cursor-pointer transition-opacity duration-300">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-zinc-300 dark:border-zinc-700 rounded-full flex justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-blue-600 dark:bg-cyan-400 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
