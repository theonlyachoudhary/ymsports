'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'

const ctaButtonVariants = cva(
  // Base styles
  'yms-cta relative inline-flex items-center justify-center font-heading uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: [
          'bg-[#3BD463] text-white',
          'shadow-[0_8px_30px_rgba(59,212,99,0.35)]',
          'hover:bg-[#2EB854] hover:shadow-[0_12px_40px_rgba(59,212,99,0.5)]',
          'active:scale-[0.97]',
          'focus-visible:ring-[#3BD463]',
        ],
        secondary: [
          'bg-transparent text-white',
          'border-2 border-white/30',
          'backdrop-blur-sm',
          'hover:border-white/70 hover:bg-white/10',
          'active:scale-[0.97]',
          'focus-visible:ring-white',
        ],
        outline: [
          'bg-transparent text-[#052B70]',
          'border-2 border-[#052B70]/30',
          'hover:border-[#052B70]/70 hover:bg-[#052B70]/5',
          'active:scale-[0.97]',
          'focus-visible:ring-[#052B70]',
        ],
        ghost: [
          'bg-white/10 text-white',
          'backdrop-blur-md',
          'hover:bg-white/20',
          'active:scale-[0.97]',
          'focus-visible:ring-white',
        ],
      },
      size: {
        sm: 'px-5 py-2.5 text-sm rounded-lg gap-2',
        md: 'px-7 py-3 text-base rounded-xl gap-2.5',
        lg: 'px-10 py-4 text-lg rounded-xl gap-3',
        xl: 'px-12 py-5 text-xl rounded-2xl gap-3',
      },
      glow: {
        true: '',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        glow: true,
        className: 'relative',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      glow: false,
      fullWidth: false,
    },
  },
)

type IconType = 'arrow' | 'chevron' | 'none'

export interface CTAButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    VariantProps<typeof ctaButtonVariants> {
  children: React.ReactNode
  href?: string
  newTab?: boolean
  icon?: IconType
  iconPosition?: 'left' | 'right'
  animate?: boolean
  animationDelay?: number
}

const iconComponents = {
  arrow: ArrowRight,
  chevron: ChevronRight,
  none: null,
}

export const CTAButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, CTAButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      glow,
      fullWidth,
      href,
      newTab = false,
      icon = 'none',
      iconPosition = 'right',
      animate = true,
      animationDelay = 0,
      ...props
    },
    ref,
  ) => {
    const IconComponent = iconComponents[icon]
    const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : size === 'lg' ? 18 : 20

    const content = (
      <>
        {icon !== 'none' && iconPosition === 'left' && IconComponent && (
          <IconComponent className="shrink-0" size={iconSize} />
        )}
        <span>{children}</span>
        {icon !== 'none' && iconPosition === 'right' && IconComponent && (
          <IconComponent className="shrink-0 transition-transform group-hover:translate-x-0.5" size={iconSize} />
        )}
      </>
    )

    const glowElement = glow && variant === 'primary' && (
      <div className="absolute -inset-1 bg-gradient-to-r from-[#3BD463] to-[#2EB854] rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
    )

    const motionProps = animate
      ? {
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: animationDelay, ease: [0.16, 1, 0.3, 1] },
          whileHover: { scale: 1.03 },
          whileTap: { scale: 0.97 },
        }
      : {
          whileHover: { scale: 1.03 },
          whileTap: { scale: 0.97 },
        }

    const buttonClasses = cn(
      ctaButtonVariants({ variant, size, glow, fullWidth }),
      'group',
      className,
    )

    if (href) {
      const linkProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

      if (glow) {
        return (
          <motion.div className="relative group" {...(animate ? { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: animationDelay } } : {})}>
            {glowElement}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={href}
                className={cn(buttonClasses, 'relative')}
                ref={ref as React.Ref<HTMLAnchorElement>}
                {...linkProps}
              >
                {content}
              </Link>
            </motion.div>
          </motion.div>
        )
      }

      return (
        <motion.div {...motionProps}>
          <Link
            href={href}
            className={buttonClasses}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...linkProps}
          >
            {content}
          </Link>
        </motion.div>
      )
    }

    // Button element
    if (glow) {
      return (
        <motion.div className="relative group" {...(animate ? { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: animationDelay } } : {})}>
          {glowElement}
          <motion.button
            className={cn(buttonClasses, 'relative')}
            ref={ref as React.Ref<HTMLButtonElement>}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            {...(props as any)}
          >
            {content}
          </motion.button>
        </motion.div>
      )
    }

    return (
      <motion.button
        className={buttonClasses}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...motionProps}
        {...(props as any)}
      >
        {content}
      </motion.button>
    )
  },
)

CTAButton.displayName = 'CTAButton'

export { ctaButtonVariants }
