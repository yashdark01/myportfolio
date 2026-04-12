'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section, { SectionHeading } from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { prefersReducedMotion } from '@/utils/gsap-config'

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Startup Inc.',
    period: '2022 - Present',
    description:
      'Leading development of customer-facing products using Next.js and TypeScript. Architected scalable solutions serving 100k+ users daily.',
    skills: ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Agency Pro',
    period: '2020 - 2022',
    description:
      'Developed responsive web applications and implemented real-time features. Mentored junior developers and improved team productivity.',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'WebSockets'],
  },
  {
    title: 'Frontend Developer',
    company: 'Creative Studio',
    period: '2019 - 2020',
    description:
      'Built interactive UI components and optimized performance. Collaborated with designers to implement pixel-perfect designs.',
    skills: ['React', 'CSS3', 'JavaScript', 'Figma', 'webpack'],
  },
]

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced || !timelineRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.to('.timeline-line', {
        height: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: 1,
          markers: false,
        },
      })

      // Timeline items staggered entry from alternating sides
      const items = containerRef.current?.querySelectorAll('.timeline-item')
      items?.forEach((item, index) => {
        const isEven = index % 2 === 0
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: isEven ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              end: 'top 25%',
              markers: false,
            },
          }
        )
      })

      // Dot animations
      const dots = containerRef.current?.querySelectorAll('.timeline-dot')
      dots?.forEach((dot, index) => {
        gsap.fromTo(
          dot,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out',
            scrollTrigger: {
              trigger: dot,
              start: 'top 70%',
              end: 'top 50%',
              markers: false,
            },
          }
        )
      })
    }, containerRef)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      ctx.revert()
    }
  }, [reduced])

  return (
    <Section id="experience" className="relative">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <SectionHeading title="Experience" gradient={true} />

      <div ref={containerRef} className="relative">
        {/* Timeline container */}
        <div ref={timelineRef} className="relative">
          {/* Timeline vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 w-0.5 h-0 bg-gradient-to-b from-primary to-accent timeline-line" />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch`}>
                  {/* Timeline dot and content */}
                  <div
                    className={`md:${
                      index % 2 === 0 ? 'order-1' : 'order-2'
                    } flex flex-col justify-center`}
                  >
                    <Card glass hover={true} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-12 top-8 hidden md:block">
                        <div className="timeline-dot w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50" />
                      </div>

                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">
                            {exp.title}
                          </h3>
                          <p className="text-primary font-semibold">{exp.company}</p>
                          <p className="text-sm text-foreground-secondary">
                            {exp.period}
                          </p>
                        </div>

                        <p className="text-foreground-secondary leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Skills badges */}
                        <div className="flex flex-wrap gap-2 pt-4">
                          {exp.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              size="sm"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile timeline (simplified) */}
        <div className="md:hidden space-y-6">
          {experiences.map((exp) => (
            <Card key={exp.company} glass hover={true} className="relative">
              <div className="absolute -left-4 top-6">
                <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-md shadow-primary/50" />
              </div>

              <div className="p-6 space-y-3 pl-8">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-primary font-semibold">
                    {exp.company}
                  </p>
                  <p className="text-xs text-foreground-secondary">
                    {exp.period}
                  </p>
                </div>

                <p className="text-sm text-foreground-secondary">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      size="sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Experience
