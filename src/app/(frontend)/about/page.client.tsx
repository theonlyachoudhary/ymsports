'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Heart, Star, Users, Target, Trophy, X, ArrowRight, Mail } from 'lucide-react'
import type { Coach as CoachDoc } from '@/payload-types'

const values = [
  {
    icon: Shield,
    title: 'Faith-Centered',
    description: 'Every program is built on Islamic values, creating an environment where young athletes can grow spiritually while developing their skills.',
    color: '#052B70'
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'We believe in the power of community. Our programs bring families together and build lasting bonds beyond the playing field.',
    color: '#3BD463'
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We push our athletes to reach their full potential through dedicated coaching, structured training, and a commitment to continuous improvement.',
    color: '#FFB800'
  },
  {
    icon: Users,
    title: 'Inclusivity',
    description: 'Every child deserves access to quality sports programs. We welcome athletes of all skill levels and backgrounds.',
    color: '#052B70'
  }
]

export function AboutPageClient() {
  const [coaches, setCoaches] = useState<CoachDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCoach, setActiveCoach] = useState<CoachDoc | null>(null)

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch('/api/coaches?limit=12&depth=1')
        if (res.ok) {
          const data = await res.json()
          setCoaches(data.docs || [])
        }
      } catch (e) {
        console.error('Failed to fetch coaches', e)
      } finally {
        setLoading(false)
      }
    }
    fetchCoaches()
  }, [])

  return (
    <div className="min-h-screen bg-[#FBFAF6]">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#052B70] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#3BD463] text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Trophy size={14} fill="currentColor" />
              Our Story
            </div>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white uppercase leading-[0.8] tracking-tighter mb-8 drop-shadow-2xl">
              About <span className="text-[#3BD463]">YMS</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium leading-relaxed">
              Building champions on and off the field through faith, community, and athletic excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-5xl md:text-6xl text-[#052B70] uppercase mb-8 leading-none tracking-tight">
                Why We <span className="text-[#3BD463]">Exist</span>
              </h2>
              <div className="space-y-6 text-gray-500 font-medium text-lg leading-relaxed">
                <p>
                  Youth Muslim Sports (YMS) was founded with a simple yet powerful mission: to provide Muslim youth with access to quality sports programs that align with their values and strengthen their community.
                </p>
                <p>
                  We believe that athletics is about more than just physical development. It's about building character, fostering teamwork, and creating an environment where young people can thrive both spiritually and physically.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-full h-full bg-[#3BD463]/10 rounded-[3rem]" />
              <img
                src="/hero-sports.jpg"
                alt="Youth athletes in action"
                className="relative rounded-[3rem] shadow-2xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#F8F9FB]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-5xl md:text-7xl text-[#052B70] uppercase tracking-tighter mb-4">
              Our <span className="text-gray-400">Values</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg">The principles that guide everything we do.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-50 hover:shadow-2xl transition-all duration-500 group"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:-rotate-6 transition-transform duration-500"
                  style={{ backgroundColor: value.color, boxShadow: `0 10px 30px ${value.color}33` }}
                >
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="font-heading text-2xl text-gray-900 uppercase mb-4 tracking-tight leading-none">
                  {value.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#052B70] text-xs font-black uppercase tracking-[0.2em] mb-6">
              <Users size={14} />
              The Team
            </div>
            <h2 className="font-heading text-5xl md:text-7xl text-[#052B70] uppercase tracking-tighter mb-4">
              Meet Our <span className="text-[#3BD463]">Coaches</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
              Dedicated mentors who bring experience, passion, and a commitment to developing well-rounded young athletes.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-gray-100 rounded-[2.5rem] h-[400px] animate-pulse" />
              ))}
            </div>
          ) : coaches.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100 max-w-4xl mx-auto">
              <Users size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 font-bold uppercase tracking-widest">No coaches added yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {coaches.map((coach, i) => {
                const img = (coach.profilePicture as any)?.url as string | undefined

                return (
                  <motion.div
                    key={coach.id ?? i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setActiveCoach(coach)}
                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-50 cursor-pointer group hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative h-64 overflow-hidden">
                      {img ? (
                        <img
                          src={img}
                          alt={coach.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#052B70] to-[#3BD463] flex items-center justify-center">
                          <span className="font-heading text-6xl text-white/30">{coach.name?.charAt(0)}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#052B70]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <span className="text-white/80 text-sm font-bold uppercase tracking-widest">View Profile</span>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="font-heading text-2xl text-gray-900 uppercase tracking-tight leading-none mb-2">
                        {coach.name}
                      </h3>
                      <p className="text-[#3BD463] font-bold text-sm uppercase tracking-widest">
                        {coach.role || 'Coach'}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#052B70] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-5xl md:text-7xl text-white uppercase tracking-tighter mb-6">
              Ready to <span className="text-[#3BD463]">Join?</span>
            </h2>
            <p className="text-blue-100 font-medium text-xl max-w-2xl mx-auto mb-12">
              Explore our programs and find the perfect fit for your young athlete.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/programs"
                className="px-10 py-5 bg-[#3BD463] text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-[#3BD463]/20 hover:scale-105 flex items-center gap-3"
              >
                View Programs
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="mailto:admin@youthmuslimsports.org"
                className="px-10 py-5 border-2 border-white/30 text-white rounded-2xl font-black uppercase tracking-widest transition-all hover:bg-white/10 hover:border-white/60 flex items-center gap-3"
              >
                <Mail size={20} />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coach Modal */}
      <AnimatePresence>
        {activeCoach && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCoach(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[3rem] max-w-lg w-full overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setActiveCoach(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 transition-colors shadow-lg"
              >
                <X size={20} />
              </button>

              {activeCoach.profilePicture && (
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={(activeCoach.profilePicture as any).url}
                    alt={activeCoach.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
              )}

              <div className="p-10 pt-6 text-center">
                <h3 className="font-heading text-4xl uppercase tracking-tight text-gray-900 mb-2">
                  {activeCoach.name}
                </h3>
                <p className="text-[#3BD463] font-black uppercase tracking-widest text-sm mb-6">
                  {activeCoach.role || 'Coach'}
                </p>
                {activeCoach.bio && (
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {activeCoach.bio}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
