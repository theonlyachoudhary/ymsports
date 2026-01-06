'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Trophy, Clock, Check } from 'lucide-react'
import type { Camp } from '@/payload-types'

interface ProgramDetailClientProps {
  program: Camp
}

const programTypeLabels: Record<string, string> = {
  camp: 'Camp',
  clinic: 'Clinic',
  league: 'League',
  tournament: 'Tournament',
}

export function ProgramDetailClient({ program }: ProgramDetailClientProps) {
  const locationDisplay = program.location
    ? `${program.location.city}, ${program.location.state}`
    : 'TBD'

  const dateDisplay = program.startDate && program.endDate
    ? `${program.startDate} - ${program.endDate}`
    : program.startDate || 'TBD'

  const ageDisplay = program.ageMin && program.ageMax
    ? `Ages ${program.ageMin}-${program.ageMax}`
    : 'All Ages'

  const hasSchedule = program.schedule?.days || program.schedule?.startTime || program.schedule?.endTime
  const scheduleLines: string[] = []
  if (program.schedule?.days) scheduleLines.push(program.schedule.days)
  if (program.schedule?.startTime || program.schedule?.endTime) {
    const timePart = [program.schedule?.startTime, program.schedule?.endTime].filter(Boolean).join(' - ')
    if (timePart) scheduleLines.push(timePart)
  }
  const scheduleDisplay = scheduleLines.join('\n')

  const hasLocation = locationDisplay !== 'TBD' || program.venue?.name || program.venue?.address

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative">
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          {program.featuredImage && typeof program.featuredImage === 'object' && program.featuredImage.url ? (
            <img
              src={program.featuredImage.url}
              alt={program.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/hero-sports.jpg"
              alt={program.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Programs
                </Link>

                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-[#1a365d] text-white text-sm font-medium rounded-full">
                    {programTypeLabels[program.programType || 'camp']}
                  </span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white uppercase mb-4">
                  {program.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{locationDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{dateDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span>{ageDisplay}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 uppercase mb-6">
                  About the Program
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {program.description}
                </p>
              </motion.div>

              {program.whatToExpect && program.whatToExpect.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
                >
                  <h2 className="font-heading text-2xl font-bold text-gray-900 uppercase italic mb-6">
                    What to Expect
                  </h2>
                  <ul className="space-y-3">
                    {program.whatToExpect.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <Check className="w-5 h-5 text-[#3BD463]" />
                        </div>
                        <span className="text-gray-700">{item.item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm sticky top-24"
              >
                <div className="mb-6">
                  <span className="text-sm text-[#3BD463] font-medium">Registration Fee</span>
                  <div className="text-4xl font-bold text-gray-900 mt-1">
                    ${program.price}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-4">
                  {hasLocation && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          {program.venue?.name && <div>{program.venue.name}</div>}
                          {program.venue?.address && <div>{program.venue.address}</div>}
                          <div>{locationDisplay}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {hasSchedule && scheduleDisplay && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Schedule</h3>
                      <div className="flex items-start gap-2 text-gray-600">
                        <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="whitespace-pre-line">{scheduleDisplay}</div>
                      </div>
                    </div>
                  )}
                </div>

                <a
                  href={program.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full py-4 bg-[#3BD463] hover:bg-[#34BF58] text-white text-center font-semibold text-lg rounded-xl transition-colors"
                >
                  Register Now
                </a>

                <p className="text-center text-sm text-gray-400 mt-3">
                  Secure checkout powered by Fillout
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
