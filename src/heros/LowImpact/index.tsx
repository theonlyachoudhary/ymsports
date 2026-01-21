'use client'

import React from 'react'
import { motion } from 'framer-motion'

import type { Page } from '@/payload-types'

import { CTAButton } from '@/components/CTAButton'
import RichText from '@/components/RichText'

const getLinkHref = (link: NonNullable<NonNullable<Page['hero']>['links']>[number]['link']) => {
  if (link.type === 'reference' && link.reference?.value && typeof link.reference.value === 'object') {
    const prefix = link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    return `${prefix}/${link.reference.value.slug}`
  }
  return link.url || '#'
}

export const LowImpactHero: React.FC<Page['hero']> = ({ tagline, headline, subtext, richText, links }) => {
  return (
    <section className="bg-primary pt-32 pb-16 relative overflow-hidden">
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
        {Array.isArray(links) && links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {links.map(({ link }, i) => (
              <CTAButton
                key={i}
                href={getLinkHref(link)}
                newTab={link.newTab || false}
                variant={link.appearance === 'link' ? 'link' : i === 0 ? 'default' : 'outline'}
                size="lg"
                className={i > 0 ? 'border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white' : ''}
              >
                {link.label}
              </CTAButton>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
