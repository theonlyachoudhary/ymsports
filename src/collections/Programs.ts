import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
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
      name: 'ageGroup',
      label: 'Age Group',
      type: 'radio',
      required: true,
      options: [
        { label: 'Under 7', value: 'u6' },
        { label: 'Under 10', value: 'u8' },
        { label: 'Under 13', value: 'u10' },
        { label: 'Under 16', value: 'u12' },
      ],
    },
    {
      name: 'themeColor',
      label: 'Theme Color (Hex Code)',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
