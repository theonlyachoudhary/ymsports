import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
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
      name: 'programType',
      type: 'select',
      label: 'Program Type',
      required: true,
      defaultValue: 'camp',
      options: [
        { label: 'Camp', value: 'camp' },
        { label: 'Clinic', value: 'clinic' },
        { label: 'Tournament', value: 'tournament' },
      ],
      admin: {
        description: 'Select the type of your program',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Program',
      defaultValue: false,
      admin: {
        description: 'Check this to display the program in featured sections and hero areas',
        position: 'sidebar',
      },
    },
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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. $249 or $150/month',
      },
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: false,
      admin: {
        description: 'e.g. Chicago, IL',
      },
    },
    {
      name: 'startDate',
      label: 'Program Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      label: 'Program End Date',
      type: 'date',
      required: true,
    },
    {
      name: 'startRegistrationDate',
      label: 'Registration Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'endRegistrationDate',
      label: 'Registration End Date',
      type: 'date',
      required: true,
    },
    {
      name: 'weeklySchedule',
      label: 'Weekly Schedule',
      type: 'text',
      required: false,
      admin: {
        description: 'e.g. Wednesdays 5pm to 7pm',
      }
    },
    {
      name: 'minAge',
      label: 'Minimum Age',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. 5'
      }
    },
    {
      name: 'maxAge',
      label: 'Maximum Age',
      type: 'text',
      required: true,
      admin: {
         description: 'e.g. 7'
      }
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      options: [
        { label: 'Boys', value: 'boys' },
        { label: 'Girls', value: 'girls' },
        { label: 'Coed', value: 'coed' },
      ],
      admin: {
        description: 'Is this program for boys, girls, or both?'
      }
    },
    {
      name: 'buttonLink',
      label: 'Button Link (URL)',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. /register',
      },
    },
    {
      name: 'programImage',
      label: 'Optional Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description:
          'Optional Image for the Program.',
      },
    },
    slugField({
      position: undefined,
    }),
  ],
}
