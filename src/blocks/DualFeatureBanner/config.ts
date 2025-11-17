import { Block } from "payload/types";

export const DualFeatureBanner: Block = {
  slug: "dualFeatureBanner",
  labels: {
    singular: "Dual Feature Banner",
    plural: "Dual Feature Banners",
  },
  fields: [
    {
      name: "left",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "link", type: "text", required: true },
        { name: "image", type: "upload", relationTo: "media", required: true },
      ],
    },
    {
      name: "right",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "link", type: "text", required: true },
        { name: "image", type: "upload", relationTo: "media", required: true },
      ],
    },
  ],
};
