'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section, { SectionHeading } from '@/components/ui/Section'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { prefersReducedMotion } from '@/utils/gsap-config'

interface SkillCategory {
  title: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'GSAP',
      'Vue.js',
      'CSS3',
      'HTML5',
    ],
  },
  {
    title: 'Backend Development',
    skills: [
      'Node.js',
      'Express',
      'Python',
      'PostgreSQL',
      'MongoDB',
      'Firebase',
      'GraphQL',
      'REST APIs',
    ],
  },
  {
    title: 'AI & Machine Learning',
    skills: [
      'TensorFlow',
      'PyTorch',
      'OpenAI API',
      'LangChain',
      'Data Analysis',
      'Python',
      'ML Models',
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      'Git & GitHub',
      'Docker',
      'AWS',
      'Vercel',
      'Figma',
      'Webpack',
      'npm/pnpm',
      'CI/CD',
    ],
  },
]

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced || !containerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate individual skill badges
      const badges = containerRef.current?.querySelectorAll('.skill-badge')
      badges?.forEach((badge) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: badge,
            start: 'top 80%',
            end: 'top 40%',
            markers: false,
          },
        })

        tl.fromTo(
          badge,
          {
            opacity: 0,
            scale: 0.8,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'back.out',
          }
        )

        // Hover animation
        badge.addEventListener('mouseenter', () => {
          gsap.to(badge, {
            scale: 1.15,
            duration: 0.3,
            ease: 'power2.out',
          })
        })

        badge.addEventListener('mouseleave', () => {
          gsap.to(badge, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      })
    }, containerRef)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      ctx.revert()
    }
  }, [reduced])

  return (
    <Section id="skills" className="relative">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <SectionHeading
        title="Skills & Expertise"
        subtitle="A comprehensive overview of my technical proficiencies"
        gradient={true}
      />

      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {skillCategories.map((category) => (
          <ScrollReveal
            key={category.title}
            animationType="fadeInUp"
            duration={0.7}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">
              {category.title}
            </h3>

            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="primary"
                  size="md"
                  className="skill-badge cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Stats section */}
      <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8">
        {[
          { number: '100+', label: 'Skills Mastered', icon: '📚' },
          { number: '50+', label: 'Projects Completed', icon: '🚀' },
          { number: '5+', label: 'Years Experience', icon: '⏰' },
        ].map((stat) => (
          <ScrollReveal
            key={stat.label}
            animationType="scaleIn"
            duration={0.6}
            delay={0.1}
            className="p-6 rounded-lg bg-surface glass border border-primary/20 text-center hover:border-primary/50 transition-all duration-300"
          >
            <p className="text-3xl md:text-4xl mb-2">{stat.icon}</p>
            <p className="text-xl md:text-2xl font-bold text-primary">
              {stat.number}
            </p>
            <p className="text-xs md:text-sm text-foreground-secondary">
              {stat.label}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}

export default Skills
