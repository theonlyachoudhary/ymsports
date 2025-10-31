'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Coach as CoachDoc, Coaches as CoachesBlockDoc } from 'src/payload-types'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
  title?: string
  description?: string
  featuredCoaches?: CoachDoc[]
  ctaText?: string
  ctaLink?: string
} & CoachesBlockDoc

export const CoachesBlock: React.FC<Props> = ({
  className,
  title,
  description,
  featuredCoaches,
  ctaText,
  ctaLink,
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
    <section className={cn('w-full bg-[#FFF9F2] py-20 px-6', className)}>
      {/* Header*/}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-end">
        <div className="md:w-1/2 text-center md:text-right">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#5B2C0E] uppercase tracking-wide">
            {title}
          </h2>
          <p className="mt-3 text-base md:text-lg text-[#545454] md:ml-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Grid*/}
      <div className="mt-14 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {coaches.map((c, i) => {
          const img = (c.profilePicture as any)?.url as string | undefined
          return (
            <div
              key={c.id ?? i}
              className="group [perspective:1000px] h-[380px] cursor-pointer"
            >
              <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* FRONT */}
                <div className="absolute inset-0 rounded-xl border border-[#E6E0D8] bg-white shadow-sm flex flex-col items-center justify-between p-4 backface-hidden">
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-md bg-[#FAD9D2]">
                    {img ? (
                      <img
                        src={img}
                        alt={c.name ?? 'Coach'}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-[#5B2C0E]/70 text-sm">
                        No photo
                      </div>
                    )}
                  </div>
                  <div className="w-full text-center mt-3">
                    <h3 className="text-base font-extrabold uppercase text-[#2B2B2B]">
                      {c.name}
                    </h3>
                    {c.role && (
                      <span className="mt-1 inline-block rounded-md bg-[#5B2C0E] px-2.5 py-1 text-[11px] font-semibold leading-none text-white">
                        {c.role}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex justify-end mt-3">
                    <div className="rounded-md bg-[#5B2C0E] text-white h-8 w-8 flex items-center justify-center">
                      →
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 rounded-xl border border-[#E6E0D8] bg-white shadow-sm flex flex-col justify-between p-4 [transform:rotateY(180deg)] backface-hidden">
                  <div>
                    <h3 className="text-base font-extrabold uppercase text-[#2B2B2B]">
                      {c.name}
                    </h3>
                    {c.role && (
                      <span className="mt-1 inline-block rounded-md bg-[#5B2C0E] px-2.5 py-1 text-[11px] font-semibold leading-none text-white">
                        {c.role}
                      </span>
                    )}
                    <p className="mt-3 text-sm text-[#3B3B3B] leading-relaxed">
                      {c.bio}
                    </p>
                  </div>
                  <div className="flex justify-start mt-4">
                    <div className="rounded-md bg-[#5B2C0E] text-white h-8 w-8 flex items-center justify-center">
                      ←
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA*/}
      {ctaText && (
        <div className="mt-14 text-center">
          <a
            href={ctaLink || '#'}
            className="inline-block rounded-md border border-[#5B2C0E] px-5 py-2 text-sm font-semibold text-[#5B2C0E] hover:bg-[#5B2C0E]/10 transition"
          >
            {ctaText}
          </a>
        </div>
      )}
    </section>
  )
}
