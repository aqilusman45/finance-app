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
    name: {
      type: "string",
    },
    quantity: {
      type: "number",
    },
    sku: {
      type: "string",
    },
    cost: {
      type: "number",
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
    },
    updatedAt: {
      type: "number",
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
  required: ["uid", "name", "sku", "quantity", "price", "description"]
};
