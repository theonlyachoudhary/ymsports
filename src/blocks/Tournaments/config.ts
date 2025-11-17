import { Block } from 'payload'

export const TournamentsBlock: Block = {
  slug: 'tournaments',
  labels: {
    singular: 'Tournaments',
    plural: 'Tournaments',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tournaments',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'date',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          admin: { description: 'Optional external link' },
        },
      ],
    },
  ],
}
