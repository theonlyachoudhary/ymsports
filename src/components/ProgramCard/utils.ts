const MS_PER_DAY = 1000 * 60 * 60 * 24
const MS_PER_WEEK = MS_PER_DAY * 7

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
