import { describe, it, expect } from 'vitest'
import {
  calculateDuration,
  formatAgeRange,
  formatGender,
  formatLocation,
  getProgramTypeLabel,
} from '@/components/ProgramCard/utils'

describe('ProgramCard Utils', () => {
  describe('calculateDuration', () => {
    it('returns "1 day" for a single day duration', () => {
      const result = calculateDuration('2025-01-01', '2025-01-02')
      expect(result).toBe('1 day')
    })

    it('returns plural days for multiple days less than a week', () => {
      const result = calculateDuration('2025-01-01', '2025-01-04')
      expect(result).toBe('3 days')
    })

    it('returns "1 week" for exactly 7 days', () => {
      const result = calculateDuration('2025-01-01', '2025-01-08')
      expect(result).toBe('1 week')
    })

    it('returns plural weeks for multiple weeks', () => {
      const result = calculateDuration('2025-01-01', '2025-01-15')
      expect(result).toBe('2 weeks')
    })

    it('handles same start and end date (0 days)', () => {
      const result = calculateDuration('2025-01-01', '2025-01-01')
      expect(result).toBe('0 days')
    })
  })

  describe('formatAgeRange', () => {
    it('returns "Age X" when min and max are the same', () => {
      const result = formatAgeRange('10', '10')
      expect(result).toBe('Age 10')
    })

    it('returns "Ages X–Y" when min and max are different', () => {
      const result = formatAgeRange('5', '12')
      expect(result).toBe('Ages 5–12')
    })
  })

  describe('formatGender', () => {
    it('returns "Boys" for boys', () => {
      expect(formatGender('boys')).toBe('Boys')
    })

    it('returns "Girls" for girls', () => {
      expect(formatGender('girls')).toBe('Girls')
    })

    it('returns "Co-ed" for coed', () => {
      expect(formatGender('coed')).toBe('Co-ed')
    })
  })

  describe('formatLocation', () => {
    it('returns "Chicago" for chicago', () => {
      expect(formatLocation('chicago')).toBe('Chicago')
    })

    it('returns "Dallas" for dallas', () => {
      expect(formatLocation('dallas')).toBe('Dallas')
    })
  })

  describe('getProgramTypeLabel', () => {
    it('returns "Camp" for camp', () => {
      expect(getProgramTypeLabel('camp')).toBe('Camp')
    })

    it('returns "Clinic" for clinic', () => {
      expect(getProgramTypeLabel('clinic')).toBe('Clinic')
    })

    it('returns "Tournament" for tournament', () => {
      expect(getProgramTypeLabel('tournament')).toBe('Tournament')
    })
  })
})
