'use client'
import type { Coaches as CoachesProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { Coaches } from 'src/payload-types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

type Props = {
  className?: string
  title?: string
  description?: string
  coaches?: Coaches[]
} & CoachesProps

export const CoachesBlock: React.FC<Props> = ({ className, title, description }) => {
  const [coaches, setCoaches] = useState<Coaches[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch('/api/coaches?limit=6&depth=1')
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
        }
        setCoaches((await res.json()).docs)
      } catch (err) {
        console.error('Error fetching coaches:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCoaches()
  }, [])
  if (loading) {
    return <p className="mx-auto text-center">Loading coaches...</p>
  }
  if (error) {
    return <p className="mx-auto text-center">Error loading coaches: {error}</p>
  }
  return (
    <section className={cn('mx-auto my-8 w-full', className)}>
      <SectionHeader
        heading={title}
        subheading={description}
        align="center"
        spacing="sm"
        containerClassName="w-full ml-0"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {coaches.map((coach, idx) => {
          return (
            <Card
              key={coach?.id ?? idx}
              className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            ></Card>
          )
        })}
      </div>
    </section>
  )
}
