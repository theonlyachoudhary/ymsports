'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <div className="flex items-center">
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className="text-black hover:text-[var(--primary)] px-3 py-2 text-lg font-medium"
              />
            )
          })}
        </div>
      </div>

      <Button variant="default">Explore Programs</Button>
    </div>
  )
}
