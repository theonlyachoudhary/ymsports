'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import type { Program } from '@/payload-types'

type FeaturedProgramsBlockProps = {
  eyebrow?: string
  title?: string
  description?: string
  programsLimit?: number
  ctaText?: string
  ctaLink?: string
}

export const FeaturedProgramsBlock: React.FC<FeaturedProgramsBlockProps> = ({
  eyebrow = 'Upcoming Seasons',
  title = 'Featured Programs',
  description = 'Discover our most popular upcoming clinics and camps. Designed for every age and skill level.',
  programsLimit = 3,
  ctaText = 'View All Programs',
  ctaLink = '/programs',
}) => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`/api/programs?limit=${programsLimit}&depth=1`)
        if (res.ok) {
          const data = await res.json()
          setPrograms(data.docs || [])
        }
      } catch (e) {
        console.error('Failed to fetch programs', e)
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [programsLimit])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <Zap size={18} />
              <span className="uppercase tracking-wide text-sm font-semibold">{eyebrow}</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-gray-900 uppercase">
              {title}
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl">{description}</p>
          </div>

          <Link
            href={ctaLink}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-6 py-3 border border-gray-900 rounded-full text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
          >
            {ctaText}
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading programs...</div>
        ) : programs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No programs found.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, i) => {
              const colors = ['#C4571B', '#2B9CC8', '#5A9E56']
              const color = program.themeColor || colors[i % colors.length]

              return (
                <div
                  key={program.id || i}
                  className="group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div
                      className="w-12 h-1 rounded mb-4"
                      style={{ backgroundColor: color }}
                    />
                    <h3 className="font-heading text-xl text-gray-900 mb-2">{program.title}</h3>
                    {program.subtitle && (
                      <p className="text-sm text-gray-500 mb-3">{program.subtitle}</p>
                    )}
                    {program.description && (
                      <p className="text-gray-600 text-sm line-clamp-3">{program.description}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
