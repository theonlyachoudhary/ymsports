'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import type { Media } from '@/payload-types'

type Sport = {
  sport: string
  id?: string | null
}

type Location = {
  city: string
  state: string
  description?: string | null
  statusBadge?: string | null
  athleteCount?: number | null
  image?: Media | string | null
  sports?: Sport[] | null
  address?: string | null
  phoneNumber?: string | null
  email?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  id?: string | null
}

type Hero = {
  badge?: string | null
  title?: string | null
  titleAccent?: string | null
  subtitle?: string | null
  backgroundImage?: Media | string | null
}

type Props = {
  hero?: Hero
  locations?: Location[]
  className?: string
}

const LocationCard: React.FC<{ location: Location; imageUrl?: string }> = ({ location, imageUrl }) => {
  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ 
          backgroundImage: imageUrl 
            ? `url(${imageUrl})` 
            : `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-display font-bold mb-2">
          {location.city}, {location.state}
        </h3>
        {location.address && (
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{location.address}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export const LocationsBlockComponent: React.FC<Props> = ({ hero, locations, className }) => {
  const heroImageUrl = hero?.backgroundImage && typeof hero.backgroundImage !== 'string' 
    ? hero.backgroundImage.url 
    : undefined

  return (
    <div className={cn('', className)}>
      <section className="bg-primary py-32 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{ 
            backgroundImage: heroImageUrl 
              ? `url(${heroImageUrl})` 
              : `url('https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2000')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
          >
            {hero?.badge || 'Find Your Home Field'}
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 italic tracking-tighter">
            {hero?.title || 'OUR'} <span className="text-accent">{hero?.titleAccent || 'LOCATIONS'}</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
            {hero?.subtitle || 'We operate across Chicago, Dallas, and Virginia. Find a YMS community near you.'}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 gap-12">
          {locations?.map((loc, index) => {
            const locationImageUrl = loc.image && typeof loc.image !== 'string' 
              ? loc.image.url 
              : undefined

            return (
              <motion.div
                key={loc.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-muted/20 rounded-3xl p-6 md:p-12 border">
                  <div className="order-2 md:order-1 space-y-6">
                    {loc.statusBadge && (
                      <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                        {loc.statusBadge}
                      </div>
                    )}
                    <h2 className="text-4xl font-display font-bold">{loc.city}, {loc.state}</h2>
                    <p className="text-muted-foreground">
                      {loc.description || `Our ${loc.city} facility features state-of-the-art fields and courts tailored for youth development.${loc.athleteCount ? ` Home to over ${loc.athleteCount} active athletes.` : ''}`}
                    </p>
                    
                    {loc.sports && loc.sports.length > 0 && (
                      <div className="space-y-2">
                        <div className="font-bold">Featured Sports:</div>
                        <div className="flex gap-2 flex-wrap">
                          {loc.sports.map((sportItem, sportIndex) => (
                            <span 
                              key={sportItem.id || sportIndex} 
                              className="px-3 py-1 bg-white border rounded-md text-sm"
                            >
                              {sportItem.sport}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 text-sm text-muted-foreground">
                      {loc.phoneNumber && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{loc.phoneNumber}</span>
                        </div>
                      )}
                      {loc.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{loc.email}</span>
                        </div>
                      )}
                    </div>

                    {loc.buttonLink && (
                      <Link href={loc.buttonLink}>
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                          {loc.buttonText || 'Learn More'}
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="order-1 md:order-2">
                    <LocationCard location={loc} imageUrl={locationImageUrl || undefined} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LocationsBlockComponent
