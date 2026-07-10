import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiSearch } from 'react-icons/fi'

// Interactive 3D Tilt Card
function ProjectCard({ project }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = -(y - centerY) / 15
    const rotateY = (x - centerX) / 15
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    const card = cardRef.current
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
  }

  const handleMouseEnter = () => {
    if (!cardRef.current) return
    cardRef.current.style.transition = 'none'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="relative group rounded-3xl glass border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/20 overflow-hidden transition-all duration-300 hover:border-blue-500/35 shadow-lg shadow-black/5 dark:shadow-black/20 flex flex-col h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Project Thumbnail Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-60 transition-opacity duration-300" />
          
          {/* Technology Badges overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="text-[10px] font-mono font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md text-zinc-300 px-2.5 py-1 rounded-lg border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Text Details */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              {project.category} Project
            </span>
            <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-white mt-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex gap-4 mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 hover:bg-zinc-200 dark:hover:bg-zinc-900 text-sm font-semibold font-poppins text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-all duration-300"
            >
              <FiExternalLink className="w-4 h-4" />
              <span>Details</span>
            </a>
            <a
              href="https://github.com/Ghanashyampanda"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/40 hover:bg-zinc-200 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-all duration-300"
              aria-label="GitHub Repo"
            >
              <FiGithub className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const categories = ['All', 'Java', 'PHP', 'Full Stack(MERN)', 'Python']

  const projects = [
    {
      title: 'Bakery Supply Management System',
      category: 'PHP',
      tags: ['Laravel', 'MySQL', 'jQuery', 'Bootstrap'],
      description: 'An enterprise-level supply chain and sales tracking dashboard tailored for bakeries. Manages distribution logs, stock level indicators, client invoices, and payment tracking.',
      image: '/images/proj_1.png',
      url: 'https://sites.google.com/view/codetrails/project/php-codesource/3?authuser=0'
    },
    {
      title: 'Fees Management System',
      category: 'Java',
      tags: ['AWT', 'Swing', 'JDBC', 'MySQL'],
      description: 'A desktop application supporting academic billing departments. Tracks student dues, generates customizable payment receipt logs, and audits monthly collection stats.',
      image: '/images/proj_2.png',
      url: 'https://sites.google.com/view/codetrails/project/php-codesource/3?authuser=0'
    },
    {
      title: 'YouTube Clone',
      category: 'Web',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
      description: 'A pixel-perfect user interface clone of the YouTube desktop streaming application. Employs modern grid systems, interactive drawer controls, and custom video card hover items.',
      image: '/images/proj_3.png',
      url: 'https://sites.google.com/view/codetrails/project/web-developement-codesource/4?authuser=0'
    },
    {
      title: 'Content Management System',
      category: 'PHP',
      tags: ['Laravel', 'MySQL', 'Blade Engine', 'SEO'],
      description: 'A high-performance CMS providing robust post drafting, tag sorting, modular page editing, customizable layouts, and comprehensive search indices.',
      image: '/images/proj_4.png',
      url: 'https://sites.google.com/view/codetrails/project/php-codesource/2?authuser=0'
    },
    {
      title: 'Simple Quiz App',
      category: 'Python',
      tags: ['Tkinter', 'JSON', 'PyMySQL', 'Database UI'],
      description: 'An interactive quiz environment built in Python. Supports dynamic question loading from JSON formats, user timing parameters, and automated score boards synced to MySQL database.',
      image: '/images/proj_5.jpg',
      url: 'https://sites.google.com/view/codetrails/project/python-codesource/1?authuser=0'
    }
  ]

  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category.toLowerCase() === activeCategory.toLowerCase()
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  return (
    <section id="projects-section" className="py-24 relative overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-mono text-xs tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full uppercase mb-4 font-semibold">
            Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-zinc-900 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-blue-650 dark:bg-blue-400 rounded-full mt-4" />
        </div>

        {/* Controls Panel */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2.5 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-xl font-poppins text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-sm w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-800 text-sm placeholder-zinc-400 dark:placeholder-zinc-500 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500/50 transition-all duration-300"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state search warning */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <span className="text-zinc-500 font-mono text-sm tracking-wide">
              No projects match your search query. Try another keyword.
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
