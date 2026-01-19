import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // Brand Section
    {
      name: 'missionStatement',
      type: 'textarea',
      label: 'Mission Statement',
      defaultValue:
        "Every parent longs for their children's safety, to be surrounded by positive influences, and to have a strong sense of belonging.",
      admin: {
        description: 'Brief description shown below the logo',
      },
    },

    // Social Links
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'TikTok', value: 'tiktok' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },

    // Programs Column
    {
      name: 'programsColumn',
      type: 'group',
      label: 'Programs Column',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Programs',
        },
        {
          name: 'links',
          type: 'array',
          maxRows: 8,
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              label: 'Link URL',
            },
          ],
        },
      ],
    },

    // Locations Column
    {
      name: 'locationsColumn',
      type: 'group',
      label: 'Locations Column',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Locations',
        },
        {
          name: 'locations',
          type: 'array',
          maxRows: 10,
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Location Name',
            },
            {
              name: 'href',
              type: 'text',
              defaultValue: '/locations',
              label: 'Link URL',
            },
          ],
        },
      ],
    },

    // Organization Column
    {
      name: 'organizationColumn',
      type: 'group',
      label: 'Organization Column',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Organization',
        },
        {
          name: 'links',
          type: 'array',
          maxRows: 8,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },

    // Contact Column
    {
      name: 'contactColumn',
      type: 'group',
      label: 'Contact Column',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Contact',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
        },
      ],
    },

    // Bottom Bar
    {
      name: 'bottomBar',
      type: 'group',
      label: 'Bottom Bar',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          defaultValue: 'Youth Muslim Sports. All rights reserved.',
          admin: {
            description: 'Year will be automatically prepended (e.g., "© 2024 Your Text")',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
