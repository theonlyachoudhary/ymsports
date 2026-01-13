'use client'

import React, { useEffect } from 'react'
import type { Page, Program } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DollarSign, MapPin, Clock, ArrowRight, Trophy } from 'lucide-react'

export const FeaturedProgramHero: React.FC<Page['hero']> = (props) => {
  const { setHeaderTheme } = useHeaderTheme()
  const { type } = props

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  if (type !== 'featuredProgram') return null

  const featuredProgram = (props as { featuredProgram?: Program | number | null }).featuredProgram
  const program = typeof featuredProgram === 'object' ? featuredProgram : null

  if (!program) {
    return (
      <section className="relative min-h-[500px] bg-gradient-to-br from-[#052B70] to-[#0a3d8f] flex items-center justify-center">
        <div className="text-center text-white">
          <Trophy size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg opacity-70">No program selected</p>
        </div>
      </section>
    )
  }

  const programType = program.programType as 'camp' | 'clinic' | 'tournament' | undefined
  const programTypeLabel = programType ? {
    camp: 'Camp',
    clinic: 'Clinic',
    tournament: 'Tournament',
  }[programType] : 'Program'

  return (
    <section className="relative min-h-[600px] overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#052B70] via-[#0a3d8f] to-[#052B70]" />
        <div className="absolute inset-0 bg-[url('/pattern-dots.svg')] opacity-5" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3BD463] text-white text-xs font-black uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Featured {programTypeLabel}
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-[0.9] mb-6">
              {program.title}
            </h1>

            {program.subtitle && (
              <p className="text-xl text-[#3BD463] font-bold uppercase tracking-wide mb-4">
                {program.subtitle}
              </p>
            )}

            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
              {program.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {program.price && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white">
                  <DollarSign size={16} className="text-[#3BD463]" />
                  <span className="font-bold">{program.price}</span>
                </div>
              )}
              {program.location && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white">
                  <MapPin size={16} className="text-[#3BD463]" />
                  <span className="font-bold">{program.location}</span>
                </div>
              )}
              {program.duration && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white">
                  <Clock size={16} className="text-[#3BD463]" />
                  <span className="font-bold">{program.duration}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {program.buttonLink && (
                <Link
                  href={program.buttonLink}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg bg-[#3BD463] hover:bg-[#2EB854] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#3BD463]/30 transform hover:-translate-y-0.5 overflow-hidden uppercase tracking-wider"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">{program.buttonText || 'Register Now'}</span>
                  <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              <Link
                href={`/programs/${program.slug}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg border-2 border-white/30 hover:border-white/80 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm uppercase tracking-wider"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#3BD463]/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-[#052B70] to-[#0a3d8f] relative">
                  <div className="absolute inset-0 bg-[url('/pattern-dots.svg')] opacity-10" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#3BD463]/20 rounded-tl-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy size={80} className="text-white/20" />
                  </div>
                </div>
                <div className="p-8">
                  <div className="inline-block px-3 py-1 bg-[#3BD463]/10 text-[#3BD463] rounded-full text-sm font-bold uppercase tracking-wide mb-4">
                    {programTypeLabel}
                  </div>
                  <h3 className="font-heading text-3xl text-[#052B70] uppercase tracking-tight mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {program.description}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                    {program.ageGroup && (
                      <div className="text-sm text-gray-500">
                        Ages: <span className="font-bold text-[#052B70]">
                          {program.ageGroup === 'u6' && 'Under 7'}
                          {program.ageGroup === 'u8' && 'Under 10'}
                          {program.ageGroup === 'u10' && 'Under 13'}
                          {program.ageGroup === 'u12' && 'Under 16'}
                        </span>
                      </div>
                    )}
                    {program.price && (
                      <div className="text-2xl font-heading font-bold text-[#3BD463]">
                        {program.price}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
