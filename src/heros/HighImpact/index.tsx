'use client'

import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const HighImpactHero: React.FC<Page['hero']> = ({
  type,
  headlineTop,
  headlineScript,
  headlineBottom,
  headlineEmphasis,
  headline,
  links,
  media,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  if (type !== 'highImpact') return null

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
      <div className="w-full max-w-[1600px]">
        <div className="relative w-full h-[75vh] sm:h-[80vh] lg:h-[85vh] overflow-hidden rounded-2xl shadow-2xl">

          {/* Background Image */}
          {media && typeof media === 'object' && (
            <Media
              resource={media}
              imgClassName="absolute inset-0 w-full h-full object-cover"
              priority
            />
          )}

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-16 gap-10">

            {/* TEXT */}
            <div className="text-white leading-none space-y-3">

              {/* LINE 1 = WHERE Faith */}
              <div className="flex flex-wrap items-baseline gap-4">
                {/* WHERE */}
                <span className="font-heading uppercase tracking-tight 
                  text-5xl sm:text-6xl lg:text-8xl xl:text-9xl">
                  {headlineTop || 'WHERE'}
                </span>

                {/* Faith (script) */}
                <span className="font-script 
                  text-5xl sm:text-6xl lg:text-8xl xl:text-9xl">
                  {headlineScript || 'Faith'}
                </span>
              </div>

              {/* LINE 2 = MEETS FITNESS */}
              <div className="flex flex-wrap items-baseline gap-4">
                <span className="font-heading uppercase tracking-tight 
                  text-5xl sm:text-6xl lg:text-8xl xl:text-9xl">
                  {headlineBottom || 'MEETS'}
                </span>

                <span className="font-heading uppercase tracking-tight 
                  text-5xl sm:text-6xl lg:text-8xl xl:text-9xl">
                  {headlineEmphasis || 'FITNESS'}
                </span>
              </div>
            </div>

            {/* BUTTONS */}
            {links?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
                {links[0]?.link && (
                  <CMSLink
                    {...links[0].link}
                    className="px-6 py-3 text-base sm:px-10 sm:py-4 sm:text-lg rounded-full bg-[#31D952] text-white font-semibold
                    transition-all hover:bg-[#28b945] hover:scale-105 text-center"
                  >
                    {links[0].label}
                  </CMSLink>
                )}

                {links[1]?.link && (
                  <CMSLink
                    {...links[1].link}
                    className="px-10 py-4 rounded-full bg-white text-neutral-900 font-semibold text-lg
                    transition-all hover:bg-neutral-100 hover:scale-105 text-center"
                  >
                    {links[1].label}
                  </CMSLink>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
