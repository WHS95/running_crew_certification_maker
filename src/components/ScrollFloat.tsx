'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ScrollFloatProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export default function ScrollFloat({ children, className = '', speed = 0.5 }: ScrollFloatProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    let requestId: number

    const handleScroll = () => {
      const scrollY = window.scrollY
      const translateY = scrollY * speed
      
      gsap.set(element, {
        y: translateY,
        ease: "none"
      })
    }

    const smoothScroll = () => {
      handleScroll()
      requestId = requestAnimationFrame(smoothScroll)
    }

    requestId = requestAnimationFrame(smoothScroll)

    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId)
      }
    }
  }, [speed])

  return (
    <div 
      ref={elementRef}
      className={`scroll-float ${className}`}
    >
      {children}
    </div>
  )
}