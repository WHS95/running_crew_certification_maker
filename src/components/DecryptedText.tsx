'use client'

import { useEffect, useRef, useState } from 'react'

interface DecryptedTextProps {
  text: string
  speed?: number
  maxIterations?: number
  characters?: string
  className?: string
  parentClassName?: string
  encryptedClassName?: string
  animateOn?: 'hover' | 'view' | 'load'
  revealDirection?: 'left' | 'right' | 'center'
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  revealDirection = 'left'
}: DecryptedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)]

  const animateText = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const originalText = text
    let iteration = 0

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      let newText = ''
      
      for (let i = 0; i < originalText.length; i++) {
        if (revealDirection === 'left') {
          if (i < iteration) {
            newText += originalText[i]
          } else {
            newText += getRandomChar()
          }
        } else if (revealDirection === 'right') {
          if (i >= originalText.length - iteration) {
            newText += originalText[i]
          } else {
            newText += getRandomChar()
          }
        } else { // center
          const center = Math.floor(originalText.length / 2)
          const distance = Math.abs(i - center)
          if (distance < iteration / 2) {
            newText += originalText[i]
          } else {
            newText += getRandomChar()
          }
        }
      }

      setDisplayText(newText)
      
      iteration += 1 / 3

      if (iteration >= originalText.length + maxIterations) {
        setDisplayText(originalText)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setIsAnimating(false)
      }
    }, speed)
  }

  const resetText = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setDisplayText(text)
    setIsAnimating(false)
  }

  useEffect(() => {
    if (animateOn === 'load') {
      animateText()
    } else if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateText()
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.5 }
      )

      if (textRef.current) {
        observer.observe(textRef.current)
      }

      return () => observer.disconnect()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [animateOn, animateText])

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      animateText()
    }
  }

  const handleMouseLeave = () => {
    if (animateOn === 'hover') {
      resetText()
    }
  }

  return (
    <span
      ref={textRef}
      className={`decrypted-text ${parentClassName} ${isAnimating ? encryptedClassName : className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        fontFamily: 'monospace',
        cursor: animateOn === 'hover' ? 'pointer' : 'default',
        display: 'inline-block'
      }}
    >
      {displayText}
    </span>
  )
}