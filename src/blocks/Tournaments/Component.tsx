'use client'

import React from 'react'
import { Media } from '@/components/Media'
import { ChevronRight, Trophy, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function TournamentsBlock({
  title = 'Upcoming Tournaments',
  tournaments,
}) {
  if (!tournaments?.length) return null

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3BD463]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#052B70]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#FFD700]/10 rounded-full">
            <Trophy size={16} className="text-[#FFD700]" />
            <span className="text-[#FFD700] font-bold uppercase tracking-widest text-sm">Compete</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#052B70] uppercase tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Test your skills against top competition in our exciting tournament series.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tournaments.map((t, i) => {
          const img = (t.image as any)?.url

          const Wrapper = t.link ? 'a' : 'div'
          const wrapperProps = t.link ? { href: t.link } : {}

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Wrapper
                {...wrapperProps}
                className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer h-full"
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
            </motion.div>
          )
        })}
        </div>
      </div>
    </section>
  )
}
