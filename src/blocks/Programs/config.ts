import type { Block } from 'payload'

export const Programs: Block = {
  slug: 'programs',
  interfaceName: 'Programs',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'ageGroups',
      type: 'array',
      required: true,
      fields: [
        { name: 'label', type: 'text', required: true },     
        { name: 'color', type: 'text', defaultValue: 'orange' } 
      ],
    },
    {
      name: 'programs',
      type: 'relationship',
      relationTo: 'programs', 
      hasMany: true,
      required: true,
    },
    {
      name: 'sideImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional decorative side image (replaces rectangles)' },
    },
  ],
}
