'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import Section, { SectionHeading } from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Card, { CardBody } from '@/components/ui/Card'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { prefersReducedMotion } from '@/utils/gsap-config'

interface FormData {
  name: string
  email: string
  message: string
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const submitBtnRef = useRef<HTMLButtonElement>(null)
  const reduced = prefersReducedMotion()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Success animation
    if (!reduced && submitBtnRef.current) {
      gsap.to(submitBtnRef.current, {
        scale: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      })
    }

    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <Section id="contact" className="relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

      <SectionHeading
        title="Get In Touch"
        subtitle="Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life"
        gradient={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <ScrollReveal animationType="fadeInLeft" duration={0.8}>
          <div className="space-y-8">
            {[
              {
                icon: '📧',
                label: 'Email',
                value: 'hello@example.com',
                href: 'mailto:hello@example.com',
              },
              {
                icon: '🔗',
                label: 'LinkedIn',
                value: '/in/yashpatidar',
                href: 'https://linkedin.com',
              },
              {
                icon: '🐙',
                label: 'GitHub',
                value: '@yashpatidar',
                href: 'https://github.com',
              },
              {
                icon: '🐦',
                label: 'Twitter',
                value: '@yashpatidar',
                href: 'https://twitter.com',
              },
            ].map((contact) => (
              <div key={contact.label} className="flex items-start gap-4">
                <div className="text-3xl">{contact.icon}</div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {contact.label}
                  </h4>
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light transition-colors duration-300"
                  >
                    {contact.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Contact Form */}
        <ScrollReveal animationType="fadeInRight" duration={0.8}>
          <Card glass={true} hover={false}>
            <CardBody className="space-y-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="text-5xl">✓</div>
                  <h3 className="text-xl font-bold text-primary">
                    Message Sent!
                  </h3>
                  <p className="text-foreground-secondary text-center">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="group">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-surface border border-foreground/10 text-foreground placeholder-foreground-secondary focus:outline-none focus:border-primary transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-surface border border-foreground/10 text-foreground placeholder-foreground-secondary focus:outline-none focus:border-primary transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="group">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-surface border border-foreground/10 text-foreground placeholder-foreground-secondary focus:outline-none focus:border-primary transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    ref={submitBtnRef}
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full hover:shadow-lg hover:shadow-primary/50"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </CardBody>
          </Card>
        </ScrollReveal>
      </div>

      {/* Additional CTA */}
      <ScrollReveal
        animationType="fadeInUp"
        duration={0.8}
        className="mt-16 text-center space-y-4"
      >
        <p className="text-foreground-secondary">
          Prefer a quick call? Schedule a meeting with me.
        </p>
        <Button
          variant="outline"
          size="md"
          className="hover:shadow-lg hover:shadow-primary/30"
        >
          Schedule a Meeting
        </Button>
      </ScrollReveal>
    </Section>
  )
}

export default Contact
