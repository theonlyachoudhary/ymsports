'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import type { Header } from '@/payload-types'

export function HeaderNav({ data, mobile = false }: { data: Header; mobile?: boolean }) {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  // -------------------
  // MOBILE VERSION
  // -------------------
  if (mobile) {
    return (
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col gap-4 pt-4"
      >
        {navItems.map((item, i) => {
          const href = item.link?.url || '#'
          const active = pathname === href

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="mb-4"
            >
              <Link
                href={href}
                className={`text-lg font-sans drop-shadow-sm ${
                  active ? 'text-white' : 'text-white/70'
                } hover:text-white transition`}
              >
                {item.link?.label}
              </Link>
            </motion.div>
          )
        })}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 * navItems.length }}
          className="mt-4"
        >
          <Link
            href="/register"
            className="mt-6 w-full text-center font-heading text-[18px] tracking-wide bg-green text-primary-foreground py-3 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Register
          </Link>
        </motion.div>
      </motion.nav>
    )
  }

  // -------------------
  // DESKTOP VERSION
  // -------------------
  return (
    <motion.nav
      className="hidden md:flex items-center gap-12 backdrop-blur-md bg-white/5 px-4 py-2 rounded-full"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {navItems.map((item, i) => {
        const href = item.link?.url || '#'
        const active = pathname === href

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative"
          >
            <Link
              href={href}
              className={`yms-link font-sans text-[15px] tracking-wide drop-shadow-sm ${
                active ? 'text-black' : 'text-black/70'
              } hover:text-black transition`}
            >
              {item.link?.label}
            </Link>
          </motion.div>
        )
      })}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 * navItems.length }}
      >
        <Link
          href="/register"
          className="yms-cta font-heading text-[16px] tracking-wide px-8 py-2 rounded-full bg-green text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
        >
          Register
        </Link>
      </motion.div>
    </motion.nav>
  )
}
