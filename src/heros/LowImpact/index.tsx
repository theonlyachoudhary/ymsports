'use client'

import React from 'react'
import { motion } from 'framer-motion'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

export const LowImpactHero: React.FC<Page['hero']> = ({ tagline, headline, subtext, richText }) => {
  return (
    <section className="bg-primary py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        {tagline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
          >
            {tagline}
          </motion.div>
        )}
        {headline && (
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 italic tracking-tighter uppercase">
            {headline}
          </h1>
        )}
        {subtext && (
          <p className="text-xl text-white max-w-2xl mx-auto font-medium mb-8">
            {subtext}
          </p>
        )}
        {richText && (
          <div className="max-w-2xl mx-auto text-white/80">
            <RichText data={richText as any} />
          </div>
        )}
      </div>
    </section>
  )
}
