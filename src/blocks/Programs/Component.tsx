'use client'

import type { Program } from 'src/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  title?: string
  description?: string
  programs?: Program[]
  className?: string
}

export const ProgramsBlock: React.FC<Props> = ({ title, description, className }) => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('/api/programs?limit=6&depth=1')

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
        }

        setPrograms((await res.json()).docs)
      } catch (err) {
        console.error('Error fetching programs:', err)

        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  if (loading) {
    return <p className="mx-auto text-center">Loading programs...</p>
  }

  if (error) {
    return <p className="mx-auto text-center">Error loading programs: {error}</p>
  }
  return (
    <section className={cn('w-full bg-[#FFF9F2] py-16 px-4 md:px-8 rounded-t-[20px]', className)}>
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#5B2C0E] uppercase tracking-wide">
          {title}
        </h2>
        <p className="mt-3 text-base md:text-lg text-[#545454] max-w-2xl mx-auto">{description}</p>

        {/* Static Age Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <span className="px-3 py-1 border border-[#C4571B] text-[#C4571B] rounded-md text-sm font-semibold">
            5 to 7
          </span>
          <span className="px-3 py-1 border border-[#2B9CC8] text-[#2B9CC8] rounded-md text-sm font-semibold">
            8 to 10
          </span>
          <span className="px-3 py-1 border border-[#E1A529] text-[#E1A529] rounded-md text-sm font-semibold">
            11 to 13
          </span>
          <span className="px-3 py-1 border border-[#5A9E56] text-[#5A9E56] rounded-md text-sm font-semibold">
            14 to 16
          </span>
        </div>
      </div>

      {/* Program Cards */}
      <div className="mt-12 max-w-6xl mx-auto flex flex-col gap-10">
        {programs.map((p, idx) => {
          const colors = ['#C4571B', '#2B9CC8', '#E1A529', '#5A9E56']
          const color = p.themeColor || colors[idx % colors.length]

          return (
            <Card
              key={p.id ?? idx}
              className="relative rounded-2xl border border-[#E6E6E6] shadow-[0_2px_6px_rgba(0,0,0,0.05)] bg-white overflow-hidden"
            >
              <CardContent className="p-8 flex flex-col md:flex-row justify-between gap-8 relative">
                {/* Left Text Section */}
                <div className="flex-1">
                  <h3 className="text-xl font-extrabold uppercase" style={{ color }}>
                    {p.title}
                  </h3>
                  <p className="text-sm font-semibold uppercase mt-1" style={{ color }}>
                    {p.subtitle}
                  </p>
                  <p className="mt-3 text-[#333] leading-relaxed max-w-prose">{p.description}</p>

                  {p.buttonText && (
                    <Button className="mt-6" variant="default" style={{ color }}>
                      {p.buttonText}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
