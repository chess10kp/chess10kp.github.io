"use client"

import type { ReactNode } from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"
import { useAnimation } from "@/contexts/animation-context"

type AnimationType = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in"

interface AnimatedSectionProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  className?: string
  threshold?: number
  rootMargin?: string
  id?: string
  forceAnimate?: boolean
}

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  className,
  threshold = 0.1,
  rootMargin = "0px",
  id,
  forceAnimate = false,
}: AnimatedSectionProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  })

  const { settings } = useAnimation()
  const shouldAnimate = settings.enabled || forceAnimate

  const actualDelay = (delay * settings.delay) / 100

  const getMotionVariants = () => {
    if (!shouldAnimate) {
      return {
        hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
        visible: { opacity: 1, y: 0, x: 0, scale: 1 },
      }
    }

    const intensity = settings.intensity

    switch (animation) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 30 * intensity },
          visible: { opacity: 1, y: 0 },
        }
      case "fade-in":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      case "slide-left":
        return {
          hidden: { opacity: 0, x: -30 * intensity },
          visible: { opacity: 1, x: 0 },
        }
      case "slide-right":
        return {
          hidden: { opacity: 0, x: 30 * intensity },
          visible: { opacity: 1, x: 0 },
        }
      case "zoom-in":
        return {
          hidden: { opacity: 0, scale: 1 - 0.05 * intensity },
          visible: { opacity: 1, scale: 1 },
        }
      default:
        return {
          hidden: { opacity: 0, y: 30 * intensity },
          visible: { opacity: 1, y: 0 },
        }
    }
  }

  if (!shouldAnimate) {
    return <section className={className} id={id}>{children}</section>
  }

  const getTransition = () => {
    if (settings.easing === "spring") {
      return {
        type: "spring" as const,
        stiffness: settings.stiffness || 400,
        damping: settings.damping || 25,
        delay: actualDelay / 1000,
      }
    }

    return {
      duration: settings.duration / 1000,
      delay: actualDelay / 1000,
      ease: settings.easing,
    }
  }

  return (
    <motion.section
      ref={ref as any}
      className={cn(className)}
      id={id}
      initial="hidden"
      animate={isMounted && isIntersecting ? "visible" : "hidden"}
      variants={getMotionVariants()}
      transition={getTransition()}
    >
      {children}
    </motion.section>
  )
}
