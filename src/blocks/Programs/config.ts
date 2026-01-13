import type { Block } from 'payload'

export const Programs: Block = {
  slug: 'programs',
  interfaceName: 'Programs',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'filters',
      type: 'array',
      label: 'Filter Categories',
      admin: {
        description: 'Add filter buttons for the programs grid (e.g. All, Basketball, Soccer)',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { 
          name: 'value', 
          type: 'text', 
          required: true,
          admin: {
            description: 'Use "all" for showing all programs, or match program subtitles/categories',
          },
        },
      ],
      defaultValue: [
        { label: 'All', value: 'all' },
      ],
    },
    {
      name: 'programs',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: true,
      required: true,
    },
  ],
}
