import { Block } from "payload/types";

export const AgeGroupBlock: Block = {
  slug: "ageGroupBlock",
  labels: {
    singular: "Age Group Block",
    plural: "Age Group Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "backgroundColor",
      type: "text",
      label: "Background Color (hex or tailwind class)",
    },
    {
        name: "iconType",
        type: "select",
        label: "Icon Type",
        options: [
            { label: "Down Arrow", value: "down" },
            { label: "Up Arrow", value: "up" },
        ],
        defaultValue: "down",
    },
    {
      name: "camps",
      type: "array",
      labels: {
        singular: "Camp",
        plural: "Camps",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "buttonLabel",
          type: "text",
          defaultValue: "Register",
        },
        {
          name: "buttonLink",
          type: "text",
          label: "Button Link (URL)",
          required: false,
          defaultValue: "/",
        },
      ],
    },
  ],
};
