import { Block } from "payload/types";

export const HighlightsBlock: Block = {
  slug: "highlightsBlock",
  labels: {
    singular: "Highlights",
    plural: "Highlights Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Highlights",
    },
    {
      name: "images",
      type: "array",
      required: true,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
