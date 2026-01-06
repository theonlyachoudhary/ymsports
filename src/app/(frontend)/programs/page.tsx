import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProgramsPageClient } from './page.client'

export const dynamic = 'force-dynamic'

export default async function ProgramsPage() {
  const payload = await getPayload({ config: configPromise })

  const camps = await payload.find({
    collection: 'camps',
    limit: 100,
    sort: '-createdAt',
  })

  return <ProgramsPageClient programs={camps.docs} />
}

export function generateMetadata() {
  return {
    title: 'Programs | YMS',
    description: 'Explore our youth sports programs including camps, clinics, leagues, and tournaments.',
  }
}
