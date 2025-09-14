'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function DarkVeil() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: HTMLDivElement[] = []

    // Create floating particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'dark-particle'
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
      `
      container.appendChild(particle)
      particles.push(particle)
    }

    // Animate particles
    particles.forEach((particle) => {
      gsap.to(particle, {
        y: `+=${Math.random() * 200 + 100}`,
        x: `+=${Math.random() * 100 - 50}`,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      })
    })

    // Create dark fog effect
    const fog1 = document.createElement('div')
    fog1.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 30% 20%, rgba(0,0,0,0.8) 0%, transparent 50%),
                  radial-gradient(circle at 70% 80%, rgba(0,0,0,0.6) 0%, transparent 40%);
      pointer-events: none;
    `
    container.appendChild(fog1)

    const fog2 = document.createElement('div')
    fog2.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 120%;
      height: 120%;
      background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 70%);
      transform: rotate(45deg);
      pointer-events: none;
    `
    container.appendChild(fog2)

    // Animate fog
    gsap.to(fog1, {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "none"
    })

    gsap.to(fog2, {
      rotation: -360,
      duration: 40,
      repeat: -1,
      ease: "none"
    })

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="dark-veil"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.8) 50%, rgba(0,0,0,0.95) 100%)',
        overflow: 'hidden'
      }}
    />
  )
}