'use client'

import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type Props = {
  className?: string
  title?: string
  description?: string
  valueCards?: {
    title: string
    description: string
    icon: {
      url: string
      alt?: string
    }
  }[]
}

export const ValuesBlock: React.FC<Props> = ({
  className,
  title = 'Our Values',
  description,
  valueCards = [],
}) => {
  return (
    <section className={cn('py-20 md:py-28 relative overflow-hidden', className)}>
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
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#3BD463]/10 rounded-full">
            <Sparkles size={16} className="text-[#3BD463]" />
            <span className="text-[#3BD463] font-bold uppercase tracking-widest text-sm">What We Stand For</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#052B70] uppercase tracking-tight mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {valueCards.map((values, idx) =>
            values ? (
              <motion.div
                key={values.title ?? idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {values.icon?.url && (
                  <div className="mb-6">
                    <Image
                      src={values.icon.url}
                      alt={values.icon.alt ?? values.title ?? 'icon'}
                      width={80}
                      height={80}
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                )}
                {values.title && (
                  <h3 className="font-heading font-bold text-xl text-[#052B70] mb-2">{values.title}</h3>
                )}
                {values.description && (
                  <p className="text-gray-500 text-sm leading-relaxed">{values.description}</p>
                )}
              </motion.div>
            ) : null,
          )}
        </div>
      </div>
    </section>
  )
}
