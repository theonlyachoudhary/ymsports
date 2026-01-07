'use client'

import React from 'react'
import { Shield, Heart, Star, Users } from 'lucide-react'
import { motion } from 'framer-motion'

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
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {displayItems.map((item, i) => {
            const IconComponent = iconMap[item.icon || 'shield']

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -top-12 -left-8 text-[12rem] font-black text-gray-50 select-none -z-10 leading-none">
                  0{i + 1}
                </div>
                <div className="w-16 h-16 rounded-3xl bg-[#052B70] flex items-center justify-center text-white mb-8 shadow-xl shadow-[#052B70]/20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <IconComponent size={32} strokeWidth={2} />
                </div>
                <h3 className="font-heading text-4xl md:text-5xl text-gray-900 uppercase tracking-tighter mb-6 leading-none">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-lg font-medium">
                  {item.description}
                </p>
                <div className="mt-8 w-12 h-1.5 bg-[#3BD463] rounded-full" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
