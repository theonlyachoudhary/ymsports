import type { Block } from 'payload'

export const Partners: Block = {
  slug: 'partners',
  interfaceName: 'PartnersBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Our Platinum Partners',
    },
    {
      name: 'partners',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
  labels: {
    plural: 'Partners Blocks',
    singular: 'Partners Block',
  },
}
