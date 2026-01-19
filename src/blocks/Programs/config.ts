import type { Block } from 'payload'

export const Programs: Block = {
  slug: 'programs',
  interfaceName: 'ProgramsBlock',
  fields: [
    { name: 'title', type: 'text', required: false },
    {
      name: 'summary',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Optional summary text displayed below the title',
      },
    },
    {
      name: 'programTypeTabs',
      type: 'array',
      label: 'Program Type Tabs',
      minRows: 1,
      admin: {
        description:
          'Select and order the program type tabs. Drag to reorder. The first tab will be the default.',
      },
      fields: [
        {
          name: 'programType',
          type: 'select',
          required: true,
          options: [
            { label: 'Camps', value: 'camp' },
            { label: 'Clinics', value: 'clinic' },
            { label: 'Tournaments', value: 'tournament' },
            { label: 'Leagues', value: 'league' },
          ],
        },
      ],
      defaultValue: [
        { programType: 'camp' },
        { programType: 'clinic' },
        { programType: 'tournament' },
        { programType: 'league' },
      ],
    },
  ],
}
