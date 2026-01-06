'use client'

import React from 'react'
import Link from 'next/link'
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
  title = 'Our Platinum Partners',
  partners = [],
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center uppercase tracking-[0.2em] text-gray-400 text-sm font-sans mb-12">
          {title}
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {partners.length > 0 ? (
            partners.map((partner, i) => {
              const logoUrl = typeof partner.logo === 'object' && partner.logo?.url
                ? partner.logo.url
                : null

              const content = logoUrl ? (
                <img
                  src={logoUrl}
                  alt={partner.name}
                  className="h-12 object-contain grayscale hover:grayscale-0 transition-all"
                />
              ) : (
                <span className="font-heading text-2xl md:text-3xl text-gray-300 hover:text-gray-500 transition-colors">
                  {partner.name}
                </span>
              )

              return partner.url ? (
                <Link
                  key={i}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  {content}
                </Link>
              ) : (
                <div key={i} className="flex items-center">
                  {content}
                </div>
              )
            })
          ) : (
            <>
              <span className="font-heading text-2xl md:text-3xl text-gray-300">Partner One</span>
              <span className="font-heading text-2xl md:text-3xl text-gray-300">Partner Two</span>
              <span className="font-heading text-2xl md:text-3xl text-gray-300">Partner Three</span>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
