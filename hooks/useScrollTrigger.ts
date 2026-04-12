'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/utils/gsap-config'

interface ScrollTriggerOptions {
  trigger?: string | HTMLElement
  start?: string
  end?: string
  markers?: boolean
  onEnter?: () => void
  onLeave?: () => void
  scrub?: boolean | number
}

export const useScrollTrigger = (
  animationFn: (context: gsap.Context) => void,
  triggerRef: React.RefObject<HTMLElement>,
  options: ScrollTriggerOptions = {}
) => {
  const contextRef = useRef<gsap.Context | null>(null)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced || !triggerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    contextRef.current = gsap.context(() => {
      animationFn(contextRef.current!)
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      contextRef.current?.revert()
    }
  }, [triggerRef, reduced])

  return contextRef
}

export const useAnimateOnScroll = (
  triggerRef: React.RefObject<HTMLElement>,
  childSelector: string,
  animationProps: any = {}
) => {
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced || !triggerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const elements = triggerRef.current?.querySelectorAll(childSelector)

      gsap.to(elements, {
        ...animationProps,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          ...animationProps.scrollTrigger,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      ctx.revert()
    }
  }, [triggerRef, childSelector, reduced])
}
