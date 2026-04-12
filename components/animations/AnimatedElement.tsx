'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/utils/gsap-config'

interface AnimatedElementProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  animationType?:
    | 'fadeInUp'
    | 'fadeInDown'
    | 'fadeInLeft'
    | 'fadeInRight'
    | 'scaleIn'
    | 'rotateIn'
  duration?: number
  delay?: number
  stagger?: number
  childSelector?: string
}

const animationPresets = {
  fadeInUp: { y: 20, opacity: 0 },
  fadeInDown: { y: -20, opacity: 0 },
  fadeInLeft: { x: -20, opacity: 0 },
  fadeInRight: { x: 20, opacity: 0 },
  scaleIn: { scale: 0.9, opacity: 0 },
  rotateIn: { rotation: 180, opacity: 0 },
}

const AnimatedElement = React.forwardRef<HTMLDivElement, AnimatedElementProps>(
  (
    {
      children,
      animationType = 'fadeInUp',
      duration = 0.6,
      delay = 0,
      stagger = 0,
      childSelector,
      className,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null)
    const resolved = ref || localRef
    const reduced = prefersReducedMotion()

    useEffect(() => {
      if (reduced || !resolved) return

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
            rotation: 0,
            duration,
            delay,
            stagger: stagger || 0.1,
            ease: 'power2.out',
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
            rotation: 0,
            duration,
            delay,
            ease: 'power2.out',
          }
        )
      }
    }, [resolved, animationType, duration, delay, stagger, childSelector, reduced])

    return (
      <div ref={resolved} className={className} {...props}>
        {children}
      </div>
    )
  }
)

AnimatedElement.displayName = 'AnimatedElement'

export default AnimatedElement
