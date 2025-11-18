'use client'

import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Testimonial } from '@/payload-types'

type TestimonialsBlockProps = {
  title: string
  testimonials?: Testimonial[]
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  title,
  testimonials = [],
}) => {
  const [merged, setMerged] = useState<Testimonial[]>([])
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const DURATION = 5000

  // LOAD & MERGE
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/testimonials')
        const json = await res.json()

        const all = json.docs || []
        const cmsIds = new Set(testimonials.map((t) => t.id))
        const remaining = all.filter((t) => !cmsIds.has(t.id))

        setMerged([...testimonials, ...remaining])
      } catch (e) {
        console.error('Failed to load testimonials', e)
      }
    }

    load()
  }, [testimonials])

  // AUTO ADVANCE
  useEffect(() => {
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
      <section className="py-24 bg-[#FAF7EF] text-center">
        <p className="text-neutral-500">No testimonials found.</p>
      </section>
    )
  }

  const next = () => setIndex((i) => (i + 1) % merged.length)
  const prev = () => setIndex((i) => (i - 1 + merged.length) % merged.length)

  const t = merged[index]

  return (
    <section className="py-24 bg-[#F5F1E8]">
      {/* TITLE */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-6">
          <span className="h-[1px] w-12 bg-black" />
          <p className="uppercase tracking-wide font-sans text-lg">
            {title}
          </p>
          <span className="h-[1px] w-12 bg-black" />
        </div>
      </div>

      {/* CARD + ARROWS */}
      <div
        className="
          relative
          max-w-4xl mx-auto 
          flex items-center justify-center 
          px-4 touch-pan-x
        "
        onTouchStart={(e) => (window as any).touchStartX = e.touches[0].clientX}
        onTouchEnd={(e) => {
          const startX = (window as any).touchStartX
          const endX = e.changedTouches[0].clientX
          if (startX - endX > 50) next()
          if (endX - startX > 50) prev()
        }}
      >
        {/* DESKTOP ARROWS ONLY */}
        <button
          onClick={prev}
          className="
            hidden md:flex
            absolute left-0 -ml-12
            w-12 h-12 rounded-full border border-black 
            items-center justify-center 
            hover:bg-black hover:text-white transition
          "
        >
          <ChevronLeft size={22} />
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center max-w-2xl">
          <p className="text-xl md:text-3xl text-neutral-700 leading-snug italic transition-opacity duration-500">
            “{t.testimonial}”
          </p>

          <div className="mt-8">
            <p className="font-semibold text-neutral-900">{t.name}</p>
            {t.location && <p className="text-neutral-500 text-sm">{t.location}</p>}
            {t.occupation && <p className="text-neutral-400 text-xs">{t.occupation}</p>}
          </div>

          <div className="w-full bg-neutral-200 h-1 rounded-full mt-8 overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          onClick={next}
          className="
            hidden md:flex
            absolute right-0 -mr-12
            w-12 h-12 rounded-full border border-black 
            items-center justify-center 
            hover:bg-black hover:text-white transition
          "
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* DOTS */}
      <div className="flex justify-center mt-8 gap-2">
        {merged.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'bg-black w-4' : 'bg-neutral-400 w-2'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
