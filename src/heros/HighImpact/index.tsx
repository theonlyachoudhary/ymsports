'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({
  tagline,
  headline,
  subtext,
  links,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <section className="relative bg-white ">
      
      <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Section */}
          <div className="max-w-xl">
            {/* Tagline */}
            {tagline && (
              <div className="mb-6">
                <span className="inline-block bg-red-50 text-red-700 text-xs sm:text-sm font-medium px-3 py-1.5 rounded">
                  {tagline}
                </span>
              </div>
            )}

            {/* Headline */}
            {/* Hardcoded for now until I figure out a better way to handle individual words styling */}
            {headline && (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                WHERE <span className="text-red-700">FAITH</span> MEETS{' '}
                <span className="text-red-700">FITNESS</span>
              </h1>
            )}

            {/* Subtext */}
            {subtext && (
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
                {subtext}
              </p>
            )}

            {/* Fallback to richText */}
            {!tagline && !headline && !subtext && richText && (
              <div className="prose prose-lg max-w-none mb-8">
                <RichText content={richText} />
              </div>
            )}

            {/* CTA Buttons */}
            {links && links.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {links[0] && (
                  <CMSLink
                    {...links[0].link}
                    className="inline-flex items-center justify-center bg-red-700 text-white px-6 py-3 rounded font-semibold text-sm hover:bg-red-800 transition-colors duration-200"
                  >
                    {links[0].label}
                  </CMSLink>
                )}
                {links[1] && (
                  <CMSLink
                    {...links[1].link}
                    className="inline-flex items-center justify-center border border-gray-900 text-gray-900 px-6 py-3 rounded font-semibold text-sm hover:bg-gray-50 transition-colors duration-200"
                  >
                    {links[1].label}
                  </CMSLink>
                )}
              </div>
            )}
          </div>

          {/* Media Section*/}
          {media && typeof media === 'object' && (
            <div className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-auto lg:max-w-[55%]">
              <Media
                imgClassName="w-full h-auto"
                priority
                resource={media}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}