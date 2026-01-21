import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import * as React from 'react'

const buttonVariants = cva(
  'group inline-flex items-center justify-center whitespace-nowrap font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'px-6 py-3',
        icon: 'h-10 w-10',
        lg: 'px-8 py-4',
        sm: 'px-4 py-2 text-sm',
      },
      variant: {
        default: 'rounded-full bg-[#3BD463] text-white hover:bg-[#2EB854]',
        outline: 'rounded-full border-2 border-[#052B70] text-[#052B70] hover:bg-[#052B70] hover:text-white bg-transparent',
        destructive: 'rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'rounded-full hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        secondary: 'rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
  href?: string
  newTab?: boolean
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  href,
  newTab = false,
  children,
  ...props
}) => {
  const classes = cn(buttonVariants({ className, size, variant }))

  if (href) {
    const linkProps = newTab ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    )
  }

  const Comp = asChild ? Slot : 'button'
  return (
    <Comp className={classes} ref={ref} {...props}>
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
