import type { Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
      ],
      required: true,
    },

    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      required: false,
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      required: false,
    },
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Subtext',
      required: false,
    },

    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Rich Text (optional)',
    },

    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),

    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact'].includes(type),
      },
    },
  ],
  label: 'Hero',
}
