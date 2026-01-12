'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { CMSLink } from '@/components/Link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const FEATURED_PROGRAMS = [
  {
    id: 1,
    title: 'Elite Basketball Camp',
    description: 'Intensive skills training with professional coaches. Perfect for players looking to elevate their game to the next level. Intensive skills training with professional coaches. Perfect for players looking to elevate their game to the next level. Intensive skills training with professional coaches. Perfect for players looking to elevate their game to the next level. Intensive skills training with professional coaches. Perfect for players looking to elevate their game to the next level.',
    cost: '$249',
    location: 'Chicago, IL',
    duration: '2 Weeks',
    image: '/programs/basketball.jpg',
    registerLink: '#register',
  },
  {
    id: 2,
    title: 'Soccer Development League',
    description: 'Year-round competitive league for all skill levels. Build teamwork, technique, and game intelligence.',
    cost: '$189',
    location: 'Dallas, TX',
    duration: '12 Weeks',
    image: '/programs/soccer.jpg',
    registerLink: '#register',
  },
  {
    id: 3,
    title: 'Flag Football Academy',
    description: 'Learn the fundamentals of football in a safe, non-contact environment. Great for beginners and experienced players alike.',
    cost: '$159',
    location: 'Richmond, VA',
    duration: '8 Weeks',
    image: '/programs/football.jpg',
    registerLink: '#register',
  },
]

const FeaturedProgramCard: React.FC<{ program: typeof FEATURED_PROGRAMS[0] }> = ({ program }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full flex flex-row"
      style={{ minWidth: '700px', maxWidth: '700px' }}
    >
      <div className="relative w-2/5 min-h-[320px] bg-gradient-to-br from-[#052B70] to-[#0a3d8f] overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-[url('/pattern-dots.svg')] opacity-10" />
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3BD463] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Featured
          </span>
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#3BD463]/20 rounded-tl-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-20 h-20 text-white/20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-2xl text-[#052B70] uppercase tracking-tight mb-2">
            {program.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {program.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#052B70]/5 rounded-xl">
              <svg className="w-4 h-4 text-[#3BD463]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-bold text-[#052B70]">{program.cost}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#052B70]/5 rounded-xl">
              <svg className="w-4 h-4 text-[#3BD463]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-bold text-[#052B70]">{program.location}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#052B70]/5 rounded-xl">
              <svg className="w-4 h-4 text-[#3BD463]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-bold text-[#052B70]">{program.duration}</span>
            </div>
          </div>
        </div>

        <div>
          <a
            href={program.registerLink}
            className="group relative w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-[#3BD463] to-[#2EB854] hover:from-[#2EB854] hover:to-[#25a048] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#3BD463]/30 transform hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative uppercase tracking-wider">Register Now</span>
            <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <div className="flex justify-center gap-2 mt-4">
            {FEATURED_PROGRAMS.map((p) => (
              <div
                key={p.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  p.id === program.id ? 'bg-[#3BD463] w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const HighImpactHero: React.FC<Page['hero']> = ({
  type,
  headlineTop,
  headlineBottom,
  links,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const translateY = useTransform(scrollYProgress, [0, 1], [0, -80])

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgramIndex((prev) => (prev + 1) % FEATURED_PROGRAMS.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  if (type !== 'highImpact') return null

  const headline = (headlineTop && headlineTop !== 'Play') ? headlineTop : 'Building'
  const subheadline = headlineBottom || 'Champions'

  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[900px] overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-full"
      >
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/hero-sports.jpg"
            alt="Youth sports action"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#052B70]/60 via-[#052B70]/40 to-[#052B70]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,43,112,0.4)_100%)]" />
        </motion.div>

        <div className="relative z-10 w-full h-full flex items-center">
          <div className="container mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_45%] gap-8 lg:gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-left"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#3BD463] text-xs font-black uppercase tracking-[0.3em] mb-8 animate-fadeUp">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3BD463] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3BD463]"></span>
                  </span>
                  Youth Athletics Redefined
                </div>
                <h1 className="font-heading uppercase tracking-tighter text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.75] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {headline}
                </h1>
                <h1 className="font-heading uppercase tracking-tighter text-[#3BD463] text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.75] drop-shadow-[0_20px_50px_rgba(59,212,99,0.3)] mt-2">
                  {subheadline}
                </h1>

                {links && links.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                    className="mt-10 flex flex-col sm:flex-row gap-4"
                  >
                    {links[0]?.link && (
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#3BD463] to-[#2EB854] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <CMSLink
                          {...links[0].link}
                          className="relative px-10 py-5 rounded-xl text-white font-black text-lg bg-[#3BD463] hover:bg-[#2EB854] transition-all duration-300 hover:scale-[1.05] flex items-center gap-3 shadow-[0_20px_40px_rgba(59,212,99,0.4)] active:scale-95 uppercase tracking-wider"
                        />
                      </div>
                    )}
                    {links[1]?.link && (
                      <CMSLink
                        {...links[1].link}
                        className="px-10 py-5 rounded-xl text-white font-black text-lg border-2 border-white/30 hover:border-white/80 hover:bg-white/10 transition-all duration-300 hover:scale-[1.05] backdrop-blur-xl flex items-center gap-3 active:scale-95 uppercase tracking-wider"
                      />
                    )}
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex justify-end"
              >
                <AnimatePresence mode="wait">
                  <FeaturedProgramCard
                    key={FEATURED_PROGRAMS[currentProgramIndex].id}
                    program={FEATURED_PROGRAMS[currentProgramIndex]}
                  />
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
