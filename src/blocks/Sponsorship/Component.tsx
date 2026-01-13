'use client'

import React from 'react'
import { Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

type Benefit = {
  benefit: string
  id?: string | null
}

type Tier = {
  name: string
  price: string
  pricePeriod?: string | null
  description?: string | null
  featured?: boolean | null
  featuredLabel?: string | null
  benefits?: Benefit[] | null
  buttonText?: string | null
  buttonLink?: string | null
  phoneNumber?: string | null
  id?: string | null
}

type Paragraph = {
  text: string
  id?: string | null
}

type HighlightItem = {
  item: string
  id?: string | null
}

type Guidelines = {
  title?: string | null
  paragraphs?: Paragraph[] | null
  highlightTitle?: string | null
  highlightItems?: HighlightItem[] | null
  closingParagraphs?: Paragraph[] | null
}

type Props = {
  tiers?: Tier[]
  guidelines?: Guidelines
  className?: string
}

const TierCard: React.FC<{ tier: Tier }> = ({ tier }) => {
  const isFeatured = tier.featured

  if (isFeatured) {
    return (
      <div className="relative bg-[#052B70] rounded-3xl p-8 border border-[#052B70] text-white flex flex-col transform md:scale-110 shadow-2xl z-10">
        {tier.featuredLabel && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3BD463] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
            {tier.featuredLabel}
          </div>
        )}
        <div className="text-center mb-8">
          <h3 className="text-lg font-bold uppercase tracking-widest text-white/70 mb-4">{tier.name}</h3>
          <div className="text-5xl font-bold text-white">{tier.price}</div>
          {tier.pricePeriod && <div className="text-sm text-white/60">{tier.pricePeriod}</div>}
          {tier.description && <p className="mt-4 text-sm text-white/80 italic">{tier.description}</p>}
        </div>
        <ul className="space-y-4 mb-8 flex-grow">
          {tier.benefits?.map((b, i) => (
            <li key={b.id || i} className="flex items-start gap-3 text-sm text-white/90">
              <div className="mt-1 bg-[#3BD463] text-white rounded-full p-0.5">
                <Zap size={12} />
              </div>
              <span>{b.benefit}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-4 text-center">
          {tier.buttonLink ? (
            <Link href={tier.buttonLink}>
              <Button className="w-full rounded-full bg-[#3BD463] hover:bg-[#2EB854] text-white font-bold h-14 text-lg border-0">
                {tier.buttonText || 'Learn More!'}
              </Button>
            </Link>
          ) : (
            <Button className="w-full rounded-full bg-[#3BD463] hover:bg-[#2EB854] text-white font-bold h-14 text-lg border-0">
              {tier.buttonText || 'Learn More!'}
            </Button>
          )}
          {tier.phoneNumber && (
            <div className="text-sm font-bold text-white/80">{tier.phoneNumber}</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gray-100/50 rounded-3xl p-8 border border-gray-200 flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="text-center mb-8">
        <h3 className="text-lg font-bold uppercase tracking-widest text-gray-500 mb-4">{tier.name}</h3>
        <div className="text-4xl font-bold text-[#052B70]">{tier.price}</div>
        {tier.pricePeriod && <div className="text-sm text-gray-500">{tier.pricePeriod}</div>}
        {tier.description && <p className="mt-4 text-sm text-gray-500 italic">{tier.description}</p>}
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        {tier.benefits?.map((b, i) => (
          <li key={b.id || i} className="flex items-start gap-3 text-sm">
            <div className="mt-1 bg-[#3BD463]/20 text-[#3BD463] rounded-full p-0.5">
              <Zap size={12} />
            </div>
            <span>{b.benefit}</span>
          </li>
        ))}
      </ul>
      {tier.buttonLink ? (
        <Link href={tier.buttonLink}>
          <Button className="w-full rounded-full bg-[#052B70] hover:bg-[#041f52] text-white font-bold h-12">
            {tier.buttonText || 'Learn More!'}
          </Button>
        </Link>
      ) : (
        <Button className="w-full rounded-full bg-[#052B70] hover:bg-[#041f52] text-white font-bold h-12">
          {tier.buttonText || 'Learn More!'}
        </Button>
      )}
    </div>
  )
}

export const SponsorshipBlock: React.FC<Props> = ({ tiers = [], guidelines, className }) => {
  return (
    <section className={cn('py-24 bg-white', className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, index) => (
            <TierCard key={tier.id || index} tier={tier} />
          ))}
        </div>

        {guidelines && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100/50 rounded-3xl p-10 md:p-16 border border-gray-200">
              {guidelines.title && (
                <h2 className="text-3xl font-bold text-[#052B70] mb-8 text-center">
                  {guidelines.title}
                </h2>
              )}
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                {guidelines.paragraphs?.map((p, i) => (
                  <p key={p.id || i}>{p.text}</p>
                ))}

                {(guidelines.highlightTitle || (guidelines.highlightItems && guidelines.highlightItems.length > 0)) && (
                  <div className="bg-white/50 rounded-2xl p-8 border border-white/40 space-y-4">
                    {guidelines.highlightTitle && (
                      <h3 className="text-xl font-bold text-[#052B70]">{guidelines.highlightTitle}</h3>
                    )}
                    {guidelines.highlightItems && guidelines.highlightItems.length > 0 && (
                      <ul className="space-y-3 list-disc pl-5">
                        {guidelines.highlightItems.map((item, i) => (
                          <li key={item.id || i}>{item.item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {guidelines.closingParagraphs?.map((p, i) => (
                  <p key={p.id || i}>{p.text}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
