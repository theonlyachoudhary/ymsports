import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'programType',
      type: 'select',
      label: 'Program Type',
      required: true,
      defaultValue: 'camp',
      options: [
        { label: 'Camp', value: 'camp' },
        { label: 'Clinic', value: 'clinic' },
        { label: 'Tournament', value: 'tournament' },
        { label: 'League', value: 'league' },
      ],
      admin: {
        description: 'Select the type of your program',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Program',
      defaultValue: false,
      admin: {
        description: 'Check this to display the program in featured sections and hero areas',
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: {
        description: 'This is for a quick summary of the program. Strict word limit enforced.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'This is where you will put a full, comprehensive description.',
      },
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. $249 or $150/month',
      },
    },
    {
      name: 'location',
      label: 'Location',
      type: 'select',
      required: false,
      options: [
        { label: 'Chicago, IL', value: 'chicago' },
        { label: 'Dallas, TX', value: 'dallas' },
      ],
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Ackerman Sports Center, Glen Ellyn',
      },
    },
    {
      name: 'startDate',
      label: 'Program Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      label: 'Program End Date',
      type: 'date',
      required: true,
    },
    {
      name: 'startRegistrationDate',
      label: 'Registration Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'endRegistrationDate',
      label: 'Registration End Date',
      type: 'date',
      required: true,
    },
    {
      name: 'weeklySchedule',
      label: 'Weekly Schedule',
      type: 'text',
      required: false,
      admin: {
        description: 'e.g. Wednesdays 5pm to 7pm',
      },
    },
    {
      name: 'ageRange',
      label: 'Age Range',
      type: 'select',
      required: true,
      options: [
        { label: '6 to 7', value: '6to7' },
        { label: '8 to 10', value: '8to10' },
        { label: '11 to 13', value: '11to13' },
        { label: '14 to 16', value: '14to16' },
      ],
      admin: {
        description: 'Please select the age range for the program.',
      },
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      options: [
        { label: 'Boys', value: 'boys' },
        { label: 'Girls', value: 'girls' },
        { label: 'Coed', value: 'coed' },
      ],
      admin: {
        description: 'Is this program for boys, girls, or both?',
      },
    },
    {
      name: 'sportType',
      label: 'Type of Sport',
      type: 'select',
      required: true,
      options: [
        { label: 'Football', value: 'football' },
        { label: 'Basketball', value: 'basketball' },
        { label: 'Soccer', value: 'soccer' },
        { label: 'Tennis', value: 'tennis' },
        { label: 'Volleyball', value: 'volleyball' },
      ],
      admin: {
        description: 'Please select the type of sport :)',
      },
    },
    {
      name: 'buttonLink',
      label: 'Button Link (URL)',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. /register',
      },
    },
    {
      name: 'programImage',
      label: 'Optional Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional Image for the Program.',
      },
    },
    slugField({
      name: 'slug',
    }),
  ],
}
