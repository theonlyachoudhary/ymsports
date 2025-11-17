import type { Block } from 'payload/types';

export const ImageTextBlock: Block = {
    slug: 'imageTextBlock',
    labels: {
        singular: 'Image + Text Block',
        plural: 'Image + Text Blocks',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'textarea',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
    ],
};
