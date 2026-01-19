'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import type { Header, Page, Post } from '@/payload-types'
import { CTAButton } from '@/components/CTAButton'

const defaultNavItems = [
  { link: { label: 'Home', url: '/' } },
  { link: { label: 'About Us', url: '/about' } },
  { link: { label: 'Programs', url: '/programs' } },
  { link: { label: 'Locations', url: '/locations' } },
  { link: { label: 'Sponsors', url: '/sponsors' } },
]

function getCtaHref(ctaButton: Header['ctaButton']): string {
  if (!ctaButton) return '/register'

  if (ctaButton.linkType === 'reference' && ctaButton.reference) {
    const ref = ctaButton.reference as { relationTo: string; value: Page | Post | string | number }
    if (typeof ref.value === 'object' && ref.value?.slug) {
      const prefix = ref.relationTo !== 'pages' ? `/${ref.relationTo}` : ''
      return `${prefix}/${ref.value.slug}`
    }
  }

  return ctaButton.url || '/register'
}

export function HeaderNav({ data, mobile = false }: { data: Header; mobile?: boolean }) {
  const pathname = usePathname()
  const navItems = data?.navItems?.length ? data.navItems : defaultNavItems

  // CTA Button config with defaults
  const ctaButton = data?.ctaButton
  const showCta = ctaButton?.enabled !== false
  const ctaLabel = ctaButton?.label || 'Register'
  const ctaHref = getCtaHref(ctaButton)
  const ctaNewTab = ctaButton?.newTab || false

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

        {showCta && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * navItems.length }}
            className="mt-4"
          >
            <CTAButton
              href={ctaHref}
              newTab={ctaNewTab}
              variant="primary"
              size="lg"
              fullWidth
              animate={false}
              icon="arrow"
            >
              {ctaLabel}
            </CTAButton>
          </motion.div>
        )}
      </motion.nav>
    )
  }

  // -------------------
  // DESKTOP VERSION
  // -------------------
  return (
    <motion.nav
      className="hidden md:flex items-center gap-12 px-4 py-2"
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

      {showCta && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 * navItems.length }}
        >
          <CTAButton
            href={ctaHref}
            newTab={ctaNewTab}
            variant="primary"
            size="md"
            animate={false}
            icon="arrow"
          >
            {ctaLabel}
          </CTAButton>
        </motion.div>
      )}
    </motion.nav>
  )
}
