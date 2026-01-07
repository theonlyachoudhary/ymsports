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
    <div className="min-h-screen bg-[#F8F9FB]">
      <section className="relative">
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#052B70] via-[#052B70]/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors font-bold uppercase tracking-widest text-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Programs
                </Link>

                <div className="flex items-center gap-3 mb-6">
                  <span className="px-5 py-2 bg-[#3BD463] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-[#3BD463]/20">
                    {programTypeLabels[program.programType || 'camp']}
                  </span>
                </div>

                <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white uppercase mb-8 leading-[0.8] tracking-tighter drop-shadow-2xl">
                  {program.title}
                </h1>

                <div className="flex flex-wrap items-center gap-8 text-white/90">
                  <div className="flex items-center gap-3 font-bold">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#3BD463]" />
                    </div>
                    <span className="text-lg">{locationDisplay}</span>
                  </div>
                  <div className="flex items-center gap-3 font-bold">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#3BD463]" />
                    </div>
                    <span className="text-lg">{dateDisplay}</span>
                  </div>
                  <div className="flex items-center gap-3 font-bold">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-[#3BD463]" />
                    </div>
                    <span className="text-lg">{ageDisplay}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-gray-50"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-1.5 h-10 bg-[#3BD463] rounded-full" />
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-tight">
                    About the Program
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-500 font-medium leading-relaxed">
                  {program.description}
                </div>
              </motion.div>

              {program.whatToExpect && program.whatToExpect.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-gray-50"
                >
                  <h2 className="font-heading text-4xl font-bold text-gray-900 uppercase italic mb-10 tracking-tight">
                    What to <span className="text-[#3BD463]">Expect</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {program.whatToExpect.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 group hover:bg-[#3BD463]/5 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3BD463] text-white flex items-center justify-center shadow-lg shadow-[#3BD463]/20 group-hover:scale-110 transition-transform">
                          <Check className="w-5 h-5" />
                        </div>
                        <span className="text-gray-700 font-bold">{item.item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-[#052B70] rounded-[3rem] p-10 md:p-12 text-white shadow-2xl shadow-[#052B70]/40 sticky top-32"
              >
                <div className="mb-10">
                  <span className="text-xs uppercase tracking-widest font-black text-[#3BD463]">Registration Fee</span>
                  <div className="text-6xl font-black mt-2 tracking-tighter">
                    ${program.price}
                  </div>
                </div>

                <div className="space-y-8 mb-10">
                  {hasLocation && (
                    <div className="group">
                      <h3 className="text-xs uppercase tracking-widest font-black text-[#3BD463] mb-4">Location</h3>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-[#3BD463]/20 transition-colors">
                          <MapPin className="w-5 h-5 text-[#3BD463]" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{program.venue?.name || locationDisplay}</div>
                          {program.venue?.address && <div className="text-white/60 font-medium">{program.venue.address}</div>}
                          {program.venue?.name && <div className="text-white/60 font-medium">{locationDisplay}</div>}
                        </div>
                      </div>
                    </div>
                  )}

                  {hasSchedule && scheduleDisplay && (
                    <div className="group">
                      <h3 className="text-xs uppercase tracking-widest font-black text-[#3BD463] mb-4">Schedule</h3>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-[#3BD463]/20 transition-colors">
                          <Clock className="w-5 h-5 text-[#3BD463]" />
                        </div>
                        <div className="font-bold text-lg whitespace-pre-line">{scheduleDisplay}</div>
                      </div>
                    </div>
                  )}
                </div>

                <a
                  href={program.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-6 bg-[#3BD463] hover:bg-[#2EB854] text-white text-center font-black uppercase tracking-widest text-lg rounded-2xl transition-all shadow-xl shadow-[#3BD463]/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Register Now
                </a>

                <div className="flex items-center justify-center gap-2 mt-6 opacity-40">
                  <Shield className="w-4 h-4" />
                  <p className="text-xs font-bold uppercase tracking-widest">
                    Secure via Fillout
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
