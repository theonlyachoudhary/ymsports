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
    <section className="py-20 bg-[#052B70] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#3BD463] text-xs font-black uppercase tracking-[0.2em] mb-6">
            <Handshake size={14} />
            Community Partners
          </div>
          <p className="text-white/60 font-bold uppercase tracking-[0.3em] text-sm">
            {title}
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {partners.length > 0 ? (
            partners.map((partner, i) => {
              const logoUrl = typeof partner.logo === 'object' && partner.logo?.url
                ? partner.logo.url
                : null

              const content = logoUrl ? (
                <img
                  src={logoUrl}
                  alt={partner.name}
                  className="h-14 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-500"
                />
              ) : (
                <span className="font-heading text-3xl md:text-4xl text-white/40 hover:text-white transition-colors duration-500 uppercase tracking-tight">
                  {partner.name}
                </span>
              )

              return partner.url ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    {content}
                  </Link>
                </motion.div>
              ) : (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center"
                >
                  {content}
                </motion.div>
              )
            })
          ) : (
            <>
              <span className="font-heading text-3xl md:text-4xl text-white/30 uppercase tracking-tight">Your Brand Here</span>
              <span className="font-heading text-3xl md:text-4xl text-white/30 uppercase tracking-tight">Partner With Us</span>
            </>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link 
            href="/sponsors"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#3BD463] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-[#2EB854] transition-all shadow-xl shadow-[#3BD463]/20 hover:scale-105"
          >
            Become a Partner
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
