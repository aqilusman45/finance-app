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
    quatity: {
      type: "number",
    },
    sku: {
      type: "string",
    },
    price: {
      type: "number",
    },
    images: {
      type: "array",
      items: {
        type: "object",
        properties: {
          base64: {
            type: "string",
          },
          name: {
            type: "string",
          },
        },
      },
    },
  },
  required: ["uid", "quatity", "sku", "price"],
};
