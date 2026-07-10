import { motion } from 'framer-motion'
import { FiDownload, FiMapPin, FiAward, FiCalendar } from 'react-icons/fi'

export default function Timeline() {
  const education = [
    {
      date: '2021-2024',
      degree: 'Bachelor’s of Information, Technology and Management',
      institution: 'Lakshya Institute of Technology, Bhubaneswar, Odisha',
      details: [
        { label: 'CGPA', value: '7.52' },
        { label: 'Grade', value: 'First distinction' },
      ],
      description: 'Acquired practical exposure to computer science fundamentals, web systems design, cloud architectures, and database administration via project-driven courses.'
    },
    {
      date: '2019-2021',
      degree: 'Higher Secondary School (Science)',
      institution: 'Sri Aurobindo Science College, Cuttack, Odisha',
      details: [
        { label: 'Percentage', value: '74.50%' },
        { label: 'Grade', value: 'First distinction' },
      ],
      description: 'Concentrated in mathematics, physics, chemistry, and computer applications.'
    }
  ]

  return (
    <section id="resume-section" className="py-24 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-955/20">
      {/* Aurora glow shape decoration */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        {/* Title */}
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="font-mono text-xs tracking-widest text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-full uppercase mb-4 font-semibold">
            History
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-zinc-900 dark:text-white tracking-tight">
            Academic Background
          </h2>
          <div className="w-12 h-1 bg-purple-500 rounded-full mt-4" />
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
          {/* Vertical center axis line */}
          <div className="absolute left-[8px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent transform -translate-x-[1px]" />

          {/* Timeline Entries */}
          <div className="space-y-16">
            {education.map((item, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col md:flex-row relative items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline circle point */}
                  <div className="absolute left-[-32px] md:left-1/2 top-0 transform md:-translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-[#09090b] border-2 border-purple-500 flex items-center justify-center z-20">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
                  </div>

                  {/* Card Block */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`w-full md:w-[46%] ${
                      isEven ? 'md:text-left' : 'md:text-right'
                    }`}
                  >
                    <div className="p-8 rounded-3xl glass border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-955/40 hover:border-purple-500/35 transition-all duration-500 hover:-translate-y-1 shadow-lg shadow-black/5 dark:shadow-black/20 group flex flex-col justify-between h-full">
                      <div>
                        {/* Date badge */}
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs font-semibold mb-4 ${
                          isEven ? '' : 'md:flex-row-reverse'
                        }`}>
                          <FiCalendar />
                          <span>{item.date}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                          {item.degree}
                        </h3>

                        {/* Institution */}
                        <div className={`flex items-center gap-1 text-sm text-zinc-650 dark:text-zinc-400 mt-2 font-medium ${
                          isEven ? '' : 'md:justify-end'
                        }`}>
                          <FiMapPin className="text-purple-500 dark:text-purple-400 shrink-0" />
                          <span>{item.institution}</span>
                        </div>

                        <p className="text-sm text-zinc-600 dark:text-zinc-500 mt-4 leading-relaxed font-sans">
                          {item.description}
                        </p>
                      </div>

                      {/* Performance Parameters */}
                      <div className={`flex flex-wrap gap-4 mt-6 pt-6 border-t border-zinc-150 dark:border-zinc-850 ${
                        isEven ? '' : 'md:justify-end'
                      }`}>
                        {item.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-poppins font-medium text-zinc-600 dark:text-zinc-300">
                            <FiAward className="text-cyan-600 dark:text-cyan-400" />
                            <span className="text-zinc-500">{detail.label}:</span>
                            <span className="text-zinc-900 dark:text-white font-bold">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Spacer */}
                  <div className="hidden md:block w-[46%]" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Download CV button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-20"
        >
          <a
            href="/images/!CV Ghanashyam Panda.pdf"
            download="Ghanashyam_Panda_CV.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-poppins text-sm font-semibold tracking-wider uppercase rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-400/30 hover:scale-105 transition-all duration-300 group"
          >
            <FiDownload className="group-hover:translate-y-0.5 transition-transform duration-300" />
            <span>Download Resume</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
