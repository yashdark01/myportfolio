'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '@/utils/gsap-config'

interface UseGSAPAnimationProps {
  delay?: number
  duration?: number
  ease?: string
}

export const useGSAPAnimation = (
  animationFn: (context: GSAPContext) => void,
  deps: any[] = [],
  options: UseGSAPAnimationProps = {}
) => {
  const contextRef = useRef<GSAPContext | null>(null)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    contextRef.current = gsap.context(() => {
      animationFn(contextRef.current!)
    })

    return () => {
      contextRef.current?.revert()
    }
  }, deps)

  return contextRef
}

interface GSAPContext {
  [key: string]: any
}
