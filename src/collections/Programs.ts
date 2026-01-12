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
      name: 'price',
      label: 'Price',
      type: 'text',
      required: false,
      admin: {
        description: 'e.g. $249 or $150/month',
      },
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: false,
      admin: {
        description: 'e.g. Chicago, IL',
      },
    },
    {
      name: 'duration',
      label: 'Duration',
      type: 'text',
      required: false,
      admin: {
        description: 'e.g. 8 Weeks or 2 Hours/Session',
      },
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
      admin: {
        description: 'Enter a HEX code like #C4571B',
      },
    },
    {
      name: 'buttonText',
      label: 'Button Text',
      type: 'text',
      required: false,
      admin: {
        description: 'e.g. Register Now For Ages 5 to 7',
      },
    },
    {
      name: 'buttonLink',
      label: 'Button Link (URL)',
      type: 'text',
      required: false,
      admin: {
        description: 'e.g. /register#5-7',
      },
    },
    {
      name: 'sideImage',
      label: 'Optional Side Image (for design)',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description:
          'Upload side pattern. Replaces default rectangles in design.',
      },
    },
    slugField({
      position: undefined,
    }),
  ],
}
