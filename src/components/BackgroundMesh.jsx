import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function BackgroundMesh({ theme }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 30

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Particles Geometry
    const particlesCount = 250
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)
    const sizes = new Float32Array(particlesCount)

    const colorPrimary = new THREE.Color(theme === 'dark' ? '#3b82f6' : '#2563eb') // Blue
    const colorSecondary = new THREE.Color(theme === 'dark' ? '#06b6d4' : '#0891b2') // Cyan
    const colorTertiary = new THREE.Color(theme === 'dark' ? '#8b5cf6' : '#7c3aed') // Purple

    for (let i = 0; i < particlesCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10

      // Color interpolation
      const mixedColor = colorPrimary.clone()
      const rand = Math.random()
      if (rand < 0.33) {
        mixedColor.lerp(colorSecondary, Math.random())
      } else if (rand < 0.66) {
        mixedColor.lerp(colorTertiary, Math.random())
      } else {
        mixedColor.lerp(new THREE.Color(theme === 'dark' ? '#10b981' : '#059669'), Math.random()) // Emerald
      }

      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b

      // Sizes
      sizes[i] = Math.random() * 2 + 0.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Particle texture
    const createCircleTexture = () => {
      const matCanvas = document.createElement('canvas')
      matCanvas.width = 16
      matCanvas.height = 16
      const matContext = matCanvas.getContext('2d')
      const gradient = matContext.createRadialGradient(8, 8, 0, 8, 8, 8)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      matContext.fillStyle = gradient
      matContext.fillRect(0, 0, 16, 16)
      
      const texture = new THREE.Texture(matCanvas)
      texture.needsUpdate = true
      return texture
    }

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      map: createCircleTexture(),
      transparent: true,
      opacity: theme === 'dark' ? 0.45 : 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    // Points mesh
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Ambient floating grid lines
    const gridGeometry = new THREE.BufferGeometry()
    const gridCount = 20
    const gridPositions = new Float32Array(gridCount * 2 * 3)
    
    for (let i = 0; i < gridCount; i++) {
      const idx = i * 6
      const x = (Math.random() - 0.5) * 50
      const y = (Math.random() - 0.5) * 50
      const z = (Math.random() - 0.5) * 40 - 10
      const len = Math.random() * 8 + 2
      const isVertical = Math.random() > 0.5

      gridPositions[idx] = x
      gridPositions[idx + 1] = y
      gridPositions[idx + 2] = z
      gridPositions[idx + 3] = isVertical ? x : x + len
      gridPositions[idx + 4] = isVertical ? y + len : y
      gridPositions[idx + 5] = z
    }

    gridGeometry.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3))
    const lineMat = new THREE.LineBasicMaterial({
      color: theme === 'dark' ? 0x3b82f6 : 0x2563eb,
      transparent: true,
      opacity: theme === 'dark' ? 0.08 : 0.04,
      linewidth: 1,
    })
    const lines = new THREE.LineSegments(gridGeometry, lineMat)
    scene.add(lines)

    // Interaction mouse variables
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 20
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 20
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Rotate particles slowly
      points.rotation.y = elapsedTime * 0.015
      points.rotation.x = elapsedTime * 0.008
      lines.rotation.y = elapsedTime * 0.005

      // Smooth mouse parallax easing
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      points.position.x = targetX * 0.4
      points.position.y = targetY * 0.4
      lines.position.x = targetX * 0.2
      lines.position.y = targetY * 0.2

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      gridGeometry.dispose()
      lineMat.dispose()
      renderer.dispose()
    }
  }, [theme])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full -z-10 bg-[#f8fafc] dark:bg-[#09090b] transition-colors duration-500 pointer-events-none"
    />
  )
}
