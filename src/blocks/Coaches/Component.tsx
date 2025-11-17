'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Coach as CoachDoc, Coaches as CoachesBlockDoc } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
  title?: string
  description?: string
  featuredCoaches?: CoachDoc[]
} & CoachesBlockDoc

export const CoachesBlock: React.FC<Props> = ({
  className,
  title,
  description,
  featuredCoaches,
}) => {
  const [fetched, setFetched] = useState<CoachDoc[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const shouldFetch = !featuredCoaches || featuredCoaches.length === 0

  useEffect(() => {
    if (!shouldFetch) return
    const run = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/coaches?limit=12&depth=1')
        if (!res.ok) throw new Error(`Failed to fetch coaches: ${res.status}`)
        const data = await res.json()
        setFetched(data.docs as CoachDoc[])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [shouldFetch])

  const coaches: CoachDoc[] = useMemo(
    () => (shouldFetch ? fetched : featuredCoaches ?? []),
    [shouldFetch, fetched, featuredCoaches]
  )

  if (loading) return <p className="text-center text-gray-500">Loading coaches…</p>
  if (error) return <p className="text-center text-red-600">Error: {error}</p>
  if (!coaches?.length) return null

  return (
    <section className={cn('w-full bg-[#FAF7EF] py-24 px-6', className)}>
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading uppercase tracking-tight text-black 
                       text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          {title}
        </h2>

        {description && (
          <p className="mt-4 text-lg font-sans text-neutral-700">
            {description}
          </p>
        )}
      </div>

      {/* GRID */}
      <div className="mt-20 max-w-7xl mx-auto 
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                      gap-12">
        {coaches.map((c, i) => {
          const img = (c.profilePicture as any)?.url as string | undefined

          return (
            <div
              key={c.id ?? i}
              className="bg-white rounded-3xl shadow-md overflow-hidden"
            >
              {/* IMAGE */}
              <div className="w-full aspect-[4/5] bg-neutral-200">
                {img ? (
                  <img
                    src={img}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-300 animate-pulse" />
                )}
              </div>

              {/* TEXT AREA */}
              <div className="py-6 px-5 text-center">
                <h3 className="font-heading text-2xl uppercase text-black tracking-wide">
                  {c.name}
                </h3>

                <p className="font-sans text-neutral-600 text-sm mt-1">
                  {c.role || 'Coach'}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
