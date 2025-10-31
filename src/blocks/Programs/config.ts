import type { Block } from 'payload'

export const Programs: Block = {
  slug: 'programs',
  interfaceName: 'Programs',
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
