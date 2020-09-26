import { RxJsonSchema } from "rxdb";

export const attributeSchema: RxJsonSchema = {
  title: "attribute schema",
  version: 0,
  description: "attributes",
  type: "object",
  properties: {
    uid: {
      type: "string",
      primary: true,
    },
    attributeType: {
      type: "string",
    },
    attributeName: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        key: {
          type: "string",
        },
      },
    },
    createdAt: {
      type: "number",
      default: Date.now(),
    },
    updatedAt: {
      type: "number",
      default: Date.now(),
    },
    required: {
      type: "boolean",
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
  required: ["uid", "attributeType", "attributeName", "required", "options"],
};
