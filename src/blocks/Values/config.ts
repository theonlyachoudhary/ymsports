import type { Block } from 'payload'

export const Values: Block = {
  slug: 'values',
  interfaceName: 'Values',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'valueCards',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
