'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section, { SectionHeading } from '@/components/ui/Section'
import Card, { CardBody } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { prefersReducedMotion } from '@/utils/gsap-config'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  link?: string
  github?: string
}

const projects: Project[] = [
  {
    title: 'Animated Portfolio',
    description:
      'A modern portfolio website with GSAP animations, glassmorphism effects, and smooth scroll-triggered transitions. Built with Next.js and TypeScript for optimal performance.',
    image: '/project-1.jpg',
    technologies: ['Next.js', 'TypeScript', 'GSAP', 'Tailwind CSS'],
    link: '#',
    github: '#',
  },
  {
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard. Implements advanced caching and optimization techniques.',
    image: '/project-2.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    link: '#',
    github: '#',
  },
  {
    title: 'AI Chat Assistant',
    description:
      'Intelligent chatbot powered by GPT API with context awareness and custom memory. Features real-time streaming responses and multi-user support.',
    image: '/project-3.jpg',
    technologies: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL'],
    link: '#',
    github: '#',
  },
  {
    title: 'Data Analytics Dashboard',
    description:
      'Interactive analytics platform with real-time data visualization and custom reporting. Built with React for responsive design and Recharts for advanced visualizations.',
    image: '/project-4.jpg',
    technologies: ['React', 'Recharts', 'D3.js', 'Node.js', 'PostgreSQL'],
    link: '#',
    github: '#',
  },
  {
    title: 'Social Media App',
    description:
      'Full-featured social platform with real-time notifications, image optimization, and advanced search. Implements WebSockets for instant updates.',
    image: '/project-5.jpg',
    technologies: ['Next.js', 'Firebase', 'WebSockets', 'TailwindCSS'],
    link: '#',
    github: '#',
  },
  {
    title: 'Developer Tools SaaS',
    description:
      'Subscription-based development tools platform with user authentication, billing integration, and collaborative features. Built for scalability.',
    image: '/project-6.jpg',
    technologies: ['Next.js', 'Stripe', 'Auth.js', 'Prisma', 'PostgreSQL'],
    link: '#',
    github: '#',
  },
]

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced || !containerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate project cards on scroll
      const cards = containerRef.current?.querySelectorAll('.project-card')
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.9,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 40%',
              markers: false,
            },
          }
        )

        // Image zoom on hover
        const img = card.querySelector('.project-image-wrapper')
        if (img) {
          gsap.set(img, { transformOrigin: 'center center' })

          card.addEventListener('mouseenter', () => {
            gsap.to(img, {
              scale: 1.1,
              duration: 0.4,
              ease: 'power2.out',
            })
          })

          card.addEventListener('mouseleave', () => {
            gsap.to(img, {
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
            })
          })
        }
      })
    }, containerRef)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      ctx.revert()
    }
  }, [reduced])

  return (
    <Section id="projects" className="relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <SectionHeading
        title="Featured Projects"
        subtitle="A collection of my recent work showcasing diverse technologies and problem-solving approaches"
        gradient={true}
      />

      {/* Projects Grid */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => (
          <Card
            key={project.title}
            glass={true}
            hover={true}
            className="project-card flex flex-col overflow-hidden h-full transition-all duration-300"
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden bg-surface-secondary">
              <div className="project-image-wrapper w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">
                    {['🚀', '💻', '🤖', '📊', '👥', '⚡'][index % 6]}
                  </div>
                  <p className="text-foreground-secondary text-sm">Project Image</p>
                </div>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
            </div>

            <CardBody className="flex-1 flex flex-col justify-between space-y-4">
              {/* Title and description */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-foreground/5">
                {project.link && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 hover:shadow-lg hover:shadow-primary/30"
                  >
                    View Project
                  </Button>
                )}
                {project.github && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:shadow-lg hover:shadow-primary/30"
                  >
                    GitHub
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* View all projects CTA */}
      <ScrollReveal
        animationType="fadeInUp"
        duration={0.8}
        className="flex justify-center mt-16"
      >
        <Button variant="outline" size="lg">
          View All Projects
        </Button>
      </ScrollReveal>
    </Section>
  )
}

export default Projects
