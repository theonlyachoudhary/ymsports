import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgramCard } from '@/components/ProgramCard'
import type { Program } from '@/payload-types'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
      exit,
      transition,
      whileInView,
      viewport,
      layout,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

const createMockProgram = (overrides: Partial<Program> = {}): Program => ({
  id: 1,
  programType: 'camp',
  featured: false,
  title: 'Test Program',
  subtitle: 'Test Subtitle',
  description: 'This is a test program description',
  price: '$199',
  location: 'chicago',
  startDate: '2025-06-01',
  endDate: '2025-06-08',
  startRegistrationDate: '2025-01-01',
  endRegistrationDate: '2025-05-31',
  weeklySchedule: 'Mondays 5pm-7pm',
  minAge: '5',
  maxAge: '10',
  gender: 'coed',
  buttonLink: '/register',
  slug: 'test-program',
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
  ...overrides,
})

describe('ProgramCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Standard Variant', () => {
    it('renders program title and subtitle', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="standard" disableAnimation />)

      expect(screen.getByText('Test Program')).toBeInTheDocument()
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
    })

    it('renders program description', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="standard" disableAnimation />)

      expect(screen.getByText('This is a test program description')).toBeInTheDocument()
    })

    it('renders price when showPrice is true', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="standard" showPrice disableAnimation />)

      expect(screen.getByText('$199')).toBeInTheDocument()
    })

    it('hides price when showPrice is false', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="standard" showPrice={false} disableAnimation />)

      expect(screen.queryByText('$199')).not.toBeInTheDocument()
    })

    it('renders location when showLocation is true', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="standard" showLocation disableAnimation />)

      expect(screen.getByText('Chicago')).toBeInTheDocument()
    })

    it('renders duration when showDuration is true', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="standard" showDuration disableAnimation />)

      expect(screen.getByText('1 week')).toBeInTheDocument()
    })

    it('renders age range when showAgeRange is true', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="standard" showAgeRange disableAnimation />)

      expect(screen.getByText('Ages 5–10')).toBeInTheDocument()
    })

    it('renders gender when showGender is true', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="standard" showGender disableAnimation />)

      expect(screen.getByText('Co-ed')).toBeInTheDocument()
    })

    it('renders weekly schedule when showSchedule is true', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="standard" showSchedule disableAnimation />)

      expect(screen.getByText('Mondays 5pm-7pm')).toBeInTheDocument()
    })

    it('renders link with correct href when slug exists', () => {
      const program = createMockProgram({ slug: 'my-program' })
      render(<ProgramCard program={program} variant="standard" disableAnimation />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/programs/my-program')
    })

    it('uses custom ctaText when provided', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="standard" ctaText="Sign Up" disableAnimation />)

      expect(screen.getByText('Sign Up')).toBeInTheDocument()
    })

    it('does not render link when slug is missing', () => {
      const program = createMockProgram({ slug: '' })
      render(<ProgramCard program={program} variant="standard" disableAnimation />)

      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })

  describe('Featured Variant', () => {
    it('renders program title', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="featured" disableAnimation />)

      expect(screen.getByText('Test Program')).toBeInTheDocument()
    })

    it('renders program description', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="featured" disableAnimation />)

      expect(screen.getByText('This is a test program description')).toBeInTheDocument()
    })

    it('renders price badge when showPrice is true', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="featured" showPrice disableAnimation />)

      expect(screen.getByText('$199')).toBeInTheDocument()
    })

    it('renders location badge when showLocation is true', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="featured" showLocation disableAnimation />)

      expect(screen.getByText('Chicago')).toBeInTheDocument()
    })

    it('renders duration badge when showDuration is true', () => {
      const program = createMockProgram()
      render(<ProgramCard program={program} variant="featured" showDuration disableAnimation />)

      expect(screen.getByText('1 week')).toBeInTheDocument()
    })

    it('renders link with correct href when slug exists', () => {
      const program = createMockProgram({ slug: 'featured-program' })
      render(<ProgramCard program={program} variant="featured" disableAnimation />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/programs/featured-program')
    })

    it('renders link with # when slug is missing', () => {
      const program = createMockProgram({ slug: '' })
      render(<ProgramCard program={program} variant="featured" disableAnimation />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '#')
    })

    it('uses custom ctaText when provided', () => {
      const program = createMockProgram()
      render(
        <ProgramCard program={program} variant="featured" ctaText="View Details" disableAnimation />
      )

      expect(screen.getByText('View Details')).toBeInTheDocument()
    })
  })

  describe('Animation behavior', () => {
    it('disables animation when disableAnimation is true', () => {
      const program = createMockProgram()
      const { container } = render(
        <ProgramCard program={program} variant="standard" disableAnimation />
      )

      // When animation is disabled, the Card should be rendered directly
      expect(container.querySelector('.group')).toBeInTheDocument()
    })
  })
})
