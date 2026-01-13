'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Trophy, MapPin, Clock, DollarSign } from 'lucide-react'
import type { Program } from '@/payload-types'

type FeaturedProgramsBlockProps = {
  eyebrow?: string
  title?: string
  description?: string
  programTypeFilter?: 'all' | 'camp' | 'clinic' | 'tournament'
  programsLimit?: number
  ctaText?: string
  ctaLink?: string
}

const ProgramCard: React.FC<{ program: Program }> = ({ program }) => {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      <div className="relative h-48 bg-gradient-to-br from-[#052B70] to-[#0a3d8f] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-dots.svg')] opacity-10" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#3BD463]/20 rounded-tl-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Trophy size={64} className="text-white/20" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-heading text-2xl text-[#052B70] uppercase tracking-tight mb-3 group-hover:text-[#3BD463] transition-colors">
          {program.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {program.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {program.price && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#052B70]/5 rounded-full text-xs font-bold text-[#052B70]">
              <DollarSign size={12} className="text-[#3BD463]" />
              {program.price}
            </div>
          )}
          {program.location && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#052B70]/5 rounded-full text-xs font-bold text-[#052B70]">
              <MapPin size={12} className="text-[#3BD463]" />
              {program.location}
            </div>
          )}
          {program.duration && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#052B70]/5 rounded-full text-xs font-bold text-[#052B70]">
              <Clock size={12} className="text-[#3BD463]" />
              {program.duration}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-[#3BD463] font-bold text-sm group-hover:gap-3 transition-all">
          Learn More
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#3BD463] font-bold uppercase tracking-widest text-sm">
              <Zap size={16} /> {eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#052B70] mb-4 uppercase tracking-tight">
              {title}
            </h2>
            <p className="text-gray-500 max-w-lg text-lg">
              {description}
            </p>
          </div>
          <Link href={ctaLink}>
            <button className="hidden md:flex gap-2 items-center group rounded-full px-6 py-3 border-2 border-[#052B70] text-[#052B70] hover:bg-[#052B70] hover:text-white font-bold transition-all duration-300">
              {ctaText} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[380px] bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Trophy size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest">No programs available right now</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center md:hidden">
          <Link href={ctaLink}>
            <button className="w-full rounded-full py-4 px-6 bg-[#3BD463] text-white font-bold hover:bg-[#2EB854] transition-all">
              {ctaText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
