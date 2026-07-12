import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiFileText, 
  FiYoutube, 
  FiLinkedin, 
  FiGlobe, 
  FiFacebook, 
  FiInstagram,
  FiSend,
  FiCheckCircle
} from 'react-icons/fi'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required'
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Invalid email address'
    }
    if (!form.subject.trim()) nextErrors.subject = 'Subject is required'
    if (!form.message.trim()) nextErrors.message = 'Message is required'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      })

      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1200)
  }

  const handleInputChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const socialLinks = [
    { name: 'YouTube', url: 'https://youtube.com/@CreativeTechnofi?si=f9aw-g8t8X5F8QZX', icon: <FiYoutube />, color: 'hover:text-[#ff0000] hover:border-[#ff0000] hover:shadow-[#ff0000]/20' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ghanashyam-panda2001/', icon: <FiLinkedin />, color: 'hover:text-[#0077b5] hover:border-[#0077b5] hover:shadow-[#0077b5]/20' },
    { name: 'Website', url: 'https://indiastudyboost.odoo.com', icon: <FiGlobe />, color: 'hover:text-[#10b981] hover:border-[#10b981] hover:shadow-[#10b981]/20' },
    { name: 'Facebook', url: 'https://www.facebook.com/ghanashyam.panda.1829?mibextid=ZbWKw', icon: <FiFacebook />, color: 'hover:text-[#1877f2] hover:border-[#1877f2] hover:shadow-[#1877f2]/20' },
    { name: 'Instagram', url: 'https://www.instagram.com/ghanashyam.07/?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D', icon: <FiInstagram />, color: 'hover:text-[#e1306c] hover:border-[#e1306c] hover:shadow-[#e1306c]/20' },
  ]

  return (
    <section id="contact-section" className="py-24 relative overflow-hidden bg-zinc-50/30 dark:bg-transparent">
      {/* Background decoration blur blobs */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        {/* Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-mono text-xs tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full uppercase mb-4 font-semibold">
            Inquire
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-zinc-900 dark:text-white tracking-tight">
            Contact Me
          </h2>
          <div className="w-12 h-1 bg-blue-600 dark:bg-blue-400 rounded-full mt-4" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white mb-6">
              Get in Touch
            </h3>

            {/* Map Address */}
            <div className="p-6 rounded-2xl glass border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/20 flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-zinc-800 dark:text-white text-sm">Address</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Bhubaneswar, Odisha, India</p>
              </div>
            </div>

            {/* Phone */}
            <div className="p-6 rounded-2xl glass border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/20 flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <FiPhone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-zinc-800 dark:text-white text-sm">Contact Number</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  <a href="tel://6370825302" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 font-medium">+91 6370825302</a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 rounded-2xl glass border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/20 flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <FiMail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-zinc-800 dark:text-white text-sm">Email Address</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  <a href="mailto:ghanashyampanda07@gmail.com" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 font-medium">
                    ghanashyampanda07@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* View Resume PDF */}
            <div className="p-6 rounded-2xl glass border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/20 flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <FiFileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-zinc-800 dark:text-white text-sm">View Resume</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  <a href="/images/new CV.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 font-medium underline underline-offset-4">
                    Open PDF File
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl glass border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/10">
              <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white">
                  Send Message
                </h3>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSct9tOyDE8QJuuimUe-ecJ-exKwoYtIGR7oH9q0Qpib8WG3Pg/viewform?usp=sf_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg transition-all duration-300"
                >
                  Use Google Form Instead
                </a>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name field (Floating Label) */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder=" "
                    className={`peer w-full px-4 py-4 bg-zinc-100/60 dark:bg-zinc-900/50 border ${
                      errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-blue-500/50'
                    } rounded-xl text-sm placeholder-transparent text-zinc-900 dark:text-white focus:outline-none focus:bg-white focus:dark:bg-zinc-900/40 transition-all duration-300`}
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-4 top-4 text-sm text-zinc-500 dark:text-zinc-400 font-poppins pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-1.5 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-1.5"
                  >
                    Your Name
                  </label>
                  {errors.name && <span className="text-[11px] font-mono text-red-500 mt-1 block pl-2">{errors.name}</span>}
                </div>

                {/* Email field (Floating Label) */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder=" "
                    className={`peer w-full px-4 py-4 bg-zinc-100/60 dark:bg-zinc-900/50 border ${
                      errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-blue-500/50'
                    } rounded-xl text-sm placeholder-transparent text-zinc-900 dark:text-white focus:outline-none focus:bg-white focus:dark:bg-zinc-900/40 transition-all duration-300`}
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-4 top-4 text-sm text-zinc-500 dark:text-zinc-400 font-poppins pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-1.5 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-1.5"
                  >
                    Your Email
                  </label>
                  {errors.email && <span className="text-[11px] font-mono text-red-500 mt-1 block pl-2">{errors.email}</span>}
                </div>

                {/* Subject field (Floating Label) */}
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    value={form.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder=" "
                    className={`peer w-full px-4 py-4 bg-zinc-100/60 dark:bg-zinc-900/50 border ${
                      errors.subject ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-blue-500/50'
                    } rounded-xl text-sm placeholder-transparent text-zinc-900 dark:text-white focus:outline-none focus:bg-white focus:dark:bg-zinc-900/40 transition-all duration-300`}
                  />
                  <label 
                    htmlFor="subject" 
                    className="absolute left-4 top-4 text-sm text-zinc-500 dark:text-zinc-400 font-poppins pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-1.5 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-1.5"
                  >
                    Subject
                  </label>
                  {errors.subject && <span className="text-[11px] font-mono text-red-500 mt-1 block pl-2">{errors.subject}</span>}
                </div>

                {/* Message field (Floating Label) */}
                <div className="relative">
                  <textarea
                    id="message"
                    rows="5"
                    value={form.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder=" "
                    className={`peer w-full px-4 py-4 bg-zinc-100/60 dark:bg-zinc-900/50 border ${
                      errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-blue-500/50'
                    } rounded-xl text-sm placeholder-transparent text-zinc-900 dark:text-white focus:outline-none focus:bg-white focus:dark:bg-zinc-900/40 transition-all duration-300 resize-none`}
                  />
                  <label 
                    htmlFor="message" 
                    className="absolute left-4 top-4 text-sm text-zinc-500 dark:text-zinc-400 font-poppins pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-1.5 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-1.5"
                  >
                    Your Message
                  </label>
                  {errors.message && <span className="text-[11px] font-mono text-red-500 mt-1 block pl-2">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-poppins text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Social Icons Links Grid */}
        <div className="flex flex-col items-center mt-20">
          <h4 className="font-mono text-xs text-zinc-600 dark:text-zinc-500 uppercase tracking-widest mb-6">Find me on</h4>
          <div className="flex flex-wrap gap-4 justify-center">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/40 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-115 hover:-translate-y-0.5 hover:shadow-lg shadow-black/5 dark:shadow-black/20 ${social.color}`}
                aria-label={social.name}
              >
                <span className="text-xl">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="p-8 max-w-sm w-full rounded-3xl glass border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-center flex flex-col items-center shadow-2xl"
            >
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-4">
                <FiCheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans mb-6">
                Thank you so much! Your message has been received and I will get back to you as soon as possible.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-poppins text-xs font-bold tracking-wider uppercase rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
