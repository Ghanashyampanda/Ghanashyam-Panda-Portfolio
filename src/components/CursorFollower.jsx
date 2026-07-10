import { useEffect, useRef, useState } from 'react'

export default function CursorFollower() {
  const followerRef = useRef(null)
  const dotRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    // Disable on mobile/tablet devices
    const checkDevice = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0)
      setIsMobile(mobile)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    if (isMobile) return

    const follower = followerRef.current
    const dot = dotRef.current

    if (!follower || !dot) return

    // Position coordinates
    const mouse = { x: -100, y: -100 }
    const followerPos = { x: -100, y: -100 }
    const dotPos = { x: -100, y: -100 }

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.body.addEventListener('mouseleave', onMouseLeave)

    // Handle hovering custom attribute
    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[data-interactive]') ||
        target.getAttribute('role') === 'button'

      setIsHovered(!!isInteractive)
    }

    window.addEventListener('mouseover', handleMouseOver)

    // Elastic follow loop
    let frameId
    const loop = () => {
      // Slow follower lag
      followerPos.x += (mouse.x - followerPos.x) * 0.12
      followerPos.y += (mouse.y - followerPos.y) * 0.12

      // Fast dot lag
      dotPos.x += (mouse.x - dotPos.x) * 0.35
      dotPos.y += (mouse.y - dotPos.y) * 0.35

      follower.style.left = `${followerPos.x}px`
      follower.style.top = `${followerPos.y}px`

      dot.style.left = `${dotPos.x}px`
      dot.style.top = `${dotPos.y}px`

      frameId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', checkDevice)
      window.removeEventListener('mousemove', onMouseMove)
      document.body.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isMobile, isVisible])

  if (isMobile) return null

  return (
    <div className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'cursor-hovering' : ''}`}>
      <div 
        ref={followerRef} 
        className="cursor-follower"
      />
      <div 
        ref={dotRef} 
        className="cursor-dot"
      />
    </div>
  )
}
