'use client'

import React, { useEffect, useRef } from 'react'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { motion, useScroll, useTransform } from 'framer-motion'

export const HighImpactHero: React.FC<Page['hero']> = ({
  type,
  headlineTop,
  headlineScript,
  headlineBottom,
  headlineEmphasis,
  links,
  media,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  if (type !== 'highImpact') return null

  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // map progress -> negative Y so background moves up on scroll (no white gap under header)
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -80])

  // improved hover — stronger, uses transform-only changes and sets faster timing
  const hoverEffect = {
    y: -6,
    scale: 1.06,
    rotate: -2,
    opacity: 1,
    transition: { duration: 0.28, ease: 'easeOut' },
  }

  const containerStagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.05 },
    },
  }

  const letterAnim = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    // section is the clipping container (no top margin) so rounded corners are respected
    <section className="relative my-5 mx-5 overflow-hidden rounded-md">
      <div
        ref={containerRef}
        // content remains in-flow; background layer is absolute inside this clipped section
        className="relative p-10 min-h-[fit-content] xl:h-[70vh] overflow-visible"
      >
        {media && typeof media === 'object' && (
          <motion.div
            style={{ y: translateY, clipPath: 'inset(0 round 6px)' }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            // transformed layer still has overflow-hidden and matching radius to avoid leaks
            className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
          >
            <Media
              resource={media}
              // remove rounding on the img itself — parent will clip it
              imgClassName="absolute inset-0 w-full h-full object-cover"
              priority
            />
            {/* overlay kept inside the clipping container */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        )}

        {/* content is kept in-flow so container min-height can respond to it */}
        <div className="relative z-10 w-full flex flex-col justify-center p-6 sm:p-10 lg:p-16">
          {/* TEXT */}
          <div className="text-white leading-none space-y-3">
            <motion.div
              variants={containerStagger}
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-baseline gap-4"
            >
              {/* TOP */}
              <motion.span
                className="font-heading uppercase tracking-tight 
                text-8xl sm:text-9xl md:text-[9rem] lg:text-[10rem] xl:text-[11rem] cursor-default flex"
              >
                {(headlineTop ?? '').split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterAnim}
                    whileHover={hoverEffect}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="inline-block cursor-default will-change-transform"
                    style={{ transformOrigin: 'center bottom', backfaceVisibility: 'hidden' }}
                    aria-hidden="true"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>

              {/* SCRIPT */}
              <motion.span
                className="font-script 
                text-8xl sm:text-9xl md:text-[9rem] lg:text-[10rem] xl:text-[11rem]
                inline-block text-[#F4E9C8] cursor-default flex"
              >
                {(headlineScript ?? '').split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterAnim}
                    whileHover={hoverEffect}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="inline-block cursor-default will-change-transform"
                    style={{ transformOrigin: 'center bottom', backfaceVisibility: 'hidden' }}
                    aria-hidden="true"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.div>

            {/* BOTTOM */}
            <motion.div
              variants={containerStagger}
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-baseline gap-4 ml-4"
            >
              <motion.span
                className="font-heading uppercase tracking-tight
                text-8xl sm:text-9xl md:text-[9rem] lg:text-[10rem] xl:text-[11rem] cursor-default flex"
              >
                {(headlineBottom ?? '').split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterAnim}
                    whileHover={hoverEffect}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="inline-block cursor-default will-change-transform"
                    style={{ transformOrigin: 'center bottom', backfaceVisibility: 'hidden' }}
                    aria-hidden="true"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>

              <motion.span
                className="font-heading uppercase tracking-tight 
                text-8xl sm:text-9xl md:text-[9rem] lg:text-[10rem] xl:text-[11rem]
                text-[#C7FDD3] cursor-default flex"
              >
                {(headlineEmphasis ?? '').split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterAnim}
                    whileHover={hoverEffect}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="inline-block cursor-default will-change-transform"
                    style={{ transformOrigin: 'center bottom', backfaceVisibility: 'hidden' }}
                    aria-hidden="true"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.div>
          </div>

          {/*  BUTTONS */}
          {links?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-6"
            >
              {/* BUTTON 1 */}
              {links[0]?.link && (
                <CMSLink
                  {...links[0].link}
                  className="
                    relative px-10 py-4 rounded-full 
                    text-white font-semibold text-lg cursor-pointer
                    bg-[#3BD463]
                    transition-all duration-700 ease-out
                    hover:bg-[#34BF58] 
                    hover:shadow-[0_8px_25px_rgba(60,220,110,0.4)]
                    hover:scale-[1.03]
                    before:absolute before:inset-0 before:rounded-full
                    before:bg-white/10 before:opacity-0 
                    before:transition-opacity before:duration-700
                    hover:before:opacity-100
                  "
                >
                  {links[0].label}
                </CMSLink>
              )}

              {/* BUTTON 2  */}
              {links[1]?.link && (
                <CMSLink
                  {...links[1].link}
                  className="
                    relative px-10 py-4 rounded-full 
                    text-neutral-900 font-semibold text-lg cursor-pointer
                    bg-white 
                    transition-all duration-700 ease-out
                    hover:bg-neutral-100
                    hover:shadow-[0_8px_20px_rgba(255,255,255,0.35)]
                    hover:scale-[1.03]
                    before:absolute before:inset-0 before:rounded-full
                    before:bg-white/40 before:opacity-0 
                    before:transition-opacity before:duration-700
                    hover:before:opacity-60
                  "
                >
                  {links[1].label}
                </CMSLink>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
