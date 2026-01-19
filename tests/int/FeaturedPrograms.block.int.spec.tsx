import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { FeaturedProgramsBlock } from '@/blocks/FeaturedPrograms/Component'
import type { Program } from '@/payload-types'

// Mock framer-motion
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

const createMockProgram = (id: number, overrides: Partial<Program> = {}): Program => ({
  id,
  programType: 'camp',
  featured: true,
  title: `Featured Program ${id}`,
  subtitle: `Subtitle ${id}`,
  description: `Description for featured program ${id}`,
  price: `$${id * 100}`,
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
  slug: `featured-program-${id}`,
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
  ...overrides,
})

describe('FeaturedProgramsBlock Component', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = mockFetch
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders loading state initially', () => {
    mockFetch.mockImplementation(() => new Promise(() => {})) // Never resolves

    render(<FeaturedProgramsBlock />)

    // Should show 3 skeleton placeholders
    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBe(3)
  })

  it('renders default eyebrow, title, and description', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<FeaturedProgramsBlock />)

    expect(screen.getByText('Upcoming Seasons')).toBeInTheDocument()
    expect(screen.getByText('Featured Programs')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Discover our most popular upcoming clinics and camps. Designed for every age and skill level.'
      )
    ).toBeInTheDocument()
  })

  it('renders custom eyebrow, title, and description', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(
      <FeaturedProgramsBlock
        eyebrow="Summer 2025"
        title="Hot Programs"
        description="Check these out!"
      />
    )

    expect(screen.getByText('Summer 2025')).toBeInTheDocument()
    expect(screen.getByText('Hot Programs')).toBeInTheDocument()
    expect(screen.getByText('Check these out!')).toBeInTheDocument()
  })

  it('renders programs after successful fetch', async () => {
    const programs = [createMockProgram(1), createMockProgram(2), createMockProgram(3)]

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: programs }),
    })

    render(<FeaturedProgramsBlock />)

    await waitFor(() => {
      expect(screen.getByText('Featured Program 1')).toBeInTheDocument()
      expect(screen.getByText('Featured Program 2')).toBeInTheDocument()
      expect(screen.getByText('Featured Program 3')).toBeInTheDocument()
    })
  })

  it('shows empty state when no programs are available', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<FeaturedProgramsBlock />)

    await waitFor(() => {
      expect(screen.getByText('No programs available right now')).toBeInTheDocument()
    })
  })

  it('renders CTA link with default text', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<FeaturedProgramsBlock />)

    await waitFor(() => {
      const ctaLinks = screen.getAllByText('View All Programs')
      expect(ctaLinks.length).toBeGreaterThan(0)
    })
  })

  it('renders CTA link with custom text and link', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<FeaturedProgramsBlock ctaText="See All Camps" ctaLink="/camps" />)

    await waitFor(() => {
      const ctaLinks = screen.getAllByText('See All Camps')
      expect(ctaLinks.length).toBeGreaterThan(0)

      // Check that at least one link has the correct href
      const links = screen.getAllByRole('link')
      const campLink = links.find((link) => link.getAttribute('href') === '/camps')
      expect(campLink).toBeInTheDocument()
    })
  })

  it('fetches with correct query parameters for default settings', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<FeaturedProgramsBlock />)

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/programs?limit=3&depth=1&where[featured][equals]=true'
    )
  })

  it('fetches with program type filter when specified', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<FeaturedProgramsBlock programTypeFilter="camp" />)

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/programs?limit=3&depth=1&where[featured][equals]=true&where[programType][equals]=camp'
    )
  })

  it('fetches with custom limit when specified', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<FeaturedProgramsBlock programsLimit={5} />)

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/programs?limit=5&depth=1&where[featured][equals]=true'
    )
  })

  it('handles fetch failure gracefully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    render(<FeaturedProgramsBlock />)

    // Should show empty state since error handling doesn't set an error state
    await waitFor(() => {
      expect(screen.getByText('No programs available right now')).toBeInTheDocument()
    })
  })

  it('handles network error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(<FeaturedProgramsBlock />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch programs', expect.any(Error))
    })

    consoleSpy.mockRestore()
  })

  it('handles undefined docs array in response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: undefined }),
    })

    render(<FeaturedProgramsBlock />)

    await waitFor(() => {
      expect(screen.getByText('No programs available right now')).toBeInTheDocument()
    })
  })

  it('does not add programType filter when set to all', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<FeaturedProgramsBlock programTypeFilter="all" />)

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/programs?limit=3&depth=1&where[featured][equals]=true'
    )
  })

  it('re-fetches when programsLimit changes', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    const { rerender } = render(<FeaturedProgramsBlock programsLimit={3} />)

    expect(mockFetch).toHaveBeenCalledTimes(1)

    rerender(<FeaturedProgramsBlock programsLimit={6} />)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })

  it('re-fetches when programTypeFilter changes', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    const { rerender } = render(<FeaturedProgramsBlock programTypeFilter="all" />)

    expect(mockFetch).toHaveBeenCalledTimes(1)

    rerender(<FeaturedProgramsBlock programTypeFilter="camp" />)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })
})
