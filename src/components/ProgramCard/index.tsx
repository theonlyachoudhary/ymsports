'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, DollarSign, ArrowRight, Trophy } from 'lucide-react'
import type { Media } from '@/payload-types'
import type { ProgramCardProps } from './types'
import { calculateDuration, formatAgeRange, formatGender, formatLocation } from './utils'

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  variant = 'standard',
  disableAnimation = false,
  animationDelay = 0,
  ctaText,
  showPrice = true,
  showLocation = true,
  showDuration = true,
  showAgeRange = true,
  showGender = true,
  showSchedule = true,
}) => {
  if (variant === 'featured') {
    return (
      <FeaturedVariant
        program={program}
        disableAnimation={disableAnimation}
        animationDelay={animationDelay}
        ctaText={ctaText}
        showPrice={showPrice}
        showLocation={showLocation}
        showDuration={showDuration}
      />
    )
  }

  return (
    <StandardVariant
      program={program}
      disableAnimation={disableAnimation}
      animationDelay={animationDelay}
      ctaText={ctaText}
      showPrice={showPrice}
      showLocation={showLocation}
      showDuration={showDuration}
      showAgeRange={showAgeRange}
      showGender={showGender}
      showSchedule={showSchedule}
    />
  )
}

const StandardVariant: React.FC<ProgramCardProps> = ({
  program,
  disableAnimation,
  animationDelay = 0,
  ctaText = 'Register Now',
  showPrice,
  showLocation,
  showDuration,
  showAgeRange,
  showGender,
  showSchedule,
}) => {
  const color = program.featured ? '#052B70' : '#4B5563'
  const programImage = program.programImage as Media | null

  const content = (
    <Card className="group relative rounded-2xl border border-gray-200 shadow-md bg-white overflow-hidden hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-1">
      {programImage?.url && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={programImage.url}
            alt={programImage.alt || program.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
          {showPrice && program.price && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign size={16} className="text-gray-400" />
              <span>{program.price}</span>
            </div>
          )}
          {showLocation && program.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-gray-400" />
              <span>{formatLocation(program.location)}</span>
            </div>
          )}
          {showDuration && program.startDate && program.endDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-gray-400" />
              <span>{calculateDuration(program.startDate, program.endDate)}</span>
            </div>
          )}
          {showAgeRange && program.minAge && program.maxAge && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{formatAgeRange(program.minAge, program.maxAge)}</span>
            </div>
          )}
          {showGender && program.gender && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{formatGender(program.gender)}</span>
            </div>
          )}
          {showSchedule && program.weeklySchedule && (
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
              {ctaText}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )

  if (disableAnimation) {
    return content
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: animationDelay }}
    >
      {content}
    </motion.div>
  )
}

const FeaturedVariant: React.FC<ProgramCardProps> = ({
  program,
  disableAnimation,
  animationDelay = 0,
  ctaText = 'Learn More',
  showPrice,
  showLocation,
  showDuration,
}) => {
  const duration =
    program.startDate && program.endDate
      ? calculateDuration(program.startDate, program.endDate)
      : null

  const href = program.slug ? `/programs/${program.slug}` : '#'
  const programImage = program.programImage as Media | null

  const content = (
    <Link
      href={href}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 block h-full hover:-translate-y-1"
    >
      <div className="relative h-48 bg-gradient-to-br from-[#052B70] to-[#0a3d8f] overflow-hidden">
        {programImage?.url ? (
          <img
            src={programImage.url}
            alt={programImage.alt || program.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[url('/pattern-dots.svg')] opacity-10" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#3BD463]/20 rounded-tl-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Trophy size={64} className="text-white/20" />
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-heading text-2xl text-[#052B70] uppercase tracking-tight mb-3 group-hover:text-[#3BD463] transition-colors">
          {program.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {program.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {showPrice && program.price && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#052B70]/5 rounded-full text-xs font-bold text-[#052B70]">
              <DollarSign size={12} className="text-[#3BD463]" />
              {program.price}
            </div>
          )}
          {showLocation && program.location && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#052B70]/5 rounded-full text-xs font-bold text-[#052B70]">
              <MapPin size={12} className="text-[#3BD463]" />
              {formatLocation(program.location)}
            </div>
          )}
          {showDuration && duration && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#052B70]/5 rounded-full text-xs font-bold text-[#052B70]">
              <Clock size={12} className="text-[#3BD463]" />
              {duration}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-[#3BD463] font-bold text-sm group-hover:gap-3 transition-all">
          {ctaText}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )

  if (disableAnimation) {
    return content
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: animationDelay }}
    >
      {content}
    </motion.div>
  )
}

export type { ProgramCardProps, ProgramCardVariant } from './types'
export { calculateDuration, formatAgeRange, formatGender, formatLocation, getProgramTypeLabel } from './utils'
