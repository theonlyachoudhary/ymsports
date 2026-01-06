import type { Block } from 'payload'

export const FeaturedPrograms: Block = {
  slug: 'featuredPrograms',
  interfaceName: 'FeaturedProgramsBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Upcoming Seasons',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Featured Programs',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Discover our most popular upcoming clinics and camps. Designed for every age and skill level.',
    },
    {
      name: 'programsLimit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 6,
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'View All Programs',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/programs',
    },
  ],
  labels: {
    plural: 'Featured Programs Blocks',
    singular: 'Featured Programs Block',
  },
}
