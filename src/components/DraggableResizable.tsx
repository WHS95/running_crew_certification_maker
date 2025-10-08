'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface DraggableResizableProps {
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
  onPositionChange?: (position: { x: number; y: number }) => void
  onSizeChange?: (size: { width: number; height: number }) => void
  containerBounds?: DOMRect
  className?: string
}

export default function DraggableResizable({
  children,
  initialPosition = { x: 0, y: 0 },
  initialSize = { width: 100, height: 100 },
  onPositionChange,
  onSizeChange,
  containerBounds,
  className = ''
}: DraggableResizableProps) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const elementRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Allow dragging from the main element or any child that's not the resize handle
    const target = e.target as Element
    const isResizeHandle = target.closest('.resize-handle')
    
    if (!isResizeHandle) {
      e.preventDefault()
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }, [position])

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const target = e.target as Element
    const isResizeHandle = target.closest('.resize-handle')
    
    if (!isResizeHandle && e.touches.length === 1) {
      e.preventDefault()
      const touch = e.touches[0]
      setIsDragging(true)
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y
      })
    }
  }, [position])

  const handleResizeTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      setIsResizing(true)
      setResizeStart({
        x: touch.clientX,
        y: touch.clientY,
        width: size.width,
        height: size.height
      })
    }
  }, [size])

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    })
  }, [size])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      
      // Apply bounds if provided
      let boundedX = newX
      let boundedY = newY
      
      if (containerBounds) {
        const maxX = containerBounds.width - size.width
        const maxY = containerBounds.height - size.height
        boundedX = Math.max(0, Math.min(maxX, newX))
        boundedY = Math.max(0, Math.min(maxY, newY))
      }
      
      const newPosition = { x: boundedX, y: boundedY }
      setPosition(newPosition)
      onPositionChange?.(newPosition)
    }
    
    if (isResizing) {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      
      const newWidth = Math.max(20, resizeStart.width + deltaX)
      const newHeight = Math.max(20, resizeStart.height + deltaY)
      
      const newSize = { width: newWidth, height: newHeight }
      setSize(newSize)
      onSizeChange?.(newSize)
    }
  }, [isDragging, isResizing, dragStart, resizeStart, size, containerBounds, onPositionChange, onSizeChange])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      
      if (isDragging) {
        e.preventDefault()
        const newX = touch.clientX - dragStart.x
        const newY = touch.clientY - dragStart.y
        
        // Apply bounds if provided
        let boundedX = newX
        let boundedY = newY
        
        if (containerBounds) {
          const maxX = containerBounds.width - size.width
          const maxY = containerBounds.height - size.height
          boundedX = Math.max(0, Math.min(maxX, newX))
          boundedY = Math.max(0, Math.min(maxY, newY))
        }
        
        const newPosition = { x: boundedX, y: boundedY }
        setPosition(newPosition)
        onPositionChange?.(newPosition)
      }
      
      if (isResizing) {
        e.preventDefault()
        const deltaX = touch.clientX - resizeStart.x
        const deltaY = touch.clientY - resizeStart.y
        
        const newWidth = Math.max(20, resizeStart.width + deltaX)
        const newHeight = Math.max(20, resizeStart.height + deltaY)
        
        const newSize = { width: newWidth, height: newHeight }
        setSize(newSize)
        onSizeChange?.(newSize)
      }
    }
  }, [isDragging, isResizing, dragStart, resizeStart, size, containerBounds, onPositionChange, onSizeChange])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
  }, [])

  // Add global mouse and touch events
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  return (
    <div
      ref={elementRef}
      className={`absolute select-none ${className} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        border: isDragging || isResizing ? '3px dashed #3b82f6' : '2px solid transparent',
        touchAction: 'none' // Prevent scrolling on touch
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {children}
      
      {/* Resize handle - Larger for mobile */}
      <div
        className="resize-handle absolute bottom-0 right-0 w-6 h-6 sm:w-4 sm:h-4 bg-blue-500 cursor-se-resize opacity-70 hover:opacity-100"
        style={{
          background: 'linear-gradient(-45deg, transparent 30%, #3b82f6 30%, #3b82f6 70%, transparent 70%)',
          touchAction: 'none'
        }}
        onMouseDown={handleResizeMouseDown}
        onTouchStart={handleResizeTouchStart}
      />
      
      {/* Corner indicators - Larger for mobile */}
      <div className="absolute top-0 left-0 w-3 h-3 sm:w-2 sm:h-2 bg-blue-500 rounded-full opacity-50" />
      <div className="absolute top-0 right-0 w-3 h-3 sm:w-2 sm:h-2 bg-blue-500 rounded-full opacity-50" />
      <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-2 sm:h-2 bg-blue-500 rounded-full opacity-50" />
    </div>
  )
}