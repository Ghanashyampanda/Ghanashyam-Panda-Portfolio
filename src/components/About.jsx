import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiBookOpen, FiCode, FiLayers, FiActivity } from 'react-icons/fi'

// Native Scroll-Triggered Animated Counter
function AnimatedCounter({ end, duration = 1500 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const progressRatio = Math.min(progress / duration, 1)
      setCount(Math.floor(progressRatio * end))
      if (progressRatio < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    requestAnimationFrame(animate)
  }, [hasStarted, end, duration])

  return <span ref={ref}>{count}</span>
}

// Glowing Skill Bar Component
function SkillBar({ name, percentage }) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(percentage)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [percentage])

  return (
    <div ref={ref} className="mb-6 w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="font-poppins font-semibold text-sm text-zinc-700 dark:text-zinc-300 tracking-wider uppercase">
          {name}
        </span>
        <span className="font-mono text-sm text-blue-600 dark:text-cyan-400 font-bold">
          {percentage}%
        </span>
      </div>
      <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 rounded-full relative transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/40 blur-[1px]" />
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const personalDetails = [
    { label: 'Profile', value: 'Software Developer & Application Developer', icon: <FiLayers className="text-blue-600 dark:text-blue-400" /> },
    { label: 'Domain', value: 'JAVA, AWS Cloud Foundation, DevOps & Digital Marketing', icon: <FiCode className="text-cyan-600 dark:text-cyan-400" /> },
    { label: 'Education', value: 'Bachelor’s of Information, Technology and Management', icon: <FiBookOpen className="text-purple-600 dark:text-purple-400" /> },
    { label: 'Language', value: 'English, Hindi', icon: <FiActivity className="text-emerald-600 dark:text-emerald-400" /> },
  ]

  const secondaryDetails = [
    { label: 'Address', value: 'Bhubaneswar, Odisha, India' },
    { label: 'Tools', value: 'Github, IntelliJ IDEA, VS Code & Android Studio' },
    { label: 'Other Skills', value: 'Cloud, Excel, Git, Google Analytics & SEO' },
    { label: 'Interest', value: 'Playing Cricket, Web Surfing, Watch Cricket Match & Movie' },
  ]

  const stats = [
    { label: 'Achievements', value: 5 },
    { label: 'Projects', value: 20 },
    { label: 'Mentored Students', value: 1 },
    { label: 'Cups of Coffee', value: 10 },
  ]

  return (
    <section id="about-section" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        {/* Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-mono text-xs tracking-widest text-emerald-650 dark:text-emerald-450 bg-emerald-500/10 px-3 py-1.5 rounded-full uppercase mb-4 font-semibold">
            Identity
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-zinc-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <div className="w-12 h-1 bg-emerald-500 rounded-full mt-4" />
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Bio Details and Skill Bars */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl glass border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-955/20 h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                  Biography
                </h3>
                <p className="text-zinc-650 dark:text-zinc-400 leading-relaxed mb-6 font-sans">
                  As a developer, I enjoy bridging the gap between functionality and design. My goal is to always build applications that are scalable and efficient under the hood while providing engaging, pixel-perfect user experiences. In addition, I am highly responsive to client needs and also committed to helping people realize their vision.
                </p>
              </div>

              {/* Skills Bars */}
              <div className="mt-4">
                <SkillBar name="JAVA" percentage={90} />
                <SkillBar name="WEB Development" percentage={85} />
                <SkillBar name="SQL" percentage={60} />
                <SkillBar name="PHP" percentage={80} />
                <SkillBar name="Android Studio" percentage={40} />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Card Grid Info */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Personal parameters list */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-3xl glass border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-955/20"
            >
              <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white mb-6">
                Technical Profile
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalDetails.map((detail, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mt-1">
                      {detail.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 font-bold">{detail.label}</h4>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 font-poppins mt-0.5">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-[1px] bg-zinc-200/80 dark:bg-zinc-800/80 my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {secondaryDetails.map((detail, idx) => (
                  <div key={idx} className="flex flex-col">
                    <h4 className="text-xs font-mono uppercase text-zinc-500 font-bold">{detail.label}</h4>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 font-poppins mt-1">{detail.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sub-Card containing CTA & Linked projects counter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 rounded-3xl glass border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/10 flex items-center justify-between flex-wrap gap-6"
            >
              <div>
                <div className="text-3xl font-display font-extrabold text-blue-600 dark:text-white">
                  <AnimatedCounter end={15} />+
                </div>
                <div className="text-sm font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mt-1">
                  Projects Completed Successfully
                </div>
              </div>
              <a 
                href="https://www.linkedin.com/in/ghanashyam-panda2001/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-poppins text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md shadow-blue-500/20 hover:scale-105"
              >
                LinkedIn Profile
              </a>
            </motion.div>
          </div>
        </div>

        {/* Counter Stats Panels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-955/20 flex flex-col items-center justify-center text-center group hover:border-blue-500/20 transition-all duration-500"
            >
              <div className="text-4xl md:text-5xl font-mono font-extrabold text-zinc-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">
                <AnimatedCounter end={stat.value} />
              </div>
              <div className="text-xs font-mono text-zinc-550 dark:text-zinc-400 uppercase tracking-widest mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
