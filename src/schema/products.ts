import { RxJsonSchema } from "rxdb";

export const productSchema: RxJsonSchema = {
  title: "product schema",
  version: 0,
  description: "products",
  type: "object",
  properties: {
    uid: {
      type: "string",
      primary: true,
    },
    quantity: {
      type: "number",
    },
    sku: {
      type: "string",
    },
    price: {
      type: "number",
    },
    description: {
      type: "string",
    },
    enabled: {
      type: "boolean",
      default: true,
    },
    createdAt: {
      type: "number",
      default: Date.now(),
    },
    updatedAt: {
      type: "number",
      default: Date.now(),
    },
    attributes: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          attributeRef: {
            ref: "attributes",
            type: "string",
          },
          options: {
            type: "array",
            items: {
              type: "object",
              properties: {
                value: {
                  type: "string",
                },
                label: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    images: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
        },
      },
    },
  },
  attachments: {
    encrypted: true,
  },
  required: ["uid", "quantity", "sku", "price"],
};
