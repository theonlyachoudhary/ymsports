'use client'

import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
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

  if (merged.length === 0) {
    return (
      <section className="py-24 bg-[#F9F9F9] text-center">
        <p className="text-neutral-500">No testimonials found.</p>
      </section>
    )
  }

  const next = () => setIndex((i) => (i + 1) % merged.length)
  const prev = () => setIndex((i) => (i - 1 + merged.length) % merged.length)

  const t = merged[index]

  return (
    <section className="py-20 bg-[#F9F9F9]">
      <div className="max-w-4xl mx-auto px-4">
        <div
          className="bg-white rounded-2xl shadow-sm p-8 md:p-12 touch-pan-x"
          onTouchStart={(e) => ((window as any).touchStartX = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const startX = (window as any).touchStartX
            const endX = e.changedTouches[0].clientX
            if (startX - endX > 50) next()
            if (endX - startX > 50) prev()
          }}
        >
          <div className="flex items-center gap-2 text-green-600 mb-8">
            <Star size={18} />
            <span className="uppercase tracking-wide text-sm font-semibold">{title}</span>
          </div>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-8">
            "{t?.testimonial || ''}"
          </p>

          <div className="border-t pt-6">
            <p className="font-semibold text-gray-900">{t?.name || ''}</p>
            {t?.occupation && (
              <p className="text-green-600 text-sm uppercase tracking-wide">{t.occupation}</p>
            )}
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {merged.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'bg-green-600 w-6' : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
