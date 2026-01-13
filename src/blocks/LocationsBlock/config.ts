import type { Block } from 'payload'

export const LocationsBlock: Block = {
  slug: 'locationsBlock',
  interfaceName: 'LocationsBlockType',
  labels: {
    singular: 'Locations Block',
    plural: 'Locations Blocks',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'badge',
          type: 'text',
          defaultValue: 'Find Your Home Field',
          label: 'Badge Text',
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'OUR',
          label: 'Title (first part)',
        },
        {
          name: 'titleAccent',
          type: 'text',
          defaultValue: 'LOCATIONS',
          label: 'Title Accent (highlighted)',
        },
        {
          name: 'subtitle',
          type: 'text',
          defaultValue: 'We operate across Chicago, Dallas, and Virginia. Find a YMS community near you.',
          label: 'Subtitle',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
        },
      ],
    },
    {
      name: 'locations',
      type: 'array',
      label: 'Locations',
      minRows: 1,
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'City',
        },
        {
          name: 'state',
          type: 'text',
          required: true,
          label: 'State',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'statusBadge',
          type: 'text',
          defaultValue: 'Now Open',
          label: 'Status Badge',
        },
        {
          name: 'athleteCount',
          type: 'number',
          label: 'Active Athletes Count',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Location Image',
        },
        {
          name: 'sports',
          type: 'array',
          label: 'Featured Sports',
          fields: [
            {
              name: 'sport',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'address',
          type: 'text',
          label: 'Address',
        },
        {
          name: 'phoneNumber',
          type: 'text',
          label: 'Phone Number',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Learn More',
          label: 'Button Text',
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button Link',
        },
      ],
    },
  ],
}
