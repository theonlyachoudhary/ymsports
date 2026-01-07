'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, Trophy, Filter, X } from 'lucide-react'
import type { Camp } from '@/payload-types'

interface ProgramsPageClientProps {
  programs: Camp[]
}

const programTypeLabels: Record<string, string> = {
  camp: 'Camp',
  clinic: 'Clinic',
  league: 'League',
  tournament: 'Tournament',
}

const locationLabels: Record<string, string> = {
  IL: 'Chicago, IL',
  TX: 'Dallas, TX',
  VA: 'Virginia',
}

export function ProgramsPageClient({ programs }: ProgramsPageClientProps) {
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [locationFilter, setLocationFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesType = typeFilter === 'all' || program.programType === typeFilter
      const matchesLocation = locationFilter === 'all' || program.location?.state === locationFilter
      return matchesType && matchesLocation
    })
  }, [programs, typeFilter, locationFilter])

  const programTypes = ['all', 'camp', 'clinic', 'league', 'tournament']
  const locations = ['all', 'IL', 'TX', 'VA']

  const clearFilters = () => {
    setTypeFilter('all')
    setLocationFilter('all')
  }

  const hasActiveFilters = typeFilter !== 'all' || locationFilter !== 'all'

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <section className="relative py-32 bg-[#052B70] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-6xl md:text-8xl text-white uppercase mb-4 tracking-tight">
              Our <span className="text-[#3BD463]">Programs</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
              Elite training for the next generation of athletes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-all md:hidden text-[#052B70]"
            >
              <Filter className="w-5 h-5" />
              Filter Programs
            </button>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Type</span>
                <div className="flex gap-2">
                  {programTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        typeFilter === type
                          ? 'bg-[#052B70] text-white shadow-lg'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {type === 'all' ? 'All' : programTypeLabels[type]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-px h-10 bg-gray-100" />

              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Location</span>
                <div className="flex gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocationFilter(loc)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        locationFilter === loc
                          ? 'bg-[#052B70] text-white shadow-lg'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {loc === 'all' ? 'All Locations' : locationLabels[loc]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="hidden md:flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden mt-4 overflow-hidden"
              >
                <div className="space-y-4 pb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600 block mb-2">Program Type</span>
                    <div className="flex flex-wrap gap-2">
                      {programTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setTypeFilter(type)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            typeFilter === type
                              ? 'bg-[#1a365d] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {type === 'all' ? 'All' : programTypeLabels[type]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600 block mb-2">Location</span>
                    <div className="flex flex-wrap gap-2">
                      {locations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setLocationFilter(loc)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            locationFilter === loc
                              ? 'bg-[#1a365d] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {loc === 'all' ? 'All' : locationLabels[loc]}
                        </button>
                      ))}
                    </div>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                      Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredPrograms.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No programs found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters to find programs.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-[#3BD463] text-white rounded-full font-medium hover:bg-[#34BF58] transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredPrograms.map((program, index) => (
                  <ProgramCard key={program.id} program={program} index={index} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function ProgramCard({ program, index }: { program: Camp; index: number }) {
  const locationDisplay = program.location
    ? `${program.location.city}, ${program.location.state}`
    : 'TBD'

  const dateDisplay = program.startDate && program.endDate
    ? `${program.startDate} - ${program.endDate}`
    : program.startDate || 'TBD'

  const ageDisplay = program.ageMin && program.ageMax
    ? `Ages ${program.ageMin}-${program.ageMax}`
    : 'All Ages'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/programs/${program.slug}`}>
        <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer border-2 border-gray-50 hover:border-[#3BD463]/20">
          <div className="relative h-64 overflow-hidden">
            {program.featuredImage && typeof program.featuredImage === 'object' && program.featuredImage.url ? (
              <img
                src={program.featuredImage.url}
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <img
                src="/hero-sports.jpg"
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            )}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-[#052B70] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg">
                {programTypeLabels[program.programType || 'camp']}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#052B70]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="p-8 relative">
            <h3 className="font-heading text-3xl font-bold text-gray-900 mb-3 group-hover:text-[#052B70] transition-colors uppercase leading-none tracking-tight">
              {program.title}
            </h3>
            
            <p className="text-gray-500 text-base mb-6 line-clamp-2 font-medium">
              {program.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#052B70]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{locationDisplay}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#3BD463]">
                  <Trophy className="w-4 h-4" />
                </div>
                <span>{ageDisplay}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t-2 border-gray-50">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-1">Registration</span>
                <span className="text-3xl font-black text-[#052B70]">
                  ${program.price}
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#3BD463] text-white flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-lg shadow-[#3BD463]/20">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
