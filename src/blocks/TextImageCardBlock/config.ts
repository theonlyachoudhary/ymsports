import { Block } from 'payload'

export const TextImageCardBlock: Block = {
  slug: 'textImageCardBlock',
  labels: {
    singular: 'Text + Image Card Block',
    plural: 'Text + Image Card Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      required: false,
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
