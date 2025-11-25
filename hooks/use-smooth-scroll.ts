"use client"

import { useEffect, useRef } from "react"

export function useSmoothScroll() {
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return

      e.preventDefault()
      isScrolling.current = true

      const scrollAmount = e.deltaY
      const momentum = Math.min(Math.abs(scrollAmount) * 0.8, 300)
      const direction = scrollAmount > 0 ? 1 : -1
      
      let currentVelocity = momentum * direction
      const friction = 0.95
      const minVelocity = 0.5

      const animate = () => {
        if (Math.abs(currentVelocity) < minVelocity) {
          isScrolling.current = false
          return
        }

        window.scrollBy({
          top: currentVelocity,
          behavior: 'auto'
        })

        currentVelocity *= friction
        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)

      clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
      }, 100)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])
}