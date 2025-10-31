import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'occupation',
      label: 'Occupation (e.g., Mother,Student, Professional)',
      type: 'text',
      required: true,
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
