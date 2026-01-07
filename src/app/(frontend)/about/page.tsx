import React from 'react'
import { AboutPageClient } from './page.client'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  return <AboutPageClient />
}

export function generateMetadata() {
  return {
    title: 'About Us | YMS',
    description: 'Learn about Youth Muslim Sports - our mission, our values, and the coaches who make it all possible.',
  }
}
