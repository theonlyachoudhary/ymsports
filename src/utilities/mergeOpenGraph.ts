import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Youth Muslim Sports - Building community through athletics. Camps, clinics, leagues, and tournaments for youth of all ages.',
  images: [
    {
      url: `${getServerSideURL()}/yms-logo.jpg`,
    },
  ],
  siteName: 'Youth Muslim Sports',
  title: 'Youth Muslim Sports',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
