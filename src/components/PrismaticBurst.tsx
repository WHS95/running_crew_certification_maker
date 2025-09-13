'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function PrismaticBurst() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const rays = []

    for (let i = 0; i < 12; i++) {
      const ray = document.createElement('div')
      ray.className = 'ray'
      ray.style.cssText = `
        position: absolute;
        width: 2px;
        height: 200px;
        background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%);
        transform-origin: 50% 100%;
        transform: rotate(${i * 30}deg);
        top: 50%;
        left: 50%;
        margin-left: -1px;
        margin-top: -200px;
      `
      container.appendChild(ray)
      rays.push(ray)
    }

    const centerOrb = document.createElement('div')
    centerOrb.className = 'center-orb'
    centerOrb.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 20px rgba(255,255,255,0.8);
    `
    container.appendChild(centerOrb)

    const tl = gsap.timeline({ repeat: -1 })
    
    tl.fromTo(rays, {
      scaleY: 0,
      opacity: 0
    }, {
      scaleY: 1,
      opacity: 1,
      duration: 2,
      stagger: 0.1,
      ease: "power2.out"
    })
    .to(rays, {
      rotation: "+=360",
      duration: 8,
      ease: "none"
    }, "-=1")
    .to(centerOrb, {
      scale: 1.5,
      opacity: 0.8,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    }, 0)

    return () => {
      tl.kill()
      container.innerHTML = ''
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="prismatic-burst fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)'
      }}
    />
  )
}