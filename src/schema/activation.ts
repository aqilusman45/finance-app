import { RxJsonSchema } from "rxdb";

export const activationSchema: RxJsonSchema = {
  title: "activation schema",
  version: 0,
  description: "tells about product activation",
  type: "object",
  properties: {
    uid: {
      type: "string",
      primary: true,
      default: "activation"
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
    activated: {
      type: "boolean",
      default: false,
    },
  },
  required: ["uid", "activated"],
};
