'use client'

import { useRef, useEffect, useState } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  spotlightSize?: number
  containerClassName?: string
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 229, 255, 0.2)',
  spotlightSize = 300,
  containerClassName = ''
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      setMousePosition({ x, y })
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className={`spotlight-card-container ${containerClassName}`}>
      <div
        ref={cardRef}
        className={`spotlight-card relative overflow-hidden rounded-lg border border-white/20 bg-black/40 backdrop-blur-sm transition-all duration-300 ${className}`}
        style={{
          background: isHovered 
            ? `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`
            : 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Spotlight overlay */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`,
              mixBlendMode: 'overlay'
            }}
          />
        )}
        
        {/* Border glow effect */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          />
        )}
      </div>
    </div>
  )
}