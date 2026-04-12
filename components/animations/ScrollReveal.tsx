'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/utils/gsap-config'

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  animationType?:
    | 'fadeInUp'
    | 'fadeInDown'
    | 'fadeInLeft'
    | 'fadeInRight'
    | 'scaleIn'
  duration?: number
  childSelector?: string
  stagger?: number
}

const animationPresets = {
  fadeInUp: { y: 30, opacity: 0 },
  fadeInDown: { y: -30, opacity: 0 },
  fadeInLeft: { x: -30, opacity: 0 },
  fadeInRight: { x: 30, opacity: 0 },
  scaleIn: { scale: 0.8, opacity: 0 },
}

const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      animationType = 'fadeInUp',
      duration = 0.7,
      childSelector,
      stagger = 0.1,
      className,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null)
    const resolved = ref || localRef
    const reduced = prefersReducedMotion()

    useEffect(() => {
      if (reduced) return

      gsap.registerPlugin(ScrollTrigger)

      const element = resolved instanceof HTMLDivElement ? resolved : resolved.current

      if (!element) return

      const animation = animationPresets[animationType] || animationPresets.fadeInUp

      if (childSelector) {
        const children = element.querySelectorAll(childSelector)
        gsap.fromTo(
          children,
          animation,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 75%',
              end: 'top 20%',
              markers: false,
            },
          }
        )
      } else {
        gsap.fromTo(
          element,
          animation,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 75%',
              end: 'top 20%',
              markers: false,
            },
          }
        )
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === element) trigger.kill()
        })
      }
    }, [resolved, animationType, duration, childSelector, stagger, reduced])

    return (
      <div ref={resolved} className={className} {...props}>
        {children}
      </div>
    )
  }
)

ScrollReveal.displayName = 'ScrollReveal'

export default ScrollReveal
