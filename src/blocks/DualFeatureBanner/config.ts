import { Block } from 'payload'

const featureFields = [
  { name: 'title', type: 'text' as const, required: true },
  { name: 'description', type: 'textarea' as const, required: false },
  { name: 'duration', type: 'text' as const, required: false },
  { name: 'link', type: 'text' as const, required: true },
  { name: 'image', type: 'upload' as const, relationTo: 'media' as const, required: true },
]

export const DualFeatureBanner: Block = {
  slug: 'dualFeatureBanner',
  labels: {
    singular: 'Triple Feature Banner',
    plural: 'Triple Feature Banners',
  },
  fields: [
    {
      name: 'left',
      type: 'group',
      fields: featureFields,
    },
    {
      name: 'center',
      type: 'group',
      fields: featureFields,
    },
    {
      name: 'right',
      type: 'group',
      fields: featureFields,
    },
  ],
}
