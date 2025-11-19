import type { Block } from 'payload'

export const Coaches: Block = {
  slug: 'coaches',
  interfaceName: 'Coaches',
  labels: { singular: 'Coaches', plural: 'Coaches' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: false },

    // (Optional) pick specific coaches to feature; leave empty to show latest
    {
      name: 'featuredCoaches',
      label: 'Featured Coaches',
      type: 'relationship',
      relationTo: 'coaches',
      hasMany: true,
      required: false,
    },

    { name: 'ctaText', label: 'CTA Text', type: 'text' },
    { name: 'ctaLink', label: 'CTA Link', type: 'text' },
  ],
}
