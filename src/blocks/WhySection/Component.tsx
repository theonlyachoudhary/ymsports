'use client'

import React from 'react'
import { Shield, Heart, Star, Users } from 'lucide-react'

type WhyItem = {
  icon?: 'shield' | 'heart' | 'star' | 'users'
  title: string
  description: string
}

type WhySectionBlockProps = {
  items?: WhyItem[]
}

const iconMap = {
  shield: Shield,
  heart: Heart,
  star: Star,
  users: Users,
}

export const WhySectionBlock: React.FC<WhySectionBlockProps> = ({ items = [] }) => {
  const defaultItems: WhyItem[] = [
    {
      icon: 'shield',
      title: 'Why We Exist',
      description:
        "Every parent longs for their children's to be surrounded by positive influences and have a strong sense of belonging. We believe that when youth are given the opportunities to grow, they will carry their faith and community into the future.",
    },
    {
      icon: 'heart',
      title: 'Who We Are',
      description:
        'We aim to be a communal backbone for youth development. What defines us are the values we bring to each and every experience.',
    },
  ]

  const displayItems = items.length > 0 ? items : defaultItems

  return (
    <section className="py-20 bg-[#F9F9F9]">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {displayItems.map((item, i) => {
          const IconComponent = iconMap[item.icon || 'shield']

          return (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex-shrink-0 text-green-600 mt-1">
                <IconComponent size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading text-2xl md:text-3xl text-gray-900 italic mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
