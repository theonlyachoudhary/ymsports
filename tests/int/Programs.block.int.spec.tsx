import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { ProgramsBlock } from '@/blocks/Programs/Component'
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
      layoutId,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({
    children,
    mode,
  }: React.PropsWithChildren<{ mode?: string }>) => <>{children}</>,
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

const createMockProgram = (id: number, overrides: Partial<Program> = {}): Program => {
  const now = new Date()
  const startReg = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  const endReg = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now

  return {
    id,
    programType: 'camp',
    featured: false,
    title: `Test Program ${id}`,
    subtitle: `Subtitle ${id}`,
    description: `Description for program ${id}`,
    price: `$${id * 100}`,
    location: 'chicago',
    startDate: '2025-06-01',
    endDate: '2025-06-08',
    startRegistrationDate: startReg.toISOString(),
    endRegistrationDate: endReg.toISOString(),
    weeklySchedule: 'Mondays 5pm-7pm',
    minAge: '5',
    maxAge: '10',
    gender: 'coed',
    buttonLink: '/register',
    slug: `test-program-${id}`,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('ProgramsBlock Component', () => {
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

    render(<ProgramsBlock title="Programs" summary="Our programs" />)

    // Should show 3 skeleton placeholders
    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBe(3)
  })

  it('renders title and summary', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<ProgramsBlock title="Our Programs" summary="Check out our amazing programs" />)

    expect(screen.getByText('Our Programs')).toBeInTheDocument()
    expect(screen.getByText('Check out our amazing programs')).toBeInTheDocument()
  })

  it('renders programs after successful fetch', async () => {
    const programs = [createMockProgram(1), createMockProgram(2)]

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: programs }),
    })

    render(<ProgramsBlock title="Programs" />)

    await waitFor(() => {
      expect(screen.getByText('Test Program 1')).toBeInTheDocument()
      expect(screen.getByText('Test Program 2')).toBeInTheDocument()
    })
  })

  it('renders all programs returned from API', async () => {
    const program1 = createMockProgram(1, { title: 'Program One' })
    const program2 = createMockProgram(2, { title: 'Program Two' })

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [program1, program2] }),
    })

    render(<ProgramsBlock title="Programs" />)

    await waitFor(() => {
      expect(screen.getByText('Program One')).toBeInTheDocument()
      expect(screen.getByText('Program Two')).toBeInTheDocument()
    })
  })

  it('shows empty state when no programs match filters', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<ProgramsBlock title="Programs" />)

    await waitFor(() => {
      expect(screen.getByText(/No Camps Available/i)).toBeInTheDocument()
    })
  })

  it('renders error state on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Failed to load programs'))

    render(<ProgramsBlock title="Programs" />)

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument()
    })
  })

  it('handles network error gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(<ProgramsBlock title="Programs" />)

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument()
    })
  })

  it('renders program type tabs', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<ProgramsBlock title="Programs" />)

    // Find the tabs container and check for buttons
    const tabButtons = screen.getAllByRole('button')
    const tabLabels = tabButtons.map((btn) => btn.textContent)

    expect(tabLabels).toContain('Camps')
    expect(tabLabels).toContain('Clinics')
    expect(tabLabels).toContain('Tournaments')
    expect(tabLabels).toContain('Leagues')
  })

  it('renders location filter buttons', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<ProgramsBlock title="Programs" />)

    expect(screen.getByText('Chicago')).toBeInTheDocument()
    expect(screen.getByText('Dallas')).toBeInTheDocument()
  })

  it('shows correct result count', async () => {
    const programs = [createMockProgram(1), createMockProgram(2), createMockProgram(3)]

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: programs }),
    })

    render(<ProgramsBlock title="Programs" />)

    await waitFor(() => {
      expect(screen.getByText(/3 programs in Chicago/)).toBeInTheDocument()
    })
  })

  it('handles undefined docs array in response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: undefined }),
    })

    render(<ProgramsBlock title="Programs" />)

    await waitFor(() => {
      expect(screen.getByText(/No Camps Available/i)).toBeInTheDocument()
    })
  })

  it('fetches from correct API endpoint with type and location filters', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<ProgramsBlock title="Programs" />)

    // Default is camp type and chicago location
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/programs?depth=1&where[programType][equals]=camp&where[location][equals]=chicago',
    )
  })

  it('changes location when location button is clicked', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<ProgramsBlock title="Programs" />)

    // Wait for initial load
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    // Click Dallas button
    const dallasButton = screen.getByText('Dallas')
    fireEvent.click(dallasButton)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/programs?depth=1&where[programType][equals]=camp&where[location][equals]=dallas',
      )
    })
  })

  it('changes program type when tab is clicked', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ docs: [] }),
    })

    render(<ProgramsBlock title="Programs" />)

    // Wait for initial load
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    // Click Clinics tab
    const clinicsTab = screen.getByText('Clinics')
    fireEvent.click(clinicsTab)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/programs?depth=1&where[programType][equals]=clinic&where[location][equals]=chicago',
      )
    })
  })
})
