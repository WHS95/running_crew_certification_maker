'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
}

export default function SplitText({ text, className = '', delay = 0 }: SplitTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const chars = text.split('').map((char, index) => 
      `<span key="${index}" style="display: inline-block; opacity: 0; transform: translateY(100px)">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('')

    textRef.current.innerHTML = chars

    const spans = textRef.current.querySelectorAll('span')
    
    gsap.fromTo(spans, 
      {
        opacity: 0,
        y: 100,
        rotationX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.05,
        delay,
        ease: "power4.out"
      }
    )
  }, [text, delay])

  return (
    <div 
      ref={textRef}
      className={`split-text ${className}`}
      style={{ perspective: '1000px' }}
    />
  )
}