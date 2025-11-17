import { Block } from "payload/types";

export const CustomFormBlock: Block = {
  slug: "customFormBlock",
  labels: {
    singular: "Custom Form Block",
    plural: "Custom Form Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "fields",
      type: "array",
      labels: { singular: "Field", plural: "Fields" },
      required: true,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "type",
          type: "select",
          required: true,
          options: [
            { label: "Text", value: "text" },
            { label: "Email", value: "email" },
            { label: "Number", value: "number" },
            { label: "Textarea", value: "textarea" },
          ],
        },
        {
          name: "required",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },

    {
      name: "buttonLabel",
      type: "text",
      defaultValue: "Submit",
      required: true,
    },

    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Optional Image",
    },

    {
      name: "backgroundColor",
      type: "text",
      defaultValue: "#f7f4ed",
    },
  ],
};
