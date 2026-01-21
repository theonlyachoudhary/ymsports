'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Zap, Trophy } from 'lucide-react'
import type { Program } from '@/payload-types'
import { ProgramCard } from '@/components/ProgramCard'
import { Button } from '@/components/ui/button'

type FeaturedProgramsBlockProps = {
  eyebrow?: string
  title?: string
  description?: string
  programTypeFilter?: 'all' | 'camp' | 'clinic' | 'tournament'
  programsLimit?: number
  ctaText?: string
  ctaLink?: string
}

export const FeaturedProgramsBlock: React.FC<FeaturedProgramsBlockProps> = ({
  eyebrow = 'Upcoming Seasons',
  title = 'Featured Programs',
  description = 'Discover our most popular upcoming clinics and camps. Designed for every age and skill level.',
  programTypeFilter = 'all',
  programsLimit = 3,
  ctaText = 'View All Programs',
  ctaLink = '/programs',
}) => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        let url = `/api/programs?limit=${programsLimit}&depth=1&where[featured][equals]=true`
        if (programTypeFilter && programTypeFilter !== 'all') {
          url += `&where[programType][equals]=${programTypeFilter}`
        }
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setPrograms(data.docs || [])
        }
      } catch (e) {
        console.error('Failed to fetch programs', e)
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [programsLimit, programTypeFilter])

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3BD463]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#052B70]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#3BD463]/10 rounded-full">
              <Zap size={16} className="text-[#3BD463]" />
              <span className="text-[#3BD463] font-bold uppercase tracking-widest text-sm">{eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#052B70] mb-4 uppercase tracking-tight">
              {title}
            </h2>
            <p className="text-gray-500 max-w-lg text-lg">
              {description}
            </p>
          </div>
          <Button href={ctaLink} variant="outline" className="hidden md:flex gap-2 items-center group">
            {ctaText} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[420px] bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Trophy size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest">No programs available right now</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {programs.map((program, index) => (
              <ProgramCard
                key={program.id}
                program={program}
                variant="featured"
                animationDelay={index * 0.05}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Button href={ctaLink} size="lg" className="w-full">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  )
}
