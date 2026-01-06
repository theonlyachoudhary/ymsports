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
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-20 bg-gradient-to-br from-[#1a365d] to-[#2d3748]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white uppercase mb-4">
              Programs
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our youth sports programs designed to build skills, character, and champions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors md:hidden"
            >
              <Filter className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="bg-[#3BD463] text-white text-xs px-2 py-0.5 rounded-full">
                  {(typeFilter !== 'all' ? 1 : 0) + (locationFilter !== 'all' ? 1 : 0)}
                </span>
              )}
            </button>

            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Type:</span>
                <div className="flex gap-2">
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

              <div className="w-px h-8 bg-gray-300" />

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Location:</span>
                <div className="flex gap-2">
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
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/programs/${program.slug}`}>
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
          <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
            {program.featuredImage && typeof program.featuredImage === 'object' && program.featuredImage.url ? (
              <img
                src={program.featuredImage.url}
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <img
                src="/hero-sports.jpg"
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-[#1a365d] text-white text-sm font-medium rounded-full">
                {programTypeLabels[program.programType || 'camp']}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3BD463] transition-colors uppercase">
              {program.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {program.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{locationDisplay}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{dateDisplay}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Trophy className="w-4 h-4" />
                <span>{ageDisplay}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-2xl font-bold text-[#1a365d]">
                ${program.price}
              </span>
              <span className="text-sm font-medium text-[#3BD463] group-hover:translate-x-1 transition-transform">
                Learn More →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
