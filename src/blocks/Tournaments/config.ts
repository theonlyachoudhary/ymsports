import { Block } from 'payload';

export const TournamentsBlock: Block = {
  slug: 'tournaments',
  labels: {
    singular: 'Tournaments Block',
    plural: 'Tournaments Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'tournaments',
      type: 'relationship',
      relationTo: 'tournaments',
      hasMany: true,
      required: false,
      admin: {
        description: 'Select tournaments to display',
      },
    },
  ],
};
