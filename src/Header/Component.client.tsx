'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'
import { AnimatePresence, motion } from 'framer-motion'
import { Hamburger } from '@/components/Hamburger'

export default function HeaderClient({ data }: { data: Header }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shrink, setShrink] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // For smooth hide/show on scroll
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setShrink(current > 10)

      if (current > lastScrollY && current > 120) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      setLastScrollY(current)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`
        fixed top-0 left-0 z-50 w-full
        border-b transition-all duration-300
        ${shrink ? 'h-16' : 'h-20'}
        ${
          isHome
            ? shrink
              ? 'bg-white/95 border-black/5 shadow-sm backdrop-blur-sm' // home + scrolled -> solid
              : 'backdrop-blur-lg bg-white/15 border-white/10' // home top -> translucent
            : shrink
              ? 'bg-background/95 border-black/5 shadow-sm' // inner page + scrolled -> solid
              : 'bg-background' // inner page top -> existing
        }
        transition-colors duration-300
      `}
    >
      <div className="max-w-[1320px] mx-auto h-full px-8 flex items-center justify-between">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Link href="/" className="font-heading text-[28px] tracking-wide">
            YMS
          </Link>
        </motion.div>

        {/* DESKTOP NAV */}
        <HeaderNav data={data} />

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <Hamburger open={mobileOpen} />
        </button>
      </div>

      <div className="yms-geo-line w-full" />

      {/* MOBILE NAV */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="
              md:hidden
              absolute
              top-full
              left-0
              w-full
              bg-transparent
              pt-6 pb-8 px-8
              z-[200]
            "
          >
            <HeaderNav data={data} mobile />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
