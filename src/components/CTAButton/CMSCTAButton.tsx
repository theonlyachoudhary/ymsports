'use client'

import React from 'react'
import { CTAButton, type CTAButtonProps } from './index'
import type { Page, Post } from '@/payload-types'

type CMSLinkData = {
  type?: 'custom' | 'reference' | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  url?: string | null
  label?: string | null
  appearance?: string | null
}

export interface CMSCTAButtonProps extends Omit<CTAButtonProps, 'href' | 'children' | 'newTab'> {
  link?: CMSLinkData | null
  children?: React.ReactNode
}

export const CMSCTAButton: React.FC<CMSCTAButtonProps> = ({
  link,
  children,
  variant = 'primary',
  ...props
}) => {
  if (!link) return null

  const { type, reference, url, label, newTab, appearance } = link

  // Build href from link data
  let href: string | undefined
  if (type === 'reference' && reference?.value != null && typeof reference.value === 'object' && reference.value.slug) {
    const prefix = reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''
    href = `${prefix}/${reference.value.slug}`
  } else if (url) {
    href = url
  }

  if (!href) return null

  // Map appearance to variant if provided
  const mappedVariant = appearance === 'outline' || appearance === 'secondary' ? 'secondary' : variant

  return (
    <CTAButton
      href={href}
      newTab={newTab ?? false}
      variant={mappedVariant}
      {...props}
    >
      {children || label || 'Learn More'}
    </CTAButton>
  )
}
