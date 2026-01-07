'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Trophy, Star } from 'lucide-react'
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
    <section className="py-32 bg-[#F8F9FB] relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[#3BD463] mb-4">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="uppercase tracking-[0.2em] text-xs font-black">{eyebrow}</span>
            </div>
            <h2 className="font-heading text-5xl md:text-7xl text-[#052B70] uppercase leading-none tracking-tighter">
              {title.split(' ')[0]} <span className="text-gray-400">{title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="mt-6 text-gray-500 text-lg font-medium leading-relaxed">{description}</p>
          </div>

          <Link
            href={ctaLink}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#052B70] rounded-2xl text-white font-bold hover:bg-[#07368a] transition-all shadow-xl shadow-[#052B70]/20 hover:scale-105"
          >
            {ctaText}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] bg-gray-100 rounded-[2.5rem] animate-pulse" />
            ))}
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <Trophy size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest">No programs live right now</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, i) => {
              const colors = ['#052B70', '#3BD463', '#FFB800']
              const color = colors[i % colors.length]

              return (
                <Link
                  key={program.id || i}
                  href={`/programs/${program.slug}`}
                  className="group relative bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 overflow-hidden"
                >
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] transition-transform duration-700 group-hover:scale-150 group-hover:rotate-12"
                    style={{ color }}
                  >
                    <Trophy size={128} fill="currentColor" />
                  </div>
                  
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:-rotate-6 transition-transform duration-500"
                    style={{ backgroundColor: color, boxShadow: `0 10px 30px ${color}33` }}
                  >
                    <Star size={28} className="text-white" fill="white" />
                  </div>
                  
                  <h3 className="font-heading text-3xl text-gray-900 mb-4 uppercase tracking-tight leading-none group-hover:text-[#052B70] transition-colors">
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-500 font-medium leading-relaxed mb-8 line-clamp-3">
                    {program.description}
                  </p>

                  <div className="flex items-center gap-2 text-[#3BD463] font-black uppercase tracking-widest text-xs">
                    View Details
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
