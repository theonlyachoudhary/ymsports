'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Handshake, ArrowRight } from 'lucide-react'
import type { Media } from '@/payload-types'

type Partner = {
  name: string
  logo?: Media | string
  url?: string
}

type PartnersBlockProps = {
  title?: string
  partners?: Partner[]
}

export const PartnersBlock: React.FC<PartnersBlockProps> = ({
  title = 'Proudly Supported By',
  partners = [],
}) => {
  return (
    <section className="py-16 bg-white border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-muted-foreground uppercase tracking-[0.3em] mb-12">Our Platinum Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {/* 3 Platinum Partners per location constraint applied visually */}
          <div className="text-2xl font-display font-black tracking-tighter text-slate-400">PARTNER ONE</div>
          <div className="text-2xl font-display font-black tracking-tighter text-slate-400">PARTNER TWO</div>
          <div className="text-2xl font-display font-black tracking-tighter text-slate-400">PARTNER THREE</div>
        </div>
      </div>
    </section>
  )
}
