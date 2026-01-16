'use client'

import type { Program } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Filter, MapPin, Clock, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type FilterItem = {
  label: string
  value: string
  id?: string | null
}

type Props = {
  title?: string
  description?: string
  filters?: FilterItem[]
  programs?: (number | Program)[]
  className?: string
}
const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

function weeksBetween(start: Date, end: Date): number {
  const diffMs = end.getTime() - start.getTime();
  return diffMs / MS_PER_WEEK;
}

const ProgramCard: React.FC<{ program: Program }> = ({ program }) => {
  const color = program.featured ? '#052B70' : '#4B5563' // example: featured programs get special color

  return (
    <Card className="group relative rounded-2xl border border-gray-200 shadow-md bg-white overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
      {program.programImage && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={program.programImage.url}
            alt={program.programImage.alt || program.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-bold uppercase tracking-tight" style={{ color }}>
            {program.title}
          </h3>
          {program.subtitle && (
            <p className="text-sm font-medium text-gray-500 uppercase mt-1">{program.subtitle}</p>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{program.description}</p>

        <div className="space-y-2 mb-4">
          {program.price && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign size={16} className="text-gray-400" />
              <span>{program.price}</span>
            </div>
          )}
          {program.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-gray-400" />
              <span>{program.location}</span>
            </div>
          )}
          {(program.startDate && program.endDate) && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-gray-400" />
              <span>{weeksBetween(new Date(program.startDate), new Date(program.endDate))} weeks</span>
            </div>
          )}
          {(program.minAge && program.maxAge) && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Ages {program.minAge}–{program.maxAge}</span>
            </div>
          )}
          {program.gender && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{program.gender.charAt(0).toUpperCase() + program.gender.slice(1)}</span>
            </div>
          )}
          {program.weeklySchedule && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{program.weeklySchedule}</span>
            </div>
          )}
        </div>

        {program.slug && (
          <Link href={`/programs/${program.slug}`}>
            <Button
              className="w-full font-semibold text-white transition-all"
              style={{ backgroundColor: color }}
            >
              Register Now
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}


export const ProgramsBlock: React.FC<Props> = ({
  title,
  description,
  filters = [{ label: 'All', value: 'all' }],
  className
}) => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('/api/programs?limit=100&depth=1')
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)

        const json = await res.json()
        const now = new Date()

        const filteredPrograms = json.docs.filter((p: Program) => {
          const start = new Date(p.startRegistrationDate)
          const end = new Date(p.endRegistrationDate)
          return now >= start && now <= end
        })

        setPrograms(filteredPrograms)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  const filteredPrograms = useMemo(() => {
    if (activeFilter === 'all') return programs
    return programs.filter(p =>
      p.title?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      p.subtitle?.toLowerCase().includes(activeFilter.toLowerCase())
    )
  }, [programs, activeFilter])

  // Loading/Error UI (same as before)...

  return (
    <section className={cn('w-full bg-gray-50 py-16 px-4 md:px-8', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#052B70] uppercase tracking-wide">
            {title}
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 sticky top-20 z-30 bg-gray-50/95 backdrop-blur py-4 border-b border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter size={20} className="text-gray-400 mr-2 shrink-0" />
            {filters.map(f => (
              <Button
                key={f.value}
                variant={activeFilter === f.value ? "default" : "outline"}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  "rounded-full shrink-0 transition-all",
                  activeFilter === f.value
                    ? "bg-[#052B70] text-white hover:bg-[#041f52]"
                    : "border-gray-300 hover:border-[#052B70] hover:text-[#052B70]"
                )}
              >
                {f.label}
              </Button>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredPrograms.length} results
          </div>
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map(program => (
              <motion.div
                key={program.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ProgramCard program={program} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPrograms.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
              No programs found for this category.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
