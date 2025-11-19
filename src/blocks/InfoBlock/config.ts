import { Block } from "payload/types";

export const InfoBlock: Block = {
  slug: "infoBlock",
  labels: {
    singular: "Info Block",
    plural: "Info Blocks",
  },
  fields: [
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "textarea",
    },
    {
      name: "businessHours",
      type: "textarea",
    },
  ],
};
