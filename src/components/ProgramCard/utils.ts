const MS_PER_DAY = 1000 * 60 * 60 * 24
const MS_PER_WEEK = MS_PER_DAY * 7

// Age Range Color Mapping
export const AGE_RANGE_COLORS = {
  '8to10': { bg: '#10B981', text: 'white' },
  '11to13': { bg: '#6366F1', text: 'white' },
} as const

// Sport Type Color Mapping
export const SPORT_TYPE_COLORS = {
  football: { bg: '#854D0E', text: 'white' },
  basketball: { bg: '#EA580C', text: 'white' },
  soccer: { bg: '#16A34A', text: 'white' },
  tennis: { bg: '#EAB308', text: '#1f2937' },
  volleyball: { bg: '#7C3AED', text: 'white' },
} as const

export type AgeRangeValue = keyof typeof AGE_RANGE_COLORS
export type SportTypeValue = keyof typeof SPORT_TYPE_COLORS

/**
 * Get colors for an age range value
 */
export function getAgeRangeColors(
  ageRange: string,
): { bg: string; text: string } {
  return AGE_RANGE_COLORS[ageRange as AgeRangeValue] || { bg: '#6B7280', text: 'white' }
}

/**
 * Get colors for a sport type value
 */
export function getSportTypeColors(
  sportType: string,
): { bg: string; text: string } {
  return SPORT_TYPE_COLORS[sportType as SportTypeValue] || { bg: '#6B7280', text: 'white' }
}

/**
 * Format age range value for display label
 */
export function formatAgeRangeLabel(ageRange: string): string {
  switch (ageRange) {
    case '8to10':
      return 'Ages 8-10'
    case '11to13':
      return 'Ages 11-13'
    default:
      return ageRange
  }
}

/**
 * Format sport type value for display label
 */
export function formatSportTypeLabel(sportType: string): string {
  switch (sportType) {
    case 'football':
      return 'Football'
    case 'basketball':
      return 'Basketball'
    case 'soccer':
      return 'Soccer'
    case 'tennis':
      return 'Tennis'
    case 'volleyball':
      return 'Volleyball'
    default:
      return sportType
  }
}

/**
 * Calculate the duration between two dates in a human-readable format
 */
export function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffMs = end.getTime() - start.getTime()

  const weeks = Math.round(diffMs / MS_PER_WEEK)
  if (weeks >= 1) {
    return weeks === 1 ? '1 week' : `${weeks} weeks`
  }

  const days = Math.round(diffMs / MS_PER_DAY)
  return days === 1 ? '1 day' : `${days} days`
}

/**
 * Format age range from min and max age values
 */
export function formatAgeRange(minAge: string, maxAge: string): string {
  if (minAge === maxAge) {
    return `Age ${minAge}`
  }
  return `Ages ${minAge}–${maxAge}`
}

/**
 * Format gender value for display
 */
export function formatGender(gender: 'boys' | 'girls' | 'coed'): string {
  switch (gender) {
    case 'boys':
      return 'Boys'
    case 'girls':
      return 'Girls'
    case 'coed':
      return 'Co-ed'
    default:
      return gender
  }
}

/**
 * Format location value for display
 */
export function formatLocation(location: 'chicago' | 'dallas'): string {
  switch (location) {
    case 'chicago':
      return 'Chicago'
    case 'dallas':
      return 'Dallas'
    default:
      return location
  }
}

/**
 * Get display label for program type
 */
export function getProgramTypeLabel(type: 'camp' | 'clinic' | 'tournament'): string {
  switch (type) {
    case 'camp':
      return 'Camp'
    case 'clinic':
      return 'Clinic'
    case 'tournament':
      return 'Tournament'
    default:
      return type
  }
}
