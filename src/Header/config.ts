import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      admin: {
        description: 'Configure the call-to-action button in the header',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Show CTA Button',
          defaultValue: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Register',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'linkType',
          type: 'radio',
          label: 'Link Type',
          defaultValue: 'custom',
          options: [
            { label: 'Internal Page', value: 'reference' },
            { label: 'Custom URL', value: 'custom' },
          ],
          admin: {
            layout: 'horizontal',
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'reference',
          type: 'relationship',
          relationTo: ['pages', 'posts'],
          label: 'Page to link to',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled && siblingData?.linkType === 'reference',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Custom URL',
          defaultValue: '/register',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled && siblingData?.linkType === 'custom',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
