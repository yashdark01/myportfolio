import React from 'react'
import clsx from 'clsx'

interface SectionProps extends React.HTMLAttributes<HTMLSection> {
  children: React.ReactNode
  id?: string
  className?: string
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, id, className, ...props }, ref) => (
    <section
      ref={ref}
      id={id}
      className={clsx(
        'relative py-20 md:py-32 overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
)

Section.displayName = 'Section'

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  gradient?: boolean
}

const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ title, subtitle, gradient = false, className, ...props }, ref) => (
    <div ref={ref} className={clsx('mb-12 md:mb-16', className)} {...props}>
      <h2
        className={clsx(
          'text-3xl md:text-4xl lg:text-5xl font-bold mb-4',
          gradient && 'gradient-text'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-foreground-secondary text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
)

SectionHeading.displayName = 'SectionHeading'

export default Section
export { SectionHeading }
