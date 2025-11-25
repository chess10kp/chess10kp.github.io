"use client"

import { useEffect } from "react"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return

      e.preventDefault()
      isScrolling = true

      const scrollAmount = e.deltaY
      const momentum = Math.min(Math.abs(scrollAmount) * 2.5, 800)
      const direction = scrollAmount > 0 ? 1 : -1
      
      let currentVelocity = momentum * direction
      const friction = 0.98
      const minVelocity = 0.1

      const animate = () => {
        if (Math.abs(currentVelocity) < minVelocity) {
          isScrolling = false
          return
        }

        window.scrollBy({
          top: currentVelocity,
          behavior: 'auto'
        })

        currentVelocity *= friction
        requestAnimationFrame(animate)
      }

      setTimeout(() => {
        requestAnimationFrame(animate)
      }, 30)

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 100)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return <>{children}</>
}