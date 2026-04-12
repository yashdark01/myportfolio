import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Global GSAP configuration
export const gsapConfig = {
  defaults: {
    duration: 0.6,
    ease: 'power2.inOut',
  },
  timing: {
    fast: 0.3,
    normal: 0.6,
    slow: 1,
  },
  stagger: 0.1,
}

// Animation presets
export const animationPresets = {
  fadeInUp: {
    duration: 0.6,
    y: 20,
    opacity: 0,
    ease: 'power2.out',
  },
  fadeInDown: {
    duration: 0.6,
    y: -20,
    opacity: 0,
    ease: 'power2.out',
  },
  fadeInLeft: {
    duration: 0.6,
    x: -20,
    opacity: 0,
    ease: 'power2.out',
  },
  fadeInRight: {
    duration: 0.6,
    x: 20,
    opacity: 0,
    ease: 'power2.out',
  },
  scaleIn: {
    duration: 0.6,
    scale: 0.9,
    opacity: 0,
    ease: 'power2.out',
  },
  rotateIn: {
    duration: 0.8,
    rotation: 180,
    opacity: 0,
    ease: 'power2.out',
  },
}

// Helper to check if animations are disabled
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Timeline utilities
export const createTimeline = () => {
  return gsap.timeline({
    paused: prefersReducedMotion(),
  })
}
