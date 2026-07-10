import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'

// Components
import Loader from './components/Loader.jsx'
import BackgroundMesh from './components/BackgroundMesh.jsx'
import CursorFollower from './components/CursorFollower.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Timeline from './components/Timeline.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState('dark')

  // Theme synchronization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    if (isLoading) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [isLoading])

  return (
    <>
      {/* Custom Loader */}
      <Loader onFinish={() => setIsLoading(false)} />

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen text-zinc-800 dark:text-[#f4f4f5]"
        >
          {/* Animated 3D WebGL particle background */}
          <BackgroundMesh theme={theme} />

          {/* Interactive Mouse Cursor Glow Trail */}
          <CursorFollower />

          {/* Sticky Navigation Bar */}
          <Navbar theme={theme} onToggleTheme={toggleTheme} />

          {/* Main Layout sections */}
          <main className="relative">
            <Hero />
            <About />
            <Timeline />
            <Projects />
            <Contact />
          </main>

          {/* Page Footer */}
          <Footer />
        </motion.div>
      )}
    </>
  )
}
