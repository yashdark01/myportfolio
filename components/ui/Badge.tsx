import React from 'react'
import clsx from 'clsx'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'
  size?: 'sm' | 'md'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'primary', size = 'md', className, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300'

    const variantStyles = {
      primary: 'bg-primary/20 text-primary border border-primary/30',
      secondary: 'bg-accent/20 text-accent border border-accent/30',
      accent: 'bg-primary text-background',
      outline: 'border border-primary/50 text-primary hover:bg-primary/10',
    }

    const sizeStyles = {
      sm: 'px-3 py-1 text-xs',
      md: 'px-4 py-2 text-sm',
    }

    return (
      <span
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
