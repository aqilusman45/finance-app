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
  },
  required: ["uid", "quatity", "sku", "price"],
};
