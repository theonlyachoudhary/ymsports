'use client'

import React, { useEffect, useState } from 'react'
import { Star, Shield, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Testimonial } from '@/payload-types'

type TestimonialsBlockProps = {
  title?: string
  testimonials?: Testimonial[]
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  title = 'Community Voice',
  testimonials = [],
}) => {
  const [merged, setMerged] = useState<Testimonial[]>([])
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const DURATION = 5000

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/testimonials')
        const json = await res.json()

        const all = json.docs || []
        const cmsIds = new Set(testimonials.map((t) => t.id))
        const remaining = all.filter((t: Testimonial) => !cmsIds.has(t.id))

        setMerged([...testimonials, ...remaining])
      } catch (e) {
        console.error('Failed to load testimonials', e)
      }
    }

    load()
  }, [testimonials])

  useEffect(() => {
    if (merged.length === 0) return

    const interval = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % merged.length)
    }, DURATION)

    return () => {
      clearInterval(interval)
    }
  }, [merged])

  const next = () => {
    setDirection(1)
    setIndex((i) => (i + 1) % merged.length)
  }
  
  const prev = () => {
    setDirection(-1)
    setIndex((i) => (i - 1 + merged.length) % merged.length)
  }

  const goToSlide = (i: number) => {
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }

  const t = merged[index]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <section className="py-24 bg-[#052B70]/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - About Content */}
          <motion.div 
            className="space-y-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Shield className="text-[#3BD463]" size={32} />
                <h2 className="text-4xl font-heading font-bold text-[#052B70]">Why We Exist</h2>
              </motion.div>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Every parent longs for their children to be surrounded by positive influences and have a strong sense of belonging. We believe that when youth are given the opportunities to grow, they will carry their faith and community into the future.
              </motion.p>
            </div>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Heart className="text-[#3BD463]" size={32} />
                <h2 className="text-4xl font-heading font-bold text-[#052B70]">Who We Are</h2>
              </motion.div>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                We aim to be a communal backbone for youth development. What defines us are the values we bring to each and every experience.
              </motion.p>
            </div>

            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/about" className="inline-flex items-center gap-2 text-[#052B70] font-bold text-lg hover:text-[#3BD463] transition-colors group">
                Learn more about our values 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Testimonials & Images */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {/* Glassmorphism Testimonial Card */}
            <div 
              className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-sm touch-pan-x overflow-hidden"
              onTouchStart={(e) => ((window as any).touchStartX = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const startX = (window as any).touchStartX
                const endX = e.changedTouches[0].clientX
                if (startX - endX > 50) next()
                if (endX - startX > 50) prev()
              }}
            >
              <div className="flex items-center gap-2 mb-6 text-[#3BD463] font-bold uppercase tracking-widest text-xs">
                <Star size={14} fill="currentColor" /> {title}
              </div>
              
              {merged.length > 0 ? (
                <div className="relative min-h-[200px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={index}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                    >
                      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-8">
                        &ldquo;{t?.testimonial || ''}&rdquo;
                      </p>

                      <div className="border-t border-gray-200 pt-6">
                        <p className="font-semibold text-[#052B70]">{t?.name || ''}</p>
                        {t?.occupation && (
                          <p className="text-[#3BD463] text-sm uppercase tracking-wide">{t.occupation}</p>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress Indicators */}
                  <div className="flex justify-center mt-8 gap-2">
                    {merged.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === index ? 'bg-[#3BD463] w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Loading testimonials...</p>
              )}
            </div>
            
            {/* Action Shot Images */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="relative h-[250px] rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop"
                  alt="Youth playing basketball"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="relative h-[250px] rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
                  alt="Competitive play"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
