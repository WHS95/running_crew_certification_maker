'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface TextTypeProps {
  text: string[]
  typingSpeed?: number
  pauseDuration?: number
  showCursor?: boolean
  cursorCharacter?: string
  className?: string
  onComplete?: () => void
}

export default function TextType({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  className = "",
  onComplete
}: TextTypeProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const [currentText, setCurrentText] = useState("")

  useEffect(() => {
    if (!textRef.current) return

    let timeoutId: NodeJS.Timeout
    let currentIndex = 0
    let textArrayIndex = 0
    let isDeleting = false

    const typeText = () => {
      const fullText = text[textArrayIndex]
      
      if (!isDeleting) {
        // Typing
        if (currentIndex <= fullText.length) {
          setCurrentText(fullText.substring(0, currentIndex))
          currentIndex++
          timeoutId = setTimeout(typeText, typingSpeed)
        } else {
          // Pause before deleting
          timeoutId = setTimeout(() => {
            isDeleting = true
            typeText()
          }, pauseDuration)
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          setCurrentText(fullText.substring(0, currentIndex))
          currentIndex--
          timeoutId = setTimeout(typeText, typingSpeed / 2)
        } else {
          // Move to next text
          isDeleting = false
          textArrayIndex = (textArrayIndex + 1) % text.length
          
          if (textArrayIndex === 0 && onComplete) {
            onComplete()
          }
          
          timeoutId = setTimeout(typeText, typingSpeed)
        }
      }
    }

    typeText()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [text, typingSpeed, pauseDuration, onComplete])

  useEffect(() => {
    if (!cursorRef.current || !showCursor) return

    // Cursor blinking animation
    const tl = gsap.timeline({ repeat: -1 })
    
    tl.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    })
    .to(cursorRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut"
    })

    return () => {
      tl.kill()
    }
  }, [showCursor])

  return (
    <div className={`text-type-container ${className}`}>
      <span ref={textRef} className="typed-text">
        {currentText}
      </span>
      {showCursor && (
        <span 
          ref={cursorRef}
          className="cursor-character text-current"
        >
          {cursorCharacter}
        </span>
      )}
    </div>
  )
}