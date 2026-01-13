'use client'

import React from 'react'
import { Media } from '@/components/Media'
import {ChevronRight} from 'lucide-react'

export function TournamentsBlock({
  title,
  tournaments,
}) {
  if (!tournaments?.length) return null

  return (
    <section className="w-full py-24 px-6">
      <div className="mt-20 max-w-7xl mx-auto 
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                      gap-12">
        {tournaments.map((t, i) => {
          const img = (t.image as any)?.url

          const Wrapper = t.link ? 'a' : 'div'
          const wrapperProps = t.link ? { href: t.link } : {}

          return (
            <Wrapper
              key={i}
              {...wrapperProps}
              className="
                bg-white rounded-3xl shadow-md overflow-hidden flex flex-col
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
                cursor-pointer
              "
            >
              {/* IMAGE */}
              <div className="w-full aspect-[4/3] bg-neutral-200 overflow-hidden">
                {img ? (
                  <Media
                    resource={t.image}
                    imgClassName="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-300" />
                )}
              </div>

              {/* TEXT AREA */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-3xl uppercase text-black tracking-wide">
                    {t.name}
                  </h3>

                  {t.description && (
                    <p className="font-sans text-neutral-700 text-sm mt-2 leading-relaxed line-clamp-4">
                      {t.description}
                    </p>
                  )}

                  <div className="mt-4">
                    <p className="font-sans text-sm font-bold">
                      {t.date}
                    </p>
                    <p className="font-sans text-sm text-neutral-600">
                      {t.location}
                    </p>
                  </div>
                </div>

                {/* ARROW*/}
                <div className="mt-6 flex justify-end">
                  <div
                    className="
                      w-10 h-10 rounded-full border border-black 
                      flex items-center justify-center 
                      transition 
                      group-hover:bg-black group-hover:text-white
                    "
                  >
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Wrapper>
          )
        })}
      </div>
    </section>
  )
}
