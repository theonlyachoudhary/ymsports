'use client'
import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from '@/components/SectionHeader'
import { Testimonial } from '@/payload-types'

type TestimonialsBlockProps = {
  heading?: string
  subheading?: string
  testimonials?: Testimonial[]
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({ heading, subheading }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials?')
        if (!res.ok) {
          throw new Error(`Failed: ${res.status} ${res.statusText}`)
        }
        const json = await res.json()
        setTestimonials(json.docs || [])
      } catch (err) {
        console.error('Error fetching testimonials:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  if (loading) {
    return <p className="mx-auto text-center">Loading testimonials...</p>
  }
  if (error) {
    return <p className="mx-auto text-center">Error loading testimonials: {error}</p>
  }
  if (testimonials.length === 0) {
    return <p className="mx-auto text-center">No testimonials available.</p>
  }

  return (
    <section className={cn('py-24')}>
      <SectionHeader heading={heading ?? ''} subheading={subheading} />
      {testimonials.map((testimonial, index) => {
        return (
          <Card
            key={testimonial.id ?? index}
            className="p-6 hover:shadow-xl transition-shadow bg-brand-neutral/25 rounded-xl border border-gray-100 flex flex-col w-full max-w-xl h-[280px] overflow-visible"
          >
            <CardContent className="flex flex-col h-full p-0"></CardContent>
          </Card>
        )
      })}
    </section>
  )
}
