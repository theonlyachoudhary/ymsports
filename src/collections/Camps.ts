import type { CollectionConfig, CollectionSlug } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Camps: CollectionConfig = {
  slug: 'camps',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
    },
    {
      name: 'programType',
      label: 'Program Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Camp', value: 'camp' },
        { label: 'Clinic', value: 'clinic' },
        { label: 'League', value: 'league' },
        { label: 'Tournament', value: 'tournament' },
      ],
      defaultValue: 'camp',
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'select',
          required: true,
          options: [
            { label: 'Illinois', value: 'IL' },
            { label: 'Texas', value: 'TX' },
            { label: 'Virginia', value: 'VA' },
          ],
        },
      ],
    },
    {
      name: 'venue',
      type: 'group',
      fields: [
        {
          name: 'name',
          label: 'Venue Name',
          type: 'text',
          required: false,
        },
        {
          name: 'address',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'fullDescription',
      label: 'Full Program Description',
      type: 'richText',
      required: false,
    },
    {
      name: 'whatToExpect',
      label: 'What to Expect',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ageMin',
      label: 'Minimum Age',
      type: 'number',
      required: true,
    },
    {
      name: 'ageMax',
      label: 'Maximum Age',
      type: 'number',
      required: true,
    },
    {
      name: 'coach',
      type: 'relationship',
      relationTo: 'coaches' as CollectionSlug,
      hasMany: false,
      required: false,
      admin: {
        description: 'Select the related coach',
        position: 'sidebar',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'schedule',
      type: 'group',
      fields: [
        {
          name: 'days',
          label: 'Days (e.g., Monday - Friday)',
          type: 'text',
          required: false,
        },
        {
          name: 'startTime',
          label: 'Start Time (e.g., 9:00 AM)',
          type: 'text',
          required: false,
        },
        {
          name: 'endTime',
          label: 'End Time (e.g., 3:00 PM)',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'startDate',
      label: 'Start Date (eg, 01/01/2024)',
      type: 'text',
      required: false,
    },
    {
      name: 'endDate',
      label: 'End Date (eg, 01/01/2024)',
      type: 'text',
      required: false,
    },
    {
      name: 'registrationLink',
      label: 'Fillout Registration Link',
      type: 'text',
      required: true,
      admin: {
        description: 'External Fillout form URL for registration',
      },
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'programs' as CollectionSlug,
      hasMany: false,
      required: false,
      admin: {
        description: 'Select the related program',
        position: 'sidebar',
      },
    },
    slugField({
      position: undefined,
    }),
  ],
}
