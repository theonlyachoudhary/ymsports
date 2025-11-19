import { Block } from "payload/types";

export const FAQBlock: Block = {
  slug: "faqBlock",
  labels: {
    singular: "FAQ Block",
    plural: "FAQ Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "FAQ",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "faqs",
      type: "array",
      labels: { singular: "FAQ", plural: "FAQs" },
      required: true,
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
