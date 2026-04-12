'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Button from '@/components/ui/Button'
import { prefersReducedMotion } from '@/utils/gsap-config'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced || !heroRef.current) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline()

      // Background animation - subtle movement
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          backgroundPosition: '100% 100%',
          duration: 20,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        })
      }

      // Profile image floating effect
      if (profileRef.current) {
        gsap.to(profileRef.current, {
          y: -20,
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })

        // Parallax on scroll
        gsap.to(
          profileRef.current,
          {
            y: 100,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
              markers: false,
            },
          }
        )
      }

      // Title animation - letter by letter reveal
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || ''
        titleRef.current.innerHTML = titleText
          .split('')
          .map(
            (char) =>
              `<span class="inline-block opacity-0" style="transition: opacity 0.3s ease;">${
                char === ' ' ? '&nbsp;' : char
              }</span>`
          )
          .join('')

        const titleLetters = titleRef.current.querySelectorAll('span')
        timeline.to(titleLetters, {
          opacity: 1,
          stagger: 0.05,
          duration: 0.3,
          delay: 0.2,
        })
      }

      // Subtitle fade in
      timeline.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        '<0.3'
      )

      // Description fade in
      timeline.to(
        descRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        '<0.2'
      )

      // Buttons staggered entry
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll('button')
        timeline.to(
          buttons,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          '<0.2'
        )
      }

      // Scroll indicator bounce
      const scrollIndicator = heroRef.current?.querySelector('.scroll-indicator')
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          y: 10,
          duration: 1.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, var(--color-primary) 0%, transparent 50%), radial-gradient(circle at 80% 80%, var(--color-accent) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-100px)]">
          {/* Left column - Text content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Title */}
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground"
            >
              Yash Patidar
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-primary font-semibold opacity-0 translate-y-4"
            >
              Full Stack Developer & AI Enthusiast
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base md:text-lg text-foreground-secondary leading-relaxed max-w-xl opacity-0 translate-y-4"
            >
              Crafting modern, animated web experiences with Next.js, TypeScript, and cutting-edge technologies. Passionate about building beautiful, performant applications.
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="opacity-0 translate-y-4 hover:shadow-lg hover:shadow-primary/50"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="opacity-0 translate-y-4 hover:shadow-lg hover:shadow-primary/30"
              >
                Get in Touch
              </Button>
            </div>

            {/* Social links hint */}
            <div className="flex gap-4 pt-8">
              {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                <button
                  key={social}
                  className="text-foreground-secondary hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* Right column - Profile image area */}
          <div className="flex items-center justify-center">
            <div
              ref={profileRef}
              className="relative w-80 h-80 md:w-96 md:h-96"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-20 blur-2xl animate-pulse" />

              {/* Profile image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/30 glass hover:border-primary/60 transition-colors duration-300">
                {/* Placeholder for profile image */}
                <div className="w-full h-full bg-gradient-to-br from-surface to-surface-secondary flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👨‍💻</div>
                    <p className="text-foreground-secondary text-sm">Your Profile Photo</p>
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 hover:opacity-10 transition-opacity duration-300" />
              </div>

              {/* Floating shapes background */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-foreground-secondary text-sm opacity-60">Scroll to explore</p>
        <svg
          className="w-6 h-6 text-primary animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
