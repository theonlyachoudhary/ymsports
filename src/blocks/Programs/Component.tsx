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
  const color = program.themeColor || '#052B70'
  
  return (
    <Card className="group relative rounded-2xl border border-gray-200 shadow-md bg-white overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
      <CardContent className="p-0 flex flex-col h-full">
        <div 
          className="h-3 w-full"
          style={{ backgroundColor: color }}
        />
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3 
              className="text-xl font-bold uppercase tracking-tight"
              style={{ color }}
            >
              {program.title}
            </h3>
            <p className="text-sm font-medium text-gray-500 uppercase mt-1">
              {program.subtitle}
            </p>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
            {program.description}
          </p>
          
          <div className="space-y-2 mb-6">
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
            {program.duration && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-gray-400" />
                <span>{
                  weeksBetween(new Date(program.startDate), new Date(program.endDate))
                }</span>
              </div>
            )}
          </div>
          
          {program.buttonLink && (
            <Link href={program.buttonLink}>
              <Button 
                className="w-full font-semibold text-white transition-all"
                style={{ backgroundColor: color }}
              >
                Register Now
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export const ProgramsBlock: React.FC<Props> = ({ 
  title, 
  description, 
  filters = [{ label: 'All', value: 'all' }],
  programs: programsFromProps,
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
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
        }

        const json = await res.json()
        const now = new Date()

        const filteredPrograms = json.docs.filter((program: any) => {
          const start = new Date(program.startRegistrationDate)
          const end = new Date(program.endRegistrationDate)

          return now >= start && now <= end
        })

        setPrograms(filteredPrograms)
      } catch (err) {
        console.error('Error fetching programs:', err)
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
      p.subtitle?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      p.title?.toLowerCase().includes(activeFilter.toLowerCase())
    )
  }, [programs, activeFilter])

  if (loading) {
    return (
      <section className={cn('w-full py-16 px-4 md:px-8', className)}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={cn('w-full py-16 px-4 md:px-8', className)}>
        <p className="mx-auto text-center text-red-500">Error loading programs: {error}</p>
      </section>
    )
  }

  return (
    <section className={cn('w-full bg-gray-50 py-16 px-4 md:px-8', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#052B70] uppercase tracking-wide">
            {title}
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 sticky top-20 z-30 bg-gray-50/95 backdrop-blur py-4 border-b border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter size={20} className="text-gray-400 mr-2 shrink-0" />
            {filters.map((f) => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => (
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
