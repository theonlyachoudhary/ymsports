'use client'

import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { CMSLink } from '@/components/Link'
import { motion } from 'framer-motion'

export const HighImpactHero: React.FC<Page['hero']> = ({
  type,
  headlineTop,
  headlineBottom,
  links,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  if (type !== 'highImpact') return null

  const headline = (headlineTop && headlineTop !== 'Play') ? headlineTop : 'Building'
  const subheadline = headlineBottom || 'Champions'

  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[900px] overflow-hidden">
      <div className="relative w-full h-full">
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-left max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white backdrop-blur-md border border-white/20 text-[#3BD463] text-xs font-black uppercase tracking-[0.3em] mb-8 animate-fadeUp">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3BD463]"></span>
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
          </div>
        </div>
      </div>
    </section>
  )
}
