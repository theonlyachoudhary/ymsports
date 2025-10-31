import type { Block } from 'payload'

export const Coaches: Block = {
  slug: 'coaches',
  interfaceName: 'Coaches',
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
  ],
}
