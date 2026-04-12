'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/utils/gsap-config'

interface ParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal'
  distance?: number
}

export const useParallax = (
  ref: React.RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const { speed = 0.5, direction = 'vertical', distance = 100 } = options
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const property = direction === 'vertical' ? 'y' : 'x'

      gsap.to(ref.current, {
        [property]: distance * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          markers: false,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      ctx.revert()
    }
  }, [ref, speed, direction, distance, reduced])
}

export const useMouseParallax = (
  ref: React.RefObject<HTMLElement>,
  intensity: number = 10
) => {
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return

    const element = ref.current
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = element.getBoundingClientRect()

      const x = (clientX - left - width / 2) / (width / 2)
      const y = (clientY - top - height / 2) / (height / 2)

      gsap.to(element, {
        rotationY: x * intensity,
        rotationX: -y * intensity,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, intensity, reduced])
}
