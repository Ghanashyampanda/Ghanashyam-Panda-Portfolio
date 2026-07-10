import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'

export default function Navbar({ theme, onToggleTheme }) {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const scrollPos = window.scrollY + 120
      const sectionElements = navLinks.map(link => document.getElementById(`${link.id}-section`))
      
      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i]
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(navLinks[i].id)
            break
          }
        }
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false)
    const el = document.getElementById(`${id}-section`)
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      })
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 glass shadow-lg shadow-black/5 dark:shadow-black/20' 
          : 'py-6 bg-transparent'
      }`}
    >
      {/* Scroll Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-200 dark:bg-zinc-800">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 dark:from-blue-500 dark:via-cyan-400 dark:to-purple-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#home-section"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('home')
          }}
          className="relative text-2xl font-bold font-display tracking-tight text-zinc-900 dark:text-white group"
        >
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent group-hover:from-cyan-500 group-hover:to-purple-500 transition-all duration-300">
            Ghanashyam
          </span>
          <span className="text-zinc-700 dark:text-white ml-1">Panda</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative px-4 py-2 text-sm font-medium font-poppins rounded-lg transition-all duration-300 ${
                activeSection === link.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-zinc-550 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-zinc-655 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun className="w-5 h-5 text-amber-400" /> : <FiMoon className="w-5 h-5 text-indigo-600" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Theme toggler for mobile */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-zinc-655 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun className="w-4 h-4 text-amber-400" /> : <FiMoon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Burger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-zinc-655 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full border-t border-zinc-200/80 dark:border-zinc-800/80 glass mt-4 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left py-3 px-4 rounded-xl text-base font-medium font-poppins transition-all duration-300 ${
                    activeSection === link.id
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/20 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
