import type { Block } from 'payload'

export const Sponsorship: Block = {
  slug: 'sponsorship',
  interfaceName: 'SponsorshipBlock',
  labels: {
    singular: 'Sponsorship',
    plural: 'Sponsorships',
  },
  fields: [
    {
      name: 'tiers',
      type: 'array',
      label: 'Sponsorship Tiers',
      minRows: 1,
      maxRows: 5,
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Tier Name' },
        { name: 'price', type: 'text', required: true, label: 'Price (e.g. $500)' },
        { name: 'pricePeriod', type: 'text', defaultValue: 'per season*', label: 'Price Period' },
        { name: 'description', type: 'text', label: 'Short Description (e.g. Best for small businesses)' },
        { 
          name: 'featured', 
          type: 'checkbox', 
          label: 'Featured Tier (highlighted in center)',
          defaultValue: false,
        },
        { name: 'featuredLabel', type: 'text', label: 'Featured Label (e.g. Most Impact)' },
        {
          name: 'benefits',
          type: 'array',
          label: 'Benefits',
          fields: [
            { name: 'benefit', type: 'text', required: true },
          ],
        },
        { name: 'buttonText', type: 'text', defaultValue: 'Learn More!', label: 'Button Text' },
        { name: 'buttonLink', type: 'text', label: 'Button Link' },
        { name: 'phoneNumber', type: 'text', label: 'Phone Number (optional, shown below button)' },
      ],
    },
    {
      name: 'guidelines',
      type: 'group',
      label: 'Guidelines Section',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'YMS Sponsorship Guidelines', label: 'Guidelines Title' },
        {
          name: 'paragraphs',
          type: 'array',
          label: 'Guideline Paragraphs',
          fields: [
            { name: 'text', type: 'textarea', required: true },
          ],
        },
        { name: 'highlightTitle', type: 'text', label: 'Highlight Box Title' },
        {
          name: 'highlightItems',
          type: 'array',
          label: 'Highlight Box Items',
          fields: [
            { name: 'item', type: 'text', required: true },
          ],
        },
        {
          name: 'closingParagraphs',
          type: 'array',
          label: 'Closing Paragraphs',
          fields: [
            { name: 'text', type: 'textarea', required: true },
          ],
        },
      ],
    },
  ],
}
