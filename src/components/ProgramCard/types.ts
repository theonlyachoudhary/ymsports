import type { Program } from '@/payload-types'

export type ProgramCardVariant = 'standard' | 'featured'

export interface ProgramCardProps {
  program: Program
  variant?: ProgramCardVariant
  disableAnimation?: boolean
  animationDelay?: number
  ctaText?: string
  showPrice?: boolean
  showLocation?: boolean
  showDuration?: boolean
  showAgeRange?: boolean
  showGender?: boolean
  showSchedule?: boolean
  showAgeRangeLabel?: boolean
  showSportTypeLabel?: boolean
}
