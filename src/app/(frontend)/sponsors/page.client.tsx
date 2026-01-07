'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Star, Trophy, Users, Shield, Zap, Info } from 'lucide-react'

const tiers = [
  {
    name: 'Franchise Partner',
    price: '$2,000',
    period: 'per season',
    description: 'Limited availability (max two partners per season)',
    features: [
      'Logo placement on the front of team jerseys',
      'Brand presence across active seasonal materials',
      'Digital recognition on YMS platforms during the season',
      'Association with all YMS leagues, camps, and events',
      'Includes all seasonal recognition benefits'
    ],
    cta: 'Secure Franchise Partnership',
    popular: true,
    icon: Trophy,
    color: '#052B70'
  },
  {
    name: 'Starting Five Partner',
    price: '$1,000',
    period: 'per season',
    description: 'Premier seasonal visibility for your brand',
    features: [
      'Logo placement on the back of team jerseys',
      'Full seasonal digital recognition',
      'Community recognition on YMS platforms',
      'Digital presence across seasonal materials'
    ],
    cta: 'Secure Starting Five Partnership',
    popular: false,
    icon: Star,
    color: '#3BD463'
  },
  {
    name: 'Foundation Partner',
    price: '$500',
    period: 'per season',
    description: 'Perfect for small businesses supporting youth',
    features: [
      'Logo placement on the YMS website',
      'Recognition across YMS digital platforms',
      'Association with seasonal events',
      'Digital community supporter acknowledgment'
    ],
    cta: 'Secure Foundation Partnership',
    popular: false,
    icon: Users,
    color: '#FFB800'
  }
]

export function SponsorsPageClient() {
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
              <Zap size={14} fill="currentColor" />
              Join the Team
            </div>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white uppercase leading-[0.8] tracking-tighter mb-8 drop-shadow-2xl">
              Partner With <span className="text-[#3BD463]">YMS</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium leading-relaxed">
              Community partnerships through youth development and athletics. Support the next generation of champions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Seasonal Intro */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-[#052B70] uppercase mb-8 leading-none tracking-tight">
                Seasonal <span className="text-gray-400">Sponsorships</span>
              </h2>
              <div className="space-y-6 text-gray-500 font-medium text-lg leading-relaxed">
                <p>
                  Youth Muslim Sports (YMS) sponsorships operate on a seasonal basis. Each sponsorship applies to one season only—Spring, Summer, Fall, or Winter.
                </p>
                <p>
                  This approach ensures clarity, alignment, and fairness. Sponsors support programs running during their selected season without long-term commitments.
                </p>
                <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-blue-50/50 border border-blue-100 text-[#052B70]">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <Info size={24} />
                  </div>
                  <p className="text-sm font-bold leading-tight">
                    Sponsorships do not auto-renew. Partners may choose to renew for future seasons based on availability.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#052B70] rounded-[3rem] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10">
                <div className="text-[#3BD463] font-black uppercase tracking-widest text-xs mb-4">Current Season</div>
                <h3 className="font-heading text-5xl uppercase mb-2">Spring 2026</h3>
                <p className="text-blue-200 font-bold mb-8">March 1 – May 31</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3BD463] flex items-center justify-center text-white">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="font-bold">One-time seasonal partnership</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3BD463] flex items-center justify-center text-white">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="font-bold">Direct community impact</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 italic text-blue-200/60 text-sm">
                  "Sponsors support the programs, events, and athletes running during their selected season."
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="py-24 md:py-32 bg-[#F8F9FB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl text-[#052B70] uppercase tracking-tighter mb-4">
              Partnership <span className="text-gray-400">Tiers</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg">Select the tier that best aligns with your community goals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative group bg-white rounded-[3rem] p-10 shadow-sm border-2 transition-all duration-500 hover:shadow-2xl ${
                  tier.popular ? 'border-[#3BD463]/20' : 'border-transparent hover:border-gray-100'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3BD463] text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    Most Impact
                  </div>
                )}

                <div className="mb-10 text-center">
                  <div 
                    className="w-20 h-20 rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: tier.color, boxShadow: `0 10px 30px ${tier.color}33` }}
                  >
                    <tier.icon size={36} className="text-white" fill="white" />
                  </div>
                  <h3 className="font-heading text-3xl text-gray-900 uppercase mb-4 leading-none">{tier.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-black text-[#052B70]">{tier.price}</span>
                    <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">{tier.period}</span>
                  </div>
                  <p className="mt-4 text-gray-400 text-sm font-bold leading-relaxed px-4">{tier.description}</p>
                </div>

                <div className="space-y-4 mb-10">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#3BD463] border border-gray-100 group-hover:bg-[#3BD463]/10 transition-colors">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-gray-600 text-sm font-bold leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm transition-all shadow-lg group-hover:scale-[1.02] active:scale-[0.98] ${
                  tier.popular 
                    ? 'bg-[#3BD463] text-white shadow-[#3BD463]/30 hover:bg-[#2EB854]' 
                    : 'bg-white border-2 border-gray-100 text-[#052B70] hover:bg-gray-50'
                }`}>
                  {tier.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-20 h-20 rounded-3xl bg-blue-50 text-[#052B70] flex items-center justify-center mx-auto mb-10 shadow-sm border border-blue-100">
            <Shield size={32} />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-[#052B70] uppercase mb-6 leading-none tracking-tight">
            Ready to <span className="text-gray-400">Join Us?</span>
          </h2>
          <p className="text-gray-500 font-medium text-lg leading-relaxed mb-12">
            Once a partnership is confirmed, our team will follow up to collect branding assets and coordinate next steps. For custom partnerships or questions, please contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="mailto:admin@youthmuslimsports.org"
              className="px-10 py-5 bg-[#052B70] text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-[#052B70]/20 hover:scale-105"
            >
              Contact Admin
            </a>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              <Info size={16} />
              admin@youthmuslimsports.org
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
