import { CollectionConfig } from 'payload';

export const Tournaments: CollectionConfig = {
  slug: 'tournaments',
  labels: {
    singular: 'Tournament',
    plural: 'Tournaments',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'date',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Optional external link',
      },
    },
  ],
};
