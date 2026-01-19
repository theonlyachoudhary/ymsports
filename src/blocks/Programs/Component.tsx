'use client'

import type { Program } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProgramCard } from '@/components/ProgramCard'
import {
  Zap,
  MapPin,
  Trophy,
  Calendar,
  Users,
  Target,
  Search,
  Filter,
} from 'lucide-react'

type ProgramType = 'camp' | 'clinic' | 'tournament' | 'league'
type Location = 'chicago' | 'dallas'

type Props = {
  title?: string
  summary?: string
  className?: string
}

const tabs: { key: ProgramType; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'camp', label: 'Camps', icon: <Calendar size={18} />, color: '#3BD463' },
  { key: 'clinic', label: 'Clinics', icon: <Target size={18} />, color: '#FF6B35' },
  { key: 'tournament', label: 'Tournaments', icon: <Trophy size={18} />, color: '#FFD700' },
  { key: 'league', label: 'Leagues', icon: <Users size={18} />, color: '#00BFFF' },
]

const locations: { key: Location; label: string }[] = [
  { key: 'chicago', label: 'Chicago' },
  { key: 'dallas', label: 'Dallas' },
]

const fetchPrograms = async (type: ProgramType, location: Location) => {
  const url = `/api/programs?depth=1&where[programType][equals]=${type}&where[location][equals]=${location}`
  const res = await fetch(url)
  return res.json()
}

export const ProgramsBlock: React.FC<Props> = ({ title, summary, className }) => {
  const [activeTab, setActiveTab] = useState<ProgramType>('camp')
  const [locationFilter, setLocationFilter] = useState<Location>('chicago')
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const activeTabData = tabs.find((t) => t.key === activeTab)

  useEffect(() => {
    const loadPrograms = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchPrograms(activeTab, locationFilter)
        setPrograms(data.docs || [])
      } catch (err) {
        console.error('Failed to fetch programs', err)
        setError('Failed to load programs')
      } finally {
        setLoading(false)
      }
    }

    loadPrograms()
  }, [activeTab, locationFilter])

  return (
    <section className={cn('w-full py-20 md:py-28 relative overflow-hidden', className)}>
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3BD463]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#052B70]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#3BD463]/10 rounded-full">
            <Zap size={16} className="text-[#3BD463]" />
            <span className="text-[#3BD463] font-bold uppercase tracking-widest text-sm">
              Explore Programs
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#052B70] uppercase tracking-tight mb-4">
            {title || 'Find Your Program'}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            {summary || 'Discover programs designed for every age and skill level. Filter by type and location to find the perfect fit.'}
          </p>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          {/* Location Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 p-1.5 bg-white rounded-full shadow-lg border border-gray-100">
              <div className="flex items-center gap-1.5 px-3 text-gray-400">
                <MapPin size={16} />
                <span className="text-sm font-medium hidden sm:inline">Location</span>
              </div>
              <div className="flex gap-1">
                {locations.map((loc) => (
                  <button
                    key={loc.key}
                    onClick={() => setLocationFilter(loc.key)}
                    className={cn(
                      'px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300',
                      locationFilter === loc.key
                        ? 'bg-[#052B70] text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100',
                    )}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Program Type Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-3 p-2 bg-white rounded-2xl shadow-lg border border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'group relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300',
                    activeTab === tab.key
                      ? 'text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50',
                  )}
                  style={{
                    backgroundColor: activeTab === tab.key ? tab.color : undefined,
                  }}
                >
                  <span
                    className={cn(
                      'transition-colors duration-300',
                      activeTab === tab.key ? 'text-white' : 'text-gray-400 group-hover:text-gray-600',
                    )}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-xl -z-10"
                      style={{ backgroundColor: tab.color }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-1.5 h-8 rounded-full"
              style={{ backgroundColor: activeTabData?.color }}
            />
            <div>
              <h3 className="text-xl font-bold text-[#052B70] uppercase tracking-tight">
                {activeTabData?.label}
              </h3>
              <p className="text-sm text-gray-500">
                {loading ? 'Loading...' : `${programs.length} program${programs.length !== 1 ? 's' : ''} in ${locationFilter === 'chicago' ? 'Chicago' : 'Dallas'}`}
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-gray-400">
            <Filter size={16} />
            <span className="text-sm">Filtered Results</span>
          </div>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
          {loading ? (
            <>
              {[1, 2, 3].map((n) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: n * 0.1 }}
                  className="relative h-[420px] rounded-3xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                  <div className="absolute inset-0 flex flex-col p-6">
                    <div className="h-40 bg-gray-300/50 rounded-2xl mb-4" />
                    <div className="h-6 bg-gray-300/50 rounded-lg w-3/4 mb-2" />
                    <div className="h-4 bg-gray-300/50 rounded-lg w-1/2 mb-4" />
                    <div className="flex-1" />
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-300/50 rounded-full w-20" />
                      <div className="h-8 bg-gray-300/50 rounded-full w-20" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full"
            >
              <div className="text-center py-20 bg-red-50 rounded-3xl border-2 border-dashed border-red-200">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <Search size={32} className="text-red-400" />
                </div>
                <h4 className="text-red-600 font-bold text-lg mb-2">Something went wrong</h4>
                <p className="text-red-400">{error}</p>
              </div>
            </motion.div>
          ) : programs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full"
            >
              <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${activeTabData?.color}20` }}
                >
                  <Trophy
                    size={40}
                    className="opacity-50"
                    style={{ color: activeTabData?.color }}
                  />
                </div>
                <h4 className="text-[#052B70] font-bold text-xl mb-2 uppercase tracking-wide">
                  No {activeTabData?.label} Available
                </h4>
                <p className="text-gray-500 max-w-md mx-auto">
                  We don&apos;t have any {activeTabData?.label?.toLowerCase()} in{' '}
                  {locationFilter === 'chicago' ? 'Chicago' : 'Dallas'} right now.
                  Check back soon or try a different location!
                </p>
                <button
                  onClick={() =>
                    setLocationFilter(locationFilter === 'chicago' ? 'dallas' : 'chicago')
                  }
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#052B70] text-[#052B70] font-bold hover:bg-[#052B70] hover:text-white transition-all duration-300"
                >
                  <MapPin size={16} />
                  Try {locationFilter === 'chicago' ? 'Dallas' : 'Chicago'}
                </button>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <ProgramCard program={program} variant="featured" disableAnimation />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  )
}
