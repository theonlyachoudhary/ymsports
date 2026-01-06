import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProgramDetailClient } from './page.client'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const camps = await payload.find({
    collection: 'camps',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!camps.docs || camps.docs.length === 0) {
    notFound()
  }

  const program = camps.docs[0]

  return <ProgramDetailClient program={program} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const camps = await payload.find({
    collection: 'camps',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!camps.docs || camps.docs.length === 0) {
    return {
      title: 'Program Not Found | YMS',
    }
  }

  const program = camps.docs[0]

  return {
    title: `${program.title} | YMS Programs`,
    description: program.description,
  }
}
