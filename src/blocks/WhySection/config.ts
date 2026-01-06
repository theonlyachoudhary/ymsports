import type { Block } from 'payload'

export const WhySection: Block = {
  slug: 'whySection',
  interfaceName: 'WhySectionBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Shield', value: 'shield' },
            { label: 'Heart', value: 'heart' },
            { label: 'Star', value: 'star' },
            { label: 'Users', value: 'users' },
          ],
          defaultValue: 'shield',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Why Section Blocks',
    singular: 'Why Section Block',
  },
}
