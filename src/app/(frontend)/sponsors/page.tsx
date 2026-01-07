import React from 'react'
import { SponsorsPageClient } from './page.client'

export const dynamic = 'force-dynamic'

export default async function SponsorsPage() {
  return <SponsorsPageClient />
}

export function generateMetadata() {
  return {
    title: 'Seasonal Sponsorships | YMS',
    description: 'Partner with YMS to support youth development and community athletics.',
  }
}
