import * as React from 'react'
import { Button, type ButtonProps, buttonVariants } from '@/components/ui/button'

// CTAButton is now a wrapper around the unified Button component
// This export is kept for backward compatibility
export interface CTAButtonProps extends ButtonProps {}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <Button ref={ref} {...props}>
        {children}
      </Button>
    )
  },
)

CTAButton.displayName = 'CTAButton'

// Export buttonVariants as ctaButtonVariants for backward compatibility
export { CTAButton, buttonVariants as ctaButtonVariants }
