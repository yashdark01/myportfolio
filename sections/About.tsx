'use client'

import { useRef } from 'react'
import Section, { SectionHeading } from '@/components/ui/Section'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/animations/ScrollReveal'

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const highlights = [
    'Web Development',
    'Full Stack',
    'TypeScript',
    'React & Next.js',
    'UI/UX',
    'Performance',
  ]

  return (
    <Section id="about" className="relative">
      {/* Gradient background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left column */}
        <ScrollReveal animationType="fadeInLeft" duration={0.8} className="space-y-6">
          <SectionHeading
            title="About Me"
            subtitle="Building digital experiences that matter"
            gradient={true}
          />

          <div className="space-y-4 text-foreground-secondary leading-relaxed">
            <p>
              I&apos;m a full-stack developer with a passion for creating beautiful, performant web
              applications. With expertise in modern JavaScript frameworks and cloud technologies, I
              transform complex ideas into elegant solutions.
            </p>

            <p>
              My journey in tech started with a curiosity about how things work on the web. Since
              then, I&apos;ve had the opportunity to work on diverse projects ranging from startups to
              established companies, always pushing the boundaries of what&apos;s possible.
            </p>

            <p>
              Beyond coding, I&apos;m deeply interested in AI/ML applications, system design, and
              helping others learn. I believe in continuous learning and sharing knowledge with the
              community.
            </p>
          </div>

          <Button variant="primary" size="md">
            Download Resume
          </Button>
        </ScrollReveal>

        {/* Right column */}
        <div className="space-y-8">
          {/* Highlights */}
          <ScrollReveal
            animationType="fadeInRight"
            duration={0.8}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">Core Competencies</h3>
            <div className="flex flex-wrap gap-3">
              {highlights.map((skill, index) => (
                <Badge key={skill} variant="primary" size="md">
                  {skill}
                </Badge>
              ))}
            </div>
          </ScrollReveal>

          {/* Stats Card */}
          <ScrollReveal
            animationType="scaleIn"
            duration={0.8}
            delay={0.2}
            className="grid grid-cols-3 gap-4 pt-4"
          >
            {[
              { number: '50+', label: 'Projects' },
              { number: '5+', label: 'Years Exp' },
              { number: '100%', label: 'Dedicated' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-lg bg-surface glass border border-primary/20 text-center hover:border-primary/50 transition-colors duration-300"
              >
                <p className="text-2xl font-bold text-primary">{stat.number}</p>
                <p className="text-xs text-foreground-secondary">{stat.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}

export default About
