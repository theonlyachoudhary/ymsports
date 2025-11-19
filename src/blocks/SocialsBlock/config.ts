import { Block } from "payload/types";

export const SocialsBlock: Block = {
  slug: "socialsBlock",
  labels: {
    singular: "Socials Block",
    plural: "Socials Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Connect With Us",
      required: false,
    },
    {
      name: "items",
      type: "array",
      required: true,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          label: "Handle / Number",
          required: true,
        },
        {
          name: "link",
          type: "text",
          label: "URL / Phone / Handle",
        },
        {
          name: "color",
          type: "text",
          defaultValue: "#f7f4ed",
        },
      ],
    },
  ],
};
