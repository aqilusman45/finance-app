import { RxJsonSchema } from "rxdb";

export const userSchema: RxJsonSchema = {
  title: "user schema",
  version: 0,
  description: "user accounts",
  type: "object",
  properties: {
    uid: {
      type: "string",
      primary: true,
    },
    createdAt: {
      type: "number",
      default: Date.now(),
    },
    updatedAt: {
      type: "number",
      default: Date.now(),
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["uid", "name", "email", "password"],
};
