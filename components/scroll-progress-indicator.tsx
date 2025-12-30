"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      setScrollProgress(scrollPercent)
    }

    // Add scroll event listener
    window.addEventListener("scroll", updateScrollProgress)

    // Initial calculation
    updateScrollProgress()

    // Clean up event listener
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-[61px] left-0 right-0 h-1 bg-border/30 z-[59]">
      <motion.div
        className="h-full bg-gradient-to-r from-accent to-primary shadow-lg shadow-accent/30"
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress * 100}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
        role="progressbar"
        aria-valuenow={scrollProgress * 100}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
    </div>
  )
}
