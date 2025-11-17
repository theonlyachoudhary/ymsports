import { Block } from "payload/types";

export const PageHeaderBlock: Block = {
  slug: "pageHeaderBlock",
  labels: {
    singular: "Page Header Block",
    plural: "Page Header Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "textarea",
    },
    {
      name: "align",
      type: "select",
      defaultValue: "center",
      options: [
        { label: "Center", value: "center" },
        { label: "Left", value: "left" },
      ],
    },
    {
      name: "paddingSize",
      type: "select",
      defaultValue: "lg",
      label: "Padding Size",
      options: [
        { label: "Large", value: "lg" },
        { label: "Medium", value: "md" },
        { label: "Small", value: "sm" },
      ],
    },
  ],
};
