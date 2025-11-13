import type { Block } from 'payload'

export const CampsOrTrny: Block = {
  slug: 'campsOrTrny',
  interfaceName: 'Camps or Tournaments',
  fields: [
    { name: 'title', type: 'text', required: false },
    { name: 'description', type: 'textarea', required: false },
    { name: 'campColor', type: 'text', label: 'Color (hex)', required: false },
    { name: 'campImage', type: 'upload', relationTo: 'media', required: false },
    { name: 'trnyColor', type: 'text', label: 'Color (hex)', required: false },
    { name: 'trnyImage', type: 'upload', relationTo: 'media', required: false },
  ],
}
