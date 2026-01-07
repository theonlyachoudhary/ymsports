'use client'

import React, { useEffect, useRef } from 'react'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { CMSLink } from '@/components/Link'
import { motion, useScroll, useTransform } from 'framer-motion'

export const HighImpactHero: React.FC<Page['hero']> = ({
  type,
  headlineTop,
  headlineBottom,
  links,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const translateY = useTransform(scrollYProgress, [0, 1], [0, -80])

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  if (type !== 'highImpact') return null

  const headline = (headlineTop && headlineTop !== 'Play') ? headlineTop : 'Building'
  const subheadline = headlineBottom || 'Champions'

  return (
    <section className="relative my-5 mx-5 overflow-hidden rounded-md">
      <div
        ref={containerRef}
        className="relative min-h-[60vh] xl:h-[70vh] overflow-visible"
      >
        <motion.div
          style={{ y: translateY, clipPath: 'inset(0 round 6px)' }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
        >
          <img
            src="/hero-sports.jpg"
            alt="Youth sports action"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="font-heading uppercase tracking-tighter text-white text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-[0.8] drop-shadow-2xl">
              {headline}
            </h1>
            <h1 className="font-heading uppercase tracking-tighter text-[#3BD463] text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-[0.8] drop-shadow-2xl mt-2">
              {subheadline}
            </h1>
          </motion.div>

          {links && links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="mt-12 flex flex-col sm:flex-row gap-6"
            >
              {links[0]?.link && (
                <CMSLink
                  {...links[0].link}
                  className="px-12 py-5 rounded-[2rem] text-white font-bold text-xl bg-[#3BD463] hover:bg-[#2EB854] transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(59,212,99,0.4)]"
                />
              )}
              {links[1]?.link && (
                <CMSLink
                  {...links[1].link}
                  className="px-12 py-5 rounded-[2rem] text-white font-bold text-xl border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
