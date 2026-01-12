'use client'

import React from 'react'
import { motion } from 'framer-motion'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <section className="bg-primary py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
        >
          Find Your Home Field
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 italic tracking-tighter">
          OUR <span className="text-accent">LOCATIONS</span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
          We operate across Chicago, Dallas, and Virginia. Find a YMS community near you.
        </p>
      </div>
    </section>
  )
}
