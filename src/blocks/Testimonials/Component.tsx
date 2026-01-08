'use client'

import React, { useEffect, useState } from 'react'
import { Star, Shield, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Testimonial } from '@/payload-types'

type TestimonialsBlockProps = {
  title?: string
  testimonials?: Testimonial[]
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  title = 'Community Voice',
  testimonials = [],
}) => {
  const [merged, setMerged] = useState<Testimonial[]>([])
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const DURATION = 5000

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/testimonials')
        const json = await res.json()

        const all = json.docs || []
        const cmsIds = new Set(testimonials.map((t) => t.id))
        const remaining = all.filter((t: Testimonial) => !cmsIds.has(t.id))

        setMerged([...testimonials, ...remaining])
      } catch (e) {
        console.error('Failed to load testimonials', e)
      }
    }

    load()
  }, [testimonials])

  useEffect(() => {
    if (merged.length === 0) return
    
    setProgress(0)

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % merged.length)
    }, DURATION)

    const progressInterval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2))
    }, DURATION / 50)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [merged, index])

  const next = () => setIndex((i) => (i + 1) % merged.length)
  const prev = () => setIndex((i) => (i - 1 + merged.length) % merged.length)

  const t = merged[index]

  return (
    <section className="py-24 bg-[#052B70]/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - About Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Shield className="text-[#3BD463]" size={32} />
                <h2 className="text-4xl font-heading font-bold text-[#052B70]">Why We Exist</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every parent longs for their children to be surrounded by positive influences and have a strong sense of belonging. We believe that when youth are given the opportunities to grow, they will carry their faith and community into the future.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Heart className="text-[#3BD463]" size={32} />
                <h2 className="text-4xl font-heading font-bold text-[#052B70]">Who We Are</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                We aim to be a communal backbone for youth development. What defines us are the values we bring to each and every experience.
              </p>
            </div>

            <div className="pt-4">
              <Link href="/about" className="inline-flex items-center gap-2 text-[#052B70] font-bold text-lg hover:text-[#3BD463] transition-colors group">
                Learn more about our values 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column - Testimonials & Images */}
          <div className="space-y-8">
            {/* Glassmorphism Testimonial Card */}
            <div 
              className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-sm touch-pan-x"
              onTouchStart={(e) => ((window as any).touchStartX = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const startX = (window as any).touchStartX
                const endX = e.changedTouches[0].clientX
                if (startX - endX > 50) next()
                if (endX - startX > 50) prev()
              }}
            >
              <div className="flex items-center gap-2 mb-6 text-[#3BD463] font-bold uppercase tracking-widest text-xs">
                <Star size={14} fill="currentColor" /> {title}
              </div>
              
              {merged.length > 0 ? (
                <>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-8">
                    &ldquo;{t?.testimonial || ''}&rdquo;
                  </p>

                  <div className="border-t border-gray-200 pt-6">
                    <p className="font-semibold text-[#052B70]">{t?.name || ''}</p>
                    {t?.occupation && (
                      <p className="text-[#3BD463] text-sm uppercase tracking-wide">{t.occupation}</p>
                    )}
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex justify-center mt-8 gap-2">
                    {merged.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === index ? 'bg-[#3BD463] w-6' : 'bg-gray-300 w-2'
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-center py-8">Loading testimonials...</p>
              )}
            </div>
            
            {/* Action Shot Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[250px] rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="/action-shot-1.jpg"
                  alt="Youth playing basketball"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop'
                  }}
                />
              </div>
              <div className="relative h-[250px] rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="/action-shot-2.jpg"
                  alt="Competitive play"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
