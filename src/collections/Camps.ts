import type { CollectionConfig, CollectionSlug } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Camps: CollectionConfig = {
  slug: 'camps',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coach',
      type: 'relationship',
      relationTo: 'coaches' as CollectionSlug,
      hasMany: false,
      required: true,
      admin: {
        description: 'Select the related coach',
        position: 'sidebar',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'dayOfWeek',
      type: 'text',
      required: true,
    },
    {
      name: 'startDate',
      label: 'Start Date (eg, 01/01/2024)',
      type: 'text',
      required: true,
    },
    {
      name: 'endDate',
      label: 'End Date (eg, 01/01/2024)',
      type: 'text',
      required: true,
    },
    {
      name: 'earlyBirdCode',
      label: 'Early Bird Code',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      required: true,
    },
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'programs' as CollectionSlug,
      hasMany: false,
      required: true,
      admin: {
        description: 'Select the related program',
        position: 'sidebar',
      },
    },
    slugField({
      position: undefined,
    }),
  ],
}
