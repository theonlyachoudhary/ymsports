import { Block } from 'payload';

export const CustomFormBlock: Block = {
  slug: 'customFormBlock',
  labels: {
    singular: 'Custom Form Block',
    plural: 'Custom Form Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'fields',
      type: 'array',
      labels: { singular: 'Field', plural: 'Fields' },
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Number', value: 'number' },
            { label: 'Textarea', value: 'textarea' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },

    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'Submit',
      required: true,
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Optional Image',
    },

    {
      name: 'backgroundColor',
      type: 'text',
      defaultValue: '#f7f4ed',
    },

    /* ⭐ OPTIONAL INFO SECTION ⭐ */
    {
      name: 'showInfo',
      type: 'checkbox',
      label: 'Show Info Section',
      defaultValue: false,
    },

    {
      name: 'infoTitle',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.showInfo,
      },
    },

    {
      name: 'infoSections',
      type: 'array',
      labels: { singular: 'Info Row', plural: 'Info Rows' },
      admin: {
        condition: (_, s) => s.showInfo,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
};
